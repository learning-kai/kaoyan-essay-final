export interface MeetingDrillItem {
  id: string;
  name: string;
  year: number;
  yearLabel: string;
  corePoint: string;
  mnemonic?: string;
  cardId: string;
}

export interface StageOrderSet {
  id: string;
  title: string;
  subtitle: string;
  cardId: string;
  items: { id: string; label: string; hint: string }[];
}

export interface TrapJudgeItem {
  id: string;
  statement: string;
  isTrue: boolean;
  explanation: string;
  cardId: string;
}

export interface PolEconCalcProblem {
  id: string;
  kind: 'organic' | 'absolute' | 'relative';
  title: string;
  prompt: string;
  choices: string[];
  correctIndex: number;
  steps: string[];
  cardId: string;
}

/**
 * 精选《会议大观》（知识点 092–094）核心高频会议，用于 4 选 1 速配与时间线排序
 */
export const MEETING_DRILL_ITEMS: MeetingDrillItem[] = [
  {
    id: 'm-1da',
    name: '中共一大',
    year: 1921,
    yearLabel: '1921',
    corePoint: '确定党的名称为“中国共产党”，通过第一个纲领和决议，决定首先集中精力组织工人',
    cardId: 'p-092',
  },
  {
    id: 'm-2da',
    name: '中共二大',
    year: 1922,
    yearLabel: '1922',
    corePoint: '第一次提出反帝反封建的民主革命纲领，开始采取群众路线方法，最早提出统一战线（民主联合战线）主张',
    cardId: 'p-092',
  },
  {
    id: 'm-3da',
    name: '中共三大',
    year: 1923,
    yearLabel: '1923',
    corePoint: '正式决定全体共产党员以个人名义加入国民党',
    cardId: 'p-092',
  },
  {
    id: 'm-gmd1',
    name: '国民党一大',
    year: 1924,
    yearLabel: '1924',
    corePoint: '提出“新三民主义”确认联俄、联共、扶助农工三大政策，标志着第一次国共合作正式形成',
    cardId: 'p-092',
  },
  {
    id: 'm-4da',
    name: '中共四大',
    year: 1925,
    yearLabel: '1925',
    corePoint: '提出无产阶级在民主革命中的领导权问题和工农联盟问题',
    cardId: 'p-092',
  },
  {
    id: 'm-87',
    name: '八七会议',
    year: 1927,
    yearLabel: '1927',
    corePoint: '总结大革命失败经验教训，确定土地革命和武装反抗国民党反动派总方针，首次提出“政权是由枪杆子中取得的”',
    mnemonic: '巴适（八失）· 枪杆出政权',
    cardId: 'p-092',
  },
  {
    id: 'm-gutian',
    name: '古田会议',
    year: 1929,
    yearLabel: '1929',
    corePoint: '确立思想建党、政治建军原则，创造性解决在农民为主条件下建设无产阶级先锋队和新型人民军队的重大问题',
    mnemonic: '古田先锋军队 · 腚鼓（定型）',
    cardId: 'p-092',
  },
  {
    id: 'm-zunyi',
    name: '遵义会议',
    year: 1935,
    yearLabel: '1935.1',
    corePoint: '集中解决军事问题和组织问题，开启党独立自主解决中国革命实际问题新阶段，鲜明特点是坚持真理、修正错误',
    mnemonic: '遵君主 · 尊嘟假嘟 · 遵义修理',
    cardId: 'p-092',
  },
  {
    id: 'm-wayaobao',
    name: '瓦窑堡会议',
    year: 1935.5,
    yearLabel: '1935.12',
    corePoint: '解决党的政治路线问题，提出党的抗日民族统一战线的新政策',
    mnemonic: '镇馆之宝（政）· 瓦罗兰特（统一战线）',
    cardId: 'p-092',
  },
  {
    id: 'm-luochuan',
    name: '洛川会议',
    year: 1937,
    yearLabel: '1937',
    corePoint: '制定抗日救国十大纲领，标志着党的全面抗战路线正式形成',
    mnemonic: '川面 / 洛克王国（全面抗战）',
    cardId: 'p-092',
  },
  {
    id: 'm-6j6z',
    name: '六届六中全会',
    year: 1938,
    yearLabel: '1938',
    corePoint: '毛泽东作《论新阶段》报告，正式提出“马克思主义中国化”命题',
    mnemonic: '六六结合 → 马中化',
    cardId: 'p-080',
  },
  {
    id: 'm-7da',
    name: '中共七大',
    year: 1945,
    yearLabel: '1945',
    corePoint: '把毛泽东思想确立为党的指导思想并写入党章，概括三大作风，标志党在政治/思想/组织上走向成熟',
    mnemonic: '七个小矮人联合愚公移山 · 胀气（章七）· 三成熟',
    cardId: 'p-093',
  },
  {
    id: 'm-7j2z',
    name: '七届二中全会',
    year: 1949,
    yearLabel: '1949.3',
    corePoint: '提出“两个务必”，指出党的工作重心必须由农村转移到城市，指明“两个转变”方向',
    mnemonic: '转城市 · 两转变两务必',
    cardId: 'p-093',
  },
  {
    id: 'm-zhengxie',
    name: '第一届全国政协会议',
    year: 1949.5,
    yearLabel: '1949.9',
    corePoint: '标志中国新型政党制度确立，通过的《共同纲领》起着临时宪法的作用',
    mnemonic: '人民政协政党立',
    cardId: 'p-093',
  },
  {
    id: 'm-7j3z',
    name: '七届三中全会',
    year: 1950,
    yearLabel: '1950',
    corePoint: '制定建国初期“不要四面出击”战略策略方针，中心任务是争取国家财政经济状况基本好转',
    mnemonic: '不要四 那就三',
    cardId: 'p-093',
  },
  {
    id: 'm-8da',
    name: '中共八大',
    year: 1956,
    yearLabel: '1956',
    corePoint: '分析社会主义改造完成后的主要矛盾和任务，经济建设坚持“既反保守又反冒进，在综合平衡中稳步前进”方针',
    mnemonic: '四平八稳',
    cardId: 'p-093',
  },
  {
    id: 'm-11j3z',
    name: '十一届三中全会',
    year: 1978,
    yearLabel: '1978',
    corePoint: '彻底否定“两个凡是”，重新确立马克思主义思想/政治/组织路线，作出改革开放战略决策，进入历史新时期',
    mnemonic: '三线三中 · 改开放',
    cardId: 'p-094',
  },
  {
    id: 'm-11j6z',
    name: '十一届六中全会',
    year: 1981,
    yearLabel: '1981',
    corePoint: '通过《关于建国以来党的若干历史问题的决议》，标志指导思想上拨乱反正胜利完成，概括毛泽东思想活的灵魂',
    mnemonic: '通《决议》· 社初提',
    cardId: 'p-094',
  },
  {
    id: 'm-12da',
    name: '中共十二大',
    year: 1982,
    yearLabel: '1982',
    corePoint: '第一次提出“建设有中国特色的社会主义”命题，标志邓小平理论与中特理论主题的形成',
    mnemonic: '二·中（中特提）',
    cardId: 'p-094',
  },
  {
    id: 'm-12j3z',
    name: '十二届三中全会',
    year: 1984,
    yearLabel: '1984',
    corePoint: '指出我国社会主义经济是在公有制基础上的有计划的商品经济',
    mnemonic: '有计划 一二三',
    cardId: 'p-094',
  },
  {
    id: 'm-13da',
    name: '中共十三大',
    year: 1987,
    yearLabel: '1987',
    corePoint: '系统阐述社会主义初级阶段理论和基本路线，标志邓小平理论与中特理论轮廓的形成',
    mnemonic: '三·路（阶段与路线）',
    cardId: 'p-094',
  },
  {
    id: 'm-14da',
    name: '中共十四大',
    year: 1992,
    yearLabel: '1992',
    corePoint: '明确以建立社会主义市场经济体制为我国经济体制改革的目标',
    mnemonic: '四·经（市场经济体）',
    cardId: 'p-094',
  },
  {
    id: 'm-15da',
    name: '中共十五大',
    year: 1997,
    yearLabel: '1997',
    corePoint: '把邓小平理论确立为党的指导思想，首次明确提出社会主义初级阶段的基本纲领',
    mnemonic: '五·刚（邓理论 + 基本纲领）',
    cardId: 'p-094',
  },
  {
    id: 'm-18j3z',
    name: '十八届三中全会',
    year: 2013,
    yearLabel: '2013',
    corePoint: '实现改革由局部探索、破冰突围到系统集成、全面深化的转变，开创我国改革开放新局面',
    mnemonic: '十八三中破冰',
    cardId: 'p-094',
  },
];

