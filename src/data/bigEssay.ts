import type { Deck, Sentence } from './types';

export type BigVarPOS = 'noun' | 'verb' | 'clause' | 'adj';

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
  note?: string;
  smallEssayLink?: string;
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
  pictureDescZh: string;
  requirementsZh: string;
  keywords: string[];
  recommendedPackId: string;
  samplePicParts: {
    subject: string;
    action: string;
    contrast?: string;
    result?: string;
  };
}

export interface BigLesson {
  id: number;
  title: string;
  subtitle: string;
  kind: 'sentences' | 'order' | 'transfer' | 'chart';
  sentenceIds?: string[];
  optional?: boolean;
  badge?: string;
}

export const BIG_LOGIC_CHAIN = {
  overall: ['描述（是什么）', '论证（为什么）', '建议（怎么办）'],
  paragraphs: [
    {
      paragraph: 1 as const,
      roleLabel: '描述',
      title: '第一段 · 图画与引出',
      nodes: ['看到什么', '说明什么', '有什么用'],
    },
    {
      paragraph: 2 as const,
      roleLabel: '论证',
      title: '第二段 · 原因与影响',
      nodes: ['带来什么', '为什么变普及', '为什么受关注', '反映了什么（可选）'],
    },
    {
      paragraph: 3 as const,
      roleLabel: '建议',
      title: '第三段 · 辩证与落脚',
      nodes: ['关键在于', '社会怎么做', '个人怎么做', '只有这样'],
    },
  ],
};

export const PLAN_VARS: PlanVar[] = [
  {
    id: 'X',
    label: '主题词',
    pos: 'noun',
    required: true,
    rule: '名词短语，一律用单数或不可数名词（保证全文 its / has 一致）',
    placeholder: '如 traditional culture / online learning',
  },
  {
    id: 'PIC',
    label: '图片描述',
    pos: 'clause',
    required: true,
    rule: '主体 + 动作/状态（可选 while 对比、resulting in 结果）',
    placeholder: '如 an old craftsman is teaching children to make paper-cuttings',
  },
  {
    id: 'B1',
    label: '好处一',
    pos: 'noun',
    required: true,
    rule: '名词短语（≤ 6 词）',
    placeholder: '如 a sense of cultural identity',
  },
  {
    id: 'B2',
    label: '好处二',
    pos: 'noun',
    required: true,
    rule: '名词短语（≤ 6 词）',
    placeholder: '如 spiritual enrichment',
  },
  {
    id: 'DO',
    label: '人们能做什么',
    pos: 'verb',
    required: true,
    rule: '动词原形开头（前接 enabling people to）',
    placeholder: '如 appreciate the charm of history in daily life',
  },
  {
    id: 'G',
    label: '受益群体',
    pos: 'noun',
    required: false,
    defaultValue: 'people',
    rule: '名词（默认 people）',
  },
  {
    id: 'LIMIT',
    label: '过去限制普及的因素',
    pos: 'noun',
    required: false,
    defaultValue: 'high costs and limited resources',
    rule: '名词短语',
  },
  {
    id: 'OLD',
    label: '过去的状态（反义词对）',
    pos: 'adj',
    required: false,
    defaultValue: 'inaccessible',
    rule: '与 NEW 构成反义形容词对',
  },
  {
    id: 'NEW',
    label: '现在的状态（反义词对）',
    pos: 'adj',
    required: false,
    defaultValue: 'accessible',
    rule: '与 OLD 构成反义形容词对',
  },
  {
    id: 'ATT',
    label: '持续的关注',
    pos: 'noun',
    required: false,
    defaultValue: 'attention',
  },
  {
    id: 'DIS',
    label: '广泛的讨论',
    pos: 'noun',
    required: false,
    defaultValue: 'discussion',
  },
  {
    id: 'MEDIA',
    label: '传播媒介',
    pos: 'noun',
    required: false,
    defaultValue: 'social media',
  },
  {
    id: 'EFFECT',
    label: '增强的影响',
    pos: 'noun',
    required: false,
    defaultValue: 'influence',
  },
  {
    id: 'R1',
    label: '反映维度一（可选句）',
    pos: 'noun',
    required: false,
    defaultValue: 'social progress',
  },
  {
    id: 'R2',
    label: '反映维度二（可选句）',
    pos: 'noun',
    required: false,
    defaultValue: "people's growing pursuit of a better life",
  },
  {
    id: 'SURF',
    label: '表面因素',
    pos: 'noun',
    required: false,
    defaultValue: 'its popularity',
  },
  {
    id: 'CORE',
    label: '核心条件',
    pos: 'clause',
    required: false,
    defaultValue: 'it is used wisely and responsibly',
  },
  {
    id: 'ACT',
    label: '社会应当做什么',
    pos: 'verb',
    required: false,
    defaultValue: 'provide more support and guidance',
  },
  {
    id: 'PROB',
    label: '需要解决的问题',
    pos: 'noun',
    required: false,
    defaultValue: 'its potential problems',
  },
  {
    id: 'KEEP',
    label: '需要守护的价值',
    pos: 'noun',
    required: false,
    defaultValue: 'its core value',
  },
  {
    id: 'N1',
    label: '极端倾向一（neither）',
    pos: 'noun',
    required: false,
    defaultValue: 'blindly following it',
  },
  {
    id: 'N2',
    label: '极端倾向二（nor）',
    pos: 'noun',
    required: false,
    defaultValue: 'completely rejecting it',
  },
];

