import type { Deck, Sentence } from './types';

export type BigVarPOS = 'noun' | 'verb' | 'clause' | 'adj';
export type BigFormatMode = 'picture' | 'chart' | 'hybrid';

export interface PlanVar {
  id: string;
  label: string;
  pos: BigVarPOS;
  required: boolean;
  defaultValue?: string;
  rule?: string;
  placeholder?: string;
}

export interface BigSentence {
  id: string;
  deck: Deck;
  paragraph: 1 | 2 | 3;
  order: number;
  role: string;
  en: string;
  zh: string;
  cue: string;
  optional?: boolean;
  isFormatShell?: boolean;
  formatTag?: BigFormatMode;
  note?: string;
  smallEssayLink?: string;
}

export interface FallbackSet {
  id: string;
  category: string;
  desc: string;
  triggers: string[];
  B1: string;
  B2: string;
  DO: string;
}

export interface NegativeFlipItem {
  id: string;
  negativeZh: string;
  negativeHint: string;
  positiveX: string;
  positiveZh: string;
  fallbackId: string;
}

export interface MaterialPack {
  id: string;
  theme: string;
  triggers: string[];
  vars: Record<string, string>;
  picExamples: [string, string];
}

export interface BigPrompt {
  id: string;
  title: string;
  format?: BigFormatMode;
  chartKind?: 'dynamic' | 'static' | 'dual';
  isNegativeFlip?: boolean;
  negativeFlipTip?: string;
  pictureDescZh: string;
  requirementsZh: string;
  keywords: string[];
  recommendedPackId: string;
  recommendedFallbackId?: string;
  sampleX?: string;
  sampleB1?: string;
  sampleB2?: string;
  sampleDO?: string;
  samplePicParts: {
    subject: string;
    action: string;
    contrast?: string;
    result?: string;
  };
  sampleChartParts?: {
    chart: string;
    topic: string;
    t1?: string;
    t2?: string;
    count?: string;
    data: string;
  };
}

export interface BigLesson {
  id: number;
  dayTag: string;
  title: string;
  subtitle: string;
  kind: 'sentences' | 'order' | 'transfer' | 'chart';
  paragraph?: 1 | 2 | 3;
  sentenceIds?: string[];
  optional?: boolean;
  badge?: string;
}

export const BIG_LOGIC_CHAIN = {
  overall: ['描述（3选1外壳）', '论证（3句固定）', '建议（4句固定）'],
  paragraphs: [
    {
      paragraph: 1 as const,
      roleLabel: '描述',
      title: '第一段 · 画面/数据与引出',
      nodes: ['画面或图表', '揭示主题 X', '积极意义（纯图画）'],
    },
    {
      paragraph: 2 as const,
      roleLabel: '论证',
      title: '第二段 · 价值与意义',
      nodes: ['两个好处 B1/B2', '日益关键 + 能做什么 DO', '回应真实需求'],
    },
    {
      paragraph: 3 as const,
      roleLabel: '建议',
      title: '第三段 · 践行与收尾',
      nodes: ['不在形式而在践行', '社会支持营造环境', '个人理性付诸行动', '只有这样（倒装）'],
    },
  ],
};

/**
 * 仅保留 5 个考场核心空位（X / PIC / B1 / B2 / DO）+ 图表壳槽位（CHART / TOPIC / T1 / T2 / COUNT / DATA）
 * 其余历史局部槽位保留在表尾供旧数据/自定义渲染兜底。
 */
export const PLAN_VARS: PlanVar[] = [
  {
    id: 'X',
    label: '主题词',
    pos: 'noun',
    required: true,
    rule: '单数或不可数正面名词短语（保证全文 its / has 一致；负面漫画走“负题正转”）',
    placeholder: '如 traditional culture / public green space / rational smartphone use',
  },
  {
    id: 'PIC',
    label: '画面描述',
    pos: 'clause',
    required: true,
    rule: '主体 + 正在做的动作（可选 while 对比 / resulting in 结果）',
    placeholder: '如 an old craftsman is teaching children to make paper-cuttings',
  },
  {
    id: 'B1',
    label: '好处一',
    pos: 'noun',
    required: true,
    rule: '名词短语（≤ 6 词；卡壳直接点上方 3 组万金油兜底词）',
    placeholder: '如 steady personal growth / deeper spiritual enrichment',
  },
  {
    id: 'B2',
    label: '好处二',
    pos: 'noun',
    required: true,
    rule: '名词短语（≤ 6 词；与 B1 并列）',
    placeholder: '如 greater social harmony / higher working efficiency',
  },
  {
    id: 'DO',
    label: '人们能做什么',
    pos: 'verb',
    required: true,
    rule: '动词原形开头（前接 enabling people to）',
    placeholder: '如 enjoy a smarter and easier modern life',
  },
  {
    id: 'CHART',
    label: '图表类型',
    pos: 'noun',
    required: false,
    defaultValue: 'bar chart',
    rule: 'bar chart / line chart / pie chart / table',
  },
  {
    id: 'TOPIC',
    label: '图表主题',
    pos: 'noun',
    required: false,
    defaultValue: 'this field',
    rule: '抄写图表标题核心名词短语',
  },
  {
    id: 'T1',
    label: '起始年份',
    pos: 'noun',
    required: false,
    defaultValue: '2020',
  },
  {
    id: 'T2',
    label: '结束年份',
    pos: 'noun',
    required: false,
    defaultValue: '2024',
  },
  {
    id: 'COUNT',
    label: '类别数量',
    pos: 'noun',
    required: false,
    defaultValue: 'four',
  },
  {
    id: 'DATA',
    label: '核心数据句',
    pos: 'clause',
    required: false,
    defaultValue: 'the figure rose steadily from 40% to 75%',
    rule: '一句写出最显著的上升/下降或最高占比即可',
  },
  /* 兼容历史变量的默认值（已固化进正文，不再要求考场填写） */
  {
    id: 'G',
    label: '受益群体',
    pos: 'noun',
    required: false,
    defaultValue: 'people',
  },
  {
    id: 'LIMIT',
    label: '过去限制因素',
    pos: 'noun',
    required: false,
    defaultValue: 'past limitations',
  },
  {
    id: 'OLD',
    label: '过去状态',
    pos: 'adj',
    required: false,
    defaultValue: 'overlooked',
  },
  {
    id: 'NEW',
    label: '现在状态',
    pos: 'adj',
    required: false,
    defaultValue: 'valued',
  },
  {
    id: 'R1',
    label: '反映维度一',
    pos: 'noun',
    required: false,
    defaultValue: 'social progress',
  },
  {
    id: 'R2',
    label: '反映维度二',
    pos: 'noun',
    required: false,
    defaultValue: "people's growing pursuit of a better life",
  },
];

