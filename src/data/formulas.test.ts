import katex from 'katex';
import { Rating } from 'ts-fsrs';
import { describe, expect, it } from 'vitest';
import { formatFormulaTex, tokenizeMathText } from '../components/MathText';
import {
  collectFormulaMistakes,
  computeFormula14DayForecast,
  computeFormulaSubjectMastery,
  getDueFormulaIds,
  getUnlearnedFormulaIds,
} from '../core/formulaStats';
import { createInitialCard, reviewCard } from '../core/scheduler';
import type { FormulaReviewRecord } from '../store/useFormulaProgress';
import { serializeCard } from '../store/useProgress';
import {
  FORMULAS,
  FORMULA_SECTIONS,
  FORMULA_VERIFICATION_NOTES,
} from './formulas';

describe('公式默写手册（348题）数据完整性、KaTeX 渲染与熟记逻辑单元测试', () => {
  it('完整转录 348 道题、25 个板块、4 大科目与 8 条校订说明', () => {
    expect(FORMULAS).toHaveLength(348);
    expect(FORMULA_SECTIONS).toHaveLength(25);
    expect(FORMULA_VERIFICATION_NOTES).toHaveLength(8);

    const bySubject = { calculus: 0, linalg: 0, probstat: 0, signals: 0 };
    FORMULAS.forEach((f, idx) => {
      expect(f.num).toBe(idx + 1);
      expect(f.code).toBe(String(idx + 1).padStart(3, '0'));
      expect(f.question.length).toBeGreaterThan(0);
      expect(f.answer.length).toBeGreaterThan(0);
      expect(f.answerParts.length).toBeGreaterThan(0);
      bySubject[f.subject] += 1;
    });

    expect(bySubject).toEqual({
      calculus: 144,
      linalg: 45,
      probstat: 46,
      signals: 113,
    });

    // All section questionIds must bijectively match FORMULAS
    const allSectionIds = FORMULA_SECTIONS.flatMap((s) => s.questionIds);
    expect(allSectionIds).toHaveLength(FORMULAS.length);
    expect(new Set(allSectionIds).size).toBe(FORMULAS.length);

    // (1+x)^a 展开（f-034）使用三阶分式展开形式
    const f034 = FORMULAS.find((f) => f.id === 'f-034');
    expect(f034?.answer).toBe(
      '$(1+x)^a=1+ax+\\frac{a(a-1)}{2!}x^2+\\frac{a(a-1)(a-2)}{3!}x^3+o(x^3)$'
    );

    // 核对照片新增与对齐项（sin ω0 t、Z 终值、门/抽样函数、单边 Z 移位与 z 域积分）
    expect(FORMULAS.find((f) => f.id === 'f-296')?.answer).toBe(
      '$j\\pi[\\delta(\\omega+\\omega_0)-\\delta(\\omega-\\omega_0)]$'
    );
    expect(FORMULAS.find((f) => f.id === 'f-316')?.answer).toContain(
      '$x(\\infty)=\\lim_{z\\to1}(z-1)X(z)$'
    );
    expect(FORMULAS.find((f) => f.id === 'f-334')?.answer).toBe(
      '$\\tau\\operatorname{Sa}\\left(\\frac{\\omega\\tau}{2}\\right)$'
    );
    expect(FORMULAS.find((f) => f.id === 'f-348')?.answer).toBe(
      '$z^m\\int_z^\\infty\\frac{F(x)}{x^{m+1}}\\,dx$'
    );
  });

  it('全部 348 道题干、答案、板块标题与校订说明的 LaTeX 均可通过 KaTeX 严格渲染（0 报错，且数学公式内无斜杠分式）', () => {
    const texts: string[] = [
      ...FORMULA_SECTIONS.map((s) => s.fullTitle),
      ...FORMULAS.flatMap((f) => [f.question, f.answer, ...f.answerParts]),
      ...FORMULA_VERIFICATION_NOTES.map((n) => n.body),
    ];

    let mathCount = 0;
    for (const t of texts) {
      const segs = tokenizeMathText(t);
      for (const seg of segs) {
        if (seg.kind === 'math') {
          mathCount += 1;
          expect(
            seg.value.includes('/'),
            `发现未转换的斜杠分式: ${seg.value}`
          ).toBe(false);
          expect(() =>
            katex.renderToString(formatFormulaTex(seg.value, Boolean(seg.display)), {
              displayMode: Boolean(seg.display),
              throwOnError: true,
              strict: false,
            })
          ).not.toThrow();
        }
      }
    }
    expect(mathCount).toBeGreaterThan(800);
  });

  it('直接标记熟记后自动移出待复习、未学、错题与 14 天预测队列，并计入已搞定统计；取消后恢复', () => {
    const now = new Date('2026-11-23T10:00:00Z');
    const dueCard = serializeCard(
      createInitialCard(new Date('2026-11-22T10:00:00Z'))
    );
    const futureCard = serializeCard(
      reviewCard(createInitialCard(now), Rating.Good, now)
    );
    const cards = {
      'f-003': dueCard,
      'f-004': futureCard,
    };
    const reviews: FormulaReviewRecord[] = [
      {
        formulaId: 'f-003',
        rating: Rating.Again,
        timestamp: '2026-11-22T10:00:00Z',
      },
    ];

    // Before marking mastered (f-003 overdue + f-004 due in 10 min today = 2)
    expect(getDueFormulaIds(cards, {}, now)).toEqual(['f-003']);
    expect(computeFormula14DayForecast(cards, {}, now)[0].dueCount).toBe(2);
    expect(collectFormulaMistakes(reviews, {}, now).map((m) => m.formulaId)).toEqual([
      'f-003',
    ]);
    expect(getUnlearnedFormulaIds(cards, {})).toContain('f-001');

    // Mark f-001 (unlearned) and f-003 (due + mistake) as mastered
    const mastered = {
      'f-001': { value: true, updatedAt: now.toISOString() },
      'f-003': { value: true, updatedAt: now.toISOString() },
    };

    expect(getDueFormulaIds(cards, mastered, now)).toEqual([]);
    expect(collectFormulaMistakes(reviews, mastered, now)).toEqual([]);
    expect(getUnlearnedFormulaIds(cards, mastered)).not.toContain('f-001');

    const forecast = computeFormula14DayForecast(cards, mastered, now);
    // Only unmastered f-004 remains due today
    expect(forecast[0].dueCount).toBe(1);

    const subjectStats = computeFormulaSubjectMastery(cards, mastered);
    const calc = subjectStats.find((s) => s.subject === 'calculus')!;
    expect(calc.directMastered).toBe(2);
    expect(calc.doneCount).toBe(2);

    // Unmark f-003 restores it into due queue and mistakes
    const unmarked = {
      ...mastered,
      'f-003': { value: false, updatedAt: '2026-11-23T11:00:00Z' },
    };
    expect(getDueFormulaIds(cards, unmarked, now)).toEqual(['f-003']);
    expect(collectFormulaMistakes(reviews, unmarked, now).map((m) => m.formulaId)).toEqual([
      'f-003',
    ]);
  });
});