/**
 * 经典历史脉络专题时间排序题
 */
export const STAGE_ORDER_SETS: StageOrderSet[] = [
  {
    id: 'order-land',
    title: '土地政策四时期排序（康熙底线心存贞洁）',
    subtitle: '按历史先后顺序依次点击四个时期的土地政策',
    cardId: 'p-077',
    items: [
      { id: 'l1', label: '限制富农（《兴国土地法》）', hint: '土地革命时期 · 底线' },
      { id: 'l2', label: '减租减息', hint: '抗日战争时期 · 康熙' },
      { id: 'l3', label: '耕者有其田 / 征收富农多余土地（《土地法大纲》）', hint: '解放战争时期 · 贞洁' },
      { id: 'l4', label: '保存富农经济（《中华人民共和国土地改革法》）', hint: '新中国成立后 · 心存' },
    ],
  },
  {
    id: 'order-united-front',
    title: '新民主主义革命四个统一战线排序',
    subtitle: '按四个历史时期先后顺序排列统一战线名称',
    cardId: 'p-078',
    items: [
      { id: 'u1', label: '国民革命联合战线', hint: '大革命时期（第一次国共合作）' },
      { id: 'u2', label: '工农民主统一战线', hint: '土地革命时期（仅剩工人农民）' },
      { id: 'u3', label: '抗日民族统一战线', hint: '抗日战争时期（第二次国共合作）' },
      { id: 'u4', label: '人民民主统一战线', hint: '解放战争时期（团结尽可能多的人民）' },
    ],
  },
  {
    id: 'order-army',
    title: '党对军队绝对领导三节点（Fa男鸡弯腚鼓）',
    subtitle: '按“发端 → 奠基 → 定型”的先后顺序排列',
    cardId: 'p-054',
    items: [
      { id: 'a1', label: '南昌起义（发端）', hint: '1927.8 · Fa男' },
      { id: 'a2', label: '三湾改编（奠基 · 支部建在连上）', hint: '1927.9 · 鸡弯' },
      { id: 'a3', label: '古田会议（定型 · 思想建党政治建军）', hint: '1929.12 · 腚鼓' },
    ],
  },
  {
    id: 'order-sinicization',
    title: '马克思主义中国化“结合与飞跃”脉络',
    subtitle: '按“六六结合 → 七大飞跃 → 五六结合 → 改革飞跃”排序',
    cardId: 'p-080',
    items: [
      { id: 's1', label: '六届六中全会《论新阶段》（正式提出第一次结合命题）', hint: '1938 · 六六结合' },
      { id: 's2', label: '中共七大确立毛泽东思想（第一次历史性飞跃）', hint: '1945 · 七大飞跃' },
      { id: 's3', label: '《论十大关系》提出“第二次结合”', hint: '1956 · 五六结合' },
      { id: 's4', label: '改革开放后形成中国特色社会主义理论体系（第二次飞跃）', hint: '1978 后 · 改革飞跃' },
    ],
  },
];