export const PLAN_VAR_MAP: Record<string, PlanVar> = Object.fromEntries(
  PLAN_VARS.map((v) => [v.id, v])
);

export const OLD_NEW_PRESETS: { oldVal: string; newVal: string; zh: string }[] = [
  { oldVal: 'overlooked', newVal: 'valued', zh: '被忽视 → 受重视（真·万能默认）' },
  { oldVal: 'inaccessible', newVal: 'accessible', zh: '难以接触 → 触手可及（科技/资源）' },
  { oldVal: 'costly', newVal: 'affordable', zh: '昂贵 → 负担得起（消费/家电）' },
  { oldVal: 'rare', newVal: 'widespread', zh: '稀缺 → 普及流行（文化/生活）' },
];

/**
 * 考场 3 组「万金油兜底词」：B1 / B2 / DO 实在想不出时 2 秒照抄，拼写零风险
 */
export const UNIVERSAL_FALLBACK_SETS: FallbackSet[] = [
  {
    id: 'growth',
    category: '个人成长 / 习惯 / 学习 / 运动',
    desc: '适用：拖延/及时行动、坚持、读书、选课、讲座、锻炼、独立成长',
    triggers: ['学习', '读书', '坚持', '运动', '健康', '成长', '时间', '自律', '习惯', '拖延'],
    B1: 'steady personal growth',
    B2: 'a stronger sense of fulfillment',
    DO: 'manage daily tasks and challenges with greater confidence',
  },
  {
    id: 'tech',
    category: '科技 / 民生消费 / 家电 / 养老',
    desc: '适用：AI、家电普及、养老机器人、手机网络、线上服务、消费升级',
    triggers: ['AI', '科技', '智能', '家电', '养老', '机器人', '网络', '手机', '消费', '数字'],
    B1: 'greater daily convenience',
    B2: 'a higher quality of life',
    DO: 'enjoy a more comfortable and efficient life',
  },
  {
    id: 'society',
    category: '文化 / 环保 / 公园 / 家庭 / 公益',
    desc: '适用：传统文化、绿色环保、社区公园、家庭陪伴、志愿服务、社会和谐',
    triggers: ['文化', '非遗', '环保', '公园', '家庭', '父母', '志愿', '公益'],
    B1: 'deeper spiritual enrichment',
    B2: 'greater social harmony',
    DO: 'build a warmer and more sustainable community',
  },
];

/**
 * 6 类高频负面漫画「负题正转」速查表：不用背第二套负面模板，3 秒转正面 X 直接套！
 */
export const NEGATIVE_FLIP_TABLE: NegativeFlipItem[] = [
  {
    id: 'nf-phone',
    negativeZh: '低头沉迷 / 手机依赖 / 疏离交流',
    negativeHint: '餐桌玩手机、刷短视频成瘾、只顾看屏幕',
    positiveX: 'rational smartphone use',
    positiveZh: '理性使用手机',
    fallbackId: 'tech',
  },
  {
    id: 'nf-quit',
    negativeZh: '半途而废 / 缺乏毅力 / 畏难退缩',
    negativeHint: '登山折返、挖井差一步放弃、遇到困难就退',
    positiveX: 'persistent effort',
    positiveZh: '坚持不懈的努力',
    fallbackId: 'growth',
  },
  {
    id: 'nf-spoil',
    negativeZh: '温室花朵 / 过度溺爱 / 缺乏独立',
    negativeHint: '父母包办一切、孩子像温室盆栽经不起风雨',
    positiveX: 'independent growth',
    positiveZh: '独立成长',
    fallbackId: 'growth',
  },
  {
    id: 'nf-anxiety',
    negativeZh: '焦虑内卷 / 过度竞争 / 忽视健康',
    negativeHint: '熬夜加班、身心疲惫、一味内耗忽略生活',
    positiveX: 'a balanced lifestyle',
    positiveZh: '平衡的生活方式',
    fallbackId: 'growth',
  },
  {
    id: 'nf-rush',
    negativeZh: '拖延症 / 急功近利 / 浮躁捷径',
    negativeHint: '临阵磨枪拖延交作业、拔苗助长、只求速成',
    positiveX: 'timely action',
    positiveZh: '及时行动 / 脚踏实地',
    fallbackId: 'growth',
  },
  {
    id: 'nf-blind',
    negativeZh: '盲目跟风 / 缺乏主见 / 只重形式',
    negativeHint: '光买书不读书、随大流、选课只图轻松',
    positiveX: 'independent thinking',
    positiveZh: '独立思考',
    fallbackId: 'society',
  },
];

/**
 * 真·万能固定骨架（核心 10 句 + 可选兼容句 P2.S4；保留全部原有 ID，零进度丢失）
 * 22 个变量已彻底瘦身为仅填 5 个考场空位（X / PIC / B1 / B2 / DO），其余 100% 固定死抄。
 * 经 2017–2026 近十年考研英语一全真题实测：个人习惯、文化社会、民生图表、科技双图全不跑题。
 */
