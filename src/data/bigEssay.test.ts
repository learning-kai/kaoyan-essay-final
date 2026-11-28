import { describe, expect, it } from 'vitest';
import { Rating } from 'ts-fsrs';
import {
  checkPlanSheet,
  checkPlanVarBenefit,
  checkPlanVarDO,
  checkPlanVarX,
  getBigEssayWordCountStatus,
  gradeBigEssayAlignment,
} from '../core/grader';
import { createInitialCard, interleaveQueue, reviewCard } from '../core/scheduler';
import {
  assemblePicClause,
  BIG_CHART_SHELL_SENTENCES,
  BIG_CORE_SENTENCES,
  BIG_PROMPTS,
  BIG_SENTENCES,
  BIG_SENTENCE_IDS,
  BIG_SENTENCE_MAP,
  MATERIAL_PACKS,
  MATERIAL_PACK_MAP,
  NEGATIVE_FLIP_TABLE,
  UNIVERSAL_FALLBACK_SETS,
  getBigSentencesForFormat,
  renderFullBigEssay,
} from './bigEssay';
import { generateRandomChart } from './bigChart';
import { migrateProgressCards, serializeCard } from '../store/useProgress';

/**
 * 真·万能固定版核心 10 句（仅 5 空：X / PIC / B1 / B2 / DO）+ 可选兼容句 P2.S4
 */
const UNIVERSAL_BIG_SENTENCES_SPEC: { id: string; en: string }[] = [
  {
    id: 'big.p1.s1',
    en: 'The picture presents a vivid scene in which {{PIC}}.',
  },
  {
    id: 'big.p1.s2',
    en: 'The deeper issue revealed by the drawing lies in the value and impact of {{X}} in modern society.',
  },
  {
    id: 'big.p1.s3',
    en: 'When its positive potential is properly realized, {{X}} can exert a profound and lasting influence on both personal growth and social development.',
  },
  {
    id: 'big.p2.s1',
    en: '{{X}} brings people not only {{B1}} but also {{B2}}.',
  },
  {
    id: 'big.p2.s2',
    en: "In today's fast-paced world, {{X}}, far from being a minor detail, plays an increasingly vital role in everyday life, enabling people to {{DO}}.",
  },
  {
    id: 'big.p2.s3',
    en: "Moreover, the growing recognition and clear benefits associated with {{X}} meet people's real needs and further strengthen its lasting significance.",
  },
  {
    id: 'big.p2.s4',
    en: "Therefore, changes in {{X}} reflect not only social progress but also people's growing pursuit of a better life.",
  },
  {
    id: 'big.p3.s1',
    en: 'What ultimately determines the value of {{X}} is not mere form, but whether it is put into practice wisely and responsibly.',
  },
  {
    id: 'big.p3.s2',
    en: 'Society should provide more support and guidance, addressing related challenges while creating a favorable environment for {{X}}.',
  },
  {
    id: 'big.p3.s3',
    en: 'Individuals, meanwhile, should approach {{X}} with a rational mindset, neither ignoring its benefits nor failing to take concrete action.',
  },
  {
    id: 'big.p3.s4',
    en: 'Only in this way can {{X}} truly contribute to the well-being of individuals and the progress of society.',
  },
];

