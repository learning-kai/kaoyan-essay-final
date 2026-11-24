/**
 * 图表类大作文（英语二常考，英语一备用）
 * 原文句型积木逐字收录自 大作文.md 第 34–202 行 + 随机图表生成器
 */

export type ChartKind = 'pie' | 'bar' | 'line';
export type ChartNature = 'static' | 'dynamic';

export type StaticFeatureId = 'vary' | 'similar' | 'standout';
export type DynamicTrendId = 'upward' | 'downward' | 'stable' | 'fluctuate' | 'different';

export type DegreeAdverb = 'sharply' | 'slightly' | 'steadily' | 'gradually';

export interface ChartBlockTemplate {
  id: string;
  nature: ChartNature;
  stage: 'intro' | 'overall' | 'detail';
  label: string;
  en: string;
  zh: string;
  note?: string;
}

export const CHART_DEGREE_ADVERBS: {
  word: DegreeAdverb;
  zh: string;
  rule: string;
}[] = [
  { word: 'sharply', zh: '急剧地、大幅度地', rule: '增减幅度 ≥ 45% 时推荐' },
  { word: 'steadily', zh: '平稳地、持续稳定地', rule: '单调连续上升/下降（幅度 20%–44%）时推荐' },
  { word: 'gradually', zh: '逐渐地', rule: '温和渐进变化（幅度 10%–19%）时推荐' },
  { word: 'slightly', zh: '轻微地、小幅度地', rule: '小幅变动（幅度 < 10%）时推荐' },
];

export const STATIC_CHART_BLOCKS: ChartBlockTemplate[] = [
  {
    id: 'st-intro',
    nature: 'static',
    stage: 'intro',
    label: '图表引入（必选）',
    en: 'The {{chartName}} shows {{topic}} across {{count}} categories.',
    zh: '{{chartName}} 展示了 {{topic}} 在 {{count}} 个类别中的情况。',
  },
  {
    id: 'vary',
    nature: 'static',
    stage: 'overall',
    label: '差异明显',
    en: 'Overall, the figures vary noticeably across categories.',
    zh: '总体而言，各类别之间的数据存在明显差异。',
  },
  {
    id: 'similar',
    nature: 'static',
    stage: 'overall',
    label: '相对接近',
    en: 'Overall, the figures are fairly similar across categories.',
    zh: '总体而言，各类别之间的数据相对接近。',
  },
  {
    id: 'standout',
    nature: 'static',
    stage: 'overall',
    label: '一项突出',
    en: 'Overall, {{itemA}} stands out as the largest category.',
    zh: '总体而言，{{itemA}} 最为突出，是占比最大的类别。',
  },
  {
    id: 'st-d1',
    nature: 'static',
    stage: 'detail',
    label: '功能句1：占比最高',
    en: '{{itemA}} accounts for the largest share, at {{val}}%.',
    zh: '{{itemA}} 的占比最高，为 {{val}}%。',
    note: '适用于百分比图表（如饼图）。',
  },
  {
    id: 'st-d2',
    nature: 'static',
    stage: 'detail',
    label: '功能句2：数值最高',
    en: '{{itemA}} records the highest figure, at {{val}}.',
    zh: '{{itemA}} 的数值最高，为 {{val}}。',
    note: '适用于带有具体单位的数据，如 3,000 people。',
  },
  {
    id: 'st-d3',
    nature: 'static',
    stage: 'detail',
    label: '功能句3：次高项 / 排名',
    en: '{{itemB}} and {{itemC}} follow, at {{val1}} and {{val2}}, respectively.',
    zh: '其次是 {{itemB}} 与 {{itemC}}，分别为 {{val1}} 和 {{val2}}。',
  },
  {
    id: 'st-d4',
    nature: 'static',
    stage: 'detail',
    label: '功能句4：占比最低',
    en: 'By contrast, {{itemD}} has the smallest share, at {{val}}%.',
    zh: '相比之下，{{itemD}} 的占比最低，为 {{val}}%。',
  },
  {
    id: 'st-d5',
    nature: 'static',
    stage: 'detail',
    label: '功能句5：数值最低',
    en: 'By contrast, {{itemD}} records the lowest figure, at {{val}}.',
    zh: '相比之下，{{itemD}} 的数值最低，为 {{val}}。',
  },
  {
    id: 'st-d6',
    nature: 'static',
    stage: 'detail',
    label: '功能句6：数值接近',
    en: 'The figures for {{itemA}} and {{itemB}} are close, at {{val1}} and {{val2}}, respectively.',
    zh: '{{itemA}} 和 {{itemB}} 的数据接近，分别为 {{val1}} 和 {{val2}}。',
  },
];