export const BIG_SENTENCES: BigSentence[] = [
  {
    id: 'big.p1.s1',
    deck: 'big',
    paragraph: 1,
    order: 1,
    role: '描述',
    en: 'The picture presents a vivid scene in which {{PIC}}.',
    zh: '图画呈现了一个生动的场景：{{PIC}}。',
    cue: 'The picture presents a vivid scene',
    note: 'PIC 写法：「主体 + 动作/状态」，双图对比用 , while + 对比，单图结果用 , resulting in + 结果。',
  },
  {
    id: 'big.p1.s2',
    deck: 'big',
    paragraph: 1,
    order: 2,
    role: '揭示',
    en: 'The deeper issue revealed by the drawing lies in the value and impact of {{X}} in modern society.',
    zh: '图画所揭示的深层问题，在于{{X}}在现代社会中的价值与影响。',
    cue: 'The deeper issue revealed by the drawing',
    note: '纯图表题把 the drawing 换成 the chart（双图用 the charts）；图文结合换成 both the picture and the chart。',
  },
  {
    id: 'big.p1.s3',
    deck: 'big',
    paragraph: 1,
    order: 3,
    role: '意义',
    en: 'When its positive potential is properly realized, {{X}} can exert a profound and lasting influence on both personal growth and social development.',
    zh: '当它的积极潜力得到恰当发挥时，{{X}}能够对个人成长和社会发展产生深远而持久的影响。',
    cue: 'When its positive potential is properly realized',
    note: '纯图画必写；纯图表或图文结合时第一段已有数据句，自动省略本句（词数稳落 185–205）。',
  },
  {
    id: 'big.p2.s1',
    deck: 'big',
    paragraph: 2,
    order: 4,
    role: '好处',
    en: '{{X}} brings people not only {{B1}} but also {{B2}}.',
    zh: '{{X}}给人们带来的不仅是{{B1}}，还有{{B2}}。',
    cue: '… brings people not only … but also',
  },
  {
    id: 'big.p2.s2',
    deck: 'big',
    paragraph: 2,
    order: 5,
    role: '重要性',
    en: "In today's fast-paced world, {{X}}, far from being a minor detail, plays an increasingly vital role in everyday life, enabling people to {{DO}}.",
    zh: '在当今快节奏的社会中，{{X}}绝非小节，而是在日常生活中扮演着日益关键的角色，使人们能够{{DO}}。',
    cue: "In today's fast-paced world",
    note: '个人习惯（读书/拖延/坚持）、科技图表（家电/养老机器人）、文化社会全题材 100% 贴题！',
  },
  {
    id: 'big.p2.s3',
    deck: 'big',
    paragraph: 2,
    order: 6,
    role: '价值深化',
    en: "Moreover, the growing recognition and clear benefits associated with {{X}} meet people's real needs and further strengthen its lasting significance.",
    zh: '此外，伴随{{X}}而来的日益广泛的认可与切实益处，回应了人们的真实需求，并进一步增强了其长远意义。',
    cue: 'Moreover, the growing recognition and clear benefits',
  },
  {
    id: 'big.p2.s4',
    deck: 'big',
    paragraph: 2,
    order: 7,
    role: '反映',
    en: "Therefore, changes in {{X}} reflect not only social progress but also people's growing pursuit of a better life.",
    zh: '因此，{{X}}的变化不仅反映了社会进步，也反映了人们对美好生活日益增长的追求。',
    cue: 'Therefore, changes in',
    optional: true,
    note: '可选保留句（默认关闭，免与 P2.S1 重复 not only…but also，也免超 200 词）。',
  },
  {
    id: 'big.p3.s1',
    deck: 'big',
    paragraph: 3,
    order: 8,
    role: '关键',
    en: 'What ultimately determines the value of {{X}} is not mere form, but whether it is put into practice wisely and responsibly.',
    zh: '真正决定{{X}}价值的，不是流于表面形式，而是它是否得到明智且负责的践行。',
    cue: 'What ultimately determines the value of',
  },
  {
    id: 'big.p3.s2',
    deck: 'big',
    paragraph: 3,
    order: 9,
    role: '社会',
    en: 'Society should provide more support and guidance, addressing related challenges while creating a favorable environment for {{X}}.',
    zh: '社会应当提供更多支持与引导，在应对相关挑战的同时，为{{X}}营造良好环境。',
    cue: 'Society should provide more support and guidance',
  },
  {
    id: 'big.p3.s3',
    deck: 'big',
    paragraph: 3,
    order: 10,
    role: '个人',
    en: 'Individuals, meanwhile, should approach {{X}} with a rational mindset, neither ignoring its benefits nor failing to take concrete action.',
    zh: '与此同时，个人应当以理性的心态对待{{X}}，既不忽视其益处，也不懈怠切实行动。',
    cue: 'Individuals, meanwhile, should approach',
  },
  {
    id: 'big.p3.s4',
    deck: 'big',
    paragraph: 3,
    order: 11,
    role: '倒装收尾',
    en: 'Only in this way can {{X}} truly contribute to the well-being of individuals and the progress of society.',
    zh: '只有这样，{{X}}才能真正促进个人幸福和社会进步。',
    cue: 'Only in this way can',
    smallEssayLink: '考研英语一高分倒装压轴句，已与小作文万能骨架完全错开、绝不撞句！',
  },
];

/**
 * 纯图表（2025/2026 同款）+ 图文结合（2024 同款）的 2 句极简第一段衔接壳
 * 只要多背这 2 句短句，第二、三段 100% 照抄上方原骨架！
 */
export const BIG_CHART_SHELL_SENTENCES: BigSentence[] = [
  {
    id: 'big.shell.chart',
    deck: 'big',
    paragraph: 1,
    order: 12,
    role: '纯图表引入',
    isFormatShell: true,
    formatTag: 'chart',
    en: 'The {{CHART|table}} shows changes in {{TOPIC|this field}} from {{T1|2020}} to {{T2|2024}}.',
    zh: '该{{CHART}}展示了从{{T1}}到{{T2}}期间{{TOPIC}}的变化。（静态换 across [N] categories；2026 双图换 The two charts illustrate [TOPIC].；后接 Specifically, [DATA].）',
    cue: 'The … shows changes in',
    note: '2025 动态表 / 静态图 / 2026 双图表通用引入句；紧接 Specifically, [DATA]. 与揭示句（the drawing → the chart/charts）。',
  },
  {
    id: 'big.shell.hybrid',
    deck: 'big',
    paragraph: 1,
    order: 13,
    role: '图文衔接',
    isFormatShell: true,
    formatTag: 'hybrid',
    en: 'Echoing this scene, the accompanying {{CHART|bar chart}} shows that {{DATA}}.',
    zh: '与这一画面相呼应，随附的{{CHART}}显示{{DATA}}。',
    cue: 'Echoing this scene, the accompanying',
    note: '2024 英语一图文结合同款衔接句！紧跟在 P1.S1 后面，揭示句把 the drawing 换成 both the picture and the chart。',
  },
];