describe('大作文真·万能 5 空体系与 3 壳（图画/图表/双图/图文）全量校验', () => {
  it('1. 全部 11 句 ID 原样保留 + 2 句图表/图文衔接壳完整，核心 10 句只含 5 个考场空位', () => {
    expect(BIG_SENTENCES).toHaveLength(11);
    expect(BIG_CORE_SENTENCES).toHaveLength(10);
    expect(BIG_CHART_SHELL_SENTENCES).toHaveLength(2);
    expect(BIG_SENTENCE_IDS).toHaveLength(12);

    for (const expected of UNIVERSAL_BIG_SENTENCES_SPEC) {
      const actual = BIG_SENTENCE_MAP[expected.id];
      expect(actual, `缺少句子 ${expected.id}`).toBeDefined();
      expect(actual.en).toBe(expected.en);
    }

    // 核心 10 句仅允许出现 X / PIC / B1 / B2 / DO 这 5 个变量，彻底消灭 17 个多余隐藏变量
    const allowedCoreVars = new Set(['X', 'PIC', 'B1', 'B2', 'DO']);
    for (const s of BIG_CORE_SENTENCES) {
      const vars = [...s.en.matchAll(/\{\{(\w+)(?:\|[^}]+)?\}\}/g)].map((m) => m[1]);
      for (const v of vars) {
        expect(allowedCoreVars.has(v), `${s.id} 含多余变量 ${v}`).toBe(true);
      }
    }

    expect(BIG_SENTENCE_MAP['big.p2.s4'].optional).toBe(true);
    expect(BIG_SENTENCE_MAP['big.shell.chart']).toBeDefined();
    expect(BIG_SENTENCE_MAP['big.shell.hybrid']).toBeDefined();
  });

  it('2. 3 组万金油兜底词与 6 类负题正转 X 均通过语法与词性校验', () => {
    expect(UNIVERSAL_FALLBACK_SETS).toHaveLength(3);
    for (const fb of UNIVERSAL_FALLBACK_SETS) {
      expect(checkPlanVarBenefit(fb.B1, 'B1').ok, `兜底词 ${fb.id} B1 异常`).toBe(true);
      expect(checkPlanVarBenefit(fb.B2, 'B2').ok, `兜底词 ${fb.id} B2 异常`).toBe(true);
      expect(checkPlanVarDO(fb.DO).ok, `兜底词 ${fb.id} DO 异常`).toBe(true);
    }

    expect(NEGATIVE_FLIP_TABLE).toHaveLength(6);
    for (const nf of NEGATIVE_FLIP_TABLE) {
      expect(
        checkPlanVarX(nf.positiveX).ok,
        `负题正转 ${nf.id} X="${nf.positiveX}" 未通过单数校验`
      ).toBe(true);
    }
  });

  it('3. 小作文与大作文原有进度在 v3 -> v4 迁移后完整保留并补齐 deck 字段', () => {
    const t = new Date('2026-11-23T08:00:00Z');
    const c1 = serializeCard(reviewCard(createInitialCard(t), Rating.Good, t));
    const c2 = serializeCard(reviewCard(createInitialCard(t), Rating.Easy, t));
    delete c1.deck;
    delete c2.deck;

    const migrated = migrateProgressCards({
      'shared.closing': c1,
      'suggest.body1': c2,
      'big.p1.s1': serializeCard(createInitialCard(t)),
      'big.p2.s4': serializeCard(createInitialCard(t)),
    });

    expect(Object.keys(migrated).sort()).toEqual([
      'big.p1.s1',
      'big.p2.s4',
      'shared.closing',
      'suggest.body1',
    ]);
    expect(migrated['shared.closing'].deck).toBe('small');
    expect(migrated['big.p1.s1'].deck).toBe('big');
    expect(migrated['big.p2.s4'].deck).toBe('big');
  });

  it('4. 全部 10 个素材包代入新万能模板后稳落 160–220 词且无残留槽位', () => {
    expect(MATERIAL_PACKS).toHaveLength(10);

    for (const pack of MATERIAL_PACKS) {
      expect(checkPlanVarX(pack.vars.X).ok).toBe(true);
      expect(checkPlanVarBenefit(pack.vars.B1, 'B1').ok).toBe(true);
      expect(checkPlanVarBenefit(pack.vars.B2, 'B2').ok).toBe(true);
      expect(checkPlanVarDO(pack.vars.DO).ok).toBe(true);

      for (const [idx, pic] of pack.picExamples.entries()) {
        const rendered = renderFullBigEssay(
          { ...pack.vars, PIC: pic },
          { includeOptionalP2S4: false, format: 'picture' }
        );
        expect(
          rendered.wordCount,
          `素材包 ${pack.id} 样例 ${idx + 1} 字数 ${rendered.wordCount} 超出范围`
        ).toBeGreaterThanOrEqual(160);
        expect(
          rendered.wordCount,
          `素材包 ${pack.id} 样例 ${idx + 1} 字数 ${rendered.wordCount} 超出范围`
        ).toBeLessThanOrEqual(220);
        expect(rendered.fullText).not.toMatch(/\{\{|\}\}|\[[A-Z0-9_]+\]/);
      }
    }
  });

  it('5. 全部 14 道真题风模拟题（含 2026 双图表、2025 动态表、2024 图文结合、静态占比图）渲染完整且字数合理', () => {
    expect(BIG_PROMPTS).toHaveLength(14);
    expect(BIG_PROMPTS.some((p) => p.format === 'chart' && p.chartKind === 'dual')).toBe(true);
    expect(BIG_PROMPTS.some((p) => p.format === 'hybrid')).toBe(true);
    expect(BIG_PROMPTS.some((p) => p.format === 'chart' && p.chartKind === 'dynamic')).toBe(true);
    expect(BIG_PROMPTS.some((p) => p.format === 'chart' && p.chartKind === 'static')).toBe(true);
    expect(BIG_PROMPTS.filter((p) => p.isNegativeFlip).length).toBeGreaterThanOrEqual(2);

    for (const prompt of BIG_PROMPTS) {
      const pack = MATERIAL_PACK_MAP[prompt.recommendedPackId];
      const fmt = prompt.format ?? 'picture';
      const vars = {
        X: prompt.sampleX ?? pack.vars.X,
        PIC: assemblePicClause(prompt.samplePicParts),
        CHART: prompt.sampleChartParts?.chart ?? 'bar chart',
        TOPIC: prompt.sampleChartParts?.topic ?? 'this field',
        T1: prompt.sampleChartParts?.t1 ?? '2020',
        T2: prompt.sampleChartParts?.t2 ?? '2024',
        COUNT: prompt.sampleChartParts?.count ?? 'four',
        DATA: prompt.sampleChartParts?.data ?? '',
        B1: prompt.sampleB1 ?? pack.vars.B1,
        B2: prompt.sampleB2 ?? pack.vars.B2,
        DO: prompt.sampleDO ?? pack.vars.DO,
      };

      const check = checkPlanSheet(vars, fmt);
      expect(check.grammarPassed, `模拟题 ${prompt.id} 规划校验失败: ${check.hints.join('; ')}`).toBe(
        true
      );

      const rendered = renderFullBigEssay(vars, {
        includeOptionalP2S4: false,
        format: fmt,
        chartKind: prompt.chartKind,
      });
      expect(rendered.paragraphs).toHaveLength(3);
      expect(rendered.wordCount, `${prompt.id} 字数 ${rendered.wordCount}`).toBeGreaterThanOrEqual(165);
      expect(rendered.wordCount, `${prompt.id} 字数 ${rendered.wordCount}`).toBeLessThanOrEqual(220);
      expect(rendered.fullText).not.toMatch(/\{\{|\}\}|\[[A-Z0-9_]+\]/);

      // Alignment grading must achieve >= 95% on all formats (picture / hybrid / dynamic / static / dual)!
      const grade = gradeBigEssayAlignment(rendered.fullText, {
        includeOptionalP2S4: false,
        format: fmt,
        chartKind: prompt.chartKind,
        planVars: vars,
      });
      expect(grade.fixedAccuracy, `${prompt.id} 对齐判分偏低`).toBeGreaterThanOrEqual(0.95);
      expect(grade.missingFragments).toHaveLength(0);
    }
  });

  it('6. 规划卡 X 复数拦截与漏句定位精确生效', () => {
    const res = checkPlanVarX('online courses');
    expect(res.ok).toBe(false);
    expect(res.hint).toMatch(/单数|不可数/);
    expect(checkPlanVarX('online learning').ok).toBe(true);
    expect(checkPlanVarX('physical fitness').ok).toBe(true);
    expect(checkPlanVarX('social progress').ok).toBe(true);

    const baseVars = {
      X: 'family companionship',
      PIC: 'a young man is cooking dinner with his aging parents, resulting in cheerful laughter',
      B1: 'deep emotional warmth',
      B2: 'closer mutual understanding',
      DO: 'bridge generation gaps through patient dialogue',
    };
    const fullEssay = renderFullBigEssay(baseVars, { format: 'picture' });
    expect(fullEssay.wordCount).toBeLessThanOrEqual(215);

    const droppedText = fullEssay.fullText.replace(
      'Individuals, meanwhile, should approach family companionship with a rational mindset, neither ignoring its benefits nor failing to take concrete action.',
      'Individuals, meanwhile, should approach family companionship with a rational mindset.'
    );
    const missingGrade = gradeBigEssayAlignment(droppedText, {
      format: 'picture',
      planVars: baseVars,
    });
    const hit = missingGrade.missingFragments.find((m) => m.sentenceId === 'big.p3.s3');
    expect(hit).toBeDefined();
    expect(hit!.sentenceNumber).toBe(9);

    expect(getBigSentencesForFormat('chart', { chartKind: 'dual' })).toHaveLength(10);
    expect(getBigSentencesForFormat('chart', { chartKind: 'dynamic' })).toHaveLength(10);
    expect(getBigSentencesForFormat('chart', { chartKind: 'static' })).toHaveLength(10);
    expect(getBigSentencesForFormat('hybrid')).toHaveLength(10);

    expect(getBigEssayWordCountStatus(180)).toBe('ok');
    expect(getBigEssayWordCountStatus(155)).toBe('warn');
    expect(getBigEssayWordCountStatus(210)).toBe('warn');
    expect(getBigEssayWordCountStatus(140)).toBe('err');
    expect(getBigEssayWordCountStatus(230)).toBe('err');
  });

  it('7. 随机饼图数据百分比合计严格等于 100%', () => {
    for (let i = 0; i < 20; i++) {
      const pie = generateRandomChart('pie');
      expect(pie.nature).toBe('static');
      const sum = pie.staticData!.reduce((acc, d) => acc + d.value, 0);
      expect(sum).toBe(100);
    }
  });

  it('8. 复习队列交错调度：大作文与小作文卡片混排时交替出现', () => {
    const mixed = interleaveQueue([
      'suggest.body1',
      'suggest.body2',
      'invite.body1',
      'big.p1.s1',
      'big.p1.s2',
      'big.shell.hybrid',
    ]);
    expect(mixed).toHaveLength(6);
    const decks = mixed.map((id) => (id.startsWith('big.') ? 'big' : 'small'));
    for (let i = 1; i < decks.length; i++) {
      expect(decks[i]).not.toBe(decks[i - 1]);
    }
  });
});