export const PLAN_VAR_MAP: Record<string, PlanVar> = Object.fromEntries(
  PLAN_VARS.map((v) => [v.id, v])
);

export const OLD_NEW_PRESETS: { oldVal: string; newVal: string; zh: string }[] = [
  { oldVal: 'inaccessible', newVal: 'accessible', zh: '难以接触 → 触手可及（默认）' },
  { oldVal: 'costly', newVal: 'affordable', zh: '昂贵 → 负担得起' },
  { oldVal: 'unfamiliar', newVal: 'popular', zh: '陌生 → 普及流行' },
];

/**
 * 附录 A：修订后的大作文模板（逐字转录，一字未改）
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
    note: 'PIC 结构为「主体 + 动作/状态」，可加 , while + 对比 或 , resulting in + 结果。',
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
  },
  {
    id: 'big.p1.s3',
    deck: 'big',
    paragraph: 1,
    order: 3,
    role: '意义',
    en: 'When its positive potential is properly realized, {{X}} can help people determine through practice which beliefs deserve to be upheld and which aspects require adjustment, thereby enhancing the accuracy of their judgment.',
    zh: '当它的积极作用得到恰当发挥时，{{X}}能够帮助人们通过实践判断哪些观点值得坚持、哪些方面需要调整，从而提高判断的准确性。',
    cue: 'When its positive potential is properly realized',
  },
  {
    id: 'big.p2.s1',
    deck: 'big',
    paragraph: 2,
    order: 4,
    role: '好处',
    en: '{{X}} brings {{G|people}} not only {{B1}} but also {{B2}}.',
    zh: '{{X}}给{{G}}带来的不仅是{{B1}}，还有{{B2}}。',
    cue: '… brings … not only … but also',
  },
  {
    id: 'big.p2.s2',
    deck: 'big',
    paragraph: 2,
    order: 5,
    role: '变化',
    en: 'As society develops and technology advances, {{X}}, once rendered {{OLD|inaccessible}} by {{LIMIT|high costs and limited resources}}, has become increasingly {{NEW|accessible}}, enabling people to {{DO}}.',
    zh: '随着社会发展和技术进步，曾经因{{LIMIT}}而{{OLD}}的{{X}}变得越来越{{NEW}}，使人们能够{{DO}}。',
    cue: 'As society develops and technology advances',
    note: 'OLD / NEW 为反义形容词对：inaccessible / accessible（默认）、costly / affordable、unfamiliar / popular。',
  },
  {
    id: 'big.p2.s3',
    deck: 'big',
    paragraph: 2,
    order: 6,
    role: '关注',
    en: 'Moreover, the sustained {{ATT|attention}} and extensive {{DIS|discussion}} generated by {{MEDIA|social media}} have brought {{X}} into the public consciousness and further strengthened its {{EFFECT|influence}}.',
    zh: '此外，{{MEDIA}}带来的持续{{ATT}}和广泛{{DIS}}，使{{X}}进入公众视野，并进一步增强了它的{{EFFECT}}。',
    cue: 'Moreover, the sustained',
  },
  {
    id: 'big.p2.s4',
    deck: 'big',
    paragraph: 2,
    order: 7,
    role: '反映',
    en: "Therefore, changes in {{X}} reflect not only {{R1|social progress}} but also {{R2|people's growing pursuit of a better life}}.",
    zh: '因此，{{X}}的变化不仅反映了{{R1}}，也反映了{{R2}}。',
    cue: 'Therefore, changes in',
    optional: true,
    note: '可选句：时间紧或整篇超 200 词时直接删掉。',
  },
  {
    id: 'big.p3.s1',
    deck: 'big',
    paragraph: 3,
    order: 8,
    role: '关键',
    en: 'What ultimately determines the value of {{X}} is not {{SURF|its popularity}}, but whether {{CORE|it is used wisely and responsibly}}.',
    zh: '真正决定{{X}}价值的，不是{{SURF}}，而是{{CORE}}。',
    cue: 'What ultimately determines',
  },
  {
    id: 'big.p3.s2',
    deck: 'big',
    paragraph: 3,
    order: 9,
    role: '社会',
    en: 'Society should {{ACT|provide more support and guidance}}, addressing {{PROB|its potential problems}} while preserving {{KEEP|its core value}}.',
    zh: '社会应当{{ACT}}，在解决{{PROB}}的同时，守护{{KEEP}}。',
    cue: 'Society should',
  },
  {
    id: 'big.p3.s3',
    deck: 'big',
    paragraph: 3,
    order: 10,
    role: '个人',
    en: 'Individuals should treat {{X}} rationally, neither {{N1|blindly following it}} nor {{N2|completely rejecting it}}.',
    zh: '个人应当理性看待{{X}}，既不{{N1}}，也不{{N2}}。',
    cue: 'Individuals should treat',
  },
  {
    id: 'big.p3.s4',
    deck: 'big',
    paragraph: 3,
    order: 11,
    role: '总结',
    en: 'Only in this way can {{X}} truly contribute to the well-being of individuals and the progress of society.',
    zh: '只有这样，{{X}}才能真正促进个人幸福和社会进步。',
    cue: 'Only in this way',
    smallEssayLink: '和小作文建议信的结尾句型 "Only in this way can you truly…" 完全同源，倒装结构直接复用！',
  },
];

export const BIG_SENTENCE_MAP: Record<string, BigSentence> = Object.fromEntries(
  BIG_SENTENCES.map((s) => [s.id, s])
);

export const BIG_SENTENCE_IDS: string[] = BIG_SENTENCES.map((s) => s.id);

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

export const BIG_LESSONS: BigLesson[] = [
  {
    id: 1,
    title: '第 1 课 · 第一段（描述 → 揭示 → 意义）',
    subtitle: '3 句固定骨架，先看图再引出主题词 X',
    kind: 'sentences',
    sentenceIds: ['big.p1.s1', 'big.p1.s2', 'big.p1.s3'],
  },
  {
    id: 2,
    title: '第 2 课 · 第二段（好处 → 变化 → 关注 → 反映）',
    subtitle: '4 句论证展开（含可选反映句 P2.S4）',
    kind: 'sentences',
    sentenceIds: ['big.p2.s1', 'big.p2.s2', 'big.p2.s3', 'big.p2.s4'],
  },
  {
    id: 3,
    title: '第 3 课 · 第三段（关键 → 社会 → 个人 → 总结）',
    subtitle: '4 句辩证收尾，末句与小作文建议信同源',
    kind: 'sentences',
    sentenceIds: ['big.p3.s1', 'big.p3.s2', 'big.p3.s3', 'big.p3.s4'],
  },
  {
    id: 4,
    title: '第 4 课 · 整篇首词链 + 段落排序',
    subtitle: '打乱 11 个首词排顺序（O 排序卡），打通全篇记忆链',
    kind: 'order',
  },
  {
    id: 5,
    title: '第 5 课 · 规划卡 + 素材包迁移训练',
    subtitle: '3 分钟定好 X / PIC / B1 / B2 / DO，一套骨架套出新文章',
    kind: 'transfer',
  },
  {
    id: 6,
    title: '第 6 课 · 图表作文（选句与填数）',
    subtitle: '静态柱状/饼图 + 动态折线图随机训练',
    kind: 'chart',
    optional: true,
    badge: '英语二常考，英语一备用',
  },
];

/**
 * 附录 B：10 个完整素材包（均保证 X 为单数/不可数、CET-4/6 词汇、代入去 P2.S4 后在 160–220 词之间）
 */