/** 核心 10 句（不含可选句 P2.S4，纯图画主骨架） */
export const BIG_CORE_SENTENCES: BigSentence[] = BIG_SENTENCES.filter((s) => !s.optional);

/** 全部可检索的句子映射（含旧可选句 P2.S4 + 2 句图表/图文衔接壳，保障 FSRS/复习/同步零报错） */
export const BIG_SENTENCE_MAP: Record<string, BigSentence> = Object.fromEntries(
  [...BIG_SENTENCES, ...BIG_CHART_SHELL_SENTENCES].map((s) => [s.id, s])
);

/** 考场速背 12 句（10 句万能核心 + 2 句图表/图文壳） */
export const BIG_SENTENCE_IDS: string[] = [
  ...BIG_CORE_SENTENCES.map((s) => s.id),
  ...BIG_CHART_SHELL_SENTENCES.map((s) => s.id),
];

/**
 * 按题型返回该题型的完整三段句列（纯图画 / 纯图表[动态·静态·双图] / 图文结合均为 10 句，字数稳落 185–210 词）
 */
export function getBigSentencesForFormat(
  format: BigFormatMode = 'picture',
  options?: { includeOptionalP2S4?: boolean; chartKind?: 'dynamic' | 'static' | 'dual' }
): BigSentence[] {
  const includeOpt = options?.includeOptionalP2S4 ?? false;
  const bodyAndClosing = BIG_SENTENCES.filter(
    (s) => s.paragraph !== 1 && (includeOpt || !s.optional)
  );

  if (format === 'chart') {
    const kind = options?.chartKind ?? 'dynamic';
    const isDual = kind === 'dual';
    const isStatic = kind === 'static';
    const p1: BigSentence[] = [
      {
        id: 'big.shell.chart',
        deck: 'big',
        paragraph: 1,
        order: 1,
        role: isDual ? '双图表引入' : '图表引入',
        isFormatShell: true,
        formatTag: 'chart',
        en: isDual
          ? 'The two charts illustrate {{TOPIC|this survey}}.'
          : isStatic
            ? 'The {{CHART|pie chart}} shows {{TOPIC|this field}} across {{COUNT|four}} categories.'
            : 'The {{CHART|table}} shows changes in {{TOPIC|this field}} from {{T1|2020}} to {{T2|2024}}.',
        zh: isDual
          ? '这两幅图表展示了{{TOPIC}}的调查情况。'
          : isStatic
            ? '该{{CHART}}展示了{{TOPIC}}在{{COUNT}}个类别中的分布情况。'
            : '该{{CHART}}展示了从{{T1}}到{{T2}}期间{{TOPIC}}的变化。',
        cue: isDual
          ? 'The two charts illustrate'
          : isStatic
            ? 'The … shows … across'
            : 'The … shows changes in',
      },
      {
        id: 'big.shell.chartData',
        deck: 'big',
        paragraph: 1,
        order: 2,
        role: '核心数据',
        isFormatShell: true,
        formatTag: 'chart',
        en: 'Specifically, {{DATA}}.',
        zh: '具体而言，{{DATA}}。',
        cue: 'Specifically,',
      },
      {
        id: 'big.p1.s2',
        deck: 'big',
        paragraph: 1,
        order: 3,
        role: '揭示',
        en: isDual
          ? 'The deeper issue revealed by the charts lies in the value and impact of {{X}} in modern society.'
          : 'The deeper issue revealed by the chart lies in the value and impact of {{X}} in modern society.',
        zh: '图表所揭示的深层问题，在于{{X}}在现代社会中的价值与影响。',
        cue: isDual
          ? 'The deeper issue revealed by the charts'
          : 'The deeper issue revealed by the chart',
      },
    ];
    return [...p1, ...bodyAndClosing];
  }

  if (format === 'hybrid') {
    const p1: BigSentence[] = [
      BIG_SENTENCE_MAP['big.p1.s1'],
      BIG_SENTENCE_MAP['big.shell.hybrid'],
      {
        id: 'big.p1.s2',
        deck: 'big',
        paragraph: 1,
        order: 3,
        role: '揭示',
        en: 'The deeper issue revealed by both the picture and the chart lies in the value and impact of {{X}} in modern society.',
        zh: '图画与图表共同揭示的深层问题，在于{{X}}在现代社会中的价值与影响。',
        cue: 'The deeper issue revealed by both the picture and the chart',
      },
    ];
    return [...p1, ...bodyAndClosing];
  }

  // Default: pure picture
  const p1 = BIG_SENTENCES.filter((s) => s.paragraph === 1);
  return [...p1, ...bodyAndClosing];
}

/**
 * 将 BigSentence 适配为通用 Sentence，便于直接复用现有的 gradeAnswer / generateCloze / Review 页面
 */
export function bigSentenceToSentence(bs: BigSentence): Sentence {
  const slotMatches = [...bs.en.matchAll(/\{\{(\w+)(?:\|[^}]+)?\}\}/g)].map(
    (m) => m[1]
  );
  return {
    id: bs.id,
    deck: 'big',
    layer: bs.paragraph === 1 ? 'L1' : bs.paragraph === 2 ? 'L2' : 'L3',
    role: bs.paragraph === 3 && bs.order === 11 ? 'closing' : 'body',
    en: bs.en,
    zh: bs.zh,
    cue: bs.cue,
    slots: Array.from(new Set(slotMatches)),
  };
}

/**
 * 4 天极速通关课程（12 句全部零锁门，按 Day 1–2 背完直接进填 5 空与整篇实战）
 */