/**
 * 精校版红叉排雷 · 秒判正误题（直接提炼自原文所有 ❌ 干扰项与配对 ✅ 正解）
 */
export const TRAP_JUDGE_ITEMS: TrapJudgeItem[] = [
  {
    id: 't-008-x',
    statement: '人类实践活动使物质世界二重化为「现实世界与虚拟世界」。',
    isTrue: false,
    explanation: '经典错项！物质世界的二重化是指：从自然界中分化出人类社会，从客观世界中分化出主观世界。',
    cardId: 'p-008',
  },
  {
    id: 't-008-ok',
    statement: '人类改造世界的实践活动使世界发生二重分化：从自然界分化出人类社会，从客观世界分化出主观世界。',
    isTrue: true,
    explanation: '正确！这是物质世界二重化的标准表述。',
    cardId: 'p-008',
  },
  {
    id: 't-014-x',
    statement: '法人资本所有制的主要特点是：资本占有主体多元化，公司资本的所有权与控制权不再统一。',
    isTrue: false,
    explanation: '张冠李戴！“所有权和控制权不再统一”是私人股份所有制；法人资本所有制是法人狠狠独揽大权，所有权与控制权趋于合一。',
    cardId: 'p-014',
  },
  {
    id: 't-016-x1',
    statement: '在资本主义制度下，工人的工资实质上是「劳动」的价值或价格。',
    isTrue: false,
    explanation: '高频陷阱！工人的工资是「劳动力」的价值或价格，不是“劳动”的价值或价格（这是工资掩盖剥削的假象）。',
    cardId: 'p-016',
  },
  {
    id: 't-016-x2',
    statement: '在资本主义制度下，劳动者获得的工资远远小于劳动力的价值。',
    isTrue: false,
    explanation: '错误！工资在量上等于（或围绕）劳动力的价值，资本家剥削的是劳动力创造的超过劳动力价值的那部分剩余价值。',
    cardId: 'p-016',
  },
  {
    id: 't-016-ok',
    statement: '资本主义制度下，工人的工资是劳动力的价值或价格。',
    isTrue: true,
    explanation: '正确！牢记“劳动力”三字，看到“劳动的价值”直接判错。',
    cardId: 'p-016',
  },
  {
    id: 't-028-x',
    statement: '价值规律在市场配置资源过程中能够自发地调节雇佣工人与资本家之间的利益再分配。',
    isTrue: false,
    explanation: '经典干扰项！价值规律自发调节的是社会收入分配（生产者之间的分化），不会调节雇佣工人与资本家之间的剥削利益再分配。',
    cardId: 'p-028',
  },
  {
    id: 't-032-x1',
    statement: '平均利润形成后，商品价值转化为生产价格，生产价格不再随着商品价值的变化而变动。',
    isTrue: false,
    explanation: '错误！生产价格只是价值的转化形式，依然随着商品价值的变化而变动，并没有否定价值规律。',
    cardId: 'p-032',
  },
  {
    id: 't-032-x2',
    statement: '平均利润形成后，每一个生产部门获得的利润都等于该部门生产的剩余价值。',
    isTrue: false,
    explanation: '错误！单个部门的利润与剩余价值可以不等，是“全社会”平均利润总额等于全社会剩余价值总额。',
    cardId: 'p-032',
  },
  {
    id: 't-032-ok',
    statement: '平均利润的形成是不同生产部门资本家之间竞争的结果，而超额利润是同一部门内不同企业竞争的结果。',
    isTrue: true,
    explanation: '正确！记住“不同赛道竞争出平均利润，同一赛道竞争出超额利润”。',
    cardId: 'p-032',
  },
  {
    id: 't-039-x',
    statement: '甲午战争的惨败使中国陷入“边疆危机”。',
    isTrue: false,
    explanation: '时间错位！19 世纪 70 至 80 年代（甲午战争 1894 之前），列强蚕食周边邻国与中国边疆已使中国陷入“边疆危机”。',
    cardId: 'p-039',
  },
  {
    id: 't-041-x',
    statement: '早期维新派代表郑观应在《盛世危言》中追求实行民主共和制度。',
    isTrue: false,
    explanation: '经典埋坑！郑观应主张的是“君民共主”（君主立宪倾向），不是资产阶级民主共和制。',
    cardId: 'p-041',
  },
  {
    id: 't-058-x',
    statement: '抗日民族统一战线的策略总方针是：发展进步势力，依靠中间势力，孤立顽固势力。',
    isTrue: false,
    explanation: '一字之差！对中间势力是「争取」（不是“依靠”！），即：发展进步势力，争取中间势力，孤立顽固势力。',
    cardId: 'p-058',
  },
  {
    id: 't-066-x',
    statement: '1952 年左右，我国工业化建设已经取得巨大成就。',
    isTrue: false,
    explanation: '时间错误！1952 年底完成的是国民经济恢复，“一五”计划 1953 年才开始实施。',
    cardId: 'p-066',
  },
  {
    id: 't-069-x',
    statement: '我国社会主义改造成功的历史经验包括：认识到公有制经济可以和非公有制经济共同发展。',
    isTrue: false,
    explanation: '反了！对“公有制经济可以和非公有制经济共同发展”缺乏认识，恰恰是当时社会主义改造中的一个偏差。',
    cardId: 'p-069',
  },
  {
    id: 't-077-x1',
    statement: '土地革命时期，中国共产党一贯坚持“地主不分田，富农分坏田”的正确土地政策。',
    isTrue: false,
    explanation: '错误！“地主不分田，富农分坏田”是王明“左”倾教条主义错误；正确政策是限制富农、给地主以生活出路。',
    cardId: 'p-077',
  },
  {
    id: 't-077-x2',
    statement: '解放战争和土改时期，党实行没收地主土地、不再对地主分配土地的政策。',
    isTrue: false,
    explanation: '错误！没收地主土地的同时，仍给地主分一份同样土地使其自食其力（“给出路”）。',
    cardId: 'p-077',
  },
  {
    id: 't-080-x1',
    statement: '中国早期的马克思主义思想运动从一开始就明确提出了“马克思主义与中国实际相结合”的命题。',
    isTrue: false,
    explanation: '高频易混！早期马克思主义者只是“在实际上初步形成”了这种思想；正式明确提出该命题是在 1938 年六届六中全会。',
    cardId: 'p-080',
  },
  {
    id: 't-080-x2',
    statement: '中国早期的马克思主义者一开始就坚持了马克思主义中国化的革命原则和正确方向。',
    isTrue: false,
    explanation: '错误！早期阶段尚未明确提出并全面坚持“马克思主义中国化”（反例：后来还出现过教条主义曲折）。',
    cardId: 'p-080',
  },
  {
    id: 't-080-ok1',
    statement: '中国共产党所领导的改革开放，从一开始就具有明确的社会主义方向。',
    isTrue: true,
    explanation: '正确！四大提法辨析中，这条是肯定正确的标准表述。',
    cardId: 'p-080',
  },
  {
    id: 't-080-x3',
    statement: '中国特色社会主义理论体系涵盖中国革命和建设的全部历史经验。',
    isTrue: false,
    explanation: '口诀记死：毛泽东思想无改革（管革命+建设），中国特色社会主义理论体系无革命（管建设+改革）！',
    cardId: 'p-080',
  },
  {
    id: 't-080-x4',
    statement: '邓小平同志领导完成了马克思主义同中国具体实际的“第二次结合”。',
    isTrue: false,
    explanation: '经典坑点！毛泽东没有完成第二次结合，邓小平也没有完成第二次结合，这是一个持续推进的长期历史过程。',
    cardId: 'p-080',
  },
];

function shuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * 动态生成政经计算题（覆盖知识点 033 资本有机构成/剩余价值率求利润 + 034 绝对/相对剩余价值率）
 */
export function generatePolEconCalcProblem(seedIndex = Math.random()): PolEconCalcProblem {
  const mode = seedIndex < 0.4 ? 'organic' : seedIndex < 0.7 ? 'absolute' : 'relative';

  if (mode === 'organic') {
    const ratios: [number, number][] = [
      [3, 1],
      [4, 1],
      [7, 1],
      [3, 2],
      [4, 1],
      [9, 1],
    ];
    const [rc, rv] = ratios[Math.floor(Math.random() * ratios.length)];
    const unit = [10, 20, 25, 40, 50][Math.floor(Math.random() * 5)];
    const total = (rc + rv) * unit;
    const c = rc * unit;
    const v = rv * unit;
    const ratePct = [100, 150, 200, 250, 300][Math.floor(Math.random() * 5)];
    const m = Math.round((v * ratePct) / 100);

    const distractors = new Set<number>([m]);
    const candidates = [
      Math.round((c * ratePct) / 100), // 常见错法：拿 c 乘剩余价值率
      Math.round((total * ratePct) / 100), // 常见错法：拿总资本乘
      Math.round(m / 2),
      m + v,
      v,
    ];
    for (const cand of candidates) {
      if (cand > 0 && distractors.size < 4) distractors.add(cand);
    }
    let bump = 10;
    while (distractors.size < 4) {
      distractors.add(m + bump);
      bump += 10;
    }
    const choicesNum = shuffle(Array.from(distractors));
    const choices = choicesNum.map((n) => `${n} 万元`);
    const correctIndex = choicesNum.indexOf(m);

    return {
      id: `calc-org-${Date.now()}-${Math.random()}`,
      kind: 'organic',
      title: '资本有机构成与利润计算（知识点 033）',
      prompt: `某资本家投资 ${total} 万元，预付资本的有机构成 c : v = ${rc} : ${rv}，每次投资的剩余价值率为 ${ratePct}%。该资本家每次投资获得的利润（剩余价值 m）是多少？`,
      choices,
      correctIndex,
      steps: [
        `投资总额 = c + v = ${total} 万元，且 c : v = ${rc} : ${rv}`,
        `求出可变资本 v = ${total} × ${rv}/(${rc}+${rv}) = ${v} 万元（不变资本 c = ${c} 万元）`,
        `剩余价值率 m' = m / v = ${ratePct}%，故 m = ${v} × ${ratePct}% = ${m} 万元`,
        `利润与剩余价值在量上相等，故利润 = ${m} 万元`,
      ],
      cardId: 'p-033',
    };
  }

  if (mode === 'absolute') {
    const basePairs: [number, number, number][] = [
      [8, 4, 2],
      [8, 4, 4],
      [10, 5, 2],
      [10, 4, 2],
      [12, 6, 3],
    ];
    const [totalH, necH, addH] = basePairs[Math.floor(Math.random() * basePairs.length)];
    const origSurplus = totalH - necH;
    const newSurplus = origSurplus + addH;
    const rate = Math.round((newSurplus / necH) * 100);
    const wrongRelRate = necH > addH ? Math.round((newSurplus / (necH - addH)) * 100) : rate + 50;
    const origRate = Math.round((origSurplus / necH) * 100);

    const set = new Set<number>([rate]);
    for (const cand of [wrongRelRate, origRate, Math.round(((totalH + addH) / necH) * 100), rate + 50, Math.max(25, rate - 25)]) {
      if (cand > 0 && set.size < 4) set.add(cand);
    }
    const choicesNum = shuffle(Array.from(set));
    return {
      id: `calc-abs-${Date.now()}-${Math.random()}`,
      kind: 'absolute',
      title: '绝对剩余价值率计算（知识点 034）',
      prompt: `若原工作日为 ${totalH} 小时，其中必要劳动时间 ${necH} 小时、剩余劳动时间 ${origSurplus} 小时。现采用【绝对剩余价值】生产方法，使剩余劳动时间延长 ${addH} 小时，新的剩余价值率是多少？`,
      choices: choicesNum.map((n) => `${n}%`),
      correctIndex: choicesNum.indexOf(rate),
      steps: [
        `绝对剩余价值方法：直接延长总工作日长度，必要劳动时间不变（仍为 ${necH} 小时）`,
        `新的总时长 = ${totalH} + ${addH} = ${totalH + addH} 小时，新剩余劳动时间 = ${origSurplus} + ${addH} = ${newSurplus} 小时`,
        `剩余价值率 = 剩余劳动时间 ÷ 必要劳动时间 = ${newSurplus} ÷ ${necH} × 100% = ${rate}%`,
      ],
      cardId: 'p-034',
    };
  }

  // relative surplus value
  const relPairs: [number, number, number][] = [
    [8, 4, 2],
    [10, 5, 3],
    [12, 6, 2],
    [12, 6, 3],
    [8, 5, 3],
  ];
  const [totalH, necH, shiftH] = relPairs[Math.floor(Math.random() * relPairs.length)];
  const origSurplus = totalH - necH;
  const newNec = necH - shiftH;
  const newSurplus = origSurplus + shiftH;
  const rate = Math.round((newSurplus / newNec) * 100);
  const wrongAbsRate = Math.round((newSurplus / necH) * 100);
  const origRate = Math.round((origSurplus / necH) * 100);

  const set = new Set<number>([rate]);
  for (const cand of [wrongAbsRate, origRate, Math.round((totalH / newNec) * 100), rate + 100, Math.max(50, rate - 50)]) {
    if (cand > 0 && set.size < 4) set.add(cand);
  }
  const choicesNum = shuffle(Array.from(set));
  return {
    id: `calc-rel-${Date.now()}-${Math.random()}`,
    kind: 'relative',
    title: '相对剩余价值率计算（知识点 034）',
    prompt: `若原工作日为 ${totalH} 小时，其中必要劳动时间 ${necH} 小时、剩余劳动时间 ${origSurplus} 小时。现采用【相对剩余价值】生产方法，在工作日总长度不变的情况下，使剩余劳动时间增加 ${shiftH} 小时，新的剩余价值率是多少？`,
    choices: choicesNum.map((n) => `${n}%`),
    correctIndex: choicesNum.indexOf(rate),
    steps: [
      `相对剩余价值方法：工作日总时长保持 ${totalH} 小时不变，靠缩短必要劳动时间来相对延长剩余劳动时间`,
      `新必要劳动时间 = ${necH} - ${shiftH} = ${newNec} 小时；新剩余劳动时间 = ${origSurplus} + ${shiftH} = ${newSurplus} 小时`,
      `剩余价值率 = 剩余劳动时间 ÷ 必要劳动时间 = ${newSurplus} ÷ ${newNec} × 100% = ${rate}%`,
    ],
    cardId: 'p-034',
  };
}
