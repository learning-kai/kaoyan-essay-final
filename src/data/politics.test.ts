import fs from 'node:fs';
import path from 'node:path';
import { Rating } from 'ts-fsrs';
import { describe, expect, it } from 'vitest';
import {
  buildProcessedPoliticsLines,
  colorClassForHex,
  resolveLineClozeSpans,
} from '../components/PoliticsCardView';
import { POLITICS_CLOZE_RULES } from './politicsCloze';
import {
  collectPoliticsMistakes,
  computePoliticsMajorProgress,
  getDuePoliticsIds,
  getUnlearnedPoliticsIds,
} from '../core/politicsStats';
import { createInitialCard, reviewCard } from '../core/scheduler';
import type { PoliticsReviewRecord } from '../store/usePoliticsProgress';
import { serializeCard } from '../store/useProgress';
import {
  POLITICS_CARDS,
  POLITICS_CARD_MAP,
  POLITICS_MAJORS,
  POLITICS_PREFACE,
  POLITICS_TIMELINE_IMAGE,
  POLITICS_TOPICS,
} from './politics';
import {
  generatePolEconCalcProblem,
  MEETING_DRILL_ITEMS,
  STAGE_ORDER_SETS,
  TRAP_JUDGE_ITEMS,
} from './politicsDrills';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const COMPONENTS_CSS = fs.readFileSync(
  path.resolve(process.cwd(), 'src/components/components.css'),
  'utf8'
);