export const BIG_LESSONS: BigLesson[] = [
  {
    id: 1,
    dayTag: 'Day 1 上半场',
    title: '第 1 课 · 第一段核心 3 句（描述 → 揭示 → 意义）',
    subtitle: '纯图画第一段固定骨架，全篇只需定 PIC 与主题词 X',
    kind: 'sentences',
    paragraph: 1,
    sentenceIds: ['big.p1.s1', 'big.p1.s2', 'big.p1.s3'],
  },
  {
    id: 2,
    dayTag: 'Day 1 下半场',
    title: '第 2 课 · 第二段万能 3 句（好处 → 日益关键 → 回应需求）',
    subtitle: '已全面泛化固化：只需填 B1 / B2 / DO，全话题一字不改直抄',
    kind: 'sentences',
    paragraph: 2,
    sentenceIds: ['big.p2.s1', 'big.p2.s2', 'big.p2.s3'],
  },
  {
    id: 3,
    dayTag: 'Day 2 上半场',
    title: '第 3 课 · 第三段辩证 4 句（关键 → 社会 → 个人 → 倒装收尾）',
    subtitle: '仅需代入主题词 X，其余 100% 固定高分句型直抄',
    kind: 'sentences',
    paragraph: 3,
    sentenceIds: ['big.p3.s1', 'big.p3.s2', 'big.p3.s3', 'big.p3.s4'],
  },
  {
    id: 4,
    dayTag: 'Day 2 下半场',
    title: '第 4 课 · 纯图表 & 图文结合 2 句衔接壳（2024 / 2025 真题必备）',
    subtitle: '只多背 2 句极短第一段外壳，二三段 100% 照抄上面原模板',
    kind: 'sentences',
    badge: '必背 2 句',
    sentenceIds: ['big.shell.chart', 'big.shell.hybrid'],
  },
];

/**
 * 10 个高频主题素材包（参考灵感库：均保证 X 为单数/不可数、四六级词汇、代入后稳落 160–220 词）
 */
export const MATERIAL_PACKS: MaterialPack[] = [
  {
    id: 'culture',
    theme: '传统文化',
    triggers: ['tradition', 'traditional', 'heritage', 'festival', 'craft', 'culture', '非遗', '传统', '剪纸', '汉服'],
    vars: {
      X: 'traditional culture',
      B1: 'a sense of cultural identity',
      B2: 'spiritual enrichment',
      DO: 'appreciate the charm of history in daily life',
    },
    picExamples: [
      'an old craftsman is teaching children to make paper-cuttings, resulting in their bright smiles',
      'young people are wearing traditional costumes at a festival, while tourists are taking photos',
    ],
  },
  {
    id: 'tech-ai',
    theme: '科技与 AI',
    triggers: ['ai', 'technology', 'robot', 'smart', 'algorithm', 'automation', '人工智能', '科技', '智能', '家电'],
    vars: {
      X: 'artificial intelligence',
      B1: 'higher working efficiency',
      B2: 'fresh creative inspiration',
      DO: 'complete complex tasks faster than before',
    },
    picExamples: [
      'a young designer is working with a smart assistant, resulting in faster project delivery',
      'an engineer is guiding a robot arm, while visitors are watching with curiosity',
    ],
  },
  {
    id: 'digital',
    theme: '网络与数字生活',
    triggers: ['internet', 'digital', 'online', 'phone', 'screen', 'social media', '网络', '手机', '数字', '屏幕', '低头'],
    vars: {
      X: 'rational smartphone use',
      B1: 'instant access to information',
      B2: 'healthier interpersonal communication',
      DO: 'stay connected without losing real-life warmth',
    },
    picExamples: [
      'two friends are staring at smartphones at dinner, while barely talking to each other',
      'a senior citizen is learning mobile payment from her granddaughter, resulting in a warm smile',
    ],
  },
  {
    id: 'education',
    theme: '教育与终身学习',
    triggers: ['education', 'learning', 'study', 'reading', 'book', 'knowledge', '教育', '学习', '读书', '终身学习', '时间'],
    vars: {
      X: 'lifelong learning',
      B1: 'broader professional knowledge',
      B2: 'stronger career adaptability',
      DO: 'update their skills anytime and anywhere',
    },
    picExamples: [
      'an elderly man is reading in a community library, while young students are taking notes',
      'a busy office worker is attending an online lecture at night, resulting in steady progress',
    ],
  },
  {
    id: 'environment',
    theme: '环境保护与绿色生活',
    triggers: ['environment', 'green', 'eco', 'pollution', 'nature', 'carbon', '环保', '绿色', '生态', '低碳', '公园'],
    vars: {
      X: 'green living',
      B1: 'cleaner air and water',
      B2: 'sustainable ecological balance',
      DO: 'reduce daily waste in practical ways',
    },
    picExamples: [
      'citizens are riding shared bikes to work, resulting in clearer city skies',
      'volunteers are planting young trees on a hillside, while children are watering them',
    ],
  },
  {
    id: 'health',
    theme: '健康与全民运动',
    triggers: ['health', 'exercise', 'sport', 'fitness', 'running', 'sleep', '健康', '运动', '健身', '锻炼', '公园'],
    vars: {
      X: 'regular exercise',
      B1: 'stronger physical fitness',
      B2: 'better mental relaxation',
      DO: 'relieve daily stress and stay energetic',
    },
    picExamples: [
      'neighbors are jogging together in a city park, resulting in energetic faces',
      'young people are working out outdoors, while an elderly couple is practicing tai chi',
    ],
  },
  {
    id: 'persistence',
    theme: '奋斗与坚持',
    triggers: ['effort', 'persistence', 'perseverance', 'goal', 'challenge', 'dream', '坚持', '奋斗', '毅力', '努力', '半途而废'],
    vars: {
      X: 'persistent effort',
      B1: 'steady personal growth',
      B2: 'lasting inner confidence',
      DO: 'overcome tough obstacles step by step',
    },
    picExamples: [
      'a climber is moving toward a snowy peak, while another stops halfway down',
      'a student is solving difficult problems late at night, resulting in clear improvement',
    ],
  },
  {
    id: 'family',
    theme: '家庭与代际陪伴',
    triggers: ['family', 'parent', 'elderly', 'child', 'generation', 'home', '家庭', '父母', '代际', '陪伴'],
    vars: {
      X: 'family companionship',
      B1: 'deep emotional warmth',
      B2: 'closer mutual understanding',
      DO: 'bridge generation gaps through patient dialogue',
    },
    picExamples: [
      'a young man is cooking dinner with his aging parents, resulting in cheerful laughter',
      'a mother is reading a storybook to her child, while the father prepares tea',
    ],
  },
  {
    id: 'innovation',
    theme: '创新与创造',
    triggers: ['innovation', 'creativity', 'design', 'invention', 'startup', 'idea', '创新', '创造', '原创', '突破'],
    vars: {
      X: 'independent innovation',
      B1: 'stronger core competitiveness',
      B2: 'new growth momentum',
      DO: 'turn bold ideas into useful products',
    },
    picExamples: [
      'college students are testing a solar model car, resulting in an exciting breakthrough',
      'a team is sketching fresh designs together, while older methods are left behind',
    ],
  },
  {
    id: 'volunteer',
    theme: '志愿服务与社会责任',
    triggers: ['volunteer', 'charity', 'community', 'help', 'service', 'responsibility', '志愿', '公益', '社会责任', '互助'],
    vars: {
      X: 'volunteer service',
      B1: 'timely practical assistance',
      B2: 'greater social harmony',
      DO: 'pass kindness to those in need',
    },
    picExamples: [
      'college volunteers are helping elderly residents carry groceries, resulting in heartfelt thanks',
      'young guides are assisting travelers at a station, while commuters nod in appreciation',
    ],
  },
];

