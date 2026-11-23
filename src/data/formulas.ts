export type FormulaSubjectId = 'calculus' | 'linalg' | 'probstat' | 'signals';

export interface FormulaSubjectMeta {
  id: FormulaSubjectId;
  name: string;
  fullName: string;
}

export interface FormulaSection {
  id: string;
  subject: FormulaSubjectId;
  code: string;
  title: string;
  fullTitle: string;
  questionIds: string[];
}

export interface FormulaItem {
  id: string;
  num: number;
  code: string;
  subject: FormulaSubjectId;
  sectionId: string;
  question: string;
  answer: string;
  answerParts: string[];
  hasBlank: boolean;
}

export interface FormulaVerificationNote {
  title: string;
  body: string;
}

export const FORMULA_SUBJECTS: FormulaSubjectMeta[] = [
  { id: 'calculus', name: '高数', fullName: '高等数学' },
  { id: 'linalg', name: '线代', fullName: '线性代数' },
  { id: 'probstat', name: '概率统计', fullName: '概率论与数理统计' },
  { id: 'signals', name: '信号系统', fullName: '信号与系统' },
];

export const FORMULA_SUBJECT_MAP: Record<FormulaSubjectId, FormulaSubjectMeta> = {
  calculus: FORMULA_SUBJECTS[0],
  linalg: FORMULA_SUBJECTS[1],
  probstat: FORMULA_SUBJECTS[2],
  signals: FORMULA_SUBJECTS[3],
};

export const FORMULA_SECTIONS: FormulaSection[] = [
  {
    "id": "calc-01",
    "subject": "calculus",
    "code": "高数 01",
    "title": "无穷大量比较与基本极限",
    "fullTitle": "高数 01｜无穷大量比较与基本极限",
    "questionIds": [
      "f-001",
      "f-002",
      "f-003",
      "f-004",
      "f-005",
      "f-006",
      "f-007",
      "f-008",
      "f-009"
    ]
  },
  {
    "id": "calc-02",
    "subject": "calculus",
    "code": "高数 02",
    "title": "$1^\\infty$ 型极限与存在性",
    "fullTitle": "高数 02｜$1^\\infty$ 型极限与存在性",
    "questionIds": [
      "f-010",
      "f-011",
      "f-012",
      "f-013",
      "f-014",
      "f-015",
      "f-016"
    ]
  },
  {
    "id": "calc-03",
    "subject": "calculus",
    "code": "高数 03",
    "title": "等价无穷小与高阶比较",
    "fullTitle": "高数 03｜等价无穷小与高阶比较",
    "questionIds": [
      "f-017",
      "f-018",
      "f-019",
      "f-020",
      "f-021",
      "f-022",
      "f-023",
      "f-024",
      "f-025",
      "f-026",
      "f-027",
      "f-028",
      "f-029"
    ]
  },
  {
    "id": "calc-04",
    "subject": "calculus",
    "code": "高数 04",
    "title": "泰勒 / 麦克劳林公式",
    "fullTitle": "高数 04｜泰勒 / 麦克劳林公式",
    "questionIds": [
      "f-030",
      "f-031",
      "f-032",
      "f-033",
      "f-034",
      "f-035",
      "f-036"
    ]
  },
  {
    "id": "calc-05",
    "subject": "calculus",
    "code": "高数 05",
    "title": "常见极限题型与反常积分",
    "fullTitle": "高数 05｜常见极限题型与反常积分",
    "questionIds": [
      "f-037",
      "f-038",
      "f-039",
      "f-040",
      "f-041",
      "f-042",
      "f-043",
      "f-044",
      "f-045",
      "f-046",
      "f-047"
    ]
  },
  {
    "id": "calc-06",
    "subject": "calculus",
    "code": "高数 06",
    "title": "基本导数、高阶导数与定义",
    "fullTitle": "高数 06｜基本导数、高阶导数与定义",
    "questionIds": [
      "f-048",
      "f-049",
      "f-050",
      "f-051",
      "f-052",
      "f-053",
      "f-054",
      "f-055",
      "f-056",
      "f-057",
      "f-058",
      "f-059",
      "f-060",
      "f-061",
      "f-062"
    ]
  },
  {
    "id": "calc-07",
    "subject": "calculus",
    "code": "高数 07",
    "title": "间断点、中值定理与渐近线",
    "fullTitle": "高数 07｜间断点、中值定理与渐近线",
    "questionIds": [
      "f-063",
      "f-064",
      "f-065",
      "f-066",
      "f-067",
      "f-068",
      "f-069",
      "f-070"
    ]
  },
  {
    "id": "calc-08",
    "subject": "calculus",
    "code": "高数 08",
    "title": "偏导、极值与条件极值",
    "fullTitle": "高数 08｜偏导、极值与条件极值",
    "questionIds": [
      "f-071",
      "f-072",
      "f-073",
      "f-074",
      "f-075",
      "f-076",
      "f-077",
      "f-078"
    ]
  },
  {
    "id": "calc-09",
    "subject": "calculus",
    "code": "高数 09",
    "title": "积分基本公式与三角恒等式",
    "fullTitle": "高数 09｜积分基本公式与三角恒等式",
    "questionIds": [
      "f-079",
      "f-080",
      "f-081",
      "f-082",
      "f-083",
      "f-084",
      "f-085",
      "f-086",
      "f-087",
      "f-088",
      "f-089",
      "f-090",
      "f-091",
      "f-092"
    ]
  },
  {
    "id": "calc-10",
    "subject": "calculus",
    "code": "高数 10",
    "title": "旋转体、微分方程、幂级数",
    "fullTitle": "高数 10｜旋转体、微分方程、幂级数",
    "questionIds": [
      "f-093",
      "f-094",
      "f-095",
      "f-096",
      "f-097",
      "f-098",
      "f-099",
      "f-100",
      "f-101",
      "f-102",
      "f-103"
    ]
  },
  {
    "id": "calc-11",
    "subject": "calculus",
    "code": "高数 11",
    "title": "数项级数与傅里叶级数",
    "fullTitle": "高数 11｜数项级数与傅里叶级数",
    "questionIds": [
      "f-104",
      "f-105",
      "f-106",
      "f-107",
      "f-108",
      "f-109",
      "f-110",
      "f-111",
      "f-112",
      "f-113",
      "f-114",
      "f-115",
      "f-116"
    ]
  },
  {
    "id": "calc-12",
    "subject": "calculus",
    "code": "高数 12",
    "title": "空间向量、平面直线、二次曲面",
    "fullTitle": "高数 12｜空间向量、平面直线、二次曲面",
    "questionIds": [
      "f-117",
      "f-118",
      "f-119",
      "f-120",
      "f-121",
      "f-122",
      "f-123",
      "f-124",
      "f-125",
      "f-126",
      "f-127",
      "f-128",
      "f-129"
    ]
  },
  {
    "id": "calc-13",
    "subject": "calculus",
    "code": "高数 13",
    "title": "曲线曲面积分与向量分析",
    "fullTitle": "高数 13｜曲线曲面积分与向量分析",
    "questionIds": [
      "f-130",
      "f-131",
      "f-132",
      "f-133",
      "f-134",
      "f-135",
      "f-136",
      "f-137",
      "f-138",
      "f-139",
      "f-140",
      "f-141",
      "f-142",
      "f-143",
      "f-144"
    ]
  },
  {
    "id": "la-01",
    "subject": "linalg",
    "code": "线代 01",
    "title": "行列式、转置与线性方程组",
    "fullTitle": "线代 01｜行列式、转置与线性方程组",
    "questionIds": [
      "f-145",
      "f-146",
      "f-147",
      "f-148",
      "f-149",
      "f-150",
      "f-151",
      "f-152",
      "f-153",
      "f-154",
      "f-155",
      "f-156",
      "f-157",
      "f-158"
    ]
  },
  {
    "id": "la-02",
    "subject": "linalg",
    "code": "线代 02",
    "title": "矩阵等价、合同、相似与秩",
    "fullTitle": "线代 02｜矩阵等价、合同、相似与秩",
    "questionIds": [
      "f-159",
      "f-160",
      "f-161",
      "f-162",
      "f-163",
      "f-164",
      "f-165",
      "f-166",
      "f-167",
      "f-168",
      "f-169",
      "f-170",
      "f-171",
      "f-172"
    ]
  },
  {
    "id": "la-03",
    "subject": "linalg",
    "code": "线代 03",
    "title": "伴随矩阵、特征值与二次型",
    "fullTitle": "线代 03｜伴随矩阵、特征值与二次型",
    "questionIds": [
      "f-173",
      "f-174",
      "f-175",
      "f-176",
      "f-177",
      "f-178",
      "f-179",
      "f-180",
      "f-181",
      "f-182",
      "f-183",
      "f-184",
      "f-185",
      "f-186",
      "f-187",
      "f-188",
      "f-189"
    ]
  },
  {
    "id": "prob-01",
    "subject": "probstat",
    "code": "概率 01",
    "title": "常见离散、连续分布",
    "fullTitle": "概率 01｜常见离散、连续分布",
    "questionIds": [
      "f-190",
      "f-191",
      "f-192",
      "f-193",
      "f-194",
      "f-195",
      "f-196",
      "f-197",
      "f-198",
      "f-199",
      "f-200",
      "f-201",
      "f-202"
    ]
  },
  {
    "id": "prob-02",
    "subject": "probstat",
    "code": "概率 02",
    "title": "数字特征、切比雪夫与极限定理",
    "fullTitle": "概率 02｜数字特征、切比雪夫与极限定理",
    "questionIds": [
      "f-203",
      "f-204",
      "f-205",
      "f-206",
      "f-207",
      "f-208",
      "f-209",
      "f-210",
      "f-211",
      "f-212",
      "f-213",
      "f-214",
      "f-215",
      "f-216"
    ]
  },
  {
    "id": "stat-01",
    "subject": "probstat",
    "code": "统计 01",
    "title": "抽样分布、区间估计与正态运算",
    "fullTitle": "统计 01｜抽样分布、区间估计与正态运算",
    "questionIds": [
      "f-217",
      "f-218",
      "f-219",
      "f-220",
      "f-221",
      "f-222",
      "f-223",
      "f-224",
      "f-225",
      "f-226",
      "f-227",
      "f-228",
      "f-229",
      "f-230",
      "f-231",
      "f-232",
      "f-233",
      "f-234",
      "f-235"
    ]
  },
  {
    "id": "sig-01",
    "subject": "signals",
    "code": "信号 01",
    "title": "傅里叶、拉普拉斯与 $Z$ 变换的定义",
    "fullTitle": "信号 01｜傅里叶、拉普拉斯与 $Z$ 变换的定义",
    "questionIds": [
      "f-236",
      "f-237",
      "f-238",
      "f-239",
      "f-240",
      "f-241",
      "f-242",
      "f-243",
      "f-244",
      "f-245",
      "f-246",
      "f-247"
    ]
  },
  {
    "id": "sig-02",
    "subject": "signals",
    "code": "信号 02",
    "title": "冲激、阶跃、功率与帕塞瓦尔",
    "fullTitle": "信号 02｜冲激、阶跃、功率与帕塞瓦尔",
    "questionIds": [
      "f-248",
      "f-249",
      "f-250",
      "f-251",
      "f-252",
      "f-253",
      "f-254",
      "f-255",
      "f-256",
      "f-257",
      "f-258",
      "f-259",
      "f-260",
      "f-261",
      "f-262"
    ]
  },
  {
    "id": "sig-03",
    "subject": "signals",
    "code": "信号 03",
    "title": "傅里叶级数、频谱与 LTI 性质",
    "fullTitle": "信号 03｜傅里叶级数、频谱与 LTI 性质",
    "questionIds": [
      "f-263",
      "f-264",
      "f-265",
      "f-266",
      "f-267",
      "f-268",
      "f-269",
      "f-270",
      "f-271",
      "f-272",
      "f-273",
      "f-274",
      "f-275",
      "f-276",
      "f-277"
    ]
  },
  {
    "id": "sig-04",
    "subject": "signals",
    "code": "信号 04",
    "title": "三大变换的常用变换对",
    "fullTitle": "信号 04｜三大变换的常用变换对",
    "questionIds": [
      "f-278",
      "f-279",
      "f-280",
      "f-281",
      "f-282",
      "f-283",
      "f-284",
      "f-285",
      "f-286",
      "f-287",
      "f-288",
      "f-289",
      "f-290",
      "f-291",
      "f-292",
      "f-293",
      "f-294",
      "f-295",
      "f-296",
      "f-297"
    ]
  },
  {
    "id": "sig-05",
    "subject": "signals",
    "code": "信号 05",
    "title": "三大变换性质及卷积",
    "fullTitle": "信号 05｜三大变换性质及卷积",
    "questionIds": [
      "f-298",
      "f-299",
      "f-300",
      "f-301",
      "f-302",
      "f-303",
      "f-304",
      "f-305",
      "f-306",
      "f-307",
      "f-308",
      "f-309",
      "f-310",
      "f-311",
      "f-312",
      "f-313",
      "f-314",
      "f-315",
      "f-316",
      "f-317",
      "f-318"
    ]
  },
  {
    "id": "sig-06",
    "subject": "signals",
    "code": "信号 06",
    "title": "频域电路与知识口诀",
    "fullTitle": "信号 06｜频域电路与知识口诀",
    "questionIds": [
      "f-319",
      "f-320",
      "f-321",
      "f-322",
      "f-323",
      "f-324",
      "f-325",
      "f-326",
      "f-327",
      "f-328"
    ]
  }
];

export const FORMULA_SECTION_MAP: Record<string, FormulaSection> = Object.fromEntries(
  FORMULA_SECTIONS.map((s) => [s.id, s])
);