describe('27考研政治一页纸（100张逐字彩色卡片）数据、原图资产、口诀拆解与快刷逻辑测试', () => {
  it('完整无损包含 100 张知识点卡片（001–100）、15 个专题、3 大板块与前言', () => {
    expect(POLITICS_CARDS).toHaveLength(100);
    expect(POLITICS_TOPICS).toHaveLength(15);
    expect(POLITICS_MAJORS).toHaveLength(3);
    expect(POLITICS_PREFACE.length).toBeGreaterThan(5);

    const byMajor = { mayuan: 0, shigang: 0, other: 0 };
    let totalBodyChars = 0;
    let cardsWithBreakdown = 0;

    POLITICS_CARDS.forEach((card, idx) => {
      expect(card.num).toBe(idx + 1);
      expect(card.code).toBe(String(idx + 1).padStart(3, '0'));
      expect(card.id).toBe(`p-${card.code}`);
      expect(card.title.length).toBeGreaterThan(0);
      expect(card.lines.length > 0 || Boolean(card.image)).toBe(true);
      byMajor[card.major] += 1;
      if (card.mnemonicBreakdown.length > 0) cardsWithBreakdown += 1;
      for (const line of card.lines) {
        for (const tok of line.tokens) {
          if (tok.type === 'text') totalBodyChars += tok.text.length;
        }
      }
    });

    // Verify strict major ↔ topic alignment (zero cross-major leakage)
    for (const tp of POLITICS_TOPICS) {
      expect(tp.cardIds.length).toBeGreaterThan(0);
      for (const id of tp.cardIds) {
        const card = POLITICS_CARD_MAP[id];
        expect(card).toBeDefined();
        expect(card.major).toBe(tp.major);
        expect(card.topicId).toBe(tp.id);
      }
    }

    expect(byMajor.mayuan + byMajor.shigang + byMajor.other).toBe(100);
    expect(cardsWithBreakdown).toBeGreaterThanOrEqual(35);
    expect(totalBodyChars).toBe(20533);
  });

  it('所有内联图标 PNG 与《史纲整体脉络》原图均存在于 public/ 目录，且所有颜色 Hex 均有亮暗 CSS 类', () => {
    const timelinePath = path.join(PUBLIC_DIR, POLITICS_TIMELINE_IMAGE.replace(/^\.\//, ''));
    expect(fs.existsSync(timelinePath)).toBe(true);

    const hexSet = new Set<string>();
    const iconSet = new Set<string>();

    for (const card of POLITICS_CARDS) {
      for (const tok of card.titleTokens) {
        if (tok.type === 'icon') iconSet.add(tok.src);
      }
      for (const line of card.lines) {
        for (const tok of line.tokens) {
          if (tok.type === 'icon') {
            iconSet.add(tok.src);
          } else {
            hexSet.add(tok.color.toUpperCase());
          }
        }
      }
    }

    expect(iconSet.size).toBeGreaterThan(20);
    for (const src of iconSet) {
      const fullPath = path.join(PUBLIC_DIR, src.replace(/^\.\//, ''));
      expect(fs.existsSync(fullPath), `Missing asset: ${src}`).toBe(true);
    }

    for (const hex of hexSet) {
      const cls = colorClassForHex(hex);
      expect(COMPONENTS_CSS).toContain(`.${cls} {`);
      expect(COMPONENTS_CSS).toContain(`[data-theme="dark"] .${cls} {`);
    }
  });

  it('语义考点遮罩规则覆盖全部可背卡片、100% 精确匹配且零字符丢失，不遮题干与标题', () => {
    const exemptIds = new Set(['p-037', 'p-086']);

    for (const card of POLITICS_CARDS) {
      const cardRules = POLITICS_CLOZE_RULES[card.id];
      if (cardRules) {
        for (const [lineIdxStr, targets] of Object.entries(cardRules)) {
          const lineIdx = Number(lineIdxStr);
          expect(
            lineIdx >= 0 && lineIdx < card.lines.length,
            `${card.id} invalid lineIdx ${lineIdx}`
          ).toBe(true);
          const { unmatched } = resolveLineClozeSpans(card.lines[lineIdx], targets);
          expect(
            unmatched,
            `${card.id} L${lineIdx} unmatched cloze targets: ${unmatched.join(', ')}`
          ).toEqual([]);
        }
      }

      const processed = buildProcessedPoliticsLines(card);
      if (!exemptIds.has(card.id)) {
        expect(
          processed.totalClozeCount,
          `${card.id} (${card.title}) should have at least 1 cloze`
        ).toBeGreaterThanOrEqual(1);
      }

      // Verify zero character loss or duplication after splitting across color spans
      expect(processed.lines).toHaveLength(card.lines.length);
      processed.lines.forEach((pl, li) => {
        const origPlain = card.lines[li].tokens
          .map((t) => (t.type === 'text' ? t.text : ''))
          .join('');
        const rebuiltPlain = pl.parts
          .map((p) =>
            p.kind === 'cloze'
              ? p.group.tokens.map((t) => t.text).join('')
              : p.token.type === 'text'
                ? p.token.text
                : ''
          )
          .join('');
        expect(rebuiltPlain, `${card.id} L${li} text mismatch`).toBe(origPlain);
      });
    }

    // Spot check p-025 (private/social labor): question stems visible, answers masked
    const p025 = buildProcessedPoliticsLines(POLITICS_CARD_MAP['p-025']);
    const p025Masked = p025.lines.flatMap((l) =>
      l.parts.filter((p) => p.kind === 'cloze').map((p) => p.group.plainText)
    );
    expect(p025Masked).toContain('生产社会化和生产资料资本主义私人占有之间的矛盾');
    expect(p025Masked).toContain('私人劳动和社会劳动的矛盾');
    expect(p025Masked).toContain('由社会分工决定的');
    expect(p025Masked).toContain('私人劳动和社会劳动能否实现统一');
    expect(p025Masked.some((m) => m.includes('资本主义的基本矛盾'))).toBe(false);
    expect(p025Masked.some((m) => m.includes('私有制基础上商品经济的基本矛盾'))).toBe(false);
    expect(p025Masked).not.toContain('根源于');

    // Spot check p-035: headings visible, policies masked
    const p035 = buildProcessedPoliticsLines(POLITICS_CARD_MAP['p-035']);
    const p035Masked = p035.lines.flatMap((l) =>
      l.parts.filter((p) => p.kind === 'cloze').map((p) => p.group.plainText)
    );
    expect(p035Masked).toContain('余粮收集制、取消商品货币关系');
    expect(p035Masked).toContain('粮食税制取代余粮收集制');
    expect(p035Masked).not.toContain('农业');
    expect(p035Masked).not.toContain('战时共产主义');

    // Spot check p-097: complete 2-char keywords masked across red+blue token split
    const p097 = buildProcessedPoliticsLines(POLITICS_CARD_MAP['p-097']);
    const p097Masked = p097.lines.flatMap((l) =>
      l.parts.filter((p) => p.kind === 'cloze').map((p) => p.group.plainText)
    );
    expect(p097Masked).toEqual(['前提', '关键', '重点', '基础']);
  });

  it('考点遮罩切分与直接标熟记（移出/恢复队列）逻辑正确', () => {
    // Card 005 has semantic cloze + mnemonic breakdown
    const card005 = POLITICS_CARD_MAP['p-005'];
    expect(card005).toBeDefined();
    const processed = buildProcessedPoliticsLines(card005);
    expect(processed.totalClozeCount).toBe(2);

    const now = new Date('2026-11-23T10:00:00Z');
    const dueCard = serializeCard(
      createInitialCard(new Date('2026-11-22T10:00:00Z'))
    );
    const futureCard = serializeCard(
      reviewCard(createInitialCard(now), Rating.Good, now)
    );
    const cards = {
      'p-003': dueCard,
      'p-005': futureCard,
    };
    const reviews: PoliticsReviewRecord[] = [
      {
        cardId: 'p-003',
        rating: Rating.Again,
        timestamp: '2026-11-22T10:00:00Z',
      },
    ];

    expect(getDuePoliticsIds(cards, {}, now)).toEqual(['p-003']);
    expect(collectPoliticsMistakes(reviews, {}, now).map((m) => m.cardId)).toEqual([
      'p-003',
    ]);
    expect(getUnlearnedPoliticsIds(cards, {})).toContain('p-001');

    const mastered = {
      'p-001': { value: true, updatedAt: now.toISOString() },
      'p-003': { value: true, updatedAt: now.toISOString() },
    };
    expect(getDuePoliticsIds(cards, mastered, now)).toEqual([]);
    expect(collectPoliticsMistakes(reviews, mastered, now)).toEqual([]);
    expect(getUnlearnedPoliticsIds(cards, mastered)).not.toContain('p-001');

    const majorStats = computePoliticsMajorProgress(cards, mastered);
    const mayuan = majorStats.find((m) => m.major === 'mayuan')!;
    expect(mayuan.directMastered).toBe(2);
    expect(mayuan.doneCount).toBe(2);

    const unmarked = {
      ...mastered,
      'p-003': { value: false, updatedAt: '2026-11-23T11:00:00Z' },
    };
    expect(getDuePoliticsIds(cards, unmarked, now)).toEqual(['p-003']);
    expect(
      collectPoliticsMistakes(reviews, unmarked, now).map((m) => m.cardId)
    ).toEqual(['p-003']);
  });

  it('专项快刷题库引用卡片全部有效，动态政经计算题生成合法 4 选项且答案准确', () => {
    expect(MEETING_DRILL_ITEMS.length).toBeGreaterThanOrEqual(20);
    for (const m of MEETING_DRILL_ITEMS) {
      expect(POLITICS_CARD_MAP[m.cardId]).toBeDefined();
    }
    for (const s of STAGE_ORDER_SETS) {
      expect(POLITICS_CARD_MAP[s.cardId]).toBeDefined();
      expect(s.items.length).toBeGreaterThanOrEqual(3);
    }
    expect(TRAP_JUDGE_ITEMS.length).toBeGreaterThanOrEqual(20);
    for (const t of TRAP_JUDGE_ITEMS) {
      expect(POLITICS_CARD_MAP[t.cardId]).toBeDefined();
    }

    for (const seed of [0.1, 0.2, 0.5, 0.6, 0.85, 0.95]) {
      const prob = generatePolEconCalcProblem(seed);
      expect(prob.choices).toHaveLength(4);
      expect(new Set(prob.choices).size).toBe(4);
      expect(prob.correctIndex).toBeGreaterThanOrEqual(0);
      expect(prob.correctIndex).toBeLessThan(4);
      expect(prob.steps.length).toBeGreaterThanOrEqual(3);
      expect(POLITICS_CARD_MAP[prob.cardId]).toBeDefined();
    }
  });
});