export const MATERIAL_PACKS: MaterialPack[] = [
  {
    id: 'culture',
    theme: '传统文化',
    triggers: ['tradition', 'traditional', 'heritage', 'festival', 'craft', 'culture', '非遗', '传统', '剪纸', '汉服'],
    vars: {
      X: 'traditional culture',
      G: 'young people',
      B1: 'a sense of cultural identity',
      B2: 'spiritual enrichment',
      DO: 'appreciate the charm of history in daily life',
      LIMIT: 'limited channels of communication',
    },
    picExamples: [
      'an old craftsman is teaching children to make paper-cuttings, resulting in their bright smiles',
      'young people are wearing traditional costumes at a festival, while tourists are taking photos',
    ],
  },
  {
    id: 'tech-ai',
    theme: '科技与 AI',
    triggers: ['ai', 'technology', 'robot', 'smart', 'algorithm', 'automation', '人工智能', '科技', '智能'],
    vars: {
      X: 'artificial intelligence',
      G: 'modern workers',
      B1: 'higher working efficiency',
      B2: 'fresh creative inspiration',
      DO: 'complete complex tasks faster than before',
      LIMIT: 'high technical barriers',
    },
    picExamples: [
      'a young designer is working with a smart assistant, resulting in faster project delivery',
      'an engineer is guiding a robot arm, while visitors are watching with curiosity',
    ],
  },
  {
    id: 'digital',
    theme: '网络与数字生活',
    triggers: ['internet', 'digital', 'online', 'phone', 'screen', 'social media', '网络', '手机', '数字', '屏幕'],
    vars: {
      X: 'digital technology',
      G: 'ordinary citizens',
      B1: 'instant access to information',
      B2: 'great convenience in life',
      DO: 'stay connected with others across great distances',
      LIMIT: 'poor network coverage',
    },
    picExamples: [
      'two friends are staring at smartphones at dinner, while barely talking to each other',
      'a senior citizen is learning mobile payment from her granddaughter, resulting in a warm smile',
    ],
  },
  {
    id: 'education',
    theme: '教育与终身学习',
    triggers: ['education', 'learning', 'study', 'reading', 'book', 'knowledge', '教育', '学习', '读书', '终身学习'],
    vars: {
      X: 'lifelong learning',
      G: 'modern learners',
      B1: 'broader professional knowledge',
      B2: 'stronger career adaptability',
      DO: 'update their skills anytime and anywhere',
      LIMIT: 'limited educational resources',
    },
    picExamples: [
      'an elderly man is reading in a community library, while young students are taking notes',
      'a busy office worker is attending an online lecture at night, resulting in steady progress',
    ],
  },
  {
    id: 'environment',
    theme: '环境保护',
    triggers: ['environment', 'green', 'eco', 'pollution', 'nature', 'carbon', '环保', '绿色', '生态', '低碳'],
    vars: {
      X: 'green living',
      G: 'the whole society',
      B1: 'cleaner air and water',
      B2: 'sustainable ecological balance',
      DO: 'reduce daily waste in practical ways',
      LIMIT: 'weak public awareness',
    },
    picExamples: [
      'citizens are riding shared bikes to work, resulting in clearer city skies',
      'volunteers are planting young trees on a hillside, while children are watering them',
    ],
  },
  {
    id: 'health',
    theme: '健康与运动',
    triggers: ['health', 'exercise', 'sport', 'fitness', 'running', 'sleep', '健康', '运动', '健身', '锻炼'],
    vars: {
      X: 'regular exercise',
      G: 'busy people',
      B1: 'stronger physical fitness',
      B2: 'better mental relaxation',
      DO: 'relieve daily stress and stay energetic',
      LIMIT: 'shortage of sports facilities',
    },
    picExamples: [
      'neighbors are jogging together in a city park, resulting in energetic faces',
      'young people are working out outdoors, while an elderly couple is practicing tai chi',
    ],
  },
  {
    id: 'persistence',
    theme: '奋斗与坚持',
    triggers: ['effort', 'persistence', 'perseverance', 'goal', 'challenge', 'dream', '坚持', '奋斗', '毅力', '努力'],
    vars: {
      X: 'persistent effort',
      G: 'young strugglers',
      B1: 'steady personal growth',
      B2: 'lasting inner confidence',
      DO: 'overcome tough obstacles step by step',
      LIMIT: 'fear of early failure',
    },
    picExamples: [
      'a climber is moving toward a snowy peak, while another stops halfway down',
      'a student is solving difficult problems late at night, resulting in clear improvement',
    ],
  },
  {
    id: 'family',
    theme: '家庭与代际关系',
    triggers: ['family', 'parent', 'elderly', 'child', 'generation', 'home', '家庭', '父母', '代际', '陪伴'],
    vars: {
      X: 'family companionship',
      G: 'every family member',
      B1: 'deep emotional warmth',
      B2: 'closer mutual understanding',
      DO: 'bridge generation gaps through patient dialogue',
      LIMIT: 'busy work schedules',
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
      G: 'modern enterprises',
      B1: 'stronger core competitiveness',
      B2: 'new growth momentum',
      DO: 'turn bold ideas into useful products',
      LIMIT: 'lack of funding support',
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
      G: 'local communities',
      B1: 'timely practical assistance',
      B2: 'greater social harmony',
      DO: 'pass kindness to those in need',
      LIMIT: 'poor organization',
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
 * 10 道考研英语一模拟图画题（供规划卡、渐隐练习、素材包识别、25 分钟独立实战使用）
 */
export const BIG_PROMPTS: BigPrompt[] = [
  {
    id: 'bp-culture',
    title: '非遗传承进校园',
    pictureDescZh: '图画中，一位老手艺人正在耐心教几名小学生剪窗花，孩子们捧着作品露出灿烂笑容。',
    requirementsZh: '1) 描述图画内容；2) 阐释其背后的深层含义；3) 给出你的看法与建议（160–200 词）。',
    keywords: ['非遗', '传统', 'heritage', 'craft', 'culture'],
    recommendedPackId: 'culture',
    samplePicParts: {
      subject: 'an old craftsman',
      action: 'is teaching children to make paper-cuttings',
      result: 'their bright smiles',
    },
  },
  {
    id: 'bp-ai',
    title: 'AI 辅助创意工作',
    pictureDescZh: '图画中，一位年轻设计师正借助智能助手快速完成初稿，同时自己专注修改核心创意细节。',
    requirementsZh: '1) 描述图画内容；2) 分析人工智能在现代工作中的价值与影响；3) 提出理性使用建议（160–200 词）。',
    keywords: ['AI', '人工智能', 'smart', 'technology'],
    recommendedPackId: 'tech-ai',
    samplePicParts: {
      subject: 'a young designer',
      action: 'is working with a smart assistant',
      result: 'faster project delivery',
    },
  },
  {
    id: 'bp-digital',
    title: '餐桌上的低头族 vs 银发触网',
    pictureDescZh: '图画中，聚餐时两位年轻人各自盯着手机屏幕，几乎没有面对面交流。',
    requirementsZh: '1) 描述图画；2) 探讨数字技术对人际生活的影响；3) 提出你的建议（160–200 词）。',
    keywords: ['手机', '网络', 'digital', 'phone', 'screen'],
    recommendedPackId: 'digital',
    samplePicParts: {
      subject: 'two friends',
      action: 'are staring at smartphones at dinner',
      contrast: 'they barely talk to each other',
    },
  },
  {
    id: 'bp-education',
    title: '社区图书馆里的银发读者',
    pictureDescZh: '图画中，一位满头白发的老人正在社区图书馆专心读书，身旁几名年轻学生正在认真记笔记。',
    requirementsZh: '1) 描述图画；2) 阐释终身学习的意义；3) 提出社会与个人建议（160–200 词）。',
    keywords: ['学习', '读书', '终身学习', 'reading', 'learning'],
    recommendedPackId: 'education',
    samplePicParts: {
      subject: 'an elderly man',
      action: 'is reading in a community library',
      contrast: 'young students are taking notes',
    },
  },
  {
    id: 'bp-environment',
    title: '绿色骑行与蓝天',
    pictureDescZh: '图画中，许多市民选择骑共享单车通勤，城市上空呈现清澈蓝天。',
    requirementsZh: '1) 描述图画；2) 分析绿色生活方式日益普及的原因与意义；3) 给出建议（160–200 词）。',
    keywords: ['环保', '绿色', '低碳', 'green', 'environment'],
    recommendedPackId: 'environment',
    samplePicParts: {
      subject: 'citizens',
      action: 'are riding shared bikes to work',
      result: 'clearer city skies',
    },
  },
  {
    id: 'bp-health',
    title: '城市公园晨跑热',
    pictureDescZh: '图画中，清晨的城市公园里，不同年龄的居民结伴慢跑，个个精神饱满。',
    requirementsZh: '1) 描述图画；2) 分析规律运动对现代人的价值；3) 给出你的建议（160–200 词）。',
    keywords: ['运动', '健身', '健康', 'exercise', 'fitness'],
    recommendedPackId: 'health',
    samplePicParts: {
      subject: 'neighbors',
      action: 'are jogging together in a city park',
      result: 'energetic faces',
    },
  },
  {
    id: 'bp-persistence',
    title: '登山者：坚持与半途而废',
    pictureDescZh: '图画中，一名登山者迎着风雪稳步向山顶迈进，而另一名登山者在半山腰停下脚步准备折返。',
    requirementsZh: '1) 描述图画；2) 阐释坚持不懈的重要性；3) 谈谈你的看法（160–200 词）。',
    keywords: ['坚持', '奋斗', '毅力', 'persistence', 'effort'],
    recommendedPackId: 'persistence',
    samplePicParts: {
      subject: 'a climber',
      action: 'is moving toward a snowy peak',
      contrast: 'another stops halfway down',
    },
  },
  {
    id: 'bp-family',
    title: '陪父母做一顿晚饭',
    pictureDescZh: '图画中，下班回家的年轻人正与年迈的父母一起在厨房做晚饭，一家人欢声笑语。',
    requirementsZh: '1) 描述图画；2) 探讨家庭陪伴与代际沟通的价值；3) 给出建议（160–200 词）。',
    keywords: ['家庭', '父母', '陪伴', 'family', 'parent'],
    recommendedPackId: 'family',
    samplePicParts: {
      subject: 'a young man',
      action: 'is cooking dinner with his aging parents',
      result: 'cheerful laughter',
    },
  },
  {
    id: 'bp-innovation',
    title: '大学生太阳能车科创实验',
    pictureDescZh: '图画中，几名大学生正在操场调试自主研发的太阳能模型车，小车成功加速引来欢呼。',
    requirementsZh: '1) 描述图画；2) 分析自主创新的意义与推动因素；3) 给出建议（160–200 词）。',
    keywords: ['创新', '科创', '创造', 'innovation', 'creativity'],
    recommendedPackId: 'innovation',
    samplePicParts: {
      subject: 'college students',
      action: 'are testing a solar model car',
      result: 'an exciting breakthrough',
    },
  },
  {
    id: 'bp-volunteer',
    title: '社区青年志愿帮扶',
    pictureDescZh: '图画中，身穿红马甲的大学生志愿者正帮社区独居老人提菜上楼，老人连连致谢。',
    requirementsZh: '1) 描述图画；2) 分析志愿服务对个人与社会的价值；3) 给出建议（160–200 词）。',
    keywords: ['志愿', '公益', '社区', 'volunteer', 'community'],
    recommendedPackId: 'volunteer',
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
 * 渲染整篇大作文（返回按段落分组的句子数组与纯文本词数）
 */
export function renderFullBigEssay(
  vars: Record<string, string>,
  options?: { includeOptionalP2S4?: boolean }
): {
  paragraphs: { paragraph: 1 | 2 | 3; roleLabel: string; sentences: { id: string; text: string }[] }[];
  fullText: string;
  wordCount: number;
} {
  const includeOpt = options?.includeOptionalP2S4 ?? false;
  const activeSentences = BIG_SENTENCES.filter((s) => includeOpt || !s.optional);
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