export const DYNAMIC_CHART_BLOCKS: ChartBlockTemplate[] = [
  {
    id: 'dy-intro',
    nature: 'dynamic',
    stage: 'intro',
    label: '图表引入（必选）',
    en: 'The {{chartName}} shows changes in {{topic}} from {{t1}} to {{t2}}.',
    zh: '{{chartName}} 展示了 {{topic}} 从 {{t1}} 到 {{t2}} 的变化。',
  },
  {
    id: 'upward',
    nature: 'dynamic',
    stage: 'overall',
    label: '整体上升',
    en: 'Overall, most indicators showed an upward trend.',
    zh: '总体而言，大多数指标呈现上升趋势。',
  },
  {
    id: 'downward',
    nature: 'dynamic',
    stage: 'overall',
    label: '整体下降',
    en: 'Overall, most indicators showed a downward trend.',
    zh: '总体而言，大多数指标呈现下降趋势。',
  },
  {
    id: 'stable',
    nature: 'dynamic',
    stage: 'overall',
    label: '基本平稳',
    en: 'Overall, the figures remained relatively stable.',
    zh: '总体而言，这些数据基本保持稳定。',
  },
  {
    id: 'fluctuate',
    nature: 'dynamic',
    stage: 'overall',
    label: '明显波动',
    en: 'Overall, the figures fluctuated noticeably.',
    zh: '总体而言，这些数据呈现明显波动。',
  },
  {
    id: 'different',
    nature: 'dynamic',
    stage: 'overall',
    label: '趋势不同',
    en: 'Overall, different indicators showed different trends.',
    zh: '总体而言，不同指标呈现不同的变化趋势。',
  },
  {
    id: 'dy-d1',
    nature: 'dynamic',
    stage: 'detail',
    label: '功能句1：上升 / 下降',
    en: '{{itemA}} rose/fell from {{start}} in {{t1}} to {{end}} in {{t2}}.',
    zh: '{{itemA}} 从 {{t1}} 的 {{start}} 上升/下降至 {{t2}} 的 {{end}}。',
  },
  {
    id: 'dy-d2',
    nature: 'dynamic',
    stage: 'detail',
    label: '功能句2：保持平稳',
    en: '{{itemA}} remained relatively stable at around {{val}} throughout the period.',
    zh: '整个期间，{{itemA}} 基本保持稳定，约为 {{val}}。',
  },
  {
    id: 'dy-d3',
    nature: 'dynamic',
    stage: 'detail',
    label: '功能句3：上下波动',
    en: '{{itemA}} fluctuated between {{min}} and {{max}} during the period.',
    zh: '{{itemA}} 在此期间于 {{min}} 和 {{max}} 之间波动。',
  },
  {
    id: 'dy-d4',
    nature: 'dynamic',
    stage: 'detail',
    label: '功能句4：变化加速 / 减缓',
    en: 'The rise in {{itemA}} accelerated/slowed down after {{time}}.',
    zh: '{{itemA}} 的增长在 {{time}} 后加速/减缓。',
  },
  {
    id: 'dy-d5',
    nature: 'dynamic',
    stage: 'detail',
    label: '功能句5：趋于平稳',
    en: 'After {{time}}, {{itemA}} leveled off at around {{val}}.',
    zh: '在 {{time}} 后，{{itemA}} 在 {{val}} 附近趋于稳定。',
  },
  {
    id: 'dy-d6',
    nature: 'dynamic',
    stage: 'detail',
    label: '功能句6：多项趋势对比',
    en: 'While {{itemA}} rose, {{itemB}} fell and {{itemC}} remained stable.',
    zh: '当 {{itemA}} 上升时，{{itemB}} 下降，而 {{itemC}} 保持稳定。',
  },
];