export const MATERIAL_PACK_MAP: Record<string, MaterialPack> = Object.fromEntries(
  MATERIAL_PACKS.map((p) => [p.id, p])
);

/**
 * 13 道考研英语一真题风模拟题（覆盖：图文结合 2024 风 + 纯图表动态 2025 风 + 静态占比图 + 10 道图画/负面转正题）
 */
export const BIG_PROMPTS: BigPrompt[] = [
  {
    id: 'bp-2026-dual',
    title: '【2026 真题风 · 双图表】消费者对养老护理机器人接受度与主要顾虑',
    format: 'chart',
    chartKind: 'dual',
    pictureDescZh:
      '左图（接受度）：超过半数受访者愿意或考虑使用养老护理机器人；右图（主要顾虑）：安全性、价格偏高及缺乏情感陪伴位居前三位。',
    requirementsZh:
      '1) 简要概括两幅图表的主要信息；2) 阐释智慧养老的价值与意义；3) 提出你的建议与看法（160–200 词）。',
    keywords: ['养老', '机器人', '科技', '顾虑', 'elderly', 'robot', 'care'],
    recommendedPackId: 'tech-ai',
    recommendedFallbackId: 'tech',
    sampleX: 'smart elderly care',
    sampleB1: 'greater daily convenience',
    sampleB2: 'a higher quality of life',
    sampleDO: 'look after aging family members more easily',
    samplePicParts: {
      subject: 'an elderly resident',
      action: 'is assisted by a care robot at home',
    },
    sampleChartParts: {
      chart: 'two charts',
      topic: 'public acceptance of and main concerns about elderly care robots',
      data: 'over half of the respondents welcome care robots, while safety, high cost, and lack of emotional warmth remain the top concerns',
    },
  },
  {
    id: 'bp-2024-hybrid',
    title: '【2024 真题风 · 图文结合】社区公园锻炼 + 城市公园数量增长',
    format: 'hybrid',
    chartKind: 'dynamic',
    pictureDescZh:
      '左侧图画：新建社区公园里居民正愉快慢跑健身；右侧柱状图：某市城市公园数量从 2020 年的 406 座稳步增长至 2022 年的 670 座。',
    requirementsZh:
      '1) 简要描述图画与图表内容；2) 阐释其背后的深层意义；3) 给出你的看法与建议（160–200 词）。',
    keywords: ['公园', '健身', '运动', '绿地', 'park', 'fitness', 'green space'],
    recommendedPackId: 'health',
    recommendedFallbackId: 'society',
    sampleX: 'public green space',
    sampleB1: 'stronger physical fitness',
    sampleB2: 'better mental relaxation',
    sampleDO: 'relieve daily stress and stay energetic',
    samplePicParts: {
      subject: 'residents',
      action: 'are jogging happily in a newly built city park',
    },
    sampleChartParts: {
      chart: 'bar chart',
      topic: 'the number of city parks',
      t1: '2020',
      t2: '2022',
      data: 'the number of city parks rose steadily from 406 in 2020 to 670 in 2022',
    },
  },
  {
    id: 'bp-2025-chart',
    title: '【2025 真题风 · 纯图表动态】中国家庭主要家电拥有量变化表',
    format: 'chart',
    chartKind: 'dynamic',
    pictureDescZh:
      '表格数据：2014–2023 年中国每百户居民家庭空调、洗衣机、电冰箱拥有量变化，其中空调由 75.2 台升至 145.9 台，冰箱和洗衣机均稳步增长。',
    requirementsZh:
      '1) 概括图表核心数据变化；2) 分析这一趋势背后的原因与价值；3) 提出你的看法与建议（160–200 词）。',
    keywords: ['家电', '空调', '消费', '生活品质', 'appliance', 'household', 'living'],
    recommendedPackId: 'tech-ai',
    recommendedFallbackId: 'tech',
    sampleX: 'better household living',
    sampleB1: 'greater daily convenience',
    sampleB2: 'a higher quality of life',
    sampleDO: 'enjoy a more comfortable and efficient life',
    samplePicParts: {
      subject: 'families',
      action: 'are enjoying modern home appliances',
    },
    sampleChartParts: {
      chart: 'table',
      topic: 'household ownership of major appliances',
      t1: '2014',
      t2: '2023',
      data: 'air conditioner ownership rose sharply from 75.2 to 145.9 per hundred households, while refrigerators and washing machines grew steadily',
    },
  },
  {
    id: 'bp-static-chart',
    title: '【静态占比图表 · 饼图】大学生课余时间分配调查',
    format: 'chart',
    chartKind: 'static',
    pictureDescZh:
      '饼图数据：某高校大学生课余时间分配——自主学习占 42%，体育锻炼占 24%，社团与志愿占 20%，休闲娱乐占 14%。',
    requirementsZh:
      '1) 概括饼图主要占比特征；2) 分析背后的积极意义与原因；3) 给出你的建议（160–200 词）。',
    keywords: ['时间管理', '大学生', '学习', '运动', 'time', 'study', 'pie chart'],
    recommendedPackId: 'education',
    recommendedFallbackId: 'growth',
    sampleX: 'wise time management',
    sampleB1: 'steady personal growth',
    sampleB2: 'a stronger sense of fulfillment',
    sampleDO: 'balance study, health, and personal interests effectively',
    samplePicParts: {
      subject: 'college students',
      action: 'are planning their spare time wisely',
    },
    sampleChartParts: {
      chart: 'pie chart',
      topic: "college students' spare time allocation",
      count: 'four',
      data: 'self-study accounts for the largest share at 42%, followed by exercise at 24%, whereas entertainment takes up only 14%',
    },
  },
  {
    id: 'bp-culture',
    title: '非遗传承进校园',
    format: 'picture',
    pictureDescZh: '图画中，一位老手艺人正在耐心教几名小学生剪窗花，孩子们捧着作品露出灿烂笑容。',
    requirementsZh: '1) 描述图画内容；2) 阐释其背后的深层含义；3) 给出你的看法与建议（160–200 词）。',
    keywords: ['非遗', '传统', 'heritage', 'craft', 'culture'],
    recommendedPackId: 'culture',
    recommendedFallbackId: 'society',
    samplePicParts: {
      subject: 'an old craftsman',
      action: 'is teaching children to make paper-cuttings',
      result: 'their bright smiles',
    },
  },
  {
    id: 'bp-ai',
    title: 'AI 辅助创意工作',
    format: 'picture',
    pictureDescZh: '图画中，一位年轻设计师正借助智能助手快速完成初稿，同时自己专注修改核心创意细节。',
    requirementsZh: '1) 描述图画内容；2) 分析人工智能在现代工作中的价值与影响；3) 提出理性使用建议（160–200 词）。',
    keywords: ['AI', '人工智能', 'smart', 'technology'],
    recommendedPackId: 'tech-ai',
    recommendedFallbackId: 'tech',
    samplePicParts: {
      subject: 'a young designer',
      action: 'is working with a smart assistant',
      result: 'faster project delivery',
    },
  },
  {
    id: 'bp-digital',
    title: '【负题正转】餐桌上的低头族',
    format: 'picture',
    isNegativeFlip: true,
    negativeFlipTip: '负面画面不要把 X 写成 smartphone addiction！负题正转：直接把 X 定为 rational smartphone use（理性使用手机），全篇照套！',
    pictureDescZh: '图画中，聚餐时两位年轻人各自盯着手机屏幕，几乎没有面对面交流。',
    requirementsZh: '1) 描述图画；2) 探讨理性使用手机与数字生活的重要性；3) 提出你的建议（160–200 词）。',
    keywords: ['手机', '网络', '低头', 'digital', 'phone', 'screen'],
    recommendedPackId: 'digital',
    recommendedFallbackId: 'tech',
    samplePicParts: {
      subject: 'two friends',
      action: 'are staring at smartphones at dinner',
      contrast: 'they barely talk to each other',
    },
  },
  {
    id: 'bp-education',
    title: '社区图书馆里的银发读者',
    format: 'picture',
    pictureDescZh: '图画中，一位满头白发的老人正在社区图书馆专心读书，身旁几名年轻学生正在认真记笔记。',
    requirementsZh: '1) 描述图画；2) 阐释终身学习的意义；3) 提出社会与个人建议（160–200 词）。',
    keywords: ['学习', '读书', '终身学习', 'reading', 'learning'],
    recommendedPackId: 'education',
    recommendedFallbackId: 'growth',
    samplePicParts: {
      subject: 'an elderly man',
      action: 'is reading in a community library',
      contrast: 'young students are taking notes',
    },
  },
  {
    id: 'bp-environment',
    title: '绿色骑行与蓝天',
    format: 'picture',
    pictureDescZh: '图画中，许多市民选择骑共享单车通勤，城市上空呈现清澈蓝天。',
    requirementsZh: '1) 描述图画；2) 分析绿色生活方式日益普及的原因与意义；3) 给出建议（160–200 词）。',
    keywords: ['环保', '绿色', '低碳', 'green', 'environment'],
    recommendedPackId: 'environment',
    recommendedFallbackId: 'society',
    samplePicParts: {
      subject: 'citizens',
      action: 'are riding shared bikes to work',
      result: 'clearer city skies',
    },
  },
  {
    id: 'bp-health',
    title: '城市公园晨跑热',
    format: 'picture',
    pictureDescZh: '图画中，清晨的城市公园里，不同年龄的居民结伴慢跑，个个精神饱满。',
    requirementsZh: '1) 描述图画；2) 分析规律运动对现代人的价值；3) 给出你的建议（160–200 词）。',
    keywords: ['运动', '健身', '健康', 'exercise', 'fitness'],
    recommendedPackId: 'health',
    recommendedFallbackId: 'growth',
    samplePicParts: {
      subject: 'neighbors',
      action: 'are jogging together in a city park',
      result: 'energetic faces',
    },
  },
  {
    id: 'bp-persistence',
    title: '【负题正转】登山者：坚持与半途而废',
    format: 'picture',
    isNegativeFlip: true,
    negativeFlipTip: '对比负面“半途而废”时，把 X 定为正面单数 persistent effort（坚持不懈），直接套用万能骨架！',
    pictureDescZh: '图画中，一名登山者迎着风雪稳步向山顶迈进，而另一名登山者在半山腰停下脚步准备折返。',
    requirementsZh: '1) 描述图画；2) 阐释坚持不懈的重要性；3) 谈谈你的看法（160–200 词）。',
    keywords: ['坚持', '奋斗', '毅力', '半途而废', 'persistence', 'effort'],
    recommendedPackId: 'persistence',
    recommendedFallbackId: 'growth',
    samplePicParts: {
      subject: 'a climber',
      action: 'is moving toward a snowy peak',
      contrast: 'another stops halfway down',
    },
  },
  {
    id: 'bp-family',
    title: '陪父母做一顿晚饭',
    format: 'picture',
    pictureDescZh: '图画中，下班回家的年轻人正与年迈的父母一起在厨房做晚饭，一家人欢声笑语。',
    requirementsZh: '1) 描述图画；2) 探讨家庭陪伴与代际沟通的价值；3) 给出建议（160–200 词）。',
    keywords: ['家庭', '父母', '陪伴', 'family', 'parent'],
    recommendedPackId: 'family',
    recommendedFallbackId: 'society',
    samplePicParts: {
      subject: 'a young man',
      action: 'is cooking dinner with his aging parents',
      result: 'cheerful laughter',
    },
  },
  {
    id: 'bp-innovation',
    title: '大学生太阳能车科创实验',
    format: 'picture',
    pictureDescZh: '图画中，几名大学生正在操场调试自主研发的太阳能模型车，小车成功加速引来欢呼。',
    requirementsZh: '1) 描述图画；2) 分析自主创新的意义与推动因素；3) 给出建议（160–200 词）。',
    keywords: ['创新', '科创', '创造', 'innovation', 'creativity'],
    recommendedPackId: 'innovation',
    recommendedFallbackId: 'tech',
    samplePicParts: {
      subject: 'college students',
      action: 'are testing a solar model car',
      result: 'an exciting breakthrough',
    },
  },
  {
    id: 'bp-volunteer',
    title: '社区青年志愿帮扶',
    format: 'picture',
    pictureDescZh: '图画中，身穿红马甲的大学生志愿者正帮社区独居老人提菜上楼，老人连连致谢。',
    requirementsZh: '1) 描述图画；2) 分析志愿服务对个人与社会的价值；3) 给出建议（160–200 词）。',
    keywords: ['志愿', '公益', '社区', 'volunteer', 'community'],
    recommendedPackId: 'volunteer',
    recommendedFallbackId: 'society',
    samplePicParts: {
      subject: 'college volunteers',
      action: 'are helping elderly residents carry groceries',
      result: 'heartfelt thanks',
    },
  },
];