export const FORMULAS: FormulaItem[] = [
  {
    "id": "f-001",
    "num": 1,
    "code": "001",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "当 $x\\to+\\infty$，按增长速度从慢到快写出 $\\ln^a x,\\ x^b,\\ c^x$ 的顺序（$a,b>0,c>1$）。",
    "hasBlank": false,
    "answer": "$\\ln^a x\\ll x^b\\ll c^x$",
    "answerParts": [
      "$\\ln^a x\\ll x^b\\ll c^x$"
    ]
  },
  {
    "id": "f-002",
    "num": 2,
    "code": "002",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "当 $n\\to\\infty$，排序 $\\ln^a n,\\ n^b,\\ q^n,\\ n!,\\ n^n$（$a,b>0,q>1$）。",
    "hasBlank": false,
    "answer": "$\\ln^a n\\ll n^b\\ll q^n\\ll n!\\ll n^n$",
    "answerParts": [
      "$\\ln^a n\\ll n^b\\ll q^n\\ll n!\\ll n^n$"
    ]
  },
  {
    "id": "f-003",
    "num": 3,
    "code": "003",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "基本极限 $\\displaystyle\\lim_{x\\to0}\\frac{\\sin x}{x}=$ ________________",
    "hasBlank": true,
    "answer": "$1$",
    "answerParts": [
      "$1$"
    ]
  },
  {
    "id": "f-004",
    "num": 4,
    "code": "004",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "基本极限 $\\displaystyle\\lim_{x\\to0}(1+x)^{1/x}=$ ________________",
    "hasBlank": true,
    "answer": "$e$",
    "answerParts": [
      "$e$"
    ]
  },
  {
    "id": "f-005",
    "num": 5,
    "code": "005",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "基本极限 $\\displaystyle\\lim_{x\\to\\infty}(1+1/x)^x=$ ________________",
    "hasBlank": true,
    "answer": "$e$",
    "answerParts": [
      "$e$"
    ]
  },
  {
    "id": "f-006",
    "num": 6,
    "code": "006",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "基本极限 $\\displaystyle\\lim_{x\\to0}\\frac{a^x-1}{x}=$ ________________",
    "hasBlank": true,
    "answer": "$\\ln a\\ (a>0)$",
    "answerParts": [
      "$\\ln a\\ (a>0)$"
    ]
  },
  {
    "id": "f-007",
    "num": 7,
    "code": "007",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "基本极限 $\\displaystyle\\lim_{n\\to\\infty}\\sqrt[n]{n}=$ ________________",
    "hasBlank": true,
    "answer": "$1$",
    "answerParts": [
      "$1$"
    ]
  },
  {
    "id": "f-008",
    "num": 8,
    "code": "008",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "基本极限 $\\displaystyle\\lim_{n\\to\\infty}\\sqrt[n]{a}=$ ________________",
    "hasBlank": true,
    "answer": "$1\\ (a>0)$",
    "answerParts": [
      "$1\\ (a>0)$"
    ]
  },
  {
    "id": "f-009",
    "num": 9,
    "code": "009",
    "subject": "calculus",
    "sectionId": "calc-01",
    "question": "无穷远处 $\\ln n$ 与 $n^b$、$n^b$ 与 $q^n$ 分别是什么量级关系？",
    "hasBlank": false,
    "answer": "$\\ln n=o(n^b),\\ n^b=o(q^n)$",
    "answerParts": [
      "$\\ln n=o(n^b),\\ n^b=o(q^n)$"
    ]
  },
  {
    "id": "f-010",
    "num": 10,
    "code": "010",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "已知 $\\alpha(x)\\to0,\\ \\beta(x)\\to\\infty,\\ \\alpha\\beta\\to A$，默写 $\\lim(1+\\alpha)^{\\beta}$。",
    "hasBlank": false,
    "answer": "$e^A$",
    "answerParts": [
      "$e^A$"
    ]
  },
  {
    "id": "f-011",
    "num": 11,
    "code": "011",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "$1^\\infty$ 型极限解题三步：先改写为 ________________；再求 ________________；最后 ________________。",
    "hasBlank": true,
    "answer": "底数写成 $1+\\alpha$；求 $\\lim\\alpha\\beta=A$；得 $e^A$",
    "answerParts": [
      "底数写成 $1+\\alpha$",
      "求 $\\lim\\alpha\\beta=A$",
      "得 $e^A$"
    ]
  },
  {
    "id": "f-012",
    "num": 12,
    "code": "012",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "当 $\\alpha\\to0$ 且 $\\alpha\\beta\\to0$，$(1+\\alpha)^\\beta-1\\sim$ ________________",
    "hasBlank": true,
    "answer": "$\\alpha\\beta$",
    "answerParts": [
      "$\\alpha\\beta$"
    ]
  },
  {
    "id": "f-013",
    "num": 13,
    "code": "013",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "若 $\\lim f(x)/g(x)=A\\ne0$ 且 $\\lim f(x)=0$，则 $\\lim g(x)=$ ________________",
    "hasBlank": true,
    "answer": "$0$",
    "answerParts": [
      "$0$"
    ]
  },
  {
    "id": "f-014",
    "num": 14,
    "code": "014",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "若 $\\lim f(x)/g(x)$ 存在有限值且 $g(x)\\to0$，则 $f(x)\\to$ ________________",
    "hasBlank": true,
    "answer": "$0$",
    "answerParts": [
      "$0$"
    ]
  },
  {
    "id": "f-015",
    "num": 15,
    "code": "015",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "如果 $\\lim(f\\pm g)$ 存在，能推出 $\\lim f$、$\\lim g$ 各自存在吗？",
    "hasBlank": false,
    "answer": "不能。例如 $f=x,\\ g=-x$（$x\\to\\infty$）",
    "answerParts": [
      "不能。例如 $f=x,\\ g=-x$（$x\\to\\infty$）"
    ]
  },
  {
    "id": "f-016",
    "num": 16,
    "code": "016",
    "subject": "calculus",
    "sectionId": "calc-02",
    "question": "如果 $\\lim(fg)$ 存在，能推出两个因子的极限都存在吗？",
    "hasBlank": false,
    "answer": "不能。例如 $f=\\sin x,\\ g=0$",
    "answerParts": [
      "不能。例如 $f=\\sin x,\\ g=0$"
    ]
  },
  {
    "id": "f-017",
    "num": 17,
    "code": "017",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，默写与 $x$ 等价的六个常用表达式。",
    "hasBlank": false,
    "answer": "$\\sin x,\\ \\tan x,\\ \\arcsin x,\\ \\arctan x,\\ \\ln(1+x),\\ e^x-1$",
    "answerParts": [
      "$\\sin x,\\ \\tan x,\\ \\arcsin x,\\ \\arctan x,\\ \\ln(1+x),\\ e^x-1$"
    ]
  },
  {
    "id": "f-018",
    "num": 18,
    "code": "018",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$a^x-1\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x\\ln a\\ (a>0,a\\ne1)$",
    "answerParts": [
      "$x\\ln a\\ (a>0,a\\ne1)$"
    ]
  },
  {
    "id": "f-019",
    "num": 19,
    "code": "019",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$(1+x)^a-1\\sim$ ________________",
    "hasBlank": true,
    "answer": "$ax$",
    "answerParts": [
      "$ax$"
    ]
  },
  {
    "id": "f-020",
    "num": 20,
    "code": "020",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$1-\\cos x\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^2/2$",
    "answerParts": [
      "$x^2/2$"
    ]
  },
  {
    "id": "f-021",
    "num": 21,
    "code": "021",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$x-\\ln(1+x)\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^2/2$",
    "answerParts": [
      "$x^2/2$"
    ]
  },
  {
    "id": "f-022",
    "num": 22,
    "code": "022",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$e^x-1-x\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^2/2$",
    "answerParts": [
      "$x^2/2$"
    ]
  },
  {
    "id": "f-023",
    "num": 23,
    "code": "023",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$x-\\sin x\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^3/6$",
    "answerParts": [
      "$x^3/6$"
    ]
  },
  {
    "id": "f-024",
    "num": 24,
    "code": "024",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$\\tan x-x\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^3/3$",
    "answerParts": [
      "$x^3/3$"
    ]
  },
  {
    "id": "f-025",
    "num": 25,
    "code": "025",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$x-\\arctan x\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^3/3$",
    "answerParts": [
      "$x^3/3$"
    ]
  },
  {
    "id": "f-026",
    "num": 26,
    "code": "026",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "当 $x\\to0$，$\\arcsin x-x\\sim$ ________________",
    "hasBlank": true,
    "answer": "$x^3/6$",
    "answerParts": [
      "$x^3/6$"
    ]
  },
  {
    "id": "f-027",
    "num": 27,
    "code": "027",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "等价无穷小替换可直接用于乘除结构吗？加减结构呢？",
    "hasBlank": false,
    "answer": "乘除通常可；加减通常不可，须先化简或展开",
    "answerParts": [
      "乘除通常可",
      "加减通常不可，须先化简或展开"
    ]
  },
  {
    "id": "f-028",
    "num": 28,
    "code": "028",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "比较 $\\ln(1+x),\\ x,\\ e^x-1$ 到二阶（写出相对大小）。",
    "hasBlank": false,
    "answer": "$\\ln(1+x)<x<e^x-1$（$x\\ne0$ 且靠近 $0$）",
    "answerParts": [
      "$\\ln(1+x)<x<e^x-1$（$x\\ne0$ 且靠近 $0$）"
    ]
  },
  {
    "id": "f-029",
    "num": 29,
    "code": "029",
    "subject": "calculus",
    "sectionId": "calc-03",
    "question": "比较 $\\arctan x,\\ \\sin x,\\ x,\\ \\arcsin x,\\ \\tan x$ 的三阶项（$x>0$ 小）。",
    "hasBlank": false,
    "answer": "$\\arctan x<\\sin x<x<\\arcsin x<\\tan x$",
    "answerParts": [
      "$\\arctan x<\\sin x<x<\\arcsin x<\\tan x$"
    ]
  },
  {
    "id": "f-030",
    "num": 30,
    "code": "030",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "默写 $e^x$ 在 $0$ 点的 $n$ 阶展开及余项。",
    "hasBlank": false,
    "answer": "$e^x=\\sum_{k=0}^n x^k/k!+o(x^n)$",
    "answerParts": [
      "$e^x=\\sum_{k=0}^n x^k/k!+o(x^n)$"
    ]
  },
  {
    "id": "f-031",
    "num": 31,
    "code": "031",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "默写 $\\sin x$ 在 $0$ 点至 $x^{2n-1}$ 的展开。",
    "hasBlank": false,
    "answer": "$\\sin x=\\sum_{k=0}^{n-1}(-1)^k x^{2k+1}/(2k+1)!+o(x^{2n-1})$",
    "answerParts": [
      "$\\sin x=\\sum_{k=0}^{n-1}(-1)^k x^{2k+1}/(2k+1)!+o(x^{2n-1})$"
    ]
  },
  {
    "id": "f-032",
    "num": 32,
    "code": "032",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "默写 $\\cos x$ 在 $0$ 点至 $x^{2n}$ 的展开。",
    "hasBlank": false,
    "answer": "$\\cos x=\\sum_{k=0}^{n}(-1)^k x^{2k}/(2k)!+o(x^{2n})$",
    "answerParts": [
      "$\\cos x=\\sum_{k=0}^{n}(-1)^k x^{2k}/(2k)!+o(x^{2n})$"
    ]
  },
  {
    "id": "f-033",
    "num": 33,
    "code": "033",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "默写 $\\ln(1+x)$ 在 $0$ 点的 $n$ 阶展开。",
    "hasBlank": false,
    "answer": "$\\ln(1+x)=\\sum_{k=1}^n(-1)^{k-1}x^k/k+o(x^n)$",
    "answerParts": [
      "$\\ln(1+x)=\\sum_{k=1}^n(-1)^{k-1}x^k/k+o(x^n)$"
    ]
  },
  {
    "id": "f-034",
    "num": 34,
    "code": "034",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "默写 $(1+x)^a$ 在 $0$ 点的 $n$ 阶展开。",
    "hasBlank": false,
    "answer": "$(1+x)^a=\\sum_{k=0}^n\\binom{a}{k}x^k+o(x^n)$",
    "answerParts": [
      "$(1+x)^a=\\sum_{k=0}^n\\binom{a}{k}x^k+o(x^n)$"
    ]
  },
  {
    "id": "f-035",
    "num": 35,
    "code": "035",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "展开 $e^{5x^2}-\\cos x^2$，写出首个非零项及对应的 $x$ 阶数。",
    "hasBlank": false,
    "answer": "$e^{5x^2}-\\cos x^2=5x^2+O(x^4)$，首项 $2$ 阶",
    "answerParts": [
      "$e^{5x^2}-\\cos x^2=5x^2+O(x^4)$，首项 $2$ 阶"
    ]
  },
  {
    "id": "f-036",
    "num": 36,
    "code": "036",
    "subject": "calculus",
    "sectionId": "calc-04",
    "question": "用级数或展开法求两项相消后的首个非零项，首先要注意什么？",
    "hasBlank": false,
    "answer": "保留到相消后第一个非零阶次",
    "answerParts": [
      "保留到相消后第一个非零阶次"
    ]
  },
  {
    "id": "f-037",
    "num": 37,
    "code": "037",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "求 $\\displaystyle\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\frac{k}{n^2+k}$。",
    "hasBlank": false,
    "answer": "$1/2$（按黎曼和或夹逼）",
    "answerParts": [
      "$1/2$（按黎曼和或夹逼）"
    ]
  },
  {
    "id": "f-038",
    "num": 38,
    "code": "038",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "求 $\\displaystyle\\lim_{n\\to\\infty}\\sum_{k=1}^{n}\\frac1{n+k}$。",
    "hasBlank": false,
    "answer": "$\\ln 2$（黎曼和）",
    "answerParts": [
      "$\\ln 2$（黎曼和）"
    ]
  },
  {
    "id": "f-039",
    "num": 39,
    "code": "039",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "分析 $\\displaystyle\\lim_{x\\to\\infty}\\left(\\sqrt[3]{x^3+x^2}-xe^{1/x}\\right)$。",
    "hasBlank": false,
    "answer": "$-2/3$（首阶展开）",
    "answerParts": [
      "$-2/3$（首阶展开）"
    ]
  },
  {
    "id": "f-040",
    "num": 40,
    "code": "040",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "写出无穷区间 $\\displaystyle\\int_a^{+\\infty}f(x)\\,dx$ 的定义。",
    "hasBlank": false,
    "answer": "$\\lim_{b\\to\\infty}\\int_a^b f(x)\\,dx$",
    "answerParts": [
      "$\\lim_{b\\to\\infty}\\int_a^b f(x)\\,dx$"
    ]
  },
  {
    "id": "f-041",
    "num": 41,
    "code": "041",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "写出 $\\displaystyle\\int_{-\\infty}^b f(x)\\,dx$ 的定义。",
    "hasBlank": false,
    "answer": "$\\lim_{a\\to-\\infty}\\int_a^b f(x)\\,dx$",
    "answerParts": [
      "$\\lim_{a\\to-\\infty}\\int_a^b f(x)\\,dx$"
    ]
  },
  {
    "id": "f-042",
    "num": 42,
    "code": "042",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "若函数在区间内点 $c$ 无界，$\\int_a^b f(x)dx$ 如何定义？",
    "hasBlank": false,
    "answer": "$\\int_a^c f+\\int_c^b f$ 两侧各取单侧极限且都收敛",
    "answerParts": [
      "$\\int_a^c f+\\int_c^b f$ 两侧各取单侧极限且都收敛"
    ]
  },
  {
    "id": "f-043",
    "num": 43,
    "code": "043",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "$\\displaystyle\\int_1^\\infty x^{-p}\\,dx$ 收敛条件是 ________________",
    "hasBlank": true,
    "answer": "$p>1$",
    "answerParts": [
      "$p>1$"
    ]
  },
  {
    "id": "f-044",
    "num": 44,
    "code": "044",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "$\\displaystyle\\int_0^1 x^{-p}\\,dx$ 收敛条件是 ________________",
    "hasBlank": true,
    "answer": "$p<1$",
    "answerParts": [
      "$p<1$"
    ]
  },
  {
    "id": "f-045",
    "num": 45,
    "code": "045",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "$\\displaystyle\\int_a^\\infty\\frac{dx}{x^p(\\ln x)^q}$（$a>1$）何时收敛？",
    "hasBlank": false,
    "answer": "$p>1$；或 $p=1,q>1$",
    "answerParts": [
      "$p>1$",
      "或 $p=1,q>1$"
    ]
  },
  {
    "id": "f-046",
    "num": 46,
    "code": "046",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "判断 $\\displaystyle\\lim_{x\\to0^+}e^{1/x}$ 与 $\\lim_{x\\to0^-}e^{1/x}$。",
    "hasBlank": false,
    "answer": "$+\\infty$，$0$",
    "answerParts": [
      "$+\\infty$，$0$"
    ]
  },
  {
    "id": "f-047",
    "num": 47,
    "code": "047",
    "subject": "calculus",
    "sectionId": "calc-05",
    "question": "遇到反常积分，首先应检查哪两类反常点？",
    "hasBlank": false,
    "answer": "无穷积分限与积分区间内函数的无界点",
    "answerParts": [
      "无穷积分限与积分区间内函数的无界点"
    ]
  },
  {
    "id": "f-048",
    "num": 48,
    "code": "048",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "常函数 $C$ 的导数；幂函数 $x^a$ 的导数。",
    "hasBlank": false,
    "answer": "$0$；$ax^{a-1}$",
    "answerParts": [
      "$0$",
      "$ax^{a-1}$"
    ]
  },
  {
    "id": "f-049",
    "num": 49,
    "code": "049",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "指数函数 $a^x$ 和 $e^x$ 的导数。",
    "hasBlank": false,
    "answer": "$a^x\\ln a$；$e^x$",
    "answerParts": [
      "$a^x\\ln a$",
      "$e^x$"
    ]
  },
  {
    "id": "f-050",
    "num": 50,
    "code": "050",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "$\\log_a x$ 与 $\\ln|x|$ 的导数。",
    "hasBlank": false,
    "answer": "$1/(x\\ln a)$；$1/x$",
    "answerParts": [
      "$1/(x\\ln a)$",
      "$1/x$"
    ]
  },
  {
    "id": "f-051",
    "num": 51,
    "code": "051",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "$\\sin x$ 与 $\\cos x$ 的导数。",
    "hasBlank": false,
    "answer": "$\\cos x$；$-\\sin x$",
    "answerParts": [
      "$\\cos x$",
      "$-\\sin x$"
    ]
  },
  {
    "id": "f-052",
    "num": 52,
    "code": "052",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "$\\tan x$ 与 $\\cot x$ 的导数。",
    "hasBlank": false,
    "answer": "$\\sec^2x$；$-\\csc^2x$",
    "answerParts": [
      "$\\sec^2x$",
      "$-\\csc^2x$"
    ]
  },
  {
    "id": "f-053",
    "num": 53,
    "code": "053",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "$\\sec x$ 与 $\\csc x$ 的导数。",
    "hasBlank": false,
    "answer": "$\\sec x\\tan x$；$-\\csc x\\cot x$",
    "answerParts": [
      "$\\sec x\\tan x$",
      "$-\\csc x\\cot x$"
    ]
  },
  {
    "id": "f-054",
    "num": 54,
    "code": "054",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "$\\arcsin x$ 与 $\\arccos x$ 的导数。",
    "hasBlank": false,
    "answer": "$1/\\sqrt{1-x^2}$；$-1/\\sqrt{1-x^2}$",
    "answerParts": [
      "$1/\\sqrt{1-x^2}$",
      "$-1/\\sqrt{1-x^2}$"
    ]
  },
  {
    "id": "f-055",
    "num": 55,
    "code": "055",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "$\\arctan x$ 与 $\\operatorname{arccot} x$ 的导数。",
    "hasBlank": false,
    "answer": "$1/(1+x^2)$；$-1/(1+x^2)$",
    "answerParts": [
      "$1/(1+x^2)$",
      "$-1/(1+x^2)$"
    ]
  },
  {
    "id": "f-056",
    "num": 56,
    "code": "056",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "默写 $\\sin x$ 和 $\\cos x$ 的 $n$ 阶导数。",
    "hasBlank": false,
    "answer": "$\\sin(x+n\\pi/2)$；$\\cos(x+n\\pi/2)$",
    "answerParts": [
      "$\\sin(x+n\\pi/2)$",
      "$\\cos(x+n\\pi/2)$"
    ]
  },
  {
    "id": "f-057",
    "num": 57,
    "code": "057",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "默写 $x^a$ 的 $n$ 阶导数。",
    "hasBlank": false,
    "answer": "$a(a-1)\\cdots(a-n+1)x^{a-n}$",
    "answerParts": [
      "$a(a-1)\\cdots(a-n+1)x^{a-n}$"
    ]
  },
  {
    "id": "f-058",
    "num": 58,
    "code": "058",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "默写 $e^x$ 的 $n$ 阶导数。",
    "hasBlank": false,
    "answer": "$e^x$",
    "answerParts": [
      "$e^x$"
    ]
  },
  {
    "id": "f-059",
    "num": 59,
    "code": "059",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "写出 $(u\\pm v)^{(n)}$ 与 $(uv)^{(n)}$。",
    "hasBlank": false,
    "answer": "$u^{(n)}\\pm v^{(n)}$；$\\sum_{k=0}^n\\binom nk u^{(k)}v^{(n-k)}$",
    "answerParts": [
      "$u^{(n)}\\pm v^{(n)}$",
      "$\\sum_{k=0}^n\\binom nk u^{(k)}v^{(n-k)}$"
    ]
  },
  {
    "id": "f-060",
    "num": 60,
    "code": "060",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "用增量 $\\Delta x$ 表示 $f^{\\prime}(x_0)$ 的定义。",
    "hasBlank": false,
    "answer": "$\\lim_{\\Delta x\\to0}[f(x_0+\\Delta x)-f(x_0)]/\\Delta x$",
    "answerParts": [
      "$\\lim_{\\Delta x\\to0}[f(x_0+\\Delta x)-f(x_0)]/\\Delta x$"
    ]
  },
  {
    "id": "f-061",
    "num": 61,
    "code": "061",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "用 $x\\to x_0$ 表示导数定义。",
    "hasBlank": false,
    "answer": "$\\lim_{x\\to x_0}[f(x)-f(x_0)]/(x-x_0)$",
    "answerParts": [
      "$\\lim_{x\\to x_0}[f(x)-f(x_0)]/(x-x_0)$"
    ]
  },
  {
    "id": "f-062",
    "num": 62,
    "code": "062",
    "subject": "calculus",
    "sectionId": "calc-06",
    "question": "连续、可导、可微的包含关系（单变量）。",
    "hasBlank": false,
    "answer": "可导 $\\Leftrightarrow$ 可微 $\\Rightarrow$ 连续；反向不一定",
    "answerParts": [
      "可导 $\\Leftrightarrow$ 可微 $\\Rightarrow$ 连续",
      "反向不一定"
    ]
  },
  {
    "id": "f-063",
    "num": 63,
    "code": "063",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "第一类间断点分哪两种？分别需要什么左右极限条件？",
    "hasBlank": false,
    "answer": "可去：左右极限相等；跳跃：左右极限存在但不相等",
    "answerParts": [
      "可去：左右极限相等",
      "跳跃：左右极限存在但不相等"
    ]
  },
  {
    "id": "f-064",
    "num": 64,
    "code": "064",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "第二类间断点包括什么情形？",
    "hasBlank": false,
    "answer": "至少一个单侧极限不存在或为无穷",
    "answerParts": [
      "至少一个单侧极限不存在或为无穷"
    ]
  },
  {
    "id": "f-065",
    "num": 65,
    "code": "065",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "罗尔定理：三个前提及结论。",
    "hasBlank": false,
    "answer": "闭区间连续、开区间可导、$f(a)=f(b)$；存在 $\\xi$ 使 $f^{\\prime}(\\xi)=0$",
    "answerParts": [
      "闭区间连续、开区间可导、$f(a)=f(b)$",
      "存在 $\\xi$ 使 $f^{\\prime}(\\xi)=0$"
    ]
  },
  {
    "id": "f-066",
    "num": 66,
    "code": "066",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "拉格朗日中值定理：写出结论。",
    "hasBlank": false,
    "answer": "$[f(b)-f(a)]/(b-a)=f^{\\prime}(\\xi)$",
    "answerParts": [
      "$[f(b)-f(a)]/(b-a)=f^{\\prime}(\\xi)$"
    ]
  },
  {
    "id": "f-067",
    "num": 67,
    "code": "067",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "柯西中值定理：写出结论及关键条件。",
    "hasBlank": false,
    "answer": "$[f(b)-f(a)]/[F(b)-F(a)]=f^{\\prime}(\\xi)/F^{\\prime}(\\xi)$（分母非零）",
    "answerParts": [
      "$[f(b)-f(a)]/[F(b)-F(a)]=f^{\\prime}(\\xi)/F^{\\prime}(\\xi)$（分母非零）"
    ]
  },
  {
    "id": "f-068",
    "num": 68,
    "code": "068",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "求斜渐近线 $y=kx+b$，写出 $k,b$ 的极限公式。",
    "hasBlank": false,
    "answer": "$k=\\lim_{x\\to\\infty}f(x)/x$，$b=\\lim_{x\\to\\infty}[f(x)-kx]$",
    "answerParts": [
      "$k=\\lim_{x\\to\\infty}f(x)/x$，$b=\\lim_{x\\to\\infty}[f(x)-kx]$"
    ]
  },
  {
    "id": "f-069",
    "num": 69,
    "code": "069",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "求弧微分 $ds$（已知 $y=y(x)$）。",
    "hasBlank": false,
    "answer": "$ds=\\sqrt{1+[y^{\\prime}(x)]^2}\\,dx$",
    "answerParts": [
      "$ds=\\sqrt{1+[y^{\\prime}(x)]^2}\\,dx$"
    ]
  },
  {
    "id": "f-070",
    "num": 70,
    "code": "070",
    "subject": "calculus",
    "sectionId": "calc-07",
    "question": "平面曲线的曲率 $\\kappa$ 及曲率半径 $R$ 公式。",
    "hasBlank": false,
    "answer": "$\\kappa=|y^{\\prime\\prime}|/[1+(y^{\\prime})^2]^{3/2}$；$R=1/\\kappa$",
    "answerParts": [
      "$\\kappa=|y^{\\prime\\prime}|/[1+(y^{\\prime})^2]^{3/2}$",
      "$R=1/\\kappa$"
    ]
  },
  {
    "id": "f-071",
    "num": 71,
    "code": "071",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "写出 $f_x(x_0,y_0)$ 的极限定义。",
    "hasBlank": false,
    "answer": "$\\lim_{h\\to0}[f(x_0+h,y_0)-f(x_0,y_0)]/h$",
    "answerParts": [
      "$\\lim_{h\\to0}[f(x_0+h,y_0)-f(x_0,y_0)]/h$"
    ]
  },
  {
    "id": "f-072",
    "num": 72,
    "code": "072",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "写出 $f_y(x_0,y_0)$ 的极限定义。",
    "hasBlank": false,
    "answer": "$\\lim_{h\\to0}[f(x_0,y_0+h)-f(x_0,y_0)]/h$",
    "answerParts": [
      "$\\lim_{h\\to0}[f(x_0,y_0+h)-f(x_0,y_0)]/h$"
    ]
  },
  {
    "id": "f-073",
    "num": 73,
    "code": "073",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "写出二元函数在 $(x_0,y_0)$ 可微的极限判据。",
    "hasBlank": false,
    "answer": "$\\displaystyle\\lim_{(h,k)\\to(0,0)}\\frac{\\Delta f-f_x h-f_y k}{\\sqrt{h^2+k^2}}=0$",
    "answerParts": [
      "$\\displaystyle\\lim_{(h,k)\\to(0,0)}\\frac{\\Delta f-f_x h-f_y k}{\\sqrt{h^2+k^2}}=0$"
    ]
  },
  {
    "id": "f-074",
    "num": 74,
    "code": "074",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "二元函数的驻点必要条件。",
    "hasBlank": false,
    "answer": "$f_x(x_0,y_0)=f_y(x_0,y_0)=0$",
    "answerParts": [
      "$f_x(x_0,y_0)=f_y(x_0,y_0)=0$"
    ]
  },
  {
    "id": "f-075",
    "num": 75,
    "code": "075",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "二元函数极值判别法中的 $A,B,C,D$ 如何定义？",
    "hasBlank": false,
    "answer": "$A=f_{xx},B=f_{xy},C=f_{yy},D=AC-B^2$",
    "answerParts": [
      "$A=f_{xx},B=f_{xy},C=f_{yy},D=AC-B^2$"
    ]
  },
  {
    "id": "f-076",
    "num": 76,
    "code": "076",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "二元极值判别：$D>0$ 且 $A>0$；$D>0$ 且 $A<0$。",
    "hasBlank": false,
    "answer": "前者极小值；后者极大值",
    "answerParts": [
      "前者极小值",
      "后者极大值"
    ]
  },
  {
    "id": "f-077",
    "num": 77,
    "code": "077",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "二元极值判别：$D<0$ 或 $D=0$ 时如何判断？",
    "hasBlank": false,
    "answer": "$D<0$ 非极值；$D=0$ 判别失效",
    "answerParts": [
      "$D<0$ 非极值",
      "$D=0$ 判别失效"
    ]
  },
  {
    "id": "f-078",
    "num": 78,
    "code": "078",
    "subject": "calculus",
    "sectionId": "calc-08",
    "question": "约束 $\\varphi(x,y)=0$ 时，写出拉格朗日函数与方程组。",
    "hasBlank": false,
    "answer": "$L=f+\\lambda\\varphi$；$L_x=L_y=L_\\lambda=0$",
    "answerParts": [
      "$L=f+\\lambda\\varphi$",
      "$L_x=L_y=L_\\lambda=0$"
    ]
  },
  {
    "id": "f-079",
    "num": 79,
    "code": "079",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "$\\int a\\,dx$ 与 $\\int x^m\\,dx$（$m\\ne-1$）。",
    "hasBlank": false,
    "answer": "$ax+C$；$x^{m+1}/(m+1)+C$",
    "answerParts": [
      "$ax+C$",
      "$x^{m+1}/(m+1)+C$"
    ]
  },
  {
    "id": "f-080",
    "num": 80,
    "code": "080",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "$\\int dx/x$ 与 $\\int e^x\\,dx$。",
    "hasBlank": false,
    "answer": "$\\ln|x|+C$；$e^x+C$",
    "answerParts": [
      "$\\ln|x|+C$",
      "$e^x+C$"
    ]
  },
  {
    "id": "f-081",
    "num": 81,
    "code": "081",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "$\\int a^x\\,dx$ 与 $\\int\\sin x\\,dx$。",
    "hasBlank": false,
    "answer": "$a^x/\\ln a+C$；$-\\cos x+C$",
    "answerParts": [
      "$a^x/\\ln a+C$",
      "$-\\cos x+C$"
    ]
  },
  {
    "id": "f-082",
    "num": 82,
    "code": "082",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "$\\int\\cos x\\,dx$ 与 $\\int\\sec^2x\\,dx$。",
    "hasBlank": false,
    "answer": "$\\sin x+C$；$\\tan x+C$",
    "answerParts": [
      "$\\sin x+C$",
      "$\\tan x+C$"
    ]
  },
  {
    "id": "f-083",
    "num": 83,
    "code": "083",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "默写 $\\sin^2x$、$\\cos^2x$ 的降幂公式。",
    "hasBlank": false,
    "answer": "$(1-\\cos2x)/2$、$(1+\\cos2x)/2$",
    "answerParts": [
      "$(1-\\cos2x)/2$、$(1+\\cos2x)/2$"
    ]
  },
  {
    "id": "f-084",
    "num": 84,
    "code": "084",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "默写 $\\tan^2x$ 用 $\\cos2x$ 表示的形式。",
    "hasBlank": false,
    "answer": "$(1-\\cos2x)/(1+\\cos2x)$",
    "answerParts": [
      "$(1-\\cos2x)/(1+\\cos2x)$"
    ]
  },
  {
    "id": "f-085",
    "num": 85,
    "code": "085",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "万能代换：令 $t=\\tan(x/2)$，写出 $\\sin x,\\cos x,dx$。",
    "hasBlank": false,
    "answer": "$\\sin x=2t/(1+t^2)$；$\\cos x=(1-t^2)/(1+t^2)$；$dx=2dt/(1+t^2)$",
    "answerParts": [
      "$\\sin x=2t/(1+t^2)$",
      "$\\cos x=(1-t^2)/(1+t^2)$",
      "$dx=2dt/(1+t^2)$"
    ]
  },
  {
    "id": "f-086",
    "num": 86,
    "code": "086",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "有理函数 $R(\\sin x,\\cos x)$：关于 $\\sin x$ 为奇时用什么代换？",
    "hasBlank": false,
    "answer": "$u=\\cos x$",
    "answerParts": [
      "$u=\\cos x$"
    ]
  },
  {
    "id": "f-087",
    "num": 87,
    "code": "087",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "有理函数 $R(\\sin x,\\cos x)$：关于 $\\cos x$ 为奇时用什么代换？",
    "hasBlank": false,
    "answer": "$u=\\sin x$",
    "answerParts": [
      "$u=\\sin x$"
    ]
  },
  {
    "id": "f-088",
    "num": 88,
    "code": "088",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "若 $R(-\\sin x,-\\cos x)=R(\\sin x,\\cos x)$，常用什么代换？",
    "hasBlank": false,
    "answer": "$u=\\tan x$",
    "answerParts": [
      "$u=\\tan x$"
    ]
  },
  {
    "id": "f-089",
    "num": 89,
    "code": "089",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "积化和差：$\\sin A\\cos B$；$\\cos A\\sin B$。",
    "hasBlank": false,
    "answer": "$\\frac12[\\sin(A+B)+\\sin(A-B)]$；$\\frac12[\\sin(A+B)-\\sin(A-B)]$",
    "answerParts": [
      "$\\frac12[\\sin(A+B)+\\sin(A-B)]$",
      "$\\frac12[\\sin(A+B)-\\sin(A-B)]$"
    ]
  },
  {
    "id": "f-090",
    "num": 90,
    "code": "090",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "积化和差：$\\cos A\\cos B$；$\\sin A\\sin B$。",
    "hasBlank": false,
    "answer": "$\\frac12[\\cos(A+B)+\\cos(A-B)]$；$\\frac12[\\cos(A-B)-\\cos(A+B)]$",
    "answerParts": [
      "$\\frac12[\\cos(A+B)+\\cos(A-B)]$",
      "$\\frac12[\\cos(A-B)-\\cos(A+B)]$"
    ]
  },
  {
    "id": "f-091",
    "num": 91,
    "code": "091",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "和差化积：$\\sin A\\pm\\sin B$。",
    "hasBlank": false,
    "answer": "$2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$；$2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$",
    "answerParts": [
      "$2\\sin\\frac{A+B}{2}\\cos\\frac{A-B}{2}$",
      "$2\\cos\\frac{A+B}{2}\\sin\\frac{A-B}{2}$"
    ]
  },
  {
    "id": "f-092",
    "num": 92,
    "code": "092",
    "subject": "calculus",
    "sectionId": "calc-09",
    "question": "和差化积：$\\cos A\\pm\\cos B$。",
    "hasBlank": false,
    "answer": "$2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$；$-2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$",
    "answerParts": [
      "$2\\cos\\frac{A+B}{2}\\cos\\frac{A-B}{2}$",
      "$-2\\sin\\frac{A+B}{2}\\sin\\frac{A-B}{2}$"
    ]
  },
  {
    "id": "f-093",
    "num": 93,
    "code": "093",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "绕 $x$ 轴旋转：$y=f(x)$，写出旋转体体积公式。",
    "hasBlank": false,
    "answer": "$V=\\pi\\int_a^b[f(x)]^2dx$",
    "answerParts": [
      "$V=\\pi\\int_a^b[f(x)]^2dx$"
    ]
  },
  {
    "id": "f-094",
    "num": 94,
    "code": "094",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "绕 $y$ 轴旋转：薄壳法体积公式。",
    "hasBlank": false,
    "answer": "$V=2\\pi\\int_a^b xf(x)\\,dx$",
    "answerParts": [
      "$V=2\\pi\\int_a^b xf(x)\\,dx$"
    ]
  },
  {
    "id": "f-095",
    "num": 95,
    "code": "095",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "绕 $x$ 轴旋转：曲面面积公式。",
    "hasBlank": false,
    "answer": "$S=2\\pi\\int_a^b |f(x)|\\sqrt{1+[f^{\\prime}(x)]^2}\\,dx$",
    "answerParts": [
      "$S=2\\pi\\int_a^b |f(x)|\\sqrt{1+[f^{\\prime}(x)]^2}\\,dx$"
    ]
  },
  {
    "id": "f-096",
    "num": 96,
    "code": "096",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "沿平面曲线 $L$ 旋转：写出以半径函数 $r$ 表示的面积形式。",
    "hasBlank": false,
    "answer": "$S=2\\pi\\int_L r\\,ds$（单侧且不重复覆盖时）",
    "answerParts": [
      "$S=2\\pi\\int_L r\\,ds$（单侧且不重复覆盖时）"
    ]
  },
  {
    "id": "f-097",
    "num": 97,
    "code": "097",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "一阶线性常微分方程 $y^{\\prime}+P(x)y=Q(x)$ 的通解。",
    "hasBlank": false,
    "answer": "$y=e^{-\\int Pdx}\\left[\\int Qe^{\\int Pdx}dx+C\\right]$",
    "answerParts": [
      "$y=e^{-\\int Pdx}\\left[\\int Qe^{\\int Pdx}dx+C\\right]$"
    ]
  },
  {
    "id": "f-098",
    "num": 98,
    "code": "098",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "常系数齐次二阶方程特征根 $r_1\\ne r_2$，通解形式。",
    "hasBlank": false,
    "answer": "$y=C_1e^{r_1x}+C_2e^{r_2x}$",
    "answerParts": [
      "$y=C_1e^{r_1x}+C_2e^{r_2x}$"
    ]
  },
  {
    "id": "f-099",
    "num": 99,
    "code": "099",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "二重特征根 $r$，通解形式。",
    "hasBlank": false,
    "answer": "$y=(C_1+C_2x)e^{rx}$",
    "answerParts": [
      "$y=(C_1+C_2x)e^{rx}$"
    ]
  },
  {
    "id": "f-100",
    "num": 100,
    "code": "100",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "共轭根 $\\alpha\\pm i\\beta$，通解形式。",
    "hasBlank": false,
    "answer": "$y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)$",
    "answerParts": [
      "$y=e^{\\alpha x}(C_1\\cos\\beta x+C_2\\sin\\beta x)$"
    ]
  },
  {
    "id": "f-101",
    "num": 101,
    "code": "101",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "非齐次右端 $e^{\\lambda x}P_m(x)$，常用特解试探形式。",
    "hasBlank": false,
    "answer": "$y^*=x^k e^{\\lambda x}Q_m(x)$，$k$ 为特征根重数",
    "answerParts": [
      "$y^*=x^k e^{\\lambda x}Q_m(x)$，$k$ 为特征根重数"
    ]
  },
  {
    "id": "f-102",
    "num": 102,
    "code": "102",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "非齐次右端 $e^{\\alpha x}[P_l\\cos\\beta x+P_m\\sin\\beta x]$ 的试探特解。",
    "hasBlank": false,
    "answer": "$y^*=x^ke^{\\alpha x}[R_n\\cos\\beta x+S_n\\sin\\beta x]$；$n=\\max(l,m)$",
    "answerParts": [
      "$y^*=x^ke^{\\alpha x}[R_n\\cos\\beta x+S_n\\sin\\beta x]$",
      "$n=\\max(l,m)$"
    ]
  },
  {
    "id": "f-103",
    "num": 103,
    "code": "103",
    "subject": "calculus",
    "sectionId": "calc-10",
    "question": "欧拉方程 $x^2y^{\\prime\\prime}+pxy^{\\prime}+qy=f(x)$，常用自变量代换。",
    "hasBlank": false,
    "answer": "$x=e^t$（$x>0$），$D=d/dt$，$xy^{\\prime}=Dy$，$x^2y^{\\prime\\prime}=D(D-1)y$",
    "answerParts": [
      "$x=e^t$（$x>0$），$D=d/dt$，$xy^{\\prime}=Dy$，$x^2y^{\\prime\\prime}=D(D-1)y$"
    ]
  },
  {
    "id": "f-104",
    "num": 104,
    "code": "104",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "$\\sum_{n=1}^\\infty 1/n^p$ 的收敛条件。",
    "hasBlank": false,
    "answer": "$p>1$",
    "answerParts": [
      "$p>1$"
    ]
  },
  {
    "id": "f-105",
    "num": 105,
    "code": "105",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "等比级数 $\\sum_{n=1}^\\infty aq^n$ 的收敛条件。",
    "hasBlank": false,
    "answer": "$|q|<1$",
    "answerParts": [
      "$|q|<1$"
    ]
  },
  {
    "id": "f-106",
    "num": 106,
    "code": "106",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "$\\sum_{n\\ge2}1/[n^a(\\ln n)^b]$ 的收敛条件。",
    "hasBlank": false,
    "answer": "$a>1$；或 $a=1,b>1$",
    "answerParts": [
      "$a>1$",
      "或 $a=1,b>1$"
    ]
  },
  {
    "id": "f-107",
    "num": 107,
    "code": "107",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "写出 $\\sum_{k=m}^n aq^k$ 的求和公式（$q\\ne1$）。",
    "hasBlank": false,
    "answer": "$a(q^m-q^{n+1})/(1-q)$",
    "answerParts": [
      "$a(q^m-q^{n+1})/(1-q)$"
    ]
  },
  {
    "id": "f-108",
    "num": 108,
    "code": "108",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "等差数列前 $n$ 项和的两个公式。",
    "hasBlank": false,
    "answer": "$S_n=n(a_1+a_n)/2=na_1+n(n-1)d/2$",
    "answerParts": [
      "$S_n=n(a_1+a_n)/2=na_1+n(n-1)d/2$"
    ]
  },
  {
    "id": "f-109",
    "num": 109,
    "code": "109",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "等比数列前 $n$ 项和公式。",
    "hasBlank": false,
    "answer": "$S_n=a_1(1-q^n)/(1-q)$（$q\\ne1$）",
    "answerParts": [
      "$S_n=a_1(1-q^n)/(1-q)$（$q\\ne1$）"
    ]
  },
  {
    "id": "f-110",
    "num": 110,
    "code": "110",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "$2\\pi$ 周期傅里叶级数的三角形式。",
    "hasBlank": false,
    "answer": "$f(x)\\sim a_0/2+\\sum_{n\\ge1}(a_n\\cos nx+b_n\\sin nx)$",
    "answerParts": [
      "$f(x)\\sim a_0/2+\\sum_{n\\ge1}(a_n\\cos nx+b_n\\sin nx)$"
    ]
  },
  {
    "id": "f-111",
    "num": 111,
    "code": "111",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "$2\\pi$ 周期傅里叶系数 $a_0,a_n,b_n$。",
    "hasBlank": false,
    "answer": "$a_0=\\frac1\\pi\\int_{-\\pi}^{\\pi}f$；$a_n=\\frac1\\pi\\int f\\cos nx$；$b_n=\\frac1\\pi\\int f\\sin nx$",
    "answerParts": [
      "$a_0=\\frac1\\pi\\int_{-\\pi}^{\\pi}f$",
      "$a_n=\\frac1\\pi\\int f\\cos nx$",
      "$b_n=\\frac1\\pi\\int f\\sin nx$"
    ]
  },
  {
    "id": "f-112",
    "num": 112,
    "code": "112",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "周期 $2L$ 的傅里叶级数三角形式及基频。",
    "hasBlank": false,
    "answer": "$a_0/2+\\sum(a_n\\cos(n\\pi x/L)+b_n\\sin(n\\pi x/L))$；$\\omega_0=\\pi/L$",
    "answerParts": [
      "$a_0/2+\\sum(a_n\\cos(n\\pi x/L)+b_n\\sin(n\\pi x/L))$",
      "$\\omega_0=\\pi/L$"
    ]
  },
  {
    "id": "f-113",
    "num": 113,
    "code": "113",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "周期 $2L$ 的傅里叶系数中积分区间与系数。",
    "hasBlank": false,
    "answer": "$a_n=\\frac1L\\int_{-L}^L f(x)\\cos(n\\pi x/L)dx$；$b_n$ 同理换 $\\sin$",
    "answerParts": [
      "$a_n=\\frac1L\\int_{-L}^L f(x)\\cos(n\\pi x/L)dx$",
      "$b_n$ 同理换 $\\sin$"
    ]
  },
  {
    "id": "f-114",
    "num": 114,
    "code": "114",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "幂级数 $\\frac1{1-x}$、$e^x$ 的展开及收敛范围。",
    "hasBlank": false,
    "answer": "$\\sum_{n\\ge0}x^n\\ (|x|<1)$；$\\sum x^n/n!\\ (x\\in\\mathbb R)$",
    "answerParts": [
      "$\\sum_{n\\ge0}x^n\\ (|x|<1)$",
      "$\\sum x^n/n!\\ (x\\in\\mathbb R)$"
    ]
  },
  {
    "id": "f-115",
    "num": 115,
    "code": "115",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "$\\sin x$、$\\cos x$ 的幂级数通项。",
    "hasBlank": false,
    "answer": "$\\sum_{n\\ge0}(-1)^nx^{2n+1}/(2n+1)!$；$\\sum_{n\\ge0}(-1)^nx^{2n}/(2n)!$",
    "answerParts": [
      "$\\sum_{n\\ge0}(-1)^nx^{2n+1}/(2n+1)!$",
      "$\\sum_{n\\ge0}(-1)^nx^{2n}/(2n)!$"
    ]
  },
  {
    "id": "f-116",
    "num": 116,
    "code": "116",
    "subject": "calculus",
    "sectionId": "calc-11",
    "question": "$\\ln(1+x)$、$\\arctan x$ 的幂级数通项。",
    "hasBlank": false,
    "answer": "$\\sum_{n\\ge1}(-1)^{n-1}x^n/n$；$\\sum_{n\\ge0}(-1)^nx^{2n+1}/(2n+1)$",
    "answerParts": [
      "$\\sum_{n\\ge1}(-1)^{n-1}x^n/n$",
      "$\\sum_{n\\ge0}(-1)^nx^{2n+1}/(2n+1)$"
    ]
  },
  {
    "id": "f-117",
    "num": 117,
    "code": "117",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "点积 $\\mathbf a\\cdot\\mathbf b$ 与夹角 $\\cos\\theta$ 的公式。",
    "hasBlank": false,
    "answer": "$|a||b|\\cos\\theta$；$\\cos\\theta=(a\\cdot b)/(|a||b|)$",
    "answerParts": [
      "$|a||b|\\cos\\theta$",
      "$\\cos\\theta=(a\\cdot b)/(|a||b|)$"
    ]
  },
  {
    "id": "f-118",
    "num": 118,
    "code": "118",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "叉积 $\\mathbf a\\times\\mathbf b$ 的行列式表达。",
    "hasBlank": false,
    "answer": "$\\begin{vmatrix}\\mathbf i&\\mathbf j&\\mathbf k\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{vmatrix}$",
    "answerParts": [
      "$\\begin{vmatrix}\\mathbf i&\\mathbf j&\\mathbf k\\\\a_x&a_y&a_z\\\\b_x&b_y&b_z\\end{vmatrix}$"
    ]
  },
  {
    "id": "f-119",
    "num": 119,
    "code": "119",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "混合积 $[a,b,c]$ 的行列式及几何意义。",
    "hasBlank": false,
    "answer": "$(a\\times b)\\cdot c=\\det(a,b,c)$；平行六面体有向体积",
    "answerParts": [
      "$(a\\times b)\\cdot c=\\det(a,b,c)$",
      "平行六面体有向体积"
    ]
  },
  {
    "id": "f-120",
    "num": 120,
    "code": "120",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "空间平面的一般式、点法式、截距式。",
    "hasBlank": false,
    "answer": "$Ax+By+Cz+D=0$；$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$；$x/a+y/b+z/c=1$",
    "answerParts": [
      "$Ax+By+Cz+D=0$",
      "$A(x-x_0)+B(y-y_0)+C(z-z_0)=0$",
      "$x/a+y/b+z/c=1$"
    ]
  },
  {
    "id": "f-121",
    "num": 121,
    "code": "121",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "空间直线的一般式、对称式、参数式。",
    "hasBlank": false,
    "answer": "两平面方程组；$(x-x_0)/l=(y-y_0)/m=(z-z_0)/n$；$(x,y,z)=(x_0,y_0,z_0)+t(l,m,n)$",
    "answerParts": [
      "两平面方程组",
      "$(x-x_0)/l=(y-y_0)/m=(z-z_0)/n$",
      "$(x,y,z)=(x_0,y_0,z_0)+t(l,m,n)$"
    ]
  },
  {
    "id": "f-122",
    "num": 122,
    "code": "122",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "点 $(x_0,y_0,z_0)$ 到平面 $Ax+By+Cz+D=0$ 的距离。",
    "hasBlank": false,
    "answer": "$|Ax_0+By_0+Cz_0+D|/\\sqrt{A^2+B^2+C^2}$",
    "answerParts": [
      "$|Ax_0+By_0+Cz_0+D|/\\sqrt{A^2+B^2+C^2}$"
    ]
  },
  {
    "id": "f-123",
    "num": 123,
    "code": "123",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "点到空间直线（方向向量 $s$，线上点 $M_0$）的距离。",
    "hasBlank": false,
    "answer": "$d=|\\overrightarrow{M_0M}\\times s|/|s|$",
    "answerParts": [
      "$d=|\\overrightarrow{M_0M}\\times s|/|s|$"
    ]
  },
  {
    "id": "f-124",
    "num": 124,
    "code": "124",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "写出椭圆锥面、椭球面的标准方程。",
    "hasBlank": false,
    "answer": "$x^2/a^2+y^2/b^2=z^2$；$x^2/a^2+y^2/b^2+z^2/c^2=1$",
    "answerParts": [
      "$x^2/a^2+y^2/b^2=z^2$",
      "$x^2/a^2+y^2/b^2+z^2/c^2=1$"
    ]
  },
  {
    "id": "f-125",
    "num": 125,
    "code": "125",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "写出椭圆抛物面与双曲抛物面的示例方程。",
    "hasBlank": false,
    "answer": "$z=x^2/a^2+y^2/b^2$；$z=x^2/a^2-y^2/b^2$",
    "answerParts": [
      "$z=x^2/a^2+y^2/b^2$",
      "$z=x^2/a^2-y^2/b^2$"
    ]
  },
  {
    "id": "f-126",
    "num": 126,
    "code": "126",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "写出圆锥面、球面的示例方程。",
    "hasBlank": false,
    "answer": "$x^2+y^2=z^2$；$x^2+y^2+z^2=R^2$",
    "answerParts": [
      "$x^2+y^2=z^2$",
      "$x^2+y^2+z^2=R^2$"
    ]
  },
  {
    "id": "f-127",
    "num": 127,
    "code": "127",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "单叶双曲面：典型方程与正、负平方项个数。",
    "hasBlank": false,
    "answer": "$x^2/a^2+y^2/b^2-z^2/c^2=1$；正 2、负 1",
    "answerParts": [
      "$x^2/a^2+y^2/b^2-z^2/c^2=1$",
      "正 2、负 1"
    ]
  },
  {
    "id": "f-128",
    "num": 128,
    "code": "128",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "双叶双曲面：典型方程与正、负平方项个数。",
    "hasBlank": false,
    "answer": "$z^2/c^2-x^2/a^2-y^2/b^2=1$；正 1、负 2",
    "answerParts": [
      "$z^2/c^2-x^2/a^2-y^2/b^2=1$",
      "正 1、负 2"
    ]
  },
  {
    "id": "f-129",
    "num": 129,
    "code": "129",
    "subject": "calculus",
    "sectionId": "calc-12",
    "question": "椭圆柱面、双曲柱面：写出示例方程。",
    "hasBlank": false,
    "answer": "$x^2/a^2+y^2/b^2=1$；$x^2/a^2-y^2/b^2=1$",
    "answerParts": [
      "$x^2/a^2+y^2/b^2=1$",
      "$x^2/a^2-y^2/b^2=1$"
    ]
  },
  {
    "id": "f-130",
    "num": 130,
    "code": "130",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "第一类曲线积分的弧长微分 $ds$。",
    "hasBlank": false,
    "answer": "$ds=\\sqrt{(dx)^2+(dy)^2}$",
    "answerParts": [
      "$ds=\\sqrt{(dx)^2+(dy)^2}$"
    ]
  },
  {
    "id": "f-131",
    "num": 131,
    "code": "131",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "第二类曲线积分 $\\int_L Pdx+Qdy$ 的弧长 / 方向余弦形式。",
    "hasBlank": false,
    "answer": "$\\int_L(P\\cos\\alpha+Q\\cos\\beta)ds$",
    "answerParts": [
      "$\\int_L(P\\cos\\alpha+Q\\cos\\beta)ds$"
    ]
  },
  {
    "id": "f-132",
    "num": 132,
    "code": "132",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "格林公式（正向边界 $L$）：写出两侧。",
    "hasBlank": false,
    "answer": "$\\oint_L Pdx+Qdy=\\iint_D(\\partial Q/\\partial x-\\partial P/\\partial y)dxdy$",
    "answerParts": [
      "$\\oint_L Pdx+Qdy=\\iint_D(\\partial Q/\\partial x-\\partial P/\\partial y)dxdy$"
    ]
  },
  {
    "id": "f-133",
    "num": 133,
    "code": "133",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "第一类曲面积分与第二类曲面积分的关系（方向余弦）。",
    "hasBlank": false,
    "answer": "$\\iint_\\Sigma(P\\cos\\alpha+Q\\cos\\beta+R\\cos\\gamma)dS=\\iint_\\Sigma(P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy)$",
    "answerParts": [
      "$\\iint_\\Sigma(P\\cos\\alpha+Q\\cos\\beta+R\\cos\\gamma)dS=\\iint_\\Sigma(P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy)$"
    ]
  },
  {
    "id": "f-134",
    "num": 134,
    "code": "134",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "高斯公式：写出三重积分和闭合曲面通量关系。",
    "hasBlank": false,
    "answer": "$\\oiint_\\Sigma(P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy)=\\iiint_\\Omega(P_x+Q_y+R_z)dV$",
    "answerParts": [
      "$\\oiint_\\Sigma(P\\,dy\\,dz+Q\\,dz\\,dx+R\\,dx\\,dy)=\\iiint_\\Omega(P_x+Q_y+R_z)dV$"
    ]
  },
  {
    "id": "f-135",
    "num": 135,
    "code": "135",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "斯托克斯公式：第二类曲线积分等于什么曲面积分？",
    "hasBlank": false,
    "answer": "$\\oint_{\\partial\\Sigma}\\mathbf F\\cdot d\\mathbf r=\\iint_\\Sigma(\\nabla\\times\\mathbf F)\\cdot\\mathbf n\\,dS$",
    "answerParts": [
      "$\\oint_{\\partial\\Sigma}\\mathbf F\\cdot d\\mathbf r=\\iint_\\Sigma(\\nabla\\times\\mathbf F)\\cdot\\mathbf n\\,dS$"
    ]
  },
  {
    "id": "f-136",
    "num": 136,
    "code": "136",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "质心 $\\bar x$ 的一般密度公式；均匀曲线简化式。",
    "hasBlank": false,
    "answer": "$\\bar x=\\int_Lx\\rho ds/\\int_L\\rho ds$；$\\bar x=\\int_Lx ds/\\int_Lds$",
    "answerParts": [
      "$\\bar x=\\int_Lx\\rho ds/\\int_L\\rho ds$",
      "$\\bar x=\\int_Lx ds/\\int_Lds$"
    ]
  },
  {
    "id": "f-137",
    "num": 137,
    "code": "137",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "关于 $x$ 轴的转动惯量 $I_x$（空间曲线质量密度 $\\rho$）。",
    "hasBlank": false,
    "answer": "$I_x=\\int_L(y^2+z^2)\\rho\\,ds$",
    "answerParts": [
      "$I_x=\\int_L(y^2+z^2)\\rho\\,ds$"
    ]
  },
  {
    "id": "f-138",
    "num": 138,
    "code": "138",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "标量场 $u(x,y,z)$ 的梯度 $\\nabla u$。",
    "hasBlank": false,
    "answer": "$u_x\\mathbf i+u_y\\mathbf j+u_z\\mathbf k$",
    "answerParts": [
      "$u_x\\mathbf i+u_y\\mathbf j+u_z\\mathbf k$"
    ]
  },
  {
    "id": "f-139",
    "num": 139,
    "code": "139",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "向量场 $\\mathbf F=(P,Q,R)$ 的散度 $\\operatorname{div}\\mathbf F$。",
    "hasBlank": false,
    "answer": "$P_x+Q_y+R_z$",
    "answerParts": [
      "$P_x+Q_y+R_z$"
    ]
  },
  {
    "id": "f-140",
    "num": 140,
    "code": "140",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "向量场 $\\mathbf F=(P,Q,R)$ 的旋度 $\\operatorname{rot}\\mathbf F$。",
    "hasBlank": false,
    "answer": "$\\nabla\\times\\mathbf F=\\begin{vmatrix}\\mathbf i&\\mathbf j&\\mathbf k\\\\\\partial_x&\\partial_y&\\partial_z\\\\P&Q&R\\end{vmatrix}$",
    "answerParts": [
      "$\\nabla\\times\\mathbf F=\\begin{vmatrix}\\mathbf i&\\mathbf j&\\mathbf k\\\\\\partial_x&\\partial_y&\\partial_z\\\\P&Q&R\\end{vmatrix}$"
    ]
  },
  {
    "id": "f-141",
    "num": 141,
    "code": "141",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "平面曲线 $z=f(x,y)$ 沿单位方向 $(\\cos\\alpha,\\cos\\beta)$ 的方向导数。",
    "hasBlank": false,
    "answer": "$\\partial z/\\partial l=f_x\\cos\\alpha+f_y\\cos\\beta$",
    "answerParts": [
      "$\\partial z/\\partial l=f_x\\cos\\alpha+f_y\\cos\\beta$"
    ]
  },
  {
    "id": "f-142",
    "num": 142,
    "code": "142",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "方向导数最大值与梯度的关系。",
    "hasBlank": false,
    "answer": "最大值为 $\\|\\nabla f\\|$，方向为梯度方向",
    "answerParts": [
      "最大值为 $\\|\\nabla f\\|$，方向为梯度方向"
    ]
  },
  {
    "id": "f-143",
    "num": 143,
    "code": "143",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "求 $\\displaystyle\\int_0^\\pi x f(\\sin x)\\,dx$ 的对称性结论。",
    "hasBlank": false,
    "answer": "$\\frac\\pi2\\int_0^\\pi f(\\sin x)\\,dx$",
    "answerParts": [
      "$\\frac\\pi2\\int_0^\\pi f(\\sin x)\\,dx$"
    ]
  },
  {
    "id": "f-144",
    "num": 144,
    "code": "144",
    "subject": "calculus",
    "sectionId": "calc-13",
    "question": "$\\displaystyle I_n=\\int_0^{\\pi/2}\\sin^n x\\,dx$ 的递推关系。",
    "hasBlank": false,
    "answer": "$I_n=\\frac{n-1}{n}I_{n-2}$；$I_0=\\pi/2,I_1=1$",
    "answerParts": [
      "$I_n=\\frac{n-1}{n}I_{n-2}$",
      "$I_0=\\pi/2,I_1=1$"
    ]
  },
  {
    "id": "f-145",
    "num": 145,
    "code": "145",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "代数余子式 $A_{ij}$ 与余子式 $M_{ij}$ 的关系。",
    "hasBlank": false,
    "answer": "$A_{ij}=(-1)^{i+j}M_{ij}$",
    "answerParts": [
      "$A_{ij}=(-1)^{i+j}M_{ij}$"
    ]
  },
  {
    "id": "f-146",
    "num": 146,
    "code": "146",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "把行列式某一行乘 $k$，行列式如何变化？",
    "hasBlank": false,
    "answer": "整体乘 $k$",
    "answerParts": [
      "整体乘 $k$"
    ]
  },
  {
    "id": "f-147",
    "num": 147,
    "code": "147",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "上三角行列式的值如何计算？",
    "hasBlank": false,
    "answer": "主对角线元素乘积",
    "answerParts": [
      "主对角线元素乘积"
    ]
  },
  {
    "id": "f-148",
    "num": 148,
    "code": "148",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "块上三角矩阵 $\\begin{pmatrix}A&B\\\\0&D\\end{pmatrix}$ 的行列式。",
    "hasBlank": false,
    "answer": "$|A|\\,|D|$",
    "answerParts": [
      "$|A|\\,|D|$"
    ]
  },
  {
    "id": "f-149",
    "num": 149,
    "code": "149",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "块反对角矩阵 $\\begin{pmatrix}0&A\\\\B&0\\end{pmatrix}$（各块 $n$ 阶）的行列式。",
    "hasBlank": false,
    "answer": "$(-1)^n|A|\\,|B|$",
    "answerParts": [
      "$(-1)^n|A|\\,|B|$"
    ]
  },
  {
    "id": "f-150",
    "num": 150,
    "code": "150",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "克拉默法则：$Ax=b$（$|A|\\ne0$）的 $x_i$。",
    "hasBlank": false,
    "answer": "$x_i=|A_i|/|A|$",
    "answerParts": [
      "$x_i=|A_i|/|A|$"
    ]
  },
  {
    "id": "f-151",
    "num": 151,
    "code": "151",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "矩阵转置满足 $(A+B)^T=$ ________________",
    "hasBlank": true,
    "answer": "$A^T+B^T$",
    "answerParts": [
      "$A^T+B^T$"
    ]
  },
  {
    "id": "f-152",
    "num": 152,
    "code": "152",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "线性相关的定义（向量组 $\\alpha_1,\\ldots,\\alpha_n$）。",
    "hasBlank": false,
    "answer": "存在不全为 0 的 $k_i$，使 $\\sum k_i\\alpha_i=0$",
    "answerParts": [
      "存在不全为 0 的 $k_i$，使 $\\sum k_i\\alpha_i=0$"
    ]
  },
  {
    "id": "f-153",
    "num": 153,
    "code": "153",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "向量组线性无关的定义。",
    "hasBlank": false,
    "answer": "$\\sum k_i\\alpha_i=0$ 仅有零系数解",
    "answerParts": [
      "$\\sum k_i\\alpha_i=0$ 仅有零系数解"
    ]
  },
  {
    "id": "f-154",
    "num": 154,
    "code": "154",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "齐次方程组 $Ax=0$ 有非零解的充要条件。",
    "hasBlank": false,
    "answer": "$r(A)<n$（$n$ 为未知量个数）",
    "answerParts": [
      "$r(A)<n$（$n$ 为未知量个数）"
    ]
  },
  {
    "id": "f-155",
    "num": 155,
    "code": "155",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "齐次方程组 $Ax=0$ 仅有零解的充要条件。",
    "hasBlank": false,
    "answer": "$r(A)=n$",
    "answerParts": [
      "$r(A)=n$"
    ]
  },
  {
    "id": "f-156",
    "num": 156,
    "code": "156",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "非齐次 $Ax=b$ 有解 / 无解的秩条件。",
    "hasBlank": false,
    "answer": "有解 $r(A)=r(A,b)$；无解 $r(A)<r(A,b)$",
    "answerParts": [
      "有解 $r(A)=r(A,b)$",
      "无解 $r(A)<r(A,b)$"
    ]
  },
  {
    "id": "f-157",
    "num": 157,
    "code": "157",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "非齐次 $Ax=b$ 有唯一解的秩条件。",
    "hasBlank": false,
    "answer": "$r(A)=r(A,b)=n$",
    "answerParts": [
      "$r(A)=r(A,b)=n$"
    ]
  },
  {
    "id": "f-158",
    "num": 158,
    "code": "158",
    "subject": "linalg",
    "sectionId": "la-01",
    "question": "非齐次 $Ax=b$ 有无穷多解的秩条件。",
    "hasBlank": false,
    "answer": "$r(A)=r(A,b)<n$",
    "answerParts": [
      "$r(A)=r(A,b)<n$"
    ]
  },
  {
    "id": "f-159",
    "num": 159,
    "code": "159",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "矩阵等价的定义（存在可逆矩阵 $P,Q$）。",
    "hasBlank": false,
    "answer": "$B=PAQ$",
    "answerParts": [
      "$B=PAQ$"
    ]
  },
  {
    "id": "f-160",
    "num": 160,
    "code": "160",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "矩阵合同的定义（可逆 $P$）。",
    "hasBlank": false,
    "answer": "$B=P^TAP$",
    "answerParts": [
      "$B=P^TAP$"
    ]
  },
  {
    "id": "f-161",
    "num": 161,
    "code": "161",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "矩阵相似的定义（可逆 $P$）。",
    "hasBlank": false,
    "answer": "$B=P^{-1}AP$",
    "answerParts": [
      "$B=P^{-1}AP$"
    ]
  },
  {
    "id": "f-162",
    "num": 162,
    "code": "162",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "矩阵相似一定等价吗？合同一定等价吗？",
    "hasBlank": false,
    "answer": "都一定；逆命题一般不成立",
    "answerParts": [
      "都一定",
      "逆命题一般不成立"
    ]
  },
  {
    "id": "f-163",
    "num": 163,
    "code": "163",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "相似矩阵的两个重要不变量。",
    "hasBlank": false,
    "answer": "特征多项式（故特征值）、迹、行列式等相同",
    "answerParts": [
      "特征多项式（故特征值）、迹、行列式等相同"
    ]
  },
  {
    "id": "f-164",
    "num": 164,
    "code": "164",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "合同实对称矩阵的哪个几何/惯性量相同？",
    "hasBlank": false,
    "answer": "正、负、零惯性指数相同（惯性定律）",
    "answerParts": [
      "正、负、零惯性指数相同（惯性定律）"
    ]
  },
  {
    "id": "f-165",
    "num": 165,
    "code": "165",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "秩不等式：$r(A+B)$ 上界。",
    "hasBlank": false,
    "answer": "$r(A+B)\\le r(A)+r(B)$",
    "answerParts": [
      "$r(A+B)\\le r(A)+r(B)$"
    ]
  },
  {
    "id": "f-166",
    "num": 166,
    "code": "166",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "秩不等式：$r(AB)$ 上界。",
    "hasBlank": false,
    "answer": "$r(AB)\\le\\min\\{r(A),r(B)\\}$",
    "answerParts": [
      "$r(AB)\\le\\min\\{r(A),r(B)\\}$"
    ]
  },
  {
    "id": "f-167",
    "num": 167,
    "code": "167",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "若 $A_{m\\times n}B_{n\\times s}=0$，秩有什么约束？",
    "hasBlank": false,
    "answer": "$r(A)+r(B)\\le n$",
    "answerParts": [
      "$r(A)+r(B)\\le n$"
    ]
  },
  {
    "id": "f-168",
    "num": 168,
    "code": "168",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "西尔维斯特秩不等式：$r(AB)$ 下界。",
    "hasBlank": false,
    "answer": "$r(AB)\\ge r(A)+r(B)-n$",
    "answerParts": [
      "$r(AB)\\ge r(A)+r(B)-n$"
    ]
  },
  {
    "id": "f-169",
    "num": 169,
    "code": "169",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "$n$ 阶矩阵 $A$ 的伴随矩阵 $A^*$ 的秩，按 $r(A)$ 分类。",
    "hasBlank": false,
    "answer": "$n$（满秩）；$1$（$r(A)=n-1$）；$0$（$r(A)\\le n-2$）",
    "answerParts": [
      "$n$（满秩）",
      "$1$（$r(A)=n-1$）",
      "$0$（$r(A)\\le n-2$）"
    ]
  },
  {
    "id": "f-170",
    "num": 170,
    "code": "170",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "$r(A)$ 与 $r(A^T),r(A^TA),r(AA^T)$（实矩阵）的关系。",
    "hasBlank": false,
    "answer": "$r(A)=r(A^T)=r(A^TA)=r(AA^T)$",
    "answerParts": [
      "$r(A)=r(A^T)=r(A^TA)=r(AA^T)$"
    ]
  },
  {
    "id": "f-171",
    "num": 171,
    "code": "171",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "可逆矩阵 $P$ 左乘或右乘，秩如何变化？",
    "hasBlank": false,
    "answer": "$r(PA)=r(AP)=r(A)$（维度适当）",
    "answerParts": [
      "$r(PA)=r(AP)=r(A)$（维度适当）"
    ]
  },
  {
    "id": "f-172",
    "num": 172,
    "code": "172",
    "subject": "linalg",
    "sectionId": "la-02",
    "question": "矩阵 $A$ 的秩与零空间维数之间的关系。",
    "hasBlank": false,
    "answer": "$\\dim\\ker A=n-r(A)$（$n$ 列）",
    "answerParts": [
      "$\\dim\\ker A=n-r(A)$（$n$ 列）"
    ]
  },
  {
    "id": "f-173",
    "num": 173,
    "code": "173",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "$n$ 阶矩阵 $A$ 满足 $AA^*=A^*A=$ ________________",
    "hasBlank": true,
    "answer": "$|A|I$",
    "answerParts": [
      "$|A|I$"
    ]
  },
  {
    "id": "f-174",
    "num": 174,
    "code": "174",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "当 $A$ 可逆时 $A^*$ 的公式。",
    "hasBlank": false,
    "answer": "$A^*=|A|A^{-1}$",
    "answerParts": [
      "$A^*=|A|A^{-1}$"
    ]
  },
  {
    "id": "f-175",
    "num": 175,
    "code": "175",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "当 $A$ 可逆时 $(A^*)^{-1}$ 的公式。",
    "hasBlank": false,
    "answer": "$(A^*)^{-1}=A/|A|$",
    "answerParts": [
      "$(A^*)^{-1}=A/|A|$"
    ]
  },
  {
    "id": "f-176",
    "num": 176,
    "code": "176",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "当 $n\\ge2$，$(kA)^*$ 与 $A^*$ 的关系。",
    "hasBlank": false,
    "answer": "$(kA)^*=k^{n-1}A^*$",
    "answerParts": [
      "$(kA)^*=k^{n-1}A^*$"
    ]
  },
  {
    "id": "f-177",
    "num": 177,
    "code": "177",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "伴随矩阵转置：$(A^*)^T=$ ________________",
    "hasBlank": true,
    "answer": "$(A^T)^*$",
    "answerParts": [
      "$(A^T)^*$"
    ]
  },
  {
    "id": "f-178",
    "num": 178,
    "code": "178",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "伴随矩阵的行列式：$|A^*|=$ ________________",
    "hasBlank": true,
    "answer": "$|A|^{n-1}$",
    "answerParts": [
      "$|A|^{n-1}$"
    ]
  },
  {
    "id": "f-179",
    "num": 179,
    "code": "179",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "若 $Av=\\lambda v$，则 $(A+cI)v$ 的特征值。",
    "hasBlank": false,
    "answer": "$\\lambda+c$",
    "answerParts": [
      "$\\lambda+c$"
    ]
  },
  {
    "id": "f-180",
    "num": 180,
    "code": "180",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "若 $Av=\\lambda v$，则 $A^kv$ 的特征值。",
    "hasBlank": false,
    "answer": "$\\lambda^k$",
    "answerParts": [
      "$\\lambda^k$"
    ]
  },
  {
    "id": "f-181",
    "num": 181,
    "code": "181",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "若 $A$ 可逆，$A^{-1}$ 的对应特征值。",
    "hasBlank": false,
    "answer": "$1/\\lambda$",
    "answerParts": [
      "$1/\\lambda$"
    ]
  },
  {
    "id": "f-182",
    "num": 182,
    "code": "182",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "若 $A$ 可逆，$A^*$ 的对应特征值。",
    "hasBlank": false,
    "answer": "$|A|/\\lambda$",
    "answerParts": [
      "$|A|/\\lambda$"
    ]
  },
  {
    "id": "f-183",
    "num": 183,
    "code": "183",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "$A^T$ 与 $P^{-1}AP$ 的特征值如何变化？",
    "hasBlank": false,
    "answer": "特征值均不变",
    "answerParts": [
      "特征值均不变"
    ]
  },
  {
    "id": "f-184",
    "num": 184,
    "code": "184",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "矩阵 $A$ 的特征值之和、之积分别等于什么？",
    "hasBlank": false,
    "answer": "$\\operatorname{tr}A$；$\\det A$（按代数重数）",
    "answerParts": [
      "$\\operatorname{tr}A$",
      "$\\det A$（按代数重数）"
    ]
  },
  {
    "id": "f-185",
    "num": 185,
    "code": "185",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "实对称矩阵的特征值有哪些性质？",
    "hasBlank": false,
    "answer": "特征值全实；不同特征值的特征向量正交",
    "answerParts": [
      "特征值全实",
      "不同特征值的特征向量正交"
    ]
  },
  {
    "id": "f-186",
    "num": 186,
    "code": "186",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "二次型对应矩阵正定的特征值判据。",
    "hasBlank": false,
    "answer": "全部特征值大于 0",
    "answerParts": [
      "全部特征值大于 0"
    ]
  },
  {
    "id": "f-187",
    "num": 187,
    "code": "187",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "二次型正定的顺序主子式判据（Sylvester）。",
    "hasBlank": false,
    "answer": "各阶顺序主子式均大于 0",
    "answerParts": [
      "各阶顺序主子式均大于 0"
    ]
  },
  {
    "id": "f-188",
    "num": 188,
    "code": "188",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "二次型负定的特征值判据。",
    "hasBlank": false,
    "answer": "全部特征值小于 0",
    "answerParts": [
      "全部特征值小于 0"
    ]
  },
  {
    "id": "f-189",
    "num": 189,
    "code": "189",
    "subject": "linalg",
    "sectionId": "la-03",
    "question": "二次型规范形与正负惯性指数的关系。",
    "hasBlank": false,
    "answer": "正平方项个数 $p$、负平方项个数 $q$ 为合同不变量",
    "answerParts": [
      "正平方项个数 $p$、负平方项个数 $q$ 为合同不变量"
    ]
  },
  {
    "id": "f-190",
    "num": 190,
    "code": "190",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "几何分布 $X\\sim\\mathrm{Ge}(p)$（首成功次数，$k\\ge1$）的分布律。",
    "hasBlank": false,
    "answer": "$P(X=k)=(1-p)^{k-1}p$",
    "answerParts": [
      "$P(X=k)=(1-p)^{k-1}p$"
    ]
  },
  {
    "id": "f-191",
    "num": 191,
    "code": "191",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "几何分布（首成功次数）的 $E(X),D(X)$。",
    "hasBlank": false,
    "answer": "$1/p$；$(1-p)/p^2$",
    "answerParts": [
      "$1/p$",
      "$(1-p)/p^2$"
    ]
  },
  {
    "id": "f-192",
    "num": 192,
    "code": "192",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "二项分布 $X\\sim B(n,p)$ 的分布律。",
    "hasBlank": false,
    "answer": "$P(X=k)=\\binom nk p^k(1-p)^{n-k}$",
    "answerParts": [
      "$P(X=k)=\\binom nk p^k(1-p)^{n-k}$"
    ]
  },
  {
    "id": "f-193",
    "num": 193,
    "code": "193",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "二项分布的期望与方差。",
    "hasBlank": false,
    "answer": "$E(X)=np$；$D(X)=np(1-p)$",
    "answerParts": [
      "$E(X)=np$",
      "$D(X)=np(1-p)$"
    ]
  },
  {
    "id": "f-194",
    "num": 194,
    "code": "194",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "泊松分布 $X\\sim P(\\lambda)$ 的分布律。",
    "hasBlank": false,
    "answer": "$P(X=k)=e^{-\\lambda}\\lambda^k/k!$",
    "answerParts": [
      "$P(X=k)=e^{-\\lambda}\\lambda^k/k!$"
    ]
  },
  {
    "id": "f-195",
    "num": 195,
    "code": "195",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "泊松分布的期望与方差。",
    "hasBlank": false,
    "answer": "$E(X)=D(X)=\\lambda$",
    "answerParts": [
      "$E(X)=D(X)=\\lambda$"
    ]
  },
  {
    "id": "f-196",
    "num": 196,
    "code": "196",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "指数分布 $X\\sim\\mathrm{Exp}(\\lambda)$ 的密度与分布函数（$x\\ge0$）。",
    "hasBlank": false,
    "answer": "$f(x)=\\lambda e^{-\\lambda x}$；$F(x)=1-e^{-\\lambda x}$",
    "answerParts": [
      "$f(x)=\\lambda e^{-\\lambda x}$",
      "$F(x)=1-e^{-\\lambda x}$"
    ]
  },
  {
    "id": "f-197",
    "num": 197,
    "code": "197",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "指数分布 $E(X),D(X)$。",
    "hasBlank": false,
    "answer": "$1/\\lambda$；$1/\\lambda^2$",
    "answerParts": [
      "$1/\\lambda$",
      "$1/\\lambda^2$"
    ]
  },
  {
    "id": "f-198",
    "num": 198,
    "code": "198",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "正态分布 $X\\sim N(\\mu,\\sigma^2)$ 的密度。",
    "hasBlank": false,
    "answer": "$\\displaystyle f(x)=\\frac1{\\sqrt{2\\pi}\\sigma}e^{-(x-\\mu)^2/(2\\sigma^2)}$",
    "answerParts": [
      "$\\displaystyle f(x)=\\frac1{\\sqrt{2\\pi}\\sigma}e^{-(x-\\mu)^2/(2\\sigma^2)}$"
    ]
  },
  {
    "id": "f-199",
    "num": 199,
    "code": "199",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "正态分布的期望与方差。",
    "hasBlank": false,
    "answer": "$\\mu$；$\\sigma^2$",
    "answerParts": [
      "$\\mu$",
      "$\\sigma^2$"
    ]
  },
  {
    "id": "f-200",
    "num": 200,
    "code": "200",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "超几何分布（$N$ 件中 $M$ 件成功，抽 $n$ 件）的分布律。",
    "hasBlank": false,
    "answer": "$P(X=k)=\\binom Mk\\binom{N-M}{n-k}/\\binom Nn$",
    "answerParts": [
      "$P(X=k)=\\binom Mk\\binom{N-M}{n-k}/\\binom Nn$"
    ]
  },
  {
    "id": "f-201",
    "num": 201,
    "code": "201",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "超几何分布的期望。",
    "hasBlank": false,
    "answer": "$E(X)=nM/N$",
    "answerParts": [
      "$E(X)=nM/N$"
    ]
  },
  {
    "id": "f-202",
    "num": 202,
    "code": "202",
    "subject": "probstat",
    "sectionId": "prob-01",
    "question": "均匀分布 $U(a,b)$ 的期望与方差。",
    "hasBlank": false,
    "answer": "$(a+b)/2$；$(b-a)^2/12$",
    "answerParts": [
      "$(a+b)/2$",
      "$(b-a)^2/12$"
    ]
  },
  {
    "id": "f-203",
    "num": 203,
    "code": "203",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "随机变量方差的定义。",
    "hasBlank": false,
    "answer": "$D(X)=E[(X-E X)^2]$",
    "answerParts": [
      "$D(X)=E[(X-E X)^2]$"
    ]
  },
  {
    "id": "f-204",
    "num": 204,
    "code": "204",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "方差的常用计算式。",
    "hasBlank": false,
    "answer": "$D(X)=E(X^2)-[E(X)]^2$",
    "answerParts": [
      "$D(X)=E(X^2)-[E(X)]^2$"
    ]
  },
  {
    "id": "f-205",
    "num": 205,
    "code": "205",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "写出 $D(X\\pm Y)$ 与协方差的关系。",
    "hasBlank": false,
    "answer": "$D(X)+D(Y)\\pm2\\operatorname{Cov}(X,Y)$",
    "answerParts": [
      "$D(X)+D(Y)\\pm2\\operatorname{Cov}(X,Y)$"
    ]
  },
  {
    "id": "f-206",
    "num": 206,
    "code": "206",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "协方差 $\\operatorname{Cov}(X,Y)$ 的两个等价定义。",
    "hasBlank": false,
    "answer": "$E[(X-EX)(Y-EY)]=E(XY)-EX\\,EY$",
    "answerParts": [
      "$E[(X-EX)(Y-EY)]=E(XY)-EX\\,EY$"
    ]
  },
  {
    "id": "f-207",
    "num": 207,
    "code": "207",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "相关系数 $\\rho_{XY}$ 的定义。",
    "hasBlank": false,
    "answer": "$\\operatorname{Cov}(X,Y)/(\\sqrt{D(X)D(Y)})$",
    "answerParts": [
      "$\\operatorname{Cov}(X,Y)/(\\sqrt{D(X)D(Y)})$"
    ]
  },
  {
    "id": "f-208",
    "num": 208,
    "code": "208",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "协方差的双线性公式 $\\operatorname{Cov}(aX,bY)$。",
    "hasBlank": false,
    "answer": "$ab\\operatorname{Cov}(X,Y)$",
    "answerParts": [
      "$ab\\operatorname{Cov}(X,Y)$"
    ]
  },
  {
    "id": "f-209",
    "num": 209,
    "code": "209",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "当 $X,Y$ 相互独立，协方差与方差和分别怎样？",
    "hasBlank": false,
    "answer": "$\\operatorname{Cov}(X,Y)=0$；$D(X+Y)=D(X)+D(Y)$",
    "answerParts": [
      "$\\operatorname{Cov}(X,Y)=0$",
      "$D(X+Y)=D(X)+D(Y)$"
    ]
  },
  {
    "id": "f-210",
    "num": 210,
    "code": "210",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "切比雪夫不等式：给出 $P(|X-EX|\\ge\\varepsilon)$ 的上界。",
    "hasBlank": false,
    "answer": "$\\le D(X)/\\varepsilon^2$",
    "answerParts": [
      "$\\le D(X)/\\varepsilon^2$"
    ]
  },
  {
    "id": "f-211",
    "num": 211,
    "code": "211",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "大数定律：样本均值 $\\bar X_n$ 依概率收敛到什么？",
    "hasBlank": false,
    "answer": "$EX=\\mu$（满足相应条件）",
    "answerParts": [
      "$EX=\\mu$（满足相应条件）"
    ]
  },
  {
    "id": "f-212",
    "num": 212,
    "code": "212",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "伯努利大数定律：频率收敛到什么？",
    "hasBlank": false,
    "answer": "事件发生概率 $p$",
    "answerParts": [
      "事件发生概率 $p$"
    ]
  },
  {
    "id": "f-213",
    "num": 213,
    "code": "213",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "辛钦大数定律常见前提和结论。",
    "hasBlank": false,
    "answer": "i.i.d. 且 $E|X_i|<\\infty$，则 $\\bar X_n\\overset{P}{\\to}\\mu$",
    "answerParts": [
      "i.i.d. 且 $E|X_i|<\\infty$，则 $\\bar X_n\\overset{P}{\\to}\\mu$"
    ]
  },
  {
    "id": "f-214",
    "num": 214,
    "code": "214",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "中心极限定理：$\\sum X_i$ 标准化形式。",
    "hasBlank": false,
    "answer": "$\\displaystyle\\frac{\\sum_{i=1}^nX_i-n\\mu}{\\sigma\\sqrt n}\\Rightarrow N(0,1)$",
    "answerParts": [
      "$\\displaystyle\\frac{\\sum_{i=1}^nX_i-n\\mu}{\\sigma\\sqrt n}\\Rightarrow N(0,1)$"
    ]
  },
  {
    "id": "f-215",
    "num": 215,
    "code": "215",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "中心极限定理：样本均值标准化形式。",
    "hasBlank": false,
    "answer": "$(\\bar X-\\mu)/(\\sigma/\\sqrt n)\\Rightarrow N(0,1)$",
    "answerParts": [
      "$(\\bar X-\\mu)/(\\sigma/\\sqrt n)\\Rightarrow N(0,1)$"
    ]
  },
  {
    "id": "f-216",
    "num": 216,
    "code": "216",
    "subject": "probstat",
    "sectionId": "prob-02",
    "question": "二项分布 $X\\sim B(n,p)$ 的正态近似标准化。",
    "hasBlank": false,
    "answer": "$(X-np)/\\sqrt{np(1-p)}\\Rightarrow N(0,1)$",
    "answerParts": [
      "$(X-np)/\\sqrt{np(1-p)}\\Rightarrow N(0,1)$"
    ]
  },
  {
    "id": "f-217",
    "num": 217,
    "code": "217",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "样本均值 $\\bar X$ 与样本方差 $S^2$ 的定义。",
    "hasBlank": false,
    "answer": "$\\bar X=\\frac1n\\sum X_i$；$S^2=\\frac1{n-1}\\sum(X_i-\\bar X)^2$",
    "answerParts": [
      "$\\bar X=\\frac1n\\sum X_i$",
      "$S^2=\\frac1{n-1}\\sum(X_i-\\bar X)^2$"
    ]
  },
  {
    "id": "f-218",
    "num": 218,
    "code": "218",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "i.i.d. 的样本均值的期望、方差。",
    "hasBlank": false,
    "answer": "$E(\\bar X)=\\mu$；$D(\\bar X)=\\sigma^2/n$",
    "answerParts": [
      "$E(\\bar X)=\\mu$",
      "$D(\\bar X)=\\sigma^2/n$"
    ]
  },
  {
    "id": "f-219",
    "num": 219,
    "code": "219",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "样本方差无偏性的结论。",
    "hasBlank": false,
    "answer": "$E(S^2)=\\sigma^2$",
    "answerParts": [
      "$E(S^2)=\\sigma^2$"
    ]
  },
  {
    "id": "f-220",
    "num": 220,
    "code": "220",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "卡方分布 $\\chi^2(n)$：标准正态变量构造。",
    "hasBlank": false,
    "answer": "$\\sum_{i=1}^n Z_i^2\\sim\\chi^2(n)$",
    "answerParts": [
      "$\\sum_{i=1}^n Z_i^2\\sim\\chi^2(n)$"
    ]
  },
  {
    "id": "f-221",
    "num": 221,
    "code": "221",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "卡方分布 $\\chi^2(n)$ 的均值与方差。",
    "hasBlank": false,
    "answer": "$n$；$2n$",
    "answerParts": [
      "$n$",
      "$2n$"
    ]
  },
  {
    "id": "f-222",
    "num": 222,
    "code": "222",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "$t(n)$ 分布的标准构造（$Z\\sim N(0,1)$，$U\\sim\\chi^2(n)$ 独立）。",
    "hasBlank": false,
    "answer": "$t=Z/\\sqrt{U/n}$",
    "answerParts": [
      "$t=Z/\\sqrt{U/n}$"
    ]
  },
  {
    "id": "f-223",
    "num": 223,
    "code": "223",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "$F(n_1,n_2)$ 分布的标准构造。",
    "hasBlank": false,
    "answer": "$(U_1/n_1)/(U_2/n_2)$（独立卡方）",
    "answerParts": [
      "$(U_1/n_1)/(U_2/n_2)$（独立卡方）"
    ]
  },
  {
    "id": "f-224",
    "num": 224,
    "code": "224",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "正态总体均值的 $Z$ 枢轴量（$\\sigma$ 已知）。",
    "hasBlank": false,
    "answer": "$(\\bar X-\\mu)/(\\sigma/\\sqrt n)\\sim N(0,1)$",
    "answerParts": [
      "$(\\bar X-\\mu)/(\\sigma/\\sqrt n)\\sim N(0,1)$"
    ]
  },
  {
    "id": "f-225",
    "num": 225,
    "code": "225",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "正态总体均值的 $t$ 枢轴量（$\\sigma$ 未知）。",
    "hasBlank": false,
    "answer": "$(\\bar X-\\mu)/(S/\\sqrt n)\\sim t(n-1)$",
    "answerParts": [
      "$(\\bar X-\\mu)/(S/\\sqrt n)\\sim t(n-1)$"
    ]
  },
  {
    "id": "f-226",
    "num": 226,
    "code": "226",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "正态总体方差的卡方枢轴量。",
    "hasBlank": false,
    "answer": "$(n-1)S^2/\\sigma^2\\sim\\chi^2(n-1)$",
    "answerParts": [
      "$(n-1)S^2/\\sigma^2\\sim\\chi^2(n-1)$"
    ]
  },
  {
    "id": "f-227",
    "num": 227,
    "code": "227",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "独立正态 $X,Y$ 的 $X\\pm Y$ 分布。",
    "hasBlank": false,
    "answer": "$N(\\mu_X\\pm\\mu_Y,\\sigma_X^2+\\sigma_Y^2)$",
    "answerParts": [
      "$N(\\mu_X\\pm\\mu_Y,\\sigma_X^2+\\sigma_Y^2)$"
    ]
  },
  {
    "id": "f-228",
    "num": 228,
    "code": "228",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "一般 $X,Y$ 的 $D(X\\pm Y)$，包含协方差时怎么写？",
    "hasBlank": false,
    "answer": "$\\sigma_X^2+\\sigma_Y^2\\pm2\\operatorname{Cov}(X,Y)$",
    "answerParts": [
      "$\\sigma_X^2+\\sigma_Y^2\\pm2\\operatorname{Cov}(X,Y)$"
    ]
  },
  {
    "id": "f-229",
    "num": 229,
    "code": "229",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "i.i.d. 样本最大次序统计量的分布函数。",
    "hasBlank": false,
    "answer": "$F_{\\max}(x)=[F(x)]^n$",
    "answerParts": [
      "$F_{\\max}(x)=[F(x)]^n$"
    ]
  },
  {
    "id": "f-230",
    "num": 230,
    "code": "230",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "i.i.d. 样本最小次序统计量的分布函数。",
    "hasBlank": false,
    "answer": "$F_{\\min}(x)=1-[1-F(x)]^n$",
    "answerParts": [
      "$F_{\\min}(x)=1-[1-F(x)]^n$"
    ]
  },
  {
    "id": "f-231",
    "num": 231,
    "code": "231",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "$\\max(X,Y)$ 与 $\\min(X,Y)$ 的绝对值表达式。",
    "hasBlank": false,
    "answer": "$\\max=(X+Y+|X-Y|)/2$；$\\min=(X+Y-|X-Y|)/2$",
    "answerParts": [
      "$\\max=(X+Y+|X-Y|)/2$",
      "$\\min=(X+Y-|X-Y|)/2$"
    ]
  },
  {
    "id": "f-232",
    "num": 232,
    "code": "232",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "$\\max(X,Y)+\\min(X,Y)$ 与两者乘积。",
    "hasBlank": false,
    "answer": "$X+Y$；$XY$",
    "answerParts": [
      "$X+Y$",
      "$XY$"
    ]
  },
  {
    "id": "f-233",
    "num": 233,
    "code": "233",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "泊松分布独立可加性。",
    "hasBlank": false,
    "answer": "$P(\\lambda_1)+P(\\lambda_2)\\sim P(\\lambda_1+\\lambda_2)$",
    "answerParts": [
      "$P(\\lambda_1)+P(\\lambda_2)\\sim P(\\lambda_1+\\lambda_2)$"
    ]
  },
  {
    "id": "f-234",
    "num": 234,
    "code": "234",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "同参数独立二项分布可加性。",
    "hasBlank": false,
    "answer": "$B(n_1,p)+B(n_2,p)\\sim B(n_1+n_2,p)$",
    "answerParts": [
      "$B(n_1,p)+B(n_2,p)\\sim B(n_1+n_2,p)$"
    ]
  },
  {
    "id": "f-235",
    "num": 235,
    "code": "235",
    "subject": "probstat",
    "sectionId": "stat-01",
    "question": "全方差公式。",
    "hasBlank": false,
    "answer": "$D(Y)=E[D(Y\\mid X)]+D[E(Y\\mid X)]$",
    "answerParts": [
      "$D(Y)=E[D(Y\\mid X)]+D[E(Y\\mid X)]$"
    ]
  },
  {
    "id": "f-236",
    "num": 236,
    "code": "236",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "连续时间傅里叶变换 $F(j\\omega)$ 的定义。",
    "hasBlank": false,
    "answer": "$F(j\\omega)=\\int_{-\\infty}^{\\infty}f(t)e^{-j\\omega t}dt$",
    "answerParts": [
      "$F(j\\omega)=\\int_{-\\infty}^{\\infty}f(t)e^{-j\\omega t}dt$"
    ]
  },
  {
    "id": "f-237",
    "num": 237,
    "code": "237",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "连续时间傅里叶反变换公式。",
    "hasBlank": false,
    "answer": "$f(t)=\\frac1{2\\pi}\\int_{-\\infty}^{\\infty}F(j\\omega)e^{j\\omega t}d\\omega$",
    "answerParts": [
      "$f(t)=\\frac1{2\\pi}\\int_{-\\infty}^{\\infty}F(j\\omega)e^{j\\omega t}d\\omega$"
    ]
  },
  {
    "id": "f-238",
    "num": 238,
    "code": "238",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "双边拉普拉斯变换 $F(s)$ 的定义与 $s$ 的形式。",
    "hasBlank": false,
    "answer": "$F(s)=\\int_{-\\infty}^{\\infty}f(t)e^{-st}dt$；$s=\\sigma+j\\omega$",
    "answerParts": [
      "$F(s)=\\int_{-\\infty}^{\\infty}f(t)e^{-st}dt$",
      "$s=\\sigma+j\\omega$"
    ]
  },
  {
    "id": "f-239",
    "num": 239,
    "code": "239",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "双边 $Z$ 变换 $X(z)$ 的定义。",
    "hasBlank": false,
    "answer": "$X(z)=\\sum_{n=-\\infty}^\\infty x[n]z^{-n}$",
    "answerParts": [
      "$X(z)=\\sum_{n=-\\infty}^\\infty x[n]z^{-n}$"
    ]
  },
  {
    "id": "f-240",
    "num": 240,
    "code": "240",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "微分算子 $p$ 与延迟算子 $z$ 的基本作用。",
    "hasBlank": false,
    "answer": "$px(t)=x^{\\prime}(t)$；$zx[n]=x[n+1]$",
    "answerParts": [
      "$px(t)=x^{\\prime}(t)$",
      "$zx[n]=x[n+1]$"
    ]
  },
  {
    "id": "f-241",
    "num": 241,
    "code": "241",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "算子 $p^2$、$p^{-1}$ 的意义。",
    "hasBlank": false,
    "answer": "$p^2x=x^{\\prime\\prime}$；$p^{-1}x=\\int x(t)dt$（需积分常数/初值）",
    "answerParts": [
      "$p^2x=x^{\\prime\\prime}$",
      "$p^{-1}x=\\int x(t)dt$（需积分常数/初值）"
    ]
  },
  {
    "id": "f-242",
    "num": 242,
    "code": "242",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "算子 $z^2$、$z^{-1}$ 的意义。",
    "hasBlank": false,
    "answer": "$z^2x[n]=x[n+2]$；$z^{-1}x[n]=x[n-1]$",
    "answerParts": [
      "$z^2x[n]=x[n+2]$",
      "$z^{-1}x[n]=x[n-1]$"
    ]
  },
  {
    "id": "f-243",
    "num": 243,
    "code": "243",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "线性时不变系统：指数输入 $e^{st}$ 的输出形式。",
    "hasBlank": false,
    "answer": "$y(t)=H(s)e^{st}$（该指数在系统特征函数条件下）",
    "answerParts": [
      "$y(t)=H(s)e^{st}$（该指数在系统特征函数条件下）"
    ]
  },
  {
    "id": "f-244",
    "num": 244,
    "code": "244",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "离散 LTI：$z_0^n$ 的输出形式。",
    "hasBlank": false,
    "answer": "$y[n]=H(z_0)z_0^n$",
    "answerParts": [
      "$y[n]=H(z_0)z_0^n$"
    ]
  },
  {
    "id": "f-245",
    "num": 245,
    "code": "245",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "连续 / 离散系统在正弦稳态下的特征频率取值。",
    "hasBlank": false,
    "answer": "$s=j\\omega$；$z=e^{j\\omega}$",
    "answerParts": [
      "$s=j\\omega$",
      "$z=e^{j\\omega}$"
    ]
  },
  {
    "id": "f-246",
    "num": 246,
    "code": "246",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "两个子系统串联时 $H$ 如何组合？并联呢？",
    "hasBlank": false,
    "answer": "串联 $H=H_1H_2\\cdots$；并联 $H=H_1+H_2+\\cdots$",
    "answerParts": [
      "串联 $H=H_1H_2\\cdots$",
      "并联 $H=H_1+H_2+\\cdots$"
    ]
  },
  {
    "id": "f-247",
    "num": 247,
    "code": "247",
    "subject": "signals",
    "sectionId": "sig-01",
    "question": "连续系统有理传递函数 $H(s)$：高频时比较分子分母次数。",
    "hasBlank": false,
    "answer": "$\\deg B<\\deg A$ 则 $H\\to0$；$>$ 则通常 $|H|\\to\\infty$",
    "answerParts": [
      "$\\deg B<\\deg A$ 则 $H\\to0$",
      "$>$ 则通常 $|H|\\to\\infty$"
    ]
  },
  {
    "id": "f-248",
    "num": 248,
    "code": "248",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激函数的筛选性质。",
    "hasBlank": false,
    "answer": "$f(t)\\delta(t-t_0)=f(t_0)\\delta(t-t_0)$",
    "answerParts": [
      "$f(t)\\delta(t-t_0)=f(t_0)\\delta(t-t_0)$"
    ]
  },
  {
    "id": "f-249",
    "num": 249,
    "code": "249",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激导数与函数乘积的公式。",
    "hasBlank": false,
    "answer": "$f(t)\\delta^{\\prime}(t-t_0)=f(t_0)\\delta^{\\prime}(t-t_0)-f^{\\prime}(t_0)\\delta(t-t_0)$",
    "answerParts": [
      "$f(t)\\delta^{\\prime}(t-t_0)=f(t_0)\\delta^{\\prime}(t-t_0)-f^{\\prime}(t_0)\\delta(t-t_0)$"
    ]
  },
  {
    "id": "f-250",
    "num": 250,
    "code": "250",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "$\\displaystyle\\int_{-\\infty}^{\\infty}\\delta(t)dt$ 和 $\\int_{-\\infty}^{t}\\delta(\\tau)d\\tau$。",
    "hasBlank": false,
    "answer": "$1$；$u(t)$",
    "answerParts": [
      "$1$",
      "$u(t)$"
    ]
  },
  {
    "id": "f-251",
    "num": 251,
    "code": "251",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "$\\displaystyle\\int_{-\\infty}^{\\infty}\\delta^{\\prime}(t)dt$ 与 $\\int_{-\\infty}^{t}\\delta^{\\prime}(\\tau)d\\tau$。",
    "hasBlank": false,
    "answer": "$0$；$\\delta(t)$",
    "answerParts": [
      "$0$",
      "$\\delta(t)$"
    ]
  },
  {
    "id": "f-252",
    "num": 252,
    "code": "252",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激缩放 $\\delta(at+b)$ 的公式。",
    "hasBlank": false,
    "answer": "$\\frac1{|a|}\\delta(t+b/a)$（$a\\ne0$）",
    "answerParts": [
      "$\\frac1{|a|}\\delta(t+b/a)$（$a\\ne0$）"
    ]
  },
  {
    "id": "f-253",
    "num": 253,
    "code": "253",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激导数缩放 $\\delta^{\\prime}(at)$ 的公式。",
    "hasBlank": false,
    "answer": "$\\delta^{\\prime}(at)=\\delta^{\\prime}(t)/(a|a|)$",
    "answerParts": [
      "$\\delta^{\\prime}(at)=\\delta^{\\prime}(t)/(a|a|)$"
    ]
  },
  {
    "id": "f-254",
    "num": 254,
    "code": "254",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激函数与冲激导数的奇偶性。",
    "hasBlank": false,
    "answer": "$\\delta(-t)=\\delta(t)$；$\\delta^{\\prime}(-t)=-\\delta^{\\prime}(t)$",
    "answerParts": [
      "$\\delta(-t)=\\delta(t)$",
      "$\\delta^{\\prime}(-t)=-\\delta^{\\prime}(t)$"
    ]
  },
  {
    "id": "f-255",
    "num": 255,
    "code": "255",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激筛选积分 $\\int f(t)\\delta(t-t_0)dt$。",
    "hasBlank": false,
    "answer": "$f(t_0)$（积分区间包含 $t_0$）",
    "answerParts": [
      "$f(t_0)$（积分区间包含 $t_0$）"
    ]
  },
  {
    "id": "f-256",
    "num": 256,
    "code": "256",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "冲激导数筛选积分 $\\int f(t)\\delta^{\\prime}(t-t_0)dt$。",
    "hasBlank": false,
    "answer": "$-f^{\\prime}(t_0)$",
    "answerParts": [
      "$-f^{\\prime}(t_0)$"
    ]
  },
  {
    "id": "f-257",
    "num": 257,
    "code": "257",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "连续周期信号平均功率定义。",
    "hasBlank": false,
    "answer": "$P=\\frac1{T_0}\\int_{t_0}^{t_0+T_0}|x(t)|^2dt$",
    "answerParts": [
      "$P=\\frac1{T_0}\\int_{t_0}^{t_0+T_0}|x(t)|^2dt$"
    ]
  },
  {
    "id": "f-258",
    "num": 258,
    "code": "258",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "离散周期信号平均功率定义。",
    "hasBlank": false,
    "answer": "$P=\\frac1{N_0}\\sum_{n=0}^{N_0-1}|x[n]|^2$",
    "answerParts": [
      "$P=\\frac1{N_0}\\sum_{n=0}^{N_0-1}|x[n]|^2$"
    ]
  },
  {
    "id": "f-259",
    "num": 259,
    "code": "259",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "连续周期傅里叶级数的帕塞瓦尔关系。",
    "hasBlank": false,
    "answer": "$P=\\sum_{k=-\\infty}^{\\infty}|c_k|^2$",
    "answerParts": [
      "$P=\\sum_{k=-\\infty}^{\\infty}|c_k|^2$"
    ]
  },
  {
    "id": "f-260",
    "num": 260,
    "code": "260",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "离散周期傅里叶级数的帕塞瓦尔关系。",
    "hasBlank": false,
    "answer": "$P=\\sum_{k=0}^{N_0-1}|a_k|^2$",
    "answerParts": [
      "$P=\\sum_{k=0}^{N_0-1}|a_k|^2$"
    ]
  },
  {
    "id": "f-261",
    "num": 261,
    "code": "261",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "连续时间非周期信号的能量定义和频域表达。",
    "hasBlank": false,
    "answer": "$E=\\int_{-\\infty}^\\infty|x(t)|^2dt=\\frac1{2\\pi}\\int_{-\\infty}^\\infty|X(j\\omega)|^2d\\omega$",
    "answerParts": [
      "$E=\\int_{-\\infty}^\\infty|x(t)|^2dt=\\frac1{2\\pi}\\int_{-\\infty}^\\infty|X(j\\omega)|^2d\\omega$"
    ]
  },
  {
    "id": "f-262",
    "num": 262,
    "code": "262",
    "subject": "signals",
    "sectionId": "sig-02",
    "question": "离散非周期信号能量的时域/频域表达。",
    "hasBlank": false,
    "answer": "$E=\\sum_{n=-\\infty}^\\infty|x[n]|^2=\\frac1{2\\pi}\\int_{-\\pi}^\\pi|X(e^{j\\omega})|^2d\\omega$",
    "answerParts": [
      "$E=\\sum_{n=-\\infty}^\\infty|x[n]|^2=\\frac1{2\\pi}\\int_{-\\pi}^\\pi|X(e^{j\\omega})|^2d\\omega$"
    ]
  },
  {
    "id": "f-263",
    "num": 263,
    "code": "263",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "连续时间复指数傅里叶级数表达式。",
    "hasBlank": false,
    "answer": "$x(t)=\\sum_{k=-\\infty}^\\infty a_ke^{jk\\omega_0t}$",
    "answerParts": [
      "$x(t)=\\sum_{k=-\\infty}^\\infty a_ke^{jk\\omega_0t}$"
    ]
  },
  {
    "id": "f-264",
    "num": 264,
    "code": "264",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "连续时间复指数傅里叶系数。",
    "hasBlank": false,
    "answer": "$a_k=\\frac1{T_0}\\int_{t_0}^{t_0+T_0}x(t)e^{-jk\\omega_0t}dt$",
    "answerParts": [
      "$a_k=\\frac1{T_0}\\int_{t_0}^{t_0+T_0}x(t)e^{-jk\\omega_0t}dt$"
    ]
  },
  {
    "id": "f-265",
    "num": 265,
    "code": "265",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "连续时间三角傅里叶级数表达式。",
    "hasBlank": false,
    "answer": "$x(t)=a_0/2+\\sum_{n\\ge1}[a_n\\cos(n\\omega_0t)+b_n\\sin(n\\omega_0t)]$",
    "answerParts": [
      "$x(t)=a_0/2+\\sum_{n\\ge1}[a_n\\cos(n\\omega_0t)+b_n\\sin(n\\omega_0t)]$"
    ]
  },
  {
    "id": "f-266",
    "num": 266,
    "code": "266",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "三角傅里叶系数 $a_0,a_n,b_n$ 的时间域积分形式。",
    "hasBlank": false,
    "answer": "$a_0=\\frac2{T_0}\\int x$；$a_n=\\frac2{T_0}\\int x\\cos(n\\omega_0t)$；$b_n=\\frac2{T_0}\\int x\\sin(n\\omega_0t)$",
    "answerParts": [
      "$a_0=\\frac2{T_0}\\int x$",
      "$a_n=\\frac2{T_0}\\int x\\cos(n\\omega_0t)$",
      "$b_n=\\frac2{T_0}\\int x\\sin(n\\omega_0t)$"
    ]
  },
  {
    "id": "f-267",
    "num": 267,
    "code": "267",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "三角频谱幅相表示。",
    "hasBlank": false,
    "answer": "$x(t)=c_0+\\sum_{k\\ge1}C_k\\cos(k\\omega_0t+\\varphi_k)$",
    "answerParts": [
      "$x(t)=c_0+\\sum_{k\\ge1}C_k\\cos(k\\omega_0t+\\varphi_k)$"
    ]
  },
  {
    "id": "f-268",
    "num": 268,
    "code": "268",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "三角谱转双边复指数谱：$a_k$ 与 $C_k,\\varphi_k$ 关系（$k>0$）。",
    "hasBlank": false,
    "answer": "$a_k=(C_k/2)e^{j\\varphi_k}$；$a_{-k}=(C_k/2)e^{-j\\varphi_k}$",
    "answerParts": [
      "$a_k=(C_k/2)e^{j\\varphi_k}$",
      "$a_{-k}=(C_k/2)e^{-j\\varphi_k}$"
    ]
  },
  {
    "id": "f-269",
    "num": 269,
    "code": "269",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "实信号的傅里叶变换共轭对称性。",
    "hasBlank": false,
    "answer": "$F(-j\\omega)=F^*(j\\omega)$",
    "answerParts": [
      "$F(-j\\omega)=F^*(j\\omega)$"
    ]
  },
  {
    "id": "f-270",
    "num": 270,
    "code": "270",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "实信号幅度谱和相位谱的奇偶性。",
    "hasBlank": false,
    "answer": "幅度谱偶对称，相位谱奇对称（选定相位分支）",
    "answerParts": [
      "幅度谱偶对称，相位谱奇对称（选定相位分支）"
    ]
  },
  {
    "id": "f-271",
    "num": 271,
    "code": "271",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "纯实/纯虚及偶/奇信号的频谱对应关系。",
    "hasBlank": false,
    "answer": "实偶信号 $\\to$ 实偶谱；实奇信号 $\\to$ 纯虚奇谱",
    "answerParts": [
      "实偶信号 $\\to$ 实偶谱",
      "实奇信号 $\\to$ 纯虚奇谱"
    ]
  },
  {
    "id": "f-272",
    "num": 272,
    "code": "272",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "连续时间周期信号 $x(t)=\\sum a_ke^{jk\\omega_0t}$ 的傅里叶变换。",
    "hasBlank": false,
    "answer": "$X(j\\omega)=2\\pi\\sum_k a_k\\delta(\\omega-k\\omega_0)$",
    "answerParts": [
      "$X(j\\omega)=2\\pi\\sum_k a_k\\delta(\\omega-k\\omega_0)$"
    ]
  },
  {
    "id": "f-273",
    "num": 273,
    "code": "273",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "两个周期信号相加，公共周期怎么求？",
    "hasBlank": false,
    "answer": "寻找公共周期：$T=mT_1=nT_2$；有理周期比时存在",
    "answerParts": [
      "寻找公共周期：$T=mT_1=nT_2$",
      "有理周期比时存在"
    ]
  },
  {
    "id": "f-274",
    "num": 274,
    "code": "274",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "正弦离散信号 $\\cos(\\Omega n+\\phi)$ 周期存在的条件。",
    "hasBlank": false,
    "answer": "$\\Omega/(2\\pi)$ 为有理数",
    "answerParts": [
      "$\\Omega/(2\\pi)$ 为有理数"
    ]
  },
  {
    "id": "f-275",
    "num": 275,
    "code": "275",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "若 $\\Omega/(2\\pi)=p/q$（最简分数），离散正弦基本周期。",
    "hasBlank": false,
    "answer": "$N=q$（非退化正弦）",
    "answerParts": [
      "$N=q$（非退化正弦）"
    ]
  },
  {
    "id": "f-276",
    "num": 276,
    "code": "276",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "无失真传输系统频率响应的形式。",
    "hasBlank": false,
    "answer": "$H(j\\omega)=Ke^{-j\\omega t_0}$",
    "answerParts": [
      "$H(j\\omega)=Ke^{-j\\omega t_0}$"
    ]
  },
  {
    "id": "f-277",
    "num": 277,
    "code": "277",
    "subject": "signals",
    "sectionId": "sig-03",
    "question": "系统群时延与相位响应的关系。",
    "hasBlank": false,
    "answer": "$\\tau_g(\\omega)=-d\\phi(\\omega)/d\\omega$",
    "answerParts": [
      "$\\tau_g(\\omega)=-d\\phi(\\omega)/d\\omega$"
    ]
  },
  {
    "id": "f-278",
    "num": 278,
    "code": "278",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "冲激 $\\delta(t)$ 的连续傅里叶变换 / 拉普拉斯变换。",
    "hasBlank": false,
    "answer": "$1$ / $1$",
    "answerParts": [
      "$1$ / $1$"
    ]
  },
  {
    "id": "f-279",
    "num": 279,
    "code": "279",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$\\delta^{\\prime}(t)$ 的连续傅里叶变换 / 拉普拉斯变换。",
    "hasBlank": false,
    "answer": "$j\\omega$ / $s$",
    "answerParts": [
      "$j\\omega$ / $s$"
    ]
  },
  {
    "id": "f-280",
    "num": 280,
    "code": "280",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "单位阶跃 $u(t)$ 的双边拉普拉斯变换（含 ROC）。",
    "hasBlank": false,
    "answer": "$1/s$，$\\operatorname{Re}s>0$",
    "answerParts": [
      "$1/s$，$\\operatorname{Re}s>0$"
    ]
  },
  {
    "id": "f-281",
    "num": 281,
    "code": "281",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$tu(t)$ 与 $t^2u(t)$ 的拉普拉斯变换。",
    "hasBlank": false,
    "answer": "$1/s^2$；$2/s^3$（$\\operatorname{Re}s>0$）",
    "answerParts": [
      "$1/s^2$",
      "$2/s^3$（$\\operatorname{Re}s>0$）"
    ]
  },
  {
    "id": "f-282",
    "num": 282,
    "code": "282",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$e^{at}u(t)$ 的拉普拉斯变换和 ROC。",
    "hasBlank": false,
    "answer": "$1/(s-a)$，$\\operatorname{Re}s>a$",
    "answerParts": [
      "$1/(s-a)$，$\\operatorname{Re}s>a$"
    ]
  },
  {
    "id": "f-283",
    "num": 283,
    "code": "283",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$\\cos(\\beta t)u(t)$、$\\sin(\\beta t)u(t)$ 的拉普拉斯变换。",
    "hasBlank": false,
    "answer": "$s/(s^2+\\beta^2)$；$\\beta/(s^2+\\beta^2)$",
    "answerParts": [
      "$s/(s^2+\\beta^2)$",
      "$\\beta/(s^2+\\beta^2)$"
    ]
  },
  {
    "id": "f-284",
    "num": 284,
    "code": "284",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$e^{-at}\\cos\\beta t\\,u(t)$ 的拉普拉斯变换。",
    "hasBlank": false,
    "answer": "$(s+a)/[(s+a)^2+\\beta^2]$",
    "answerParts": [
      "$(s+a)/[(s+a)^2+\\beta^2]$"
    ]
  },
  {
    "id": "f-285",
    "num": 285,
    "code": "285",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$e^{-at}\\sin\\beta t\\,u(t)$ 的拉普拉斯变换。",
    "hasBlank": false,
    "answer": "$\\beta/[(s+a)^2+\\beta^2]$",
    "answerParts": [
      "$\\beta/[(s+a)^2+\\beta^2]$"
    ]
  },
  {
    "id": "f-286",
    "num": 286,
    "code": "286",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "离散 $\\delta[n]$ 的双边 $Z$ 变换。",
    "hasBlank": false,
    "answer": "$1$",
    "answerParts": [
      "$1$"
    ]
  },
  {
    "id": "f-287",
    "num": 287,
    "code": "287",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "离散阶跃 $u[n]$ 的 $Z$ 变换及 ROC。",
    "hasBlank": false,
    "answer": "$z/(z-1)$，$|z|>1$",
    "answerParts": [
      "$z/(z-1)$，$|z|>1$"
    ]
  },
  {
    "id": "f-288",
    "num": 288,
    "code": "288",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$nu[n]$、$n^2u[n]$ 的 $Z$ 变换。",
    "hasBlank": false,
    "answer": "$z/(z-1)^2$；$z(z+1)/(z-1)^3$",
    "answerParts": [
      "$z/(z-1)^2$",
      "$z(z+1)/(z-1)^3$"
    ]
  },
  {
    "id": "f-289",
    "num": 289,
    "code": "289",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$a^nu[n]$ 的 $Z$ 变换与 ROC。",
    "hasBlank": false,
    "answer": "$z/(z-a)$，$|z|>|a|$",
    "answerParts": [
      "$z/(z-a)$，$|z|>|a|$"
    ]
  },
  {
    "id": "f-290",
    "num": 290,
    "code": "290",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$\\cos(\\Omega n)u[n]$ 的 $Z$ 变换。",
    "hasBlank": false,
    "answer": "$z(z-\\cos\\Omega)/(z^2-2z\\cos\\Omega+1)$",
    "answerParts": [
      "$z(z-\\cos\\Omega)/(z^2-2z\\cos\\Omega+1)$"
    ]
  },
  {
    "id": "f-291",
    "num": 291,
    "code": "291",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$\\sin(\\Omega n)u[n]$ 的 $Z$ 变换。",
    "hasBlank": false,
    "answer": "$z\\sin\\Omega/(z^2-2z\\cos\\Omega+1)$",
    "answerParts": [
      "$z\\sin\\Omega/(z^2-2z\\cos\\Omega+1)$"
    ]
  },
  {
    "id": "f-292",
    "num": 292,
    "code": "292",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$a^n\\cos(\\Omega n)u[n]$ 的 $Z$ 变换。",
    "hasBlank": false,
    "answer": "$z(z-a\\cos\\Omega)/(z^2-2az\\cos\\Omega+a^2)$",
    "answerParts": [
      "$z(z-a\\cos\\Omega)/(z^2-2az\\cos\\Omega+a^2)$"
    ]
  },
  {
    "id": "f-293",
    "num": 293,
    "code": "293",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "$a^n\\sin(\\Omega n)u[n]$ 的 $Z$ 变换。",
    "hasBlank": false,
    "answer": "$az\\sin\\Omega/(z^2-2az\\cos\\Omega+a^2)$",
    "answerParts": [
      "$az\\sin\\Omega/(z^2-2az\\cos\\Omega+a^2)$"
    ]
  },
  {
    "id": "f-294",
    "num": 294,
    "code": "294",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "傅里叶变换对 $e^{j\\omega_0t}$（分布意义）。",
    "hasBlank": false,
    "answer": "$2\\pi\\delta(\\omega-\\omega_0)$",
    "answerParts": [
      "$2\\pi\\delta(\\omega-\\omega_0)$"
    ]
  },
  {
    "id": "f-295",
    "num": 295,
    "code": "295",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "傅里叶变换对 $\\cos\\omega_0t$。",
    "hasBlank": false,
    "answer": "$\\pi[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)]$",
    "answerParts": [
      "$\\pi[\\delta(\\omega-\\omega_0)+\\delta(\\omega+\\omega_0)]$"
    ]
  },
  {
    "id": "f-296",
    "num": 296,
    "code": "296",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "傅里叶变换对 $\\sin\\omega_0t$。",
    "hasBlank": false,
    "answer": "$\\pi[\\delta(\\omega-\\omega_0)-\\delta(\\omega+\\omega_0)]/j$",
    "answerParts": [
      "$\\pi[\\delta(\\omega-\\omega_0)-\\delta(\\omega+\\omega_0)]/j$"
    ]
  },
  {
    "id": "f-297",
    "num": 297,
    "code": "297",
    "subject": "signals",
    "sectionId": "sig-04",
    "question": "傅里叶变换对 $u(t)$（广义函数意义）。",
    "hasBlank": false,
    "answer": "$\\pi\\delta(\\omega)+\\operatorname{PV}(1/(j\\omega))$",
    "answerParts": [
      "$\\pi\\delta(\\omega)+\\operatorname{PV}(1/(j\\omega))$"
    ]
  },
  {
    "id": "f-298",
    "num": 298,
    "code": "298",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶时移：$f(t-t_0)\\longleftrightarrow$ ________________",
    "hasBlank": true,
    "answer": "$e^{-j\\omega t_0}F(j\\omega)$",
    "answerParts": [
      "$e^{-j\\omega t_0}F(j\\omega)$"
    ]
  },
  {
    "id": "f-299",
    "num": 299,
    "code": "299",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶频移：$f(t)e^{j\\omega_0t}\\longleftrightarrow$ ________________",
    "hasBlank": true,
    "answer": "$F(j(\\omega-\\omega_0))$",
    "answerParts": [
      "$F(j(\\omega-\\omega_0))$"
    ]
  },
  {
    "id": "f-300",
    "num": 300,
    "code": "300",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶时域尺度变换：$f(at)\\longleftrightarrow$ ________________",
    "hasBlank": true,
    "answer": "$\\frac1{|a|}F(j\\omega/a)$",
    "answerParts": [
      "$\\frac1{|a|}F(j\\omega/a)$"
    ]
  },
  {
    "id": "f-301",
    "num": 301,
    "code": "301",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶时域卷积的变换性质。",
    "hasBlank": false,
    "answer": "$f_1*f_2\\longleftrightarrow F_1F_2$",
    "answerParts": [
      "$f_1*f_2\\longleftrightarrow F_1F_2$"
    ]
  },
  {
    "id": "f-302",
    "num": 302,
    "code": "302",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶时域乘积的变换性质。",
    "hasBlank": false,
    "answer": "$f_1f_2\\longleftrightarrow\\frac1{2\\pi}(F_1*F_2)$",
    "answerParts": [
      "$f_1f_2\\longleftrightarrow\\frac1{2\\pi}(F_1*F_2)$"
    ]
  },
  {
    "id": "f-303",
    "num": 303,
    "code": "303",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶时域微分：$f^{(n)}(t)$ 对应的频域表达。",
    "hasBlank": false,
    "answer": "$(j\\omega)^nF(j\\omega)$",
    "answerParts": [
      "$(j\\omega)^nF(j\\omega)$"
    ]
  },
  {
    "id": "f-304",
    "num": 304,
    "code": "304",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶时域乘 $t$ 与频域微分的关系。",
    "hasBlank": false,
    "answer": "$tf(t)\\longleftrightarrow j\\,dF(j\\omega)/d\\omega$",
    "answerParts": [
      "$tf(t)\\longleftrightarrow j\\,dF(j\\omega)/d\\omega$"
    ]
  },
  {
    "id": "f-305",
    "num": 305,
    "code": "305",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "傅里叶对偶性：若 $f(t)\\leftrightarrow F(j\\omega)$，则 $F(jt)\\leftrightarrow$ ________________",
    "hasBlank": true,
    "answer": "$2\\pi f(-\\omega)$（变量记号对应）",
    "answerParts": [
      "$2\\pi f(-\\omega)$（变量记号对应）"
    ]
  },
  {
    "id": "f-306",
    "num": 306,
    "code": "306",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "拉普拉斯时移：$f(t-t_0)u(t-t_0)$ 的单边变换。",
    "hasBlank": false,
    "answer": "$e^{-st_0}F(s)$（$t_0\\ge0$；适用条件下）",
    "answerParts": [
      "$e^{-st_0}F(s)$（$t_0\\ge0$",
      "适用条件下）"
    ]
  },
  {
    "id": "f-307",
    "num": 307,
    "code": "307",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "拉普拉斯频移：$e^{at}f(t)$ 的变换。",
    "hasBlank": false,
    "answer": "$F(s-a)$",
    "answerParts": [
      "$F(s-a)$"
    ]
  },
  {
    "id": "f-308",
    "num": 308,
    "code": "308",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "拉普拉斯卷积：$(f*g)(t)$ 的变换。",
    "hasBlank": false,
    "answer": "$F(s)G(s)$",
    "answerParts": [
      "$F(s)G(s)$"
    ]
  },
  {
    "id": "f-309",
    "num": 309,
    "code": "309",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "单边拉普拉斯：$f^{\\prime}(t)$ 的变换。",
    "hasBlank": false,
    "answer": "$sF(s)-f(0^-)$",
    "answerParts": [
      "$sF(s)-f(0^-)$"
    ]
  },
  {
    "id": "f-310",
    "num": 310,
    "code": "310",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "单边拉普拉斯：$f^{\\prime\\prime}(t)$ 的变换。",
    "hasBlank": false,
    "answer": "$s^2F(s)-sf(0^-)-f^{\\prime}(0^-)$",
    "answerParts": [
      "$s^2F(s)-sf(0^-)-f^{\\prime}(0^-)$"
    ]
  },
  {
    "id": "f-311",
    "num": 311,
    "code": "311",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "单边拉普拉斯初值定理、终值定理。",
    "hasBlank": false,
    "answer": "$f(0^+)=\\lim_{s\\to\\infty}sF(s)$；$f(\\infty)=\\lim_{s\\to0}sF(s)$（满足极点条件）",
    "answerParts": [
      "$f(0^+)=\\lim_{s\\to\\infty}sF(s)$",
      "$f(\\infty)=\\lim_{s\\to0}sF(s)$（满足极点条件）"
    ]
  },
  {
    "id": "f-312",
    "num": 312,
    "code": "312",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "$Z$ 变换右移：$x[n-n_0]$ 的双边变换。",
    "hasBlank": false,
    "answer": "$z^{-n_0}X(z)$",
    "answerParts": [
      "$z^{-n_0}X(z)$"
    ]
  },
  {
    "id": "f-313",
    "num": 313,
    "code": "313",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "$Z$ 变换尺度：$a^nx[n]$ 的变换。",
    "hasBlank": false,
    "answer": "$X(z/a)$",
    "answerParts": [
      "$X(z/a)$"
    ]
  },
  {
    "id": "f-314",
    "num": 314,
    "code": "314",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "$Z$ 变换卷积：$(x*y)[n]$ 的变换。",
    "hasBlank": false,
    "answer": "$X(z)Y(z)$",
    "answerParts": [
      "$X(z)Y(z)$"
    ]
  },
  {
    "id": "f-315",
    "num": 315,
    "code": "315",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "$Z$ 变换时域乘 $n$ 的性质。",
    "hasBlank": false,
    "answer": "$nx[n]\\longleftrightarrow-z\\,dX(z)/dz$",
    "answerParts": [
      "$nx[n]\\longleftrightarrow-z\\,dX(z)/dz$"
    ]
  },
  {
    "id": "f-316",
    "num": 316,
    "code": "316",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "$Z$ 变换初值 / 终值公式（因果序列且条件满足）。",
    "hasBlank": false,
    "answer": "$x[0]=\\lim_{z\\to\\infty}X(z)$；$\\lim_{n\\to\\infty}x[n]=\\lim_{z\\to1}(z-1)X(z)/z$",
    "answerParts": [
      "$x[0]=\\lim_{z\\to\\infty}X(z)$",
      "$\\lim_{n\\to\\infty}x[n]=\\lim_{z\\to1}(z-1)X(z)/z$"
    ]
  },
  {
    "id": "f-317",
    "num": 317,
    "code": "317",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "画图并描述两个矩形信号卷积后的典型形状。",
    "hasBlank": false,
    "answer": "等宽矩形卷积为三角形；不等宽为梯形（峰值取决于幅高及重叠长度）",
    "answerParts": [
      "等宽矩形卷积为三角形",
      "不等宽为梯形（峰值取决于幅高及重叠长度）"
    ]
  },
  {
    "id": "f-318",
    "num": 318,
    "code": "318",
    "subject": "signals",
    "sectionId": "sig-05",
    "question": "矩形脉冲宽度为 $T$，变换后频谱中零点间隔与什么相关？",
    "hasBlank": false,
    "answer": "与脉宽成反比；连续时间第一个零点通常 $\\omega=2\\pi/T$",
    "answerParts": [
      "与脉宽成反比",
      "连续时间第一个零点通常 $\\omega=2\\pi/T$"
    ]
  },
  {
    "id": "f-319",
    "num": 319,
    "code": "319",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "零初始条件下，电阻、电感、电容在 $s$ 域的阻抗。",
    "hasBlank": false,
    "answer": "$R$；$sL$；$1/(sC)$",
    "answerParts": [
      "$R$",
      "$sL$",
      "$1/(sC)$"
    ]
  },
  {
    "id": "f-320",
    "num": 320,
    "code": "320",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "电感含初始电流时，$s$ 域额外电压源的大小。",
    "hasBlank": false,
    "answer": "$Li_L(0^-)$（方向由参考极性确定）",
    "answerParts": [
      "$Li_L(0^-)$（方向由参考极性确定）"
    ]
  },
  {
    "id": "f-321",
    "num": 321,
    "code": "321",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "电容含初始电压时，$s$ 域串联等效初始电压源大小。",
    "hasBlank": false,
    "answer": "$u_C(0^-)/s$",
    "answerParts": [
      "$u_C(0^-)/s$"
    ]
  },
  {
    "id": "f-322",
    "num": 322,
    "code": "322",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "平行四边形/三角形法则：两正弦相量合成的幅值。",
    "hasBlank": false,
    "answer": "$|A_1e^{j\\phi_1}+A_2e^{j\\phi_2}|$",
    "answerParts": [
      "$|A_1e^{j\\phi_1}+A_2e^{j\\phi_2}|$"
    ]
  },
  {
    "id": "f-323",
    "num": 323,
    "code": "323",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "$a\\sin x+b\\cos x$ 化为单正弦的振幅与相位条件。",
    "hasBlank": false,
    "answer": "$R\\sin(x+\\phi)$；$R=\\sqrt{a^2+b^2}$，$R\\cos\\phi=a,\\ R\\sin\\phi=b$",
    "answerParts": [
      "$R\\sin(x+\\phi)$",
      "$R=\\sqrt{a^2+b^2}$，$R\\cos\\phi=a,\\ R\\sin\\phi=b$"
    ]
  },
  {
    "id": "f-324",
    "num": 324,
    "code": "324",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "数学中的卷积运算，频域变换为何形式？",
    "hasBlank": false,
    "answer": "时域卷积对应频域乘积；时域乘积对应频域卷积（含归一化系数）",
    "answerParts": [
      "时域卷积对应频域乘积",
      "时域乘积对应频域卷积（含归一化系数）"
    ]
  },
  {
    "id": "f-325",
    "num": 325,
    "code": "325",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "时域与频域零点/极点概念：写出零点、极点的定义。",
    "hasBlank": false,
    "answer": "零点：传递函数分子为零处；极点：分母为零且未约去处",
    "answerParts": [
      "零点：传递函数分子为零处",
      "极点：分母为零且未约去处"
    ]
  },
  {
    "id": "f-326",
    "num": 326,
    "code": "326",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "函数 $H(s)=B(s)/A(s)$：若分母次数更高，则 $|s|\\to\\infty$ 时如何？",
    "hasBlank": false,
    "answer": "$H(s)\\to0$",
    "answerParts": [
      "$H(s)\\to0$"
    ]
  },
  {
    "id": "f-327",
    "num": 327,
    "code": "327",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "写出 $\\delta(t)$ 与 $u(t)$ 的微积分关系。",
    "hasBlank": false,
    "answer": "$u^{\\prime}(t)=\\delta(t)$；$u(t)=\\int_{-\\infty}^t\\delta(\\tau)d\\tau$",
    "answerParts": [
      "$u^{\\prime}(t)=\\delta(t)$",
      "$u(t)=\\int_{-\\infty}^t\\delta(\\tau)d\\tau$"
    ]
  },
  {
    "id": "f-328",
    "num": 328,
    "code": "328",
    "subject": "signals",
    "sectionId": "sig-06",
    "question": "离散频率 $\\Omega$ 与连续频率 $\\omega$ 的周期性差别。",
    "hasBlank": false,
    "answer": "$e^{j\\Omega n}$ 关于 $\\Omega$ 以 $2\\pi$ 周期；$e^{j\\omega t}$ 不以 $\\omega$ 周期",
    "answerParts": [
      "$e^{j\\Omega n}$ 关于 $\\Omega$ 以 $2\\pi$ 周期",
      "$e^{j\\omega t}$ 不以 $\\omega$ 周期"
    ]
  }
];