export interface StaticChartDataPoint {
  name: string;
  value: number;
}

export interface DynamicChartSeries {
  name: string;
  trend: 'up' | 'down' | 'stable' | 'fluctuate';
  values: number[];
}

export interface GeneratedChartProblem {
  id: string;
  kind: ChartKind;
  nature: ChartNature;
  chartNameEn: 'pie chart' | 'bar chart' | 'line chart';
  titleZh: string;
  topicEn: string;
  unit: string; // '%' or 'thousand' etc.
  isPercentage: boolean;
  // Static data
  staticData?: StaticChartDataPoint[];
  // Dynamic data
  years?: string[];
  dynamicData?: Record<string, string | number>[];
  series?: DynamicChartSeries[];
  // Ground truth for selection drill
  expectedOverallId: StaticFeatureId | DynamicTrendId;
  overallReasonZh: string;
  recommendedDetailIds: string[];
  detailReasonZh: string;
  // Ground truth for degree adverb (dynamic only)
  recommendedAdverb?: DegreeAdverb;
  adverbReasonZh?: string;
  // Reference sentences & fill-in-data task
  fillTask: {
    promptZh: string;
    templateParts: (
      | { kind: 'text'; text: string }
      | { kind: 'blank'; id: string; label: string; expected: string }
    )[];
    referenceParagraph: string;
  };
}

const STATIC_THEMES = [
  {
    titleZh: '大学生课余时间分配',
    topicEn: 'how college students spend their spare time',
    categories: ['Reading', 'Sports', 'Online Video', 'Socializing', 'Part-time Work'],
    unitBar: 'hours',
  },
  {
    titleZh: '市民日常通勤方式分布',
    topicEn: 'daily commuting choices among urban residents',
    categories: ['Subway', 'Bus', 'Shared Bike', 'Private Car', 'Walking'],
    unitBar: 'thousand people',
  },
  {
    titleZh: '居民家庭年度消费支出构成',
    topicEn: 'annual household spending',
    categories: ['Food', 'Education', 'Housing', 'Travel', 'Healthcare'],
    unitBar: 'thousand yuan',
  },
  {
    titleZh: '毕业生就业行业意向',
    topicEn: 'career preferences among university graduates',
    categories: ['IT & AI', 'Education', 'Finance', 'Manufacturing', 'Public Service'],
    unitBar: 'graduates',
  },
];

const DYNAMIC_THEMES = [
  {
    titleZh: '居民数字阅读与纸质阅读人数变化',
    topicEn: 'reading habits among residents',
    seriesNames: ['Digital Reading', 'Paper Books', 'Audio Books'],
    unit: 'million',
  },
  {
    titleZh: '新能源汽车与燃油车销量变化',
    topicEn: 'vehicle sales in the domestic market',
    seriesNames: ['EV Sales', 'Fuel Cars', 'Hybrid Cars'],
    unit: 'million',
  },
  {
    titleZh: '城市公园健身与线上健身参与人数',
    topicEn: 'fitness participation across three groups',
    seriesNames: ['Park Running', 'Home Fitness', 'Gym Visits'],
    unit: 'thousand',
  },
];

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function recommendDegreeAdverb(startVal: number, endVal: number): {
  adverb: DegreeAdverb;
  pctChange: number;
  reasonZh: string;
} {
  const base = Math.max(1, Math.abs(startVal));
  const pctChange = Math.round((Math.abs(endVal - startVal) / base) * 100);
  if (pctChange >= 45) {
    return {
      adverb: 'sharply',
      pctChange,
      reasonZh: `变化幅度达 ${pctChange}%（≥ 45%），适合用 sharply（急剧地）。`,
    };
  }
  if (pctChange >= 20) {
    return {
      adverb: 'steadily',
      pctChange,
      reasonZh: `变化幅度为 ${pctChange}%（20%–44%），适合用 steadily（稳步地）。`,
    };
  }
  if (pctChange >= 10) {
    return {
      adverb: 'gradually',
      pctChange,
      reasonZh: `变化幅度为 ${pctChange}%（10%–19%），适合用 gradually（逐渐地）。`,
    };
  }
  return {
    adverb: 'slightly',
    pctChange,
    reasonZh: `变化幅度仅 ${pctChange}%（< 10%），适合用 slightly（轻微地）。`,
  };
}