export const BIG_PROMPT_MAP: Record<string, BigPrompt> = Object.fromEntries(
  BIG_PROMPTS.map((p) => [p.id, p])
);

/**
 * 组装 PIC 四段小框：主体 + 动作 + (while 对比) + (resulting in 结果)
 */
export function assemblePicClause(parts: {
  subject: string;
  action: string;
  contrast?: string;
  result?: string;
}): string {
  const s = parts.subject.trim();
  const a = parts.action.trim();
  if (!s && !a) return '';
  let out = [s, a].filter(Boolean).join(' ');
  const c = parts.contrast?.trim();
  if (c) {
    const cleanC = c.replace(/^,?\s*while\s+/i, '');
    out += `, while ${cleanC}`;
  }
  const r = parts.result?.trim();
  if (r) {
    const cleanR = r.replace(/^,?\s*resulting\s+in\s+/i, '');
    out += `, resulting in ${cleanR}`;
  }
  return out.replace(/[.。]+$/, '');
}

/**
 * 将变量值代入某句模板（自动处理默认值与句首大写）
 */
export function renderBigSentenceText(
  sentence: BigSentence,
  vars: Record<string, string>
): string {
  const raw = sentence.en.replace(
    /\{\{(\w+)(?:\|([^}]+))?\}\}/g,
    (_, id: string, defVal?: string) => {
      const val = vars[id]?.trim();
      if (val) return val;
      if (defVal) return defVal;
      const meta = PLAN_VAR_MAP[id];
      if (meta?.defaultValue) return meta.defaultValue;
      return `[${id}]`;
    }
  );
  // Capitalize first letter if sentence starts with a substituted lowercase variable (e.g. P2.S1)
  return raw.replace(/^([a-z])/, (m) => m.toUpperCase());
}