export const FORMULA_MAP: Record<string, FormulaItem> = Object.fromEntries(
  FORMULAS.map((f) => [f.id, f])
);

export const FORMULA_IDS: string[] = FORMULAS.map((f) => f.id);

export const FORMULA_VERIFICATION_NOTES: FormulaVerificationNote[] = [
  {
    "title": "等价无穷小、泰勒余项",
    "body": "原稿若写成 $O(x^n)$ 或存在阶次混用，本册统一采用对应次数的标准佩亚诺余项 $o(x^n)$；具体阶次需与截断项匹配。"
  },
  {
    "title": "等价无穷小替换",
    "body": "乘除形式一般可以直接使用；加减相消时不能不加检查地逐项替换。"
  },
  {
    "title": "行列式块反对角",
    "body": "两个方阵块同为 $n$ 阶时，行列式系数为 $(-1)^n$。原稿对应块维数记号较潦草，按标准同阶情形表述。"
  },
  {
    "title": "矩阵与向量性质",
    "body": "实矩阵的秩等式 $r(A)=r(A^TA)$ 和合同惯性结论依赖实数域 / 对称等条件，已写进对应问题。"
  },
  {
    "title": "连续时间 / 离散时间频谱",
    "body": "采用 $F(j\\omega)=\\int f(t)e^{-j\\omega t}dt$ 的惯例；不同教材可能采用归一化常数不同的定义。"
  },
  {
    "title": "拉普拉斯初终值定理、$Z$ 终值公式",
    "body": "仅在相应的极点与收敛条件成立时适用；本册未将这些条件省略。"
  },
  {
    "title": "极限求值",
    "body": "第二张照片中的部分演算含略写步骤，题目对已可辨认者保留；表意不明的推断性数值不单独列入。"
  },
  {
    "title": "图片个别字迹无法辨认",
    "body": "未臆造补全；如果将来有更清晰原图，可据原页补充修订。"
  }
];