/**
 * 随机生成合理图表练习题（饼图严格保证合计 === 100%）
 */
export function generateRandomChart(forcedKind?: ChartKind): GeneratedChartProblem {
  const kind: ChartKind = forcedKind ?? pickOne(['pie', 'bar', 'line']);

  if (kind === 'pie') {
    const theme = pickOne(STATIC_THEMES);
    const cats = theme.categories.slice(0, 4);
    const pattern: StaticFeatureId = pickOne(['standout', 'vary', 'similar']);

    let vals: number[];
    if (pattern === 'standout') {
      const top = randInt(46, 56);
      const second = randInt(20, 24);
      const third = randInt(12, 16);
      const fourth = 100 - top - second - third;
      vals = [top, second, third, fourth];
    } else if (pattern === 'similar') {
      const a = randInt(26, 28);
      const b = randInt(25, 26);
      const c = randInt(24, 25);
      const d = 100 - a - b - c;
      vals = [a, b, c, d];
    } else {
      const a = randInt(36, 40);
      const b = randInt(28, 32);
      const c = randInt(18, 22);
      const d = 100 - a - b - c;
      vals = [a, b, c, d];
    }

    const data: StaticChartDataPoint[] = cats.map((name, i) => ({
      name,
      value: vals[i],
    }));
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const top = sorted[0];
    const second = sorted[1];
    const third = sorted[2];
    const bottom = sorted[sorted.length - 1];

    const overallReasonZh =
      pattern === 'standout'
        ? `最大项 ${top.name} 占比 ${top.value}%，遥遥领先于第二项（${second.value}%）→ 选「一项突出」。`
        : pattern === 'similar'
          ? `四项占比在 ${bottom.value}%–${top.value}% 之间，差距极小 → 选「相对接近」。`
          : `各项从 ${bottom.value}% 到 ${top.value}% 梯度明显，且无单项过半垄断 → 选「差异明显」。`;

    const recommendedDetailIds =
      pattern === 'similar' ? ['st-d1', 'st-d6', 'st-d4'] : ['st-d1', 'st-d3', 'st-d4'];
    const detailReasonZh = `饼图为百分比图表，优先用占比最高（功能句1）、次高排名 respectively（功能句3）与占比最低（功能句4）。`;

    const overallEn =
      pattern === 'standout'
        ? `Overall, ${top.name} stands out as the largest category.`
        : pattern === 'similar'
          ? 'Overall, the figures are fairly similar across categories.'
          : 'Overall, the figures vary noticeably across categories.';

    const refParagraph = [
      `The pie chart shows ${theme.topicEn} across ${data.length} categories.`,
      overallEn,
      `${top.name} accounts for the largest share, at ${top.value}%.`,
      `${second.name} and ${third.name} follow, at ${second.value}% and ${third.value}%, respectively.`,
      `By contrast, ${bottom.name} has the smallest share, at ${bottom.value}%.`,
    ].join(' ');

    return {
      id: `chart-pie-${Date.now()}-${Math.random()}`,
      kind: 'pie',
      nature: 'static',
      chartNameEn: 'pie chart',
      titleZh: `${theme.titleZh}（饼图 · 百分比）`,
      topicEn: theme.topicEn,
      unit: '%',
      isPercentage: true,
      staticData: data,
      expectedOverallId: pattern,
      overallReasonZh,
      recommendedDetailIds,
      detailReasonZh,
      fillTask: {
        promptZh: '填入饼图中的最高项、次高两项（注意 respectively 顺序！）与最低项数据（含 % 号）：',
        templateParts: [
          { kind: 'text', text: `${top.name} accounts for the largest share, at ` },
          { kind: 'blank', id: 'b1', label: `${top.name} 占比`, expected: `${top.value}%` },
          { kind: 'text', text: `. ${second.name} and ${third.name} follow, at ` },
          { kind: 'blank', id: 'b2', label: `${second.name} 占比`, expected: `${second.value}%` },
          { kind: 'text', text: ' and ' },
          { kind: 'blank', id: 'b3', label: `${third.name} 占比`, expected: `${third.value}%` },
          { kind: 'text', text: `, respectively. By contrast, ${bottom.name} has the smallest share, at ` },
          { kind: 'blank', id: 'b4', label: `${bottom.name} 占比`, expected: `${bottom.value}%` },
          { kind: 'text', text: '.' },
        ],
        referenceParagraph: refParagraph,
      },
    };
  }

  if (kind === 'bar') {
    const theme = pickOne(STATIC_THEMES);
    const cats = theme.categories.slice(0, 4);
    const pattern: StaticFeatureId = pickOne(['standout', 'vary', 'similar']);

    let vals: number[];
    if (pattern === 'standout') {
      vals = [randInt(82, 96), randInt(44, 52), randInt(30, 38), randInt(14, 22)];
    } else if (pattern === 'similar') {
      const base = randInt(48, 56);
      vals = [base + 3, base + 1, base - 1, base - 2];
    } else {
      vals = [randInt(74, 84), randInt(58, 66), randInt(36, 44), randInt(16, 24)];
    }

    const data: StaticChartDataPoint[] = cats.map((name, i) => ({
      name,
      value: vals[i],
    }));
    const sorted = [...data].sort((a, b) => b.value - a.value);
    const top = sorted[0];
    const second = sorted[1];
    const third = sorted[2];
    const bottom = sorted[sorted.length - 1];
    const unit = theme.unitBar;

    const overallReasonZh =
      pattern === 'standout'
        ? `${top.name} 达到 ${top.value} ${unit}，明显高于其余三项 → 选「一项突出」。`
        : pattern === 'similar'
          ? `各类数值集中在 ${bottom.value}–${top.value} ${unit}，十分接近 → 选「相对接近」。`
          : `各类数值分布在 ${bottom.value} 到 ${top.value} ${unit} 之间，高低差异清晰 → 选「差异明显」。`;

    const recommendedDetailIds =
      pattern === 'similar' ? ['st-d2', 'st-d6', 'st-d5'] : ['st-d2', 'st-d3', 'st-d5'];
    const detailReasonZh = `柱状图带具体单位（${unit}），选用数值最高（功能句2）、次高排名（功能句3）与数值最低（功能句5）。`;

    const overallEn =
      pattern === 'standout'
        ? `Overall, ${top.name} stands out as the largest category.`
        : pattern === 'similar'
          ? 'Overall, the figures are fairly similar across categories.'
          : 'Overall, the figures vary noticeably across categories.';

    const refParagraph = [
      `The bar chart shows ${theme.topicEn} across ${data.length} categories.`,
      overallEn,
      `${top.name} records the highest figure, at ${top.value} ${unit}.`,
      `${second.name} and ${third.name} follow, at ${second.value} ${unit} and ${third.value} ${unit}, respectively.`,
      `By contrast, ${bottom.name} records the lowest figure, at ${bottom.value} ${unit}.`,
    ].join(' ');

    return {
      id: `chart-bar-${Date.now()}-${Math.random()}`,
      kind: 'bar',
      nature: 'static',
      chartNameEn: 'bar chart',
      titleZh: `${theme.titleZh}（柱状图 · 单位：${unit}）`,
      topicEn: theme.topicEn,
      unit,
      isPercentage: false,
      staticData: data,
      expectedOverallId: pattern,
      overallReasonZh,
      recommendedDetailIds,
      detailReasonZh,
      fillTask: {
        promptZh: `填入柱状图对应数值（纯数字即可，单位 ${unit} 已附在句中）：`,
        templateParts: [
          { kind: 'text', text: `${top.name} records the highest figure, at ` },
          { kind: 'blank', id: 'b1', label: `${top.name} 数值`, expected: String(top.value) },
          { kind: 'text', text: ` ${unit}. ${second.name} and ${third.name} follow, at ` },
          { kind: 'blank', id: 'b2', label: `${second.name} 数值`, expected: String(second.value) },
          { kind: 'text', text: ` ${unit} and ` },
          { kind: 'blank', id: 'b3', label: `${third.name} 数值`, expected: String(third.value) },
          { kind: 'text', text: ` ${unit}, respectively. By contrast, ${bottom.name} records the lowest figure, at ` },
          { kind: 'blank', id: 'b4', label: `${bottom.name} 数值`, expected: String(bottom.value) },
          { kind: 'text', text: ` ${unit}.` },
        ],
        referenceParagraph: refParagraph,
      },
    };
  }

  // Dynamic Line Chart
  const theme = pickOne(DYNAMIC_THEMES);
  const startYear = pickOne([2019, 2020, 2021]);
  const years = [0, 1, 2, 3, 4].map((d) => String(startYear + d));
  const pattern: DynamicTrendId = pickOne(['upward', 'downward', 'fluctuate', 'different']);

  let series: DynamicChartSeries[];
  if (pattern === 'upward') {
    const s1 = [randInt(20, 30), 38, 49, 62, randInt(72, 85)];
    const s2 = [randInt(15, 22), 26, 31, 36, randInt(40, 46)];
    series = [
      { name: theme.seriesNames[0], trend: 'up', values: s1 },
      { name: theme.seriesNames[1], trend: 'up', values: s2 },
    ];
  } else if (pattern === 'downward') {
    const s1 = [randInt(78, 88), 68, 56, 44, randInt(28, 36)];
    const s2 = [randInt(54, 62), 48, 43, 38, randInt(30, 35)];
    series = [
      { name: theme.seriesNames[0], trend: 'down', values: s1 },
      { name: theme.seriesNames[1], trend: 'down', values: s2 },
    ];
  } else if (pattern === 'fluctuate') {
    const s1 = [42, 68, 35, 74, 48];
    series = [{ name: theme.seriesNames[0], trend: 'fluctuate', values: s1 }];
  } else {
    const s1 = [24, 34, 48, 60, 74]; // rose sharply
    const s2 = [68, 60, 52, 43, 34]; // fell
    const s3 = [30, 31, 30, 32, 31]; // stable
    series = [
      { name: theme.seriesNames[0], trend: 'up', values: s1 },
      { name: theme.seriesNames[1], trend: 'down', values: s2 },
      { name: theme.seriesNames[2], trend: 'stable', values: s3 },
    ];
  }

  const dynamicData = years.map((yr, idx) => {
    const row: Record<string, string | number> = { year: yr };
    for (const s of series) {
      row[s.name] = s.values[idx];
    }
    return row;
  });

  const mainS = series[0];
  const t1 = years[0];
  const t2 = years[years.length - 1];
  const startV = mainS.values[0];
  const endV = mainS.values[mainS.values.length - 1];
  const minV = Math.min(...mainS.values);
  const maxV = Math.max(...mainS.values);
  const advInfo = recommendDegreeAdverb(startV, endV);
  const verb = endV >= startV ? 'rose' : 'fell';

  const overallReasonZh =
    pattern === 'upward'
      ? `图中各项指标在 ${t1}–${t2} 期间均持续走高 → 选「整体上升」。`
      : pattern === 'downward'
        ? `图中各项指标在 ${t1}–${t2} 期间均明显回落 → 选「整体下降」。`
        : pattern === 'fluctuate'
          ? `曲线在 ${minV} 与 ${maxV} 之间反复起伏 → 选「明显波动」。`
          : `三项指标分别呈现上升、下降与保持平稳，方向各异 → 选「趋势不同」。`;

  const recommendedDetailIds =
    pattern === 'fluctuate'
      ? ['dy-d3']
      : pattern === 'different'
        ? ['dy-d6', 'dy-d1', 'dy-d2']
        : ['dy-d1'];

  const detailReasonZh =
    pattern === 'fluctuate'
      ? '波动型动态图优先用「上下波动」（功能句3）交代最低值与最高值。'
      : pattern === 'different'
        ? '多线分化先用「多项趋势对比」（功能句6）总起，再补充「上升/下降」（功能句1）和「保持平稳」（功能句2）。'
        : '单调变化优先用「上升/下降」（功能句1）交代起点值、终点值与年份，并搭配程度副词。';

  const overallEn =
    pattern === 'upward'
      ? 'Overall, most indicators showed an upward trend.'
      : pattern === 'downward'
        ? 'Overall, most indicators showed a downward trend.'
        : pattern === 'fluctuate'
          ? 'Overall, the figures fluctuated noticeably.'
          : 'Overall, different indicators showed different trends.';

  const detailSentence =
    pattern === 'fluctuate'
      ? `${mainS.name} fluctuated between ${minV} ${theme.unit} and ${maxV} ${theme.unit} during the period.`
      : `${mainS.name} ${verb} ${advInfo.adverb} from ${startV} ${theme.unit} in ${t1} to ${endV} ${theme.unit} in ${t2}.`;

  const contrastLine =
    pattern === 'different'
      ? ` While ${series[0].name} rose, ${series[1].name} fell and ${series[2].name} remained stable.`
      : '';

  const refParagraph = `The line chart shows changes in ${theme.topicEn} from ${t1} to ${t2}. ${overallEn}${contrastLine} ${detailSentence}`;

  const fillTask =
    pattern === 'fluctuate'
      ? {
          promptZh: `填入 ${mainS.name} 的最低值与最高值（单位：${theme.unit}）：`,
          templateParts: [
            { kind: 'text' as const, text: `${mainS.name} fluctuated between ` },
            { kind: 'blank' as const, id: 'b1', label: '最低值', expected: String(minV) },
            { kind: 'text' as const, text: ` ${theme.unit} and ` },
            { kind: 'blank' as const, id: 'b2', label: '最高值', expected: String(maxV) },
            { kind: 'text' as const, text: ` ${theme.unit} during the period.` },
          ],
          referenceParagraph: refParagraph,
        }
      : {
          promptZh: `填入 ${mainS.name} 的起止年份与对应数值（单位：${theme.unit}）：`,
          templateParts: [
            { kind: 'text' as const, text: `${mainS.name} ${verb} ${advInfo.adverb} from ` },
            { kind: 'blank' as const, id: 'b1', label: '起点值', expected: String(startV) },
            { kind: 'text' as const, text: ` ${theme.unit} in ` },
            { kind: 'blank' as const, id: 'b2', label: '起始年份', expected: t1 },
            { kind: 'text' as const, text: ' to ' },
            { kind: 'blank' as const, id: 'b3', label: '终点值', expected: String(endV) },
            { kind: 'text' as const, text: ` ${theme.unit} in ` },
            { kind: 'blank' as const, id: 'b4', label: '结束年份', expected: t2 },
            { kind: 'text' as const, text: '.' },
          ],
          referenceParagraph: refParagraph,
        };

  return {
    id: `chart-line-${Date.now()}-${Math.random()}`,
    kind: 'line',
    nature: 'dynamic',
    chartNameEn: 'line chart',
    titleZh: `${theme.titleZh}（折线图 · ${t1}–${t2}，单位：${theme.unit}）`,
    topicEn: theme.topicEn,
    unit: theme.unit,
    isPercentage: false,
    years,
    dynamicData,
    series,
    expectedOverallId: pattern,
    overallReasonZh,
    recommendedDetailIds,
    detailReasonZh,
    recommendedAdverb: pattern === 'fluctuate' ? undefined : advInfo.adverb,
    adverbReasonZh: pattern === 'fluctuate' ? undefined : advInfo.reasonZh,
    fillTask,
  };
}