/**
 * 渲染整篇大作文（支持 纯图画 / 纯图表 / 图文结合 3 种题型，返回段落数组与纯文本词数）
 */
export function renderFullBigEssay(
  vars: Record<string, string>,
  options?: {
    includeOptionalP2S4?: boolean;
    format?: BigFormatMode;
    chartKind?: 'dynamic' | 'static' | 'dual';
  }
): {
  paragraphs: { paragraph: 1 | 2 | 3; roleLabel: string; sentences: { id: string; text: string }[] }[];
  fullText: string;
  wordCount: number;
} {
  const activeSentences = getBigSentencesForFormat(options?.format ?? 'picture', {
    includeOptionalP2S4: options?.includeOptionalP2S4 ?? false,
    chartKind: options?.chartKind,
  });
  const roleMap: Record<1 | 2 | 3, string> = { 1: '描述', 2: '论证', 3: '建议' };

  const paragraphs = ([1, 2, 3] as const).map((p) => {
    const list = activeSentences
      .filter((s) => s.paragraph === p)
      .map((s) => ({
        id: s.id,
        text: renderBigSentenceText(s, vars),
      }));
    return {
      paragraph: p,
      roleLabel: roleMap[p],
      sentences: list,
    };
  });

  const fullText = paragraphs
    .map((p) => p.sentences.map((s) => s.text).join(' '))
    .join('\n\n');

  return {
    paragraphs,
    fullText,
    wordCount: countEnglishWords(fullText),
  };
}

export function countEnglishWords(text: string): number {
  const matches = text.trim().match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g);
  return matches ? matches.length : 0;
}

/**
 * 根据题干关键词推荐最接近的 1–2 个素材包
 */
export function recommendMaterialPacks(promptText: string, limit = 2): MaterialPack[] {
  const hay = promptText.toLowerCase();
  const scored = MATERIAL_PACKS.map((pack) => {
    let score = 0;
    for (const kw of pack.triggers) {
      if (hay.includes(kw.toLowerCase())) {
        score += kw.length >= 2 ? 2 : 1;
      }
    }
    if (hay.includes(pack.theme.toLowerCase())) score += 4;
    return { pack, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) {
    return MATERIAL_PACKS.slice(0, limit);
  }
  return scored.slice(0, limit).map((x) => x.pack);
}
