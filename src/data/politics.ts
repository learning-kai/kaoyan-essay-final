export type PoliticsMajorId = 'mayuan' | 'shigang' | 'other';

export interface PoliticsMajorMeta {
  id: PoliticsMajorId;
  name: string;
  fullName: string;
  accentColor: string;
}

export interface PoliticsTopicMeta {
  id: string;
  major: PoliticsMajorId;
  title: string;
  cardIds: string[];
}

export type PoliticsToken =
  | {
      type: 'text';
      text: string;
      color: string;
      bold?: boolean;
      highlight?: boolean;
    }
  | {
      type: 'icon';
      src: string;
      alt: string;
    };

export interface PoliticsLine {
  tokens: PoliticsToken[];
  isMnemonic: boolean;
}

export interface PoliticsMnemonicPair {
  cue: string;
  target: string;
}

export interface PoliticsCard {
  id: string;
  num: number;
  code: string;
  major: PoliticsMajorId;
  topic: string;
  topicId: string;
  title: string;
  titleTokens: PoliticsToken[];
  lines: PoliticsLine[];
  image?: { src: string; alt: string };
  mnemonicCue: string | null;
  mnemonicBreakdown: PoliticsMnemonicPair[];
  searchText: string;
}

export interface PrefaceBlock {
  kind: 'h1' | 'h2' | 'p';
  tokens: { text: string; highlight: boolean }[];
}

export const POLITICS_TIMELINE_IMAGE = './politics-assets/shigang-timeline.png';

export const POLITICS_MAJORS: PoliticsMajorMeta[] = [
  { id: 'mayuan', name: '马原', fullName: '马克思主义基本原理', accentColor: '#98521C' },
  { id: 'shigang', name: '史纲', fullName: '中国近现代史纲要', accentColor: '#BD3F3F' },
  { id: 'other', name: '其他', fullName: '习思 · 毛中特 · 思修法基高频', accentColor: '#178344' },
];

export const POLITICS_MAJOR_MAP: Record<PoliticsMajorId, PoliticsMajorMeta> = {
  mayuan: POLITICS_MAJORS[0],
  shigang: POLITICS_MAJORS[1],
  other: POLITICS_MAJORS[2],
};

export const POLITICS_PREFACE: PrefaceBlock[] = [
  {
    "kind": "h1",
    "tokens": [
      {
        "text": "前言",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "大家好，首先非常感谢各位的信任，既然同学们能从各种渠道获得一页纸学习，那大家就一定很想突击速成考研政治，我只能说，你们找对资料了！",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "一页纸已经过了三年的风雨打磨，是对考研选择题考点最顶级的蒸馏和浓缩，为了原汁原味呈现考点，我依旧坚持手搓，将真正的重点通过可视化的彩色展现在了大家的面前，今年的一页纸做了整体的重构，包含",
        "highlight": false
      },
      {
        "text": "知识点",
        "highlight": true
      },
      {
        "text": "和",
        "highlight": false
      },
      {
        "text": "解题方法",
        "highlight": true
      },
      {
        "text": "两册，",
        "highlight": false
      },
      {
        "text": "知识手册",
        "highlight": true
      },
      {
        "text": "负责给大家",
        "highlight": false
      },
      {
        "text": "补常识",
        "highlight": true
      },
      {
        "text": "，",
        "highlight": false
      },
      {
        "text": "解题手册",
        "highlight": true
      },
      {
        "text": "负责教大家怎么",
        "highlight": false
      },
      {
        "text": "做题",
        "highlight": true
      },
      {
        "text": "，两者分工明确，相得益彰，本册为",
        "highlight": false
      },
      {
        "text": "知识点手册",
        "highlight": true
      },
      {
        "text": "。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "近几年真题呈现出明显的“",
        "highlight": false
      },
      {
        "text": "去帽子化",
        "highlight": true
      },
      {
        "text": "”趋势，题目几乎不再单纯考查教材原话的机械背诵，而是更加注重题干情境与选项之间的内在逻辑，干扰项埋藏的更加刁钻，人话说，就是老头更加阴险，靠单纯的死记硬背解决不了问题，掌握解题思维才是拿分关键。在当前的考研命题形势下，解题方法手册显得尤为重要，知识点手册反而是辅助作用，希望大家分清学习主次，当然失去了知识点的方法论也不过是空中楼阁，如果大家想拿选择高分高分，就一定要将两者搭配起来使用。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "今年的一页纸两册均会在B 站澄潇宇上传全新",
        "highlight": false
      },
      {
        "text": "免费配套课程",
        "highlight": true
      },
      {
        "text": "，结合题目讲解，对你高频科学刺激，教你如何高效使用本资料拿分。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "在同学们真正开始使用一页纸之前，一定要仔细阅读。",
        "highlight": true
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "接下来，我简单介绍一下最新的一页纸。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "h2",
    "tokens": [
      {
        "text": "主要特色：",
        "highlight": true
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "1.本版一页纸秉持“一页纸，真一页”的编写初衷，在考点取舍上做严谨减法，在命题规律上做深度提炼，对一页纸很多不必要的内容进行了大量的删减，绝不堆砌无意义知识点，只留下真正能考的高频重难点，始终把为大家减负放在编写的第一位，整体的量很少，通俗点说，",
        "highlight": false
      },
      {
        "text": "留下的都真正的精华",
        "highlight": true
      },
      {
        "text": "。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "2.",
        "highlight": false
      },
      {
        "text": "真题是最好的风向标",
        "highlight": true
      },
      {
        "text": "，我科学研判了历年所有真题的复现规律，近几年考试中，很多题目能在往年真题中找到相同考点或类似命题手法的，所以我花费大精力补充了少量早年真题里现在还可以考察的知识点，但绝非所有真题都可以复现，《一页纸》严格剔除了失效旧考点，只保留高频恒重的命题基石，帮大家拒绝无用功。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "3.本版一页纸通过丰富的颜色给大家展现出来了真正的",
        "highlight": false
      },
      {
        "text": "核心词和核心点",
        "highlight": true
      },
      {
        "text": "，重点一目了然，让大家扫一眼过去就知道考什么，可能一大堆话只有两个彩色的词需要你知道，所以大家大可不必担心负担过重。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "h2",
    "tokens": [
      {
        "text": "使用注意事项：",
        "highlight": true
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "1.",
        "highlight": false
      },
      {
        "text": "一页纸不是用来逐字逐句背诵",
        "highlight": true
      },
      {
        "text": "的，只要翻看，熟悉，连接，记住对应关系，在大脑里建立短时间的突触，毕竟考研考的是选择题不是填空题，考试问你A，你只用知道A 和B 对应，至于B 是什么你也不用完整的表述出来，只用知道他们两是对应的即可，本书中重点词语都用彩色标明，不重要的为灰黑色，大家可以只关注彩色，灰黑色部分读过去即可，这样几乎没有记忆负担，轻松学习拿分。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "2.整本书最核心，每年必考的部分就是",
        "highlight": false
      },
      {
        "text": "史纲",
        "highlight": true
      },
      {
        "text": "，而史纲中最重要的是又是会议专题，会议这一页是我最想让你们严肃学习的一页，这一部分你可以理解为真正的“一页纸”，在这一部分我对会议的考点进行了极致的总结梳理，不同于市面上常规的史纲口诀/歌谣，一页纸的每个会议对应的考点都是从几十年的真题和数十年的模拟卷逐字逐句挖掘出来的必考点，是真正实用，能拿分的总结，希望大家反复翻看这一部分，分清主次。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "3. 大家在平时做选择题的时候可以用一页纸",
        "highlight": false
      },
      {
        "text": "复盘，勾画、标记、简单补充",
        "highlight": true
      },
      {
        "text": "，形成属于自己的自己的一页纸，",
        "highlight": false
      },
      {
        "text": "你就是一页纸副主编。",
        "highlight": true
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "现在肯定还有同学焦虑“政治没复习完，现在还来得及吗？”答案是完全来得及的。新真题趋势下的考研政治重在考查阅读理解能力与政治素养，大多数分数只要掌握结题方法后并不难拿。如果说解题方法能帮你选择保底30 分，那一页纸就能助你提到40 分的决胜点，在于将有限的精力精准投入到必须记忆的一部分知识点上，而这正是《一页纸》的核心使命。",
        "highlight": false
      }
    ]
  },
  {
    "kind": "p",
    "tokens": [
      {
        "text": "希望各位科学使用一页纸，今年全新的两册将成为你最可靠的左膀右臂，助你豪取选择40+，我们明年出分见！",
        "highlight": false
      }
    ]
  }
];

export const POLITICS_TOPICS: PoliticsTopicMeta[] = [
  {
    "id": "my-basic",
    "major": "mayuan",
    "title": "基本知识",
    "cardIds": [
      "p-001",
      "p-002",
      "p-003",
      "p-004",
      "p-005",
      "p-006",
      "p-007",
      "p-008",
      "p-009",
      "p-010",
      "p-011",
      "p-012",
      "p-013"
    ]
  },
  {
    "id": "my-cap",
    "major": "mayuan",
    "title": "资本主义及垄断",
    "cardIds": [
      "p-014",
      "p-015",
      "p-016",
      "p-017",
      "p-018",
      "p-019"
    ]
  },
  {
    "id": "my-econ",
    "major": "mayuan",
    "title": "政经",
    "cardIds": [
      "p-020",
      "p-021",
      "p-022",
      "p-023",
      "p-024",
      "p-025",
      "p-026",
      "p-027",
      "p-028",
      "p-029",
      "p-030",
      "p-031",
      "p-032"
    ]
  },
  {
    "id": "my-calc",
    "major": "mayuan",
    "title": "计算",
    "cardIds": [
      "p-033",
      "p-034"
    ]
  },
  {
    "id": "my-intl",
    "major": "mayuan",
    "title": "国际",
    "cardIds": [
      "p-035",
      "p-036"
    ]
  },
  {
    "id": "sg-timeline",
    "major": "shigang",
    "title": "史纲整体脉络",
    "cardIds": [
      "p-037"
    ]
  },
  {
    "id": "sg-early",
    "major": "shigang",
    "title": "早期",
    "cardIds": [
      "p-038",
      "p-039",
      "p-040",
      "p-041",
      "p-042",
      "p-043",
      "p-044",
      "p-045",
      "p-046"
    ]
  },
  {
    "id": "sg-dageming",
    "major": "shigang",
    "title": "大革命",
    "cardIds": [
      "p-047",
      "p-048",
      "p-049",
      "p-050"
    ]
  },
  {
    "id": "sg-tudi",
    "major": "shigang",
    "title": "土地革命",
    "cardIds": [
      "p-051",
      "p-052",
      "p-053",
      "p-054"
    ]
  },
  {
    "id": "sg-kangri",
    "major": "shigang",
    "title": "抗日战争",
    "cardIds": [
      "p-055",
      "p-056",
      "p-057",
      "p-058",
      "p-059"
    ]
  },
  {
    "id": "sg-jiefang",
    "major": "shigang",
    "title": "解放战争",
    "cardIds": [
      "p-060",
      "p-061",
      "p-062"
    ]
  },
  {
    "id": "sg-jianguo",
    "major": "shigang",
    "title": "建国后",
    "cardIds": [
      "p-063",
      "p-064",
      "p-065",
      "p-066",
      "p-067",
      "p-068",
      "p-069",
      "p-070",
      "p-071",
      "p-072",
      "p-073",
      "p-074",
      "p-075",
      "p-076"
    ]
  },
  {
    "id": "sg-special",
    "major": "shigang",
    "title": "重要专题",
    "cardIds": [
      "p-077",
      "p-078",
      "p-079",
      "p-080",
      "p-081",
      "p-082",
      "p-083",
      "p-084",
      "p-085",
      "p-086"
    ]
  },
  {
    "id": "sg-three",
    "major": "shigang",
    "title": "三大辨析",
    "cardIds": [
      "p-087",
      "p-088",
      "p-089",
      "p-090",
      "p-091",
      "p-092",
      "p-093",
      "p-094"
    ]
  },
  {
    "id": "other-all",
    "major": "other",
    "title": "其他",
    "cardIds": [
      "p-095",
      "p-096",
      "p-097",
      "p-098",
      "p-099",
      "p-100"
    ]
  }
];

export const POLITICS_TOPIC_MAP: Record<string, PoliticsTopicMeta> = Object.fromEntries(
  POLITICS_TOPICS.map((t) => [t.id, t])
);

export const POLITICS_CARDS: PoliticsCard[] = [
  {
    "id": "p-001",
    "num": 1,
    "code": "001",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "马恩第一个无产阶级政党",
    "titleTokens": [
      {
        "type": "text",
        "text": "马恩第一个无产阶级政党",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "马克思和恩格斯建立的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一个无产阶级政党",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "共产主义者同盟",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "001 基本知识 马恩第一个无产阶级政党 马克思和恩格斯建立的第一个无产阶级政党： 共产主义者同盟"
  },
  {
    "id": "p-002",
    "num": 2,
    "code": "002",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "马克思主义",
    "titleTokens": [
      {
        "type": "text",
        "text": "马克思主义",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "本质",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "属性：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人民性",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义理论区别于其他理论的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "特征：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实践",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "性马克思主义新世界观创立的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关键",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在于马克思确立了科学的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实践",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "观",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基本特征",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "一句话概括：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "科",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "学性与革",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "命",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "性的统一",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "科",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "命",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "）",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义之所以 “",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "彳亍",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "”, 根本原因在于马克思主义是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "科学",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的世界观和方法论",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "002 基本知识 马克思主义 马克思主义的本质属性：人民性 马克思主义理论区别于其他理论的根本特征：实践性马克思主义新世界观创立的关键在于马克思确立了科学的实践观 马克思主义的基本特征一句话概括： 科学性与革命性的统一（科命） 马克思主义之所以 “彳亍”, 根本原因在于马克思主义是科学的世界观和方法论"
  },
  {
    "id": "p-003",
    "num": 3,
    "code": "003",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "上层建筑",
    "titleTokens": [
      {
        "type": "text",
        "text": "上层建筑",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "政治上层建筑",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（主导地位）",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "政治上层建筑的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "核心",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国家政权",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "观念上层建筑",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（意识形态）",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "在意识形态中居于",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "核心",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "地位，起",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主导",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "作用的是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政治法律思想",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "003 基本知识 上层建筑 政治上层建筑（主导地位） 政治上层建筑的核心：国家政权 观念上层建筑（意识形态） 在意识形态中居于核心地位，起主导作用的是政治法律思想"
  },
  {
    "id": "p-004",
    "num": 4,
    "code": "004",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "人的本质",
    "titleTokens": [
      {
        "type": "text",
        "text": "人的本质",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "人的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "本质",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "一切社会",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关系",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的总和",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "004 基本知识 人的本质 人的本质是一切社会关系的总和"
  },
  {
    "id": "p-005",
    "num": 5,
    "code": "005",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "两个理论辨析",
    "titleTokens": [
      {
        "type": "text",
        "text": "两个理论辨析",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "理解政治经济学的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "枢纽",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "劳",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "动",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "二",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "重性理论",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "马克思经济学说的核心内容和",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基石",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是：",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "剩余价值理论",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "牢二枢纽剩余基",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-46e809f0512727.png",
            "alt": "🇷🇺"
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-580103ed865750.png",
            "alt": "🚁"
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "牢二枢纽剩余基",
    "mnemonicBreakdown": [
      {
        "cue": "牢二",
        "target": "劳动二重性理论"
      },
      {
        "cue": "枢纽",
        "target": "理解政治经济学的枢纽"
      },
      {
        "cue": "剩余基",
        "target": "剩余价值理论 = 马克思经济学说的核心内容和基石"
      }
    ],
    "searchText": "005 基本知识 两个理论辨析 理解政治经济学的枢纽： 劳动二重性理论 马克思经济学说的核心内容和基石是： 剩余价值理论 牢二枢纽剩余基"
  },
  {
    "id": "p-006",
    "num": 6,
    "code": "006",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "唯物史观和剩余价值学说",
    "titleTokens": [
      {
        "type": "text",
        "text": "唯物史观和剩余价值学说",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义由空想变为科学的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "两大基石",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "/马克思一生的两个伟大发现：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "唯物史观和剩余价值学说",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "006 基本知识 唯物史观和剩余价值学说 社会主义由空想变为科学的两大基石 /马克思一生的两个伟大发现： 唯物史观和剩余价值学说"
  },
  {
    "id": "p-007",
    "num": 7,
    "code": "007",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "实践",
    "titleTokens": [
      {
        "type": "text",
        "text": "实践",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "实践之所以成为检验真理的唯一标准",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "/实践高于理论的认识",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是因为实践具有",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "直接现实性",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "007 基本知识 实践 实践之所以成为检验真理的唯一标准 /实践高于理论的认识 是因为实践具有直接现实性"
  },
  {
    "id": "p-008",
    "num": 8,
    "code": "008",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "物质世界的二重化",
    "titleTokens": [
      {
        "type": "text",
        "text": "物质世界的二重化",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "物质世界的二重化指的是，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "人类改造世界的实践活动使世界发生了二重分化，即",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "从自然界中分化出人类社会从客观世界中分化出主观世界",
            "color": "#009FFF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "人类实践使世界二重化为",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "现实",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "世界与虚拟世界",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "008 基本知识 物质世界的二重化 物质世界的二重化指的是， 人类改造世界的实践活动使世界发生了二重分化，即从自然界中分化出人类社会从客观世界中分化出主观世界 人类实践使世界二重化为现实世界与虚拟世界"
  },
  {
    "id": "p-009",
    "num": 9,
    "code": "009",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "科学社会主义的核心命题",
    "titleTokens": [
      {
        "type": "text",
        "text": "科学社会主义的核心命题",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "是2必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是资本主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "然灭亡",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "然胜利",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "是2必",
    "mnemonicBreakdown": [
      {
        "cue": "必1",
        "target": "资本主义必然灭亡"
      },
      {
        "cue": "必2",
        "target": "社会主义必然胜利"
      }
    ],
    "searchText": "009 基本知识 科学社会主义的核心命题 是2必 是资本主义必然灭亡 社会主义必然胜利"
  },
  {
    "id": "p-010",
    "num": 10,
    "code": "010",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "六个寓于",
    "titleTokens": [
      {
        "type": "text",
        "text": "六个寓于",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "价",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "值",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于使用价值之中",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（J&gt;S）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "然性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于偶然性之中",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（B&gt;O）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "斗",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "争性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于同一性之中",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（D&gt;T）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "绝",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "对性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于相对性质中",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（J&gt;X）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "普",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "遍性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于特殊性之中",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（P&gt;T）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "共",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于个性之中",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（G=G）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "比如：资本主义的运行规律（特殊性）寓于人类社会发展的一般规律（普遍性）之中",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "010 基本知识 六个寓于 价值寓于使用价值之中（j&gt;s） 必然性寓于偶然性之中（b&gt;o） 斗争性寓于同一性之中（d&gt;t） 绝对性寓于相对性质中（j&gt;x） 普遍性寓于特殊性之中（p&gt;t） 共性寓于个性之中（g=g） 比如：资本主义的运行规律（特殊性）寓于人类社会发展的一般规律（普遍性）之中"
  },
  {
    "id": "p-011",
    "num": 11,
    "code": "011",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "自由",
    "titleTokens": [
      {
        "type": "text",
        "text": "自由",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "只用记住",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "对应",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "自由",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "以下是几个具体表述：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义追求的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "价值目标/共产主义社会的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "特征/",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "现代化的最终目标",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：实现人的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "自由",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "全面的发展",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "人类认识世界和改造世界的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "目标：认识必然和争取",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "自由",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "人的发展最",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的是人的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "自由",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "程度的提高",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "011 基本知识 自由 只用记住根本对应自由 以下是几个具体表述： 马克思主义追求的根本价值目标/共产主义社会的根本特征/现代化的最终目标：实现人的自由全面的发展 人类认识世界和改造世界的根本目标：认识必然和争取自由 人的发展最根本的是人的自由程度的提高"
  },
  {
    "id": "p-012",
    "num": 12,
    "code": "012",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "人类认识",
    "titleTokens": [
      {
        "type": "text",
        "text": "人类认识",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "人类认识包括知识性认识与评价性认识两个方面",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "知识性认识",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "以客观事物及其规律为对象",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "以",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "客体本身的属性",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "、关系和发展过程为反映内容追求客体“是什么”，以求“",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "真",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "”为认识目的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "评价性认识",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "即",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "价值评价",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "价值评价以",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "客体和主体之间的价值关系",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为反映内容主体的意向、愿望和要求包含在其中追求“应该怎样”，以求“",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "善",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "”和“",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "美",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "”为认识目的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "评价结果有正确与错误之分",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "价值评价也有科学与非科学之别",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "人生价值评价",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主要是看一个人的人生活动是否符合社会的客观规律,其评价的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本尺度",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "历史标准",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "012 基本知识 人类认识 人类认识包括知识性认识与评价性认识两个方面 知识性认识以客观事物及其规律为对象 以客体本身的属性、关系和发展过程为反映内容追求客体“是什么”，以求“真”为认识目的 评价性认识即价值评价 价值评价以客体和主体之间的价值关系为反映内容主体的意向、愿望和要求包含在其中追求“应该怎样”，以求“善”和“美”为认识目的 评价结果有正确与错误之分 价值评价也有科学与非科学之别 人生价值评价主要是看一个人的人生活动是否符合社会的客观规律,其评价的根本尺度是历史标准"
  },
  {
    "id": "p-013",
    "num": 13,
    "code": "013",
    "major": "mayuan",
    "topic": "基本知识",
    "topicId": "my-basic",
    "title": "马克思主义相关著作",
    "titleTokens": [
      {
        "type": "text",
        "text": "马克思主义相关著作",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "德法",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "年鉴》完成了从唯心主义向唯物主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "从革命民主主义向共产主义的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "转变",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "为创立马克思主义奠定了思想前提",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "德法两转变",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《神圣",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "家族",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "》是",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "克思",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "恩",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "格斯合著的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "部著作批判黑格尔维新 论述历史唯物",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "马恩第一家族",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "德",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "意志意识形态》首次系统阐述了",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "历史",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "唯物主义的基本观点",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "德历史",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "共",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "产党宣言》发表标志着马克思主义的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "公",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "开问世",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "公共",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "本论》被称为“",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "人阶级的圣经”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "工资",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "法",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "兰西内战》科学总结了",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "巴黎",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "公社的历史经验",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "法",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "国",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "巴黎",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "哥",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "达纲领批判》对未来社会从制度发展阶段以及分配等方面作了原则",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "构想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "哥够香",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "反杜林",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "论》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全面",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "阐述了马克思主义理论体系被称为马克思主义的“百科全书”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "全面反杜林",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《关于",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "费尔巴哈",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的提纲》马克思科学阐明了人类",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实践",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的本质和作用，首次提出科学的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实践",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "观",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "实践费",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "013 基本知识 马克思主义相关著作 《德法年鉴》完成了从唯心主义向唯物主义 从革命民主主义向共产主义的转变 为创立马克思主义奠定了思想前提德法两转变 《神圣家族》是马克思恩格斯合著的第一部著作批判黑格尔维新 论述历史唯物马恩第一家族《德意志意识形态》首次系统阐述了历史唯物主义的基本观点德历史《共产党宣言》发表标志着马克思主义的公开问世公共《资本论》被称为“工人阶级的圣经”工资《法兰西内战》科学总结了巴黎公社的历史经验法国巴黎《哥达纲领批判》对未来社会从制度发展阶段以及分配等方面作了原则构想哥够香《反杜林论》全面阐述了马克思主义理论体系被称为马克思主义的“百科全书”全面反杜林《关于费尔巴哈的提纲》马克思科学阐明了人类实践的本质和作用，首次提出科学的实践观实践费"
  },
  {
    "id": "p-014",
    "num": 14,
    "code": "014",
    "major": "mayuan",
    "topic": "资本主义及垄断",
    "topicId": "my-cap",
    "title": "资本主义的新变化-二战后",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本主义的新变化-二战后",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "当今资本主义社会居",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主导地位",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的资本所有制形式是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "法人资本所有制",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "私人",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "股份",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "所有制：所有权和控制权不再统一",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "法人",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本所有制：法人狠狠独揽大权",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "法人资本所有制主要特点是资本占有主体多元化，公司资本的所有权与控制权不再统一",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "劳资关系和分配关系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "职工参与决",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "策",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "、",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "终身",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "雇",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "佣、",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "职工持",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "股",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "、",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会福利的普及化与全",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "民",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "化",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "策雇股民",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "社会阶层和阶级结构",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "有所有权的资本家一般不再直接经营和管理企业",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "高级职业经理",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "成为大公司经营活动的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实际控制者",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "知识型和服务型劳动者的数量不断增加，劳动方式发生了新变化",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "策雇股民",
    "mnemonicBreakdown": [
      {
        "cue": "策",
        "target": "职工参与决策"
      },
      {
        "cue": "雇",
        "target": "终身雇佣"
      },
      {
        "cue": "股",
        "target": "职工持股"
      },
      {
        "cue": "民",
        "target": "社会福利的普及化与全民化"
      }
    ],
    "searchText": "014 资本主义及垄断 资本主义的新变化-二战后 当今资本主义社会居主导地位的资本所有制形式是法人资本所有制私人股份所有制：所有权和控制权不再统一法人资本所有制：法人狠狠独揽大权法人资本所有制主要特点是资本占有主体多元化，公司资本的所有权与控制权不再统一 劳资关系和分配关系 职工参与决策、终身雇佣、职工持股、 社会福利的普及化与全民化 策雇股民 社会阶层和阶级结构 有所有权的资本家一般不再直接经营和管理企业 高级职业经理成为大公司经营活动的实际控制者 知识型和服务型劳动者的数量不断增加，劳动方式发生了新变化"
  },
  {
    "id": "p-015",
    "num": 15,
    "code": "015",
    "major": "mayuan",
    "topic": "资本主义及垄断",
    "topicId": "my-cap",
    "title": "资本主义的新变化-当代",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本主义的新变化-当代",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "当代资本主义最突出、最鲜明、最主要的特征是：",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "国际金融资本的垄断",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "国际金融垄断资本主义影响日益显现，主要表现在：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "金融垄断寡",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "头",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "化、",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "金融垄断国",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "际",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "化",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "经济",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "虚",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "拟化产业空",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "心",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "化",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "空心瓜果",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-b40cb66220ab47.png",
            "alt": "👩"
          },
          {
            "type": "text",
            "text": "空虚",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "际",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "寡",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "妇",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9dcbb8f7e535e3.png",
            "alt": "🐔"
          },
          {
            "type": "text",
            "text": "偷鸡",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "心虚/虚空",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "鸡头（你干嘛 哎哟）",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "金融垄断资本形成",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "壮大",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的重要制度条件：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "金融",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "自由",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "与",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "金融",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "创新",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "空心瓜果（空虚的国际寡妇）",
    "mnemonicBreakdown": [
      {
        "cue": "空心",
        "target": "经济虚拟化、产业空心化"
      },
      {
        "cue": "瓜",
        "target": "金融垄断寡头化"
      },
      {
        "cue": "果",
        "target": "金融垄断国际化"
      }
    ],
    "searchText": "015 资本主义及垄断 资本主义的新变化-当代 当代资本主义最突出、最鲜明、最主要的特征是： 国际金融资本的垄断 国际金融垄断资本主义影响日益显现，主要表现在： 金融垄断寡头化、金融垄断国际化 经济虚拟化产业空心化 空心瓜果 空虚的国际寡妇 偷鸡心虚/虚空鸡头（你干嘛 哎哟） 金融垄断资本形成壮大的重要制度条件： 金融自由化与金融创新"
  },
  {
    "id": "p-016",
    "num": 16,
    "code": "016",
    "major": "mayuan",
    "topic": "资本主义及垄断",
    "topicId": "my-cap",
    "title": "资本主义工资",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本主义工资",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本主义制度下，工人的工资是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "劳动力的价值或价格",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "资本主义工资是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "劳动的价值或价格",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "劳动者获得的工资远远",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "小于劳动力的价值",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "016 资本主义及垄断 资本主义工资 资本主义制度下，工人的工资是劳动力的价值或价格资本主义工资是劳动的价值或价格劳动者获得的工资远远小于劳动力的价值"
  },
  {
    "id": "p-017",
    "num": 17,
    "code": "017",
    "major": "mayuan",
    "topic": "资本主义及垄断",
    "topicId": "my-cap",
    "title": "资本主义劳动过程",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本主义劳动过程",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本主义劳动过程的特点是",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第一，工人在资本家的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "监督",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "下劳动，他们的劳动隶属于资本家；",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第二，劳动的成果或者产品",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全部归资本家",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "所有。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "资本主义条件下，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "劳动是否具有生产性",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "取决于",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "能否为资本家带来剩余价值",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "017 资本主义及垄断 资本主义劳动过程 资本主义劳动过程的特点是 第一，工人在资本家的监督下劳动，他们的劳动隶属于资本家； 第二，劳动的成果或者产品全部归资本家所有。 资本主义条件下，劳动是否具有生产性，取决于 能否为资本家带来剩余价值"
  },
  {
    "id": "p-018",
    "num": 18,
    "code": "018",
    "major": "mayuan",
    "topic": "资本主义及垄断",
    "topicId": "my-cap",
    "title": "金融寡头控制形式",
    "titleTokens": [
      {
        "type": "text",
        "text": "金融寡头控制形式",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "金融寡头在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "经济",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "领域实现统治的形式是",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“参与制”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（股票）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "金融寡头在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政治",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "领域中实现对",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国家机器",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的控制主要是通过",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "同政府的“个人联合”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "金融寡头左右和",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "影响内政外交与社会生活",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主要是通过：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "建立政策咨询机构，掌握新闻、科教、文化等",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "018 资本主义及垄断 金融寡头控制形式 金融寡头在经济领域实现统治的形式是“参与制”（股票） 金融寡头在政治领域中实现对国家机器的控制主要是通过同政府的“个人联合” 金融寡头左右和影响内政外交与社会生活主要是通过： 建立政策咨询机构，掌握新闻、科教、文化等"
  },
  {
    "id": "p-019",
    "num": 19,
    "code": "019",
    "major": "mayuan",
    "topic": "资本主义及垄断",
    "topicId": "my-cap",
    "title": "垄断资本向世界范围扩展的基本形式",
    "titleTokens": [
      {
        "type": "text",
        "text": "垄断资本向世界范围扩展的基本形式",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "垄扩借产品",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "垄",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "断资本向世界范围",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "扩",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "展的基本形式：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "借",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "贷资本输出",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "生",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "产",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本输出",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "商",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "品",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本输出",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "辨析：",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "产业资本循环过程中在空间上同时存在的资本形式有/产业资本的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三种职能",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "货币资本",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "生产资本",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "商品资本",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "垄扩借产品",
    "mnemonicBreakdown": [
      {
        "cue": "垄扩",
        "target": "垄断资本向世界范围扩展的基本形式"
      },
      {
        "cue": "借",
        "target": "借贷资本输出"
      },
      {
        "cue": "产",
        "target": "生产资本输出"
      },
      {
        "cue": "品",
        "target": "商品资本输出"
      }
    ],
    "searchText": "019 资本主义及垄断 垄断资本向世界范围扩展的基本形式 垄扩借产品 垄断资本向世界范围扩展的基本形式： 借贷资本输出 生产资本输出 商品资本输出 辨析： 产业资本循环过程中在空间上同时存在的资本形式有/产业资本的三种职能： 货币资本 生产资本 商品资本"
  },
  {
    "id": "p-020",
    "num": 20,
    "code": "020",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "金融资本形成的主要途径",
    "titleTokens": [
      {
        "type": "text",
        "text": "金融资本形成的主要途径",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "金铲铲",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "金",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "融联系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "本",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "参",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "与",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "人",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "事",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "参",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "与",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "金铲铲",
    "mnemonicBreakdown": [
      {
        "cue": "金",
        "target": "金融联系"
      },
      {
        "cue": "铲1（参）",
        "target": "资本参与"
      },
      {
        "cue": "铲2（参）",
        "target": "人事参与"
      }
    ],
    "searchText": "020 政经 金融资本形成的主要途径 金铲铲 金融联系 资本参与 人事参与"
  },
  {
    "id": "p-021",
    "num": 21,
    "code": "021",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "生产资本的划分方式",
    "titleTokens": [
      {
        "type": "text",
        "text": "生产资本的划分方式",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "1.",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根据资本是否增值（是否带来",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "剩余价值",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "）",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不变资本，可变资本",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "2.",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根据在资本循环中的不同职能",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "货币资本，生产资本，商品资本",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "3.",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根据资本周转方式不同",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "固定资本，流动资本",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "021 政经 生产资本的划分方式 1.根据资本是否增值（是否带来剩余价值） 不变资本，可变资本 2.根据在资本循环中的不同职能 货币资本，生产资本，商品资本 3.根据资本周转方式不同 固定资本，流动资本"
  },
  {
    "id": "p-022",
    "num": 22,
    "code": "022",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "社会再生产的核心问题",
    "titleTokens": [
      {
        "type": "text",
        "text": "社会再生产的核心问题",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会再生产的",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "核心问题",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会总产品的实现问题",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": ",即",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会总产品的价值补偿和实物补偿问题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#000000",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "生孩子",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-5643c9f714e01c.png",
            "alt": "👶"
          },
          {
            "type": "text",
            "text": "（再生产）之前我要补偿补偿她",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "生孩子（再生产）之前我要补偿补偿她",
    "mnemonicBreakdown": [
      {
        "cue": "生（再生产）",
        "target": "社会再生产的核心问题 = 社会总产品的实现问题"
      },
      {
        "cue": "补偿1",
        "target": "价值补偿"
      },
      {
        "cue": "补偿2",
        "target": "实物补偿"
      }
    ],
    "searchText": "022 政经 社会再生产的核心问题 社会再生产的核心问题是社会总产品的实现问题,即社会总产品的价值补偿和实物补偿问题。 生孩子（再生产）之前我要补偿补偿她"
  },
  {
    "id": "p-023",
    "num": 23,
    "code": "023",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "资本周转快慢",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本周转快慢",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "影响资本周转快慢的因素有很多 关键的因素有两个：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "资本周转的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "时",
            "color": "#20FF00",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "间",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "生产",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "固定",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本和",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "流动",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "构",
            "color": "#20FF00",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "成",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "狗屎",
            "color": "#20FF00",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "狗屎",
    "mnemonicBreakdown": [
      {
        "cue": "狗（构）",
        "target": "生产资本的固定资本和流动资本的构成"
      },
      {
        "cue": "屎（时）",
        "target": "资本周转的时间"
      }
    ],
    "searchText": "023 政经 资本周转快慢 影响资本周转快慢的因素有很多 关键的因素有两个： 资本周转的时间 生产资本的固定资本和流动资本的构成 狗屎"
  },
  {
    "id": "p-024",
    "num": 24,
    "code": "024",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "资本积累",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本积累",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "剩余价值",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本积累",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的唯一源泉",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本积累",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本主义扩大再生产",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的源泉",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本积累导致了资本主义",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会的两极分化",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本积累的扩大会导致资本有机构成提高进而产生",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "失业问题",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "焚诀：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本有机构成一直在增加，看到选项说减少的就是错的",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "024 政经 资本积累 剩余价值是资本积累的唯一源泉 资本积累是资本主义扩大再生产的源泉 资本积累导致了资本主义社会的两极分化 资本积累的扩大会导致资本有机构成提高进而产生失业问题焚诀： 资本有机构成一直在增加，看到选项说减少的就是错的"
  },
  {
    "id": "p-025",
    "num": 25,
    "code": "025",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "私人劳动和社会劳动",
    "titleTokens": [
      {
        "type": "text",
        "text": "私人劳动和社会劳动",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "资本主义的基本矛盾：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "生产社会化和生产资料资本主义私人占有之间的矛盾",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "私有制基础上商品经济的基本矛盾 ：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "私人劳动和社会劳动的矛盾",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "决定着商品经济的本质及发展过程",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "商品经济其他一切矛盾的基础",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "决定着商品生产者的命运",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "马克思劳动价值论",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "揭示了商品经济的基本矛盾",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "商品的使用价值和价值的矛盾、",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "生产商品的具体劳动和抽象劳动的矛盾，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "根源于",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "私人劳动和社会劳动的矛盾",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "商品生产者的劳动的社会性质是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "由社会分工决定的",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7f202871d47f0f.png",
            "alt": "5️⃣"
          },
          {
            "type": "text",
            "text": "具体劳动能否还原为抽象劳动，在根本上取决于",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "私人劳动和社会劳动能否实现统一",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "025 政经 私人劳动和社会劳动 资本主义的基本矛盾： 生产社会化和生产资料资本主义私人占有之间的矛盾 私有制基础上商品经济的基本矛盾 ： 私人劳动和社会劳动的矛盾 决定着商品经济的本质及发展过程 商品经济其他一切矛盾的基础 决定着商品生产者的命运 马克思劳动价值论揭示了商品经济的基本矛盾 商品的使用价值和价值的矛盾、 生产商品的具体劳动和抽象劳动的矛盾， 根源于私人劳动和社会劳动的矛盾。 商品生产者的劳动的社会性质是由社会分工决定的 具体劳动能否还原为抽象劳动，在根本上取决于 私人劳动和社会劳动能否实现统一"
  },
  {
    "id": "p-026",
    "num": 26,
    "code": "026",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "社会生产",
    "titleTokens": [
      {
        "type": "text",
        "text": "社会生产",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "在社会生产中，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "【",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生产力",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "】是生产的【",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "物质内容",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "】，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "【",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生产关系",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "】是生产的【",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会形式",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "】，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "二者构成【",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会的生产方式",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "】。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会形态更替",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "归根结底",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是【",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会基本矛盾",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "运动】的结果",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，其中， ",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生产力的发展",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "具有最终的决定意义",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会历史发展的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "动力：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会基本矛盾",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": " 资本主义经济危机具有周期性",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "这是由",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本主义基本矛盾运动的阶段性决定",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "026 政经 社会生产 在社会生产中， 【生产力】是生产的【物质内容】， 【生产关系】是生产的【社会形式】， 二者构成【社会的生产方式】。 社会形态更替归根结底是【社会基本矛盾运动】的结果，其中， 生产力的发展具有最终的决定意义社会历史发展的根本动力：社会基本矛盾  资本主义经济危机具有周期性 这是由资本主义基本矛盾运动的阶段性决定的"
  },
  {
    "id": "p-027",
    "num": 27,
    "code": "027",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "货币的本质和职能",
    "titleTokens": [
      {
        "type": "text",
        "text": "货币的本质和职能",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "货币的本质: ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "固定充当一般等价物的商品",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "货币的五种基本职能:",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "① ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "价值尺度",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：观念中的货币。（关键词：标价）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "② ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "流通手段",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：即时交易。（关键词：买）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③ ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "贮藏手段",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：贮存。（关键词：必须是足值的货币）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "④ ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "支付手段",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：提前或延后交易。（关键词：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "债务 赋税工资 租金",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "⑤ ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "世界货币",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：货币职能在世界范围内的扩展。（关键词：汇率）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "货币最基本的职能",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "价",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "值尺度",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "和",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "流",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "通手段",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": " ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "是“甲流”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": " 经济危机的抽象的一般的可能性首先是由",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "货币作为",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "流通手段和支付手段",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "引起的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "甲流",
    "mnemonicBreakdown": [
      {
        "cue": "甲（价）",
        "target": "价值尺度（货币最基本职能之一）"
      },
      {
        "cue": "流",
        "target": "流通手段（货币最基本职能之一）"
      }
    ],
    "searchText": "027 政经 货币的本质和职能 货币的本质: 固定充当一般等价物的商品 货币的五种基本职能: ① 价值尺度：观念中的货币。（关键词：标价） ② 流通手段：即时交易。（关键词：买） ③ 贮藏手段：贮存。（关键词：必须是足值的货币） ④ 支付手段：提前或延后交易。（关键词：债务 赋税工资 租金） ⑤ 世界货币：货币职能在世界范围内的扩展。（关键词：汇率） 货币最基本的职能：价值尺度和流通手段 是“甲流”  经济危机的抽象的一般的可能性首先是由 货币作为流通手段和支付手段引起的"
  },
  {
    "id": "p-028",
    "num": 28,
    "code": "028",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "价值规律的作用",
    "titleTokens": [
      {
        "type": "text",
        "text": "价值规律的作用",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "价值规律在市场配置资源过程中的作用表现在：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)自发地调节生产资料和劳动力在社会各生产部门之间的分配比例",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)自发地刺激社会生产力的发展",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)自发地调节社会收入的分配",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "自发地调节雇佣工人与资本家之间的利益再分配（错误）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "比如资本家压榨数学答疑，让答疑干活多但是发工资少，这种现象不会被价值规律所调节",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "028 政经 价值规律的作用 价值规律在市场配置资源过程中的作用表现在： (1)自发地调节生产资料和劳动力在社会各生产部门之间的分配比例 (2)自发地刺激社会生产力的发展 (3)自发地调节社会收入的分配 自发地调节雇佣工人与资本家之间的利益再分配（错误） 比如资本家压榨数学答疑，让答疑干活多但是发工资少，这种现象不会被价值规律所调节"
  },
  {
    "id": "p-029",
    "num": 29,
    "code": "029",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "超额和相对剩余价值",
    "titleTokens": [
      {
        "type": "text",
        "text": "超额和相对剩余价值",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "在资本主义商品生产条件下，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "单个资本家",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "改进技术、改善管理的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主观动机",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是追求",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "超额",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "剩余价值",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，但其",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "客观",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "后果",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "则是整个",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "各个生产部门的劳动生产率普遍提高",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，导致生活资料的价值下降和补偿劳动力价值的必要劳动时间缩短，而剩余劳动时间相对延长，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "整个资本家阶级普遍获得更多的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "相对",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "剩余价值",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "助记：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "超额",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "对应",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "原因，个别",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "相对",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "对应",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "结果，社会",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "超额对应原因、个别；相对对应结果、社会",
    "mnemonicBreakdown": [
      {
        "cue": "超额",
        "target": "主观动机（原因）· 单个资本家（个别）"
      },
      {
        "cue": "相对",
        "target": "客观后果（结果）· 整个资本家阶级（社会）"
      }
    ],
    "searchText": "029 政经 超额和相对剩余价值 在资本主义商品生产条件下， 单个资本家改进技术、改善管理的主观动机是追求超额剩余价值，但其客观后果则是整个社会各个生产部门的劳动生产率普遍提高，导致生活资料的价值下降和补偿劳动力价值的必要劳动时间缩短，而剩余劳动时间相对延长，整个资本家阶级普遍获得更多的相对剩余价值。 助记： 超额对应原因，个别 相对对应结果，社会"
  },
  {
    "id": "p-030",
    "num": 30,
    "code": "030",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "劳动生产率",
    "titleTokens": [
      {
        "type": "text",
        "text": "劳动生产率",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "劳动生产率",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "指的是劳动者生产使用价值的效率。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "它的高低可以用",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "单位劳动时间内",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生产的商品数量来测量，也可以用",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "单位商品中",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "所耗费的劳动时间来测量。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "通俗理解方式",
            "color": "#DC7705",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第一种：单位时间内，你做得多不多？",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "有人一分钟一个，有人一分钟一亿个。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第二种：单位商品，你多久做出来？你做得快不快？",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "有人一秒钟就做一个，有人一小时才做一个。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "在单位劳动时间内，劳动者耗费的劳动量不变，生产的价值总量也不变。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "生产率",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-9d19d320d9fbae.png",
            "alt": "⬆️"
          },
          {
            "type": "text",
            "text": "产出数量",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-9d19d320d9fbae.png",
            "alt": "⬆️"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "生产率",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-9d19d320d9fbae.png",
            "alt": "⬆️"
          },
          {
            "type": "text",
            "text": "做单个商品花费时间",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-61e623c6319fda.png",
            "alt": "⬇️"
          },
          {
            "type": "text",
            "text": "单个商品的价值",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-61e623c6319fda.png",
            "alt": "⬇️"
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "030 政经 劳动生产率 劳动生产率指的是劳动者生产使用价值的效率。 它的高低可以用单位劳动时间内生产的商品数量来测量，也可以用单位商品中所耗费的劳动时间来测量。 通俗理解方式 第一种：单位时间内，你做得多不多？ 有人一分钟一个，有人一分钟一亿个。 第二种：单位商品，你多久做出来？你做得快不快？ 有人一秒钟就做一个，有人一小时才做一个。 在单位劳动时间内，劳动者耗费的劳动量不变，生产的价值总量也不变。 生产率产出数量 生产率做单个商品花费时间单个商品的价值"
  },
  {
    "id": "p-031",
    "num": 31,
    "code": "031",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "不变资本和可变资本",
    "titleTokens": [
      {
        "type": "text",
        "text": "不变资本和可变资本",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "根据资本在",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "剩余价值生产中",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "所起的不同作用",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "可以将资本划分为",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不变资本与可变资本",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不变资本 (c):",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "以",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生产资料",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "形态存在的资本",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "这部分资本在生产过程中，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不改变自己的价值量，不发生增殖",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "不变资本的价值是具体劳动转移到新产品中",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（可一次转移，也可多次转移）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "可变资本 (v)：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "用来",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "购买劳动力",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的那部分资本",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "剩余价值",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是由可变资本雇佣的劳动者创造的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "可变资本的价值是工人的劳动再生产出来的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（可变资本是工人干活干出来的）",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "【剩余价值】是雇佣工人所创造并被资本家无偿占有的超过劳动力价值的那部分价值，是雇佣工人剩余劳动的凝结",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "技术",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "构成",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "由生产的技术水平所决定的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生产资料",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "劳动力",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "之间的比例。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "几台烤箱 + 多少面粉",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " VS ",
            "color": "#EB9E27",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "几个面包师傅",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "价值",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "构成",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不变资本",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（c）和",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "可变资本",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（v）之间的比例。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "买烤箱和面粉花了多少钱",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " VS ",
            "color": "#EB9E27",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "给师傅发了多少工资",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "有机",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "构成",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "由资本的技术构成决定并反映技术构成变化的资本价值构成，即",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "c",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "v",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（花钱的比例(c:v)，是由烤箱和师傅的搭配方式决定的）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "在资本主义生产过程中",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "有机",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "构成的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "提高是一般趋势，这是由资本的本性决定的展开理解，当面包老板升级设备时：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "他的技术构成提高了（",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "机器",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-02f04946c099f8.png",
            "alt": "⚙️"
          },
          {
            "type": "text",
            "text": "多了先进了，需要的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "师傅",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-50bea6d8b8bee8.png",
            "alt": "👨"
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-52363e2ffb318b.png",
            "alt": "🍳"
          },
          {
            "type": "text",
            "text": "少了）。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "这个变化必然导致他的价值构成也提高了",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（买",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "机器的钱",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的比例，相对于",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工资",
            "color": "#6783CF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的比例，大大增加了）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "我们就说，他的面包店的资本有有机成提高了。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（拓展：整个社会资本有机构成普遍提高会形成相对过剩人口）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "技术变",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，价值变，",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "有机也就变",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "技术不变，价值变，有机就不变",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "031 政经 不变资本和可变资本 根据资本在剩余价值生产中所起的不同作用 可以将资本划分为不变资本与可变资本 不变资本 (c): 以生产资料形态存在的资本 这部分资本在生产过程中，不改变自己的价值量，不发生增殖不变资本的价值是具体劳动转移到新产品中（可一次转移，也可多次转移） 可变资本 (v)： 用来购买劳动力的那部分资本 剩余价值是由可变资本雇佣的劳动者创造的 可变资本的价值是工人的劳动再生产出来的（可变资本是工人干活干出来的） 【剩余价值】是雇佣工人所创造并被资本家无偿占有的超过劳动力价值的那部分价值，是雇佣工人剩余劳动的凝结资本的技术构成： 由生产的技术水平所决定的生产资料和劳动力之间的比例。 （几台烤箱 + 多少面粉 vs 几个面包师傅） 资本的价值构成： 不变资本（c）和可变资本（v）之间的比例。 （买烤箱和面粉花了多少钱 vs 给师傅发了多少工资） 资本的有机构成： 由资本的技术构成决定并反映技术构成变化的资本价值构成，即c：v。 （花钱的比例(c:v)，是由烤箱和师傅的搭配方式决定的） 在资本主义生产过程中 资本有机构成的提高是一般趋势，这是由资本的本性决定的展开理解，当面包老板升级设备时： 他的技术构成提高了（机器多了先进了，需要的师傅 少了）。 这个变化必然导致他的价值构成也提高了 （买机器的钱的比例，相对于工资的比例，大大增加了） 。 我们就说，他的面包店的资本有有机成提高了。 （拓展：整个社会资本有机构成普遍提高会形成相对过剩人口）  技术变，价值变，有机也就变 技术不变，价值变，有机就不变"
  },
  {
    "id": "p-032",
    "num": 32,
    "code": "032",
    "major": "mayuan",
    "topic": "政经",
    "topicId": "my-econ",
    "title": "平均利润",
    "titleTokens": [
      {
        "type": "text",
        "text": "平均利润",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "平均利润的形成原因：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不同",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "生产",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "部门",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资本家之间的竞争",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "扩展：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "超额利润的形成原因",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "同一部门",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "内不同企业之间的竞争",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "理解：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为了得到尽可能高的利润率和尽可能多的利润，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不同生产部门",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（通俗理解：不同“赛道”）的资本家之间必然展开激烈的竞争，大量资本必然从利润率",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "低",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的部门",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "转",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "投到利润率",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "高",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的部门，从而导致利润率平均化。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "注意：不同“赛道”、同一“赛道”是网络用语，非专业术语，只",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是帮助大家理解这个概念。",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "平均利润形成后：",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "商品价值就转化为生产价格",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "价值规律的实现形式发生了变化",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "每个资本家所得利润的多少不仅取决于他对本企业工人的剥削程度，而且取决于整个资产阶级对整个工人阶级的剥削程度",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "生产价格不再随着商品价值的变化而变动",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "每一个部门获得的利润都等于该部门生产的剩余价值",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "032 政经 平均利润 平均利润的形成原因： 不同生产部门资本家之间的竞争 扩展：超额利润的形成原因 同一部门内不同企业之间的竞争 理解：为了得到尽可能高的利润率和尽可能多的利润，不同生产部门（通俗理解：不同“赛道”）的资本家之间必然展开激烈的竞争，大量资本必然从利润率低的部门转投到利润率高的部门，从而导致利润率平均化。 注意：不同“赛道”、同一“赛道”是网络用语，非专业术语，只  是帮助大家理解这个概念。 平均利润形成后： 商品价值就转化为生产价格 价值规律的实现形式发生了变化 每个资本家所得利润的多少不仅取决于他对本企业工人的剥削程度，而且取决于整个资产阶级对整个工人阶级的剥削程度 生产价格不再随着商品价值的变化而变动 每一个部门获得的利润都等于该部门生产的剩余价值"
  },
  {
    "id": "p-033",
    "num": 33,
    "code": "033",
    "major": "mayuan",
    "topic": "计算",
    "topicId": "my-calc",
    "title": "政经计算",
    "titleTokens": [
      {
        "type": "text",
        "text": "政经计算",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "不变资本C 可变资本V 剩余价值M",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "投资=成本=C+V",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "有机构成C比V",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "剩余价值率M比V",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "利润=M",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "蓝色是已知条件",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "红色为所求",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "某资本家投资100万元",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "其中既包括不变资本(c)也包括可变资本(v),即c+v=100万元。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "其预付资本的有机构成是3:1",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": ",资本有机构成公式是c:v,即c:v=3:1,结合前文已知c+v=100万元，则不变资本c为75万元，可变资本v为25万元。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "该资本家每次投资的剩余价值率为200%",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": ",即m/v=200%,则每次投资的剩余价值m为50万元。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "利润与剩余价值在量上是一样的，故该",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本家每次投资的利润",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "为50万元。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "033 计算 政经计算 不变资本c 可变资本v 剩余价值m 投资=成本=c+v 有机构成c比v 剩余价值率m比v 利润=m 蓝色是已知条件，红色为所求 某资本家投资100万元， 其中既包括不变资本(c)也包括可变资本(v),即c+v=100万元。 其预付资本的有机构成是3:1,资本有机构成公式是c:v,即c:v=3:1,结合前文已知c+v=100万元，则不变资本c为75万元，可变资本v为25万元。 该资本家每次投资的剩余价值率为200%,即m/v=200%,则每次投资的剩余价值m为50万元。 利润与剩余价值在量上是一样的，故该资本家每次投资的利润为50万元。"
  },
  {
    "id": "p-034",
    "num": 34,
    "code": "034",
    "major": "mayuan",
    "topic": "计算",
    "topicId": "my-calc",
    "title": "绝对和相对剩余价值计算",
    "titleTokens": [
      {
        "type": "text",
        "text": "绝对和相对剩余价值计算",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-bf9a696f7c24a8.png",
            "alt": "✔️"
          },
          {
            "type": "text",
            "text": "绝对剩余价值生产方法，比较大胆，总的工作时间延长。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-bf9a696f7c24a8.png",
            "alt": "✔️"
          },
          {
            "type": "text",
            "text": "相对剩余价值生产方法，比较隐蔽，工作日时间不变。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "绝对剩余价值的生产和相对剩余价值的生产都是依靠",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "延长工人的剩余劳动时间",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "获得的。",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "剩余价值率=剩余劳动时间÷必要劳动时间",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "若原工作时间8小时，必要劳动时间4小时，剩余劳动时间4小时采用【绝对剩余价值】生产方法，使剩余劳动时间延长2小时延长劳动时间:8+2剩余价值率=6(总时长为10剪掉必要的4)÷4×100%=150%采用【相对剩余价值】生产方法，使剩余劳动时间延长2小时(通过技术在总时长不变的情况下缩短必要劳动时间)",
            "color": "#000000",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "必要劳动时间=4-2",
            "color": "#000000",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "剩余价值率=6(8-2)÷2×100%=300%",
            "color": "#000000",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "034 计算 绝对和相对剩余价值计算 绝对剩余价值生产方法，比较大胆，总的工作时间延长。 相对剩余价值生产方法，比较隐蔽，工作日时间不变。 绝对剩余价值的生产和相对剩余价值的生产都是依靠延长工人的剩余劳动时间获得的。 剩余价值率=剩余劳动时间÷必要劳动时间 若原工作时间8小时，必要劳动时间4小时，剩余劳动时间4小时采用【绝对剩余价值】生产方法，使剩余劳动时间延长2小时延长劳动时间:8+2剩余价值率=6(总时长为10剪掉必要的4)÷4×100%=150%采用【相对剩余价值】生产方法，使剩余劳动时间延长2小时(通过技术在总时长不变的情况下缩短必要劳动时间) 必要劳动时间=4-2 剩余价值率=6(8-2)÷2×100%=300%"
  },
  {
    "id": "p-035",
    "num": 35,
    "code": "035",
    "major": "mayuan",
    "topic": "国际",
    "topicId": "my-intl",
    "title": "战时共产主义与新经济政策",
    "titleTokens": [
      {
        "type": "text",
        "text": "战时共产主义与新经济政策",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "战时共产主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "余粮收集制、取消商品货币关系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "更好的供给军队作战",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "新经济政策",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（列宁）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "恢复商品货币关系，发展资本主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "战后迅速活跃经济",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "新经济政策的主要特征是发展商品经济",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "苏联模式",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（斯大林）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农业合作化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "进一步发展社会主义",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "列宁为社会主义奠定了基础，但列宁并未发展社会主义",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "新经济政策（和战时作比较）",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "农业",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "粮食税制取代余粮收集制",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不再全部收走，交完税了多的归你，允许农民自由出卖余粮",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "工业",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1.",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "部分恢复私营经济",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "允许私人经营中小企业，但关系国家命脉的企业仍归国家所有2.",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实行国家资本主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "采取租让制和租借制，允许外资企业管理国家暂时无力经营的企业",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "贸易",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "允许自由贸易",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（废除了国家配给和国家贸易垄断制）",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "分配",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实行按劳分配",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7f202871d47f0f.png",
            "alt": "5️⃣"
          },
          {
            "type": "text",
            "text": "流通",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "恢复商品货币关系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "035 国际 战时共产主义与新经济政策 战时共产主义：余粮收集制、取消商品货币关系 ——更好的供给军队作战 新经济政策（列宁）：恢复商品货币关系，发展资本主义 ——战后迅速活跃经济 新经济政策的主要特征是发展商品经济 苏联模式（斯大林）：农业合作化 ——进一步发展社会主义 列宁为社会主义奠定了基础，但列宁并未发展社会主义新经济政策（和战时作比较） 农业：粮食税制取代余粮收集制 不再全部收走，交完税了多的归你，允许农民自由出卖余粮 工业： 1.部分恢复私营经济 允许私人经营中小企业，但关系国家命脉的企业仍归国家所有2.实行国家资本主义采取租让制和租借制，允许外资企业管理国家暂时无力经营的企业 贸易：允许自由贸易（废除了国家配给和国家贸易垄断制） 分配：实行按劳分配 流通：恢复商品货币关系"
  },
  {
    "id": "p-036",
    "num": 36,
    "code": "036",
    "major": "mayuan",
    "topic": "国际",
    "topicId": "my-intl",
    "title": "巴黎公社",
    "titleTokens": [
      {
        "type": "text",
        "text": "巴黎公社",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "1871年爆发的巴黎公社革命，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是第一国际精神的产儿，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是无产阶级",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "夺取政权",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的第一次伟大尝试。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "特别是",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "采取了两项重要措施，用以防止国家机关工作人员由社会公仆变为社会主人：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "一是",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "规定所有公职人员无论职位高低，实行全面的选举制和撤换制",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "；",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "二是",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "取消高薪制，规定任何工作人员年薪不得超过熟练工人的工薪水平",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "要点：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "巴黎公社建立的是政权，不是政党",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "防止公仆变主人的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "两项措施与人相关",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，即",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人的工资和职位",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "取消高薪，选举撤换",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "辨析：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "俄国十月革命",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "才",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "建立苏维埃大会制度",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "巴黎公社革命源于民族矛盾和阶级斗争激化，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不是第一国际发动和领导",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，只是受第一国际精神影响。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "036 国际 巴黎公社 1871年爆发的巴黎公社革命， 是第一国际精神的产儿， 是无产阶级夺取政权的第一次伟大尝试。 特别是采取了两项重要措施，用以防止国家机关工作人员由社会公仆变为社会主人： 一是规定所有公职人员无论职位高低，实行全面的选举制和撤换制； 二是取消高薪制，规定任何工作人员年薪不得超过熟练工人的工薪水平。 要点： 巴黎公社建立的是政权，不是政党 防止公仆变主人的两项措施与人相关，即人的工资和职位，取消高薪，选举撤换 辨析：俄国十月革命才建立苏维埃大会制度 巴黎公社革命源于民族矛盾和阶级斗争激化， 不是第一国际发动和领导，只是受第一国际精神影响。"
  },
  {
    "id": "p-037",
    "num": 37,
    "code": "037",
    "major": "shigang",
    "topic": "史纲整体脉络",
    "topicId": "sg-timeline",
    "title": "史纲整体脉络",
    "titleTokens": [
      {
        "type": "text",
        "text": "史纲整体脉络",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [],
    "image": {
      "src": "./politics-assets/shigang-timeline.png",
      "alt": "史纲整体脉络（原图，不改动）"
    },
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "037 史纲 史纲整体脉络 原图"
  },
  {
    "id": "p-038",
    "num": 38,
    "code": "038",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "斗争",
    "titleTokens": [
      {
        "type": "text",
        "text": "斗争",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "三元里人民的抗英斗争",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是中国近代史上中国人民",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一次大规模的反侵略武装斗争",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "太平天国农民运动",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是中国近代历史上",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一次反对国内封建势力和外国侵略势力的斗争",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "失败的根本原因",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农民阶级自身的阶级局限性",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "038 早期 斗争 三元里人民的抗英斗争是中国近代史上中国人民第一次大规模的反侵略武装斗争太平天国农民运动是中国近代历史上第一次反对国内封建势力和外国侵略势力的斗争失败的根本原因：农民阶级自身的阶级局限性"
  },
  {
    "id": "p-039",
    "num": 39,
    "code": "039",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "边疆危机",
    "titleTokens": [
      {
        "type": "text",
        "text": "边疆危机",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "19世纪70至80年代",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "列强从侵占中国周边邻国发展到蚕食中国边疆地区使中国陷入“边疆危机”",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "甲午战争的惨败使中国陷入“边疆危机”",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "039 早期 边疆危机 19世纪70至80年代 列强从侵占中国周边邻国发展到蚕食中国边疆地区使中国陷入“边疆危机” 甲午战争的惨败使中国陷入“边疆危机”"
  },
  {
    "id": "p-040",
    "num": 40,
    "code": "040",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "洋务运动",
    "titleTokens": [
      {
        "type": "text",
        "text": "洋务运动",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "洋务派提出",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“自强”“求富”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的主张（也是目标）",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洋务运动的指导思想（冯桂芬提出）",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“中学为体，西学为用”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "通过所掌握的国家权力集中力量",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "优先发展军事工业",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洋务派兴办洋务事业首先是为了购买和制造洋枪洋炮以镇压农民起义，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主要目的",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "维护封建统治",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "洋务运动失败的主要原因：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洋务运动具有",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "封",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "建性",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（决定）",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洋务运动对列强具有",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "依",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "赖性",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洋务企业的管理具有",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "腐",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "朽性",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "缝衣服",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "缝衣服",
    "mnemonicBreakdown": [
      {
        "cue": "缝（封）",
        "target": "具有封建性（决定因素）"
      },
      {
        "cue": "衣（依）",
        "target": "对列强具有依赖性"
      },
      {
        "cue": "服（腐）",
        "target": "洋务企业管理具有腐朽性"
      }
    ],
    "searchText": "040 早期 洋务运动 洋务派提出“自强”“求富”的主张（也是目标） 洋务运动的指导思想（冯桂芬提出） “中学为体，西学为用” 通过所掌握的国家权力集中力量优先发展军事工业 洋务派兴办洋务事业首先是为了购买和制造洋枪洋炮以镇压农民起义，主要目的是维护封建统治 洋务运动失败的主要原因： 洋务运动具有封建性（决定） 洋务运动对列强具有依赖性 洋务企业的管理具有腐朽性 缝衣服"
  },
  {
    "id": "p-041",
    "num": 41,
    "code": "041",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "林则徐 严复 魏源 郑观应",
    "titleTokens": [
      {
        "type": "text",
        "text": "林则徐 严复 魏源 郑观应",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "徐四睁",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "眼见",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "阎王喂海狮 郑观应是公主",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-0f3fc2087ac139.png",
            "alt": "🙋‍♀️"
          },
          {
            "type": "text",
            "text": "威海技师",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "林则",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "徐：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "四",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "洲志》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "睁",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "眼看世界第一人",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "严",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "复：救",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "亡",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "图存",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "魏",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "源：《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "海",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "国图志》“",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "师",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "夷长",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "技",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "以制夷”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "开创了中国近代向西方学习的新风",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "郑观应",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：《盛",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "世",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "危言》“君民",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "共主",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "追求实行民主共和制度的思想",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "徐四睁眼见阎王喂海狮 郑观应是公主",
    "mnemonicBreakdown": [
      {
        "cue": "徐四睁眼",
        "target": "林则徐《四洲志》· 睁眼看世界第一人"
      },
      {
        "cue": "见阎（严）王（亡）",
        "target": "严复 · 救亡图存"
      },
      {
        "cue": "喂海狮（威海技师）",
        "target": "魏源《海国图志》· 师夷长技以制夷"
      },
      {
        "cue": "郑观应是公主",
        "target": "郑观应《盛世危言》· 君民共主（非民主共和）"
      }
    ],
    "searchText": "041 早期 林则徐 严复 魏源 郑观应 徐四睁眼见阎王喂海狮 郑观应是公主 威海技师 林则徐：《四洲志》睁眼看世界第一人 严复：救亡图存 魏源：《海国图志》“师夷长技以制夷” 开创了中国近代向西方学习的新风 郑观应：《盛世危言》“君民共主” 追求实行民主共和制度的思想"
  },
  {
    "id": "p-042",
    "num": 42,
    "code": "042",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "论战",
    "titleTokens": [
      {
        "type": "text",
        "text": "论战",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "维新派与守旧派的论战",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是近代中国资产阶级思想与封建主义思想的第一次正面交锋",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "维新派与守旧派论战",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "内容：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "要不要变法",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中心",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "）；",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "要不要兴民权、设议院、实行君主立宪（后来变法中没有采纳）；",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "要不要废八股、改科举和兴西学。（注意不是废科举，清末“新政”才废除科举）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "维新派与洋务派分歧的实质",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "要不要学习西方的政治制度与思想文化",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": " 维新派技术思想都学，洋务派只学技术不学思想",
            "color": "#EB9E27",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "维新派与革命派的论战",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "这次论战划清了",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "革命与改良的界限，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "传播了民主革命思想，促进了革命形",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "势的发展",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "但同时也暴露了革命派在思想理论方面的弱点，即不敢反帝反封建。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "内容：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "要不要以革命手段推翻清王朝",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（这是双方论战的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "焦点",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "要不要推翻帝制，实行共和",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "要不要社会革命",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "042 早期 论战 维新派与守旧派的论战 是近代中国资产阶级思想与封建主义思想的第一次正面交锋维新派与守旧派论战内容： 要不要变法（中心）； 要不要兴民权、设议院、实行君主立宪（后来变法中没有采纳）； 要不要废八股、改科举和兴西学。（注意不是废科举，清末“新政”才废除科举） 维新派与洋务派分歧的实质是要不要学习西方的政治制度与思想文化  维新派技术思想都学，洋务派只学技术不学思想 维新派与革命派的论战 这次论战划清了革命与改良的界限， 传播了民主革命思想，促进了革命形势的发展 但同时也暴露了革命派在思想理论方面的弱点，即不敢反帝反封建。 内容： 要不要以革命手段推翻清王朝（这是双方论战的焦点） 要不要推翻帝制，实行共和 要不要社会革命"
  },
  {
    "id": "p-043",
    "num": 43,
    "code": "043",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "早期信仰马克思主义的人物",
    "titleTokens": [
      {
        "type": "text",
        "text": "早期信仰马克思主义的人物",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国早期信仰马克思主义的人物，主要有三种类型:",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "新文化运动的精神领袖",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，主要代表人物是李大钊、陈独秀",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "五四爱国运动的左翼骨干",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，主要代表为毛泽东等",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "原中国同盟会会员、辛亥革命时期的活动家",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，其代表为董必武等其",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主体",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "部分是:",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "五四爱国运动的左翼",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "骨干",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "043 早期 早期信仰马克思主义的人物 中国早期信仰马克思主义的人物，主要有三种类型: 新文化运动的精神领袖，主要代表人物是李大钊、陈独秀 五四爱国运动的左翼骨干，主要代表为毛泽东等 原中国同盟会会员、辛亥革命时期的活动家，其代表为董必武等其主体部分是: 五四爱国运动的左翼骨干"
  },
  {
    "id": "p-044",
    "num": 44,
    "code": "044",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "新文化运动及五四运动",
    "titleTokens": [
      {
        "type": "text",
        "text": "新文化运动及五四运动",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "新文化运动的倡导者",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)以进化论观点和个性解放思想为主要武器",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "批",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "判",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "孔",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "学，是为了给中国",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "发",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "展",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "本主义扫清障碍，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "但没彻底否定孔学的历史作用",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "屁孔发紫",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)大力提倡新道德、反对旧道德，提倡新文学、反对旧文学，包括提倡白话文、反对文言文。提倡民主、反对专制，提倡科学、反对迷信盲从",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)五四以前的新文化运动局限性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①提倡资产阶级民主主义",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②把",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "改造国民性",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "置于优先地位",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③还没有马克思主义",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "后来十月革命给中国送来了马克思主义",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "五四以后的新文化运动",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "则发展到了一个新阶段",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "马克思主义开始逐步地在思想文化领域中发挥指导作用",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "五四运动的直接导火线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "巴黎和会上中国外交的失败",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "李大钊",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "率先",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在中国大地上举起",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "旗帜",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "其发表的《我的马克思主义观》标志着",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在中国进入一个比较",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "系统",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的传播阶段",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "十月革命",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "使中国先进分子从",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资产阶级民主主义",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "转向",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "屁孔发紫",
    "mnemonicBreakdown": [
      {
        "cue": "屁（批）孔",
        "target": "批判孔学（未彻底否定孔学历史作用）"
      },
      {
        "cue": "发紫（发资）",
        "target": "为了给中国发展资本主义扫清障碍"
      }
    ],
    "searchText": "044 早期 新文化运动及五四运动 新文化运动的倡导者 (1)以进化论观点和个性解放思想为主要武器 (2)批判孔学，是为了给中国发展资本主义扫清障碍，但没彻底否定孔学的历史作用 屁孔发紫 (3)大力提倡新道德、反对旧道德，提倡新文学、反对旧文学，包括提倡白话文、反对文言文。提倡民主、反对专制，提倡科学、反对迷信盲从 (4)五四以前的新文化运动局限性： ①提倡资产阶级民主主义 ②把改造国民性置于优先地位 ③还没有马克思主义 后来十月革命给中国送来了马克思主义 五四以后的新文化运动则发展到了一个新阶段 马克思主义开始逐步地在思想文化领域中发挥指导作用 五四运动的直接导火线：巴黎和会上中国外交的失败 李大钊率先在中国大地上举起马克思主义旗帜 其发表的《我的马克思主义观》标志着马克思主义在中国进入一个比较系统的传播阶段 十月革命使中国先进分子从资产阶级民主主义转向社会主义"
  },
  {
    "id": "p-045",
    "num": 45,
    "code": "045",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "觉醒",
    "titleTokens": [
      {
        "type": "text",
        "text": "觉醒",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "中日甲午战争 1895",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "促使中国人民的民族意识开始",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "普遍觉醒",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "五四运动 1919",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中华民族自鸦片战争以来的第一次",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全面觉醒",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "045 早期 觉醒 中日甲午战争 1895 促使中国人民的民族意识开始普遍觉醒 五四运动 1919 中华民族自鸦片战争以来的第一次全面觉醒"
  },
  {
    "id": "p-046",
    "num": 46,
    "code": "046",
    "major": "shigang",
    "topic": "早期",
    "topicId": "sg-early",
    "title": "工人罢工运动",
    "titleTokens": [
      {
        "type": "text",
        "text": "工人罢工运动",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国工人运动的第一个高潮（海员到京汉）",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1922.1",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "香港",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "海",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "员—",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "起点",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1922.9",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "安源",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "路",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "矿—完全",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "胜",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "利",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1922.10",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "开滦",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "五",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "矿—",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "非",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "完全",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "胜",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "利",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1923.2",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "京",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "汉",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "铁路—",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "终点（高潮）",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "持续时间",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "最长",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的罢工：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1925-1926",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "省港",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "大罢工",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "慕容云",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "海",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "起点",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " 张",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "翰",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "终点",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "六胜五不胜 省港最长",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "慕容云海是起点 张翰是终点 六胜五不胜 省港最长",
    "mnemonicBreakdown": [
      {
        "cue": "云海是起点",
        "target": "1922.1 香港海员罢工 — 起点"
      },
      {
        "cue": "张翰（京汉）是终点",
        "target": "1923.2 京汉铁路罢工 — 终点（高潮）"
      },
      {
        "cue": "六胜五不胜",
        "target": "安源路矿（路=六）完全胜利 · 开滦五矿（五）非完全胜利"
      },
      {
        "cue": "省港最长",
        "target": "1925–1926 省港大罢工 — 持续时间最长"
      }
    ],
    "searchText": "046 早期 工人罢工运动 中国工人运动的第一个高潮（海员到京汉） 1922.1香港海员—起点 1922.9安源路矿—完全胜利 1922.10开滦五矿—非完全胜利 1923.2京汉铁路—终点（高潮） 持续时间最长的罢工： 1925-1926省港大罢工 慕容云海是起点 张翰是终点 六胜五不胜 省港最长"
  },
  {
    "id": "p-047",
    "num": 47,
    "code": "047",
    "major": "shigang",
    "topic": "大革命",
    "topicId": "sg-dageming",
    "title": "孙中山",
    "titleTokens": [
      {
        "type": "text",
        "text": "孙中山",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "第一个响亮喊出",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“振兴中华”",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的口号",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "创立",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "兴中会（第一个）、同盟会",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "提出",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "民族、民权、民生",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的三民主义",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "领导了辛亥革命",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1911年，在他领导和影响下，震惊世界的辛亥革命取得成功，推翻了清王朝统治，结束了统治中国几千年的君主专制制度",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "中国共产党成立后，孙中山先生同中国共产党人真诚合作",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在中国共产党帮助下，把旧三民主义发展为",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "新三民主义",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "实行",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "联俄、联共、扶助农工",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "三大政策",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "孙中山改组国民党，促成第一次国共合作，为后来北伐创造条件，推动反帝反封建革命前进",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "北伐战争是在孙中山逝世之后发生的，不由孙中山发动",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "047 大革命 孙中山 第一个响亮喊出“振兴中华”的口号 创立兴中会（第一个）、同盟会 提出民族、民权、民生的三民主义 领导了辛亥革命 1911年，在他领导和影响下，震惊世界的辛亥革命取得成功，推翻了清王朝统治，结束了统治中国几千年的君主专制制度 中国共产党成立后，孙中山先生同中国共产党人真诚合作在中国共产党帮助下，把旧三民主义发展为新三民主义实行联俄、联共、扶助农工三大政策 孙中山改组国民党，促成第一次国共合作，为后来北伐创造条件，推动反帝反封建革命前进（北伐战争是在孙中山逝世之后发生的，不由孙中山发动）"
  },
  {
    "id": "p-048",
    "num": 48,
    "code": "048",
    "major": "shigang",
    "topic": "大革命",
    "topicId": "sg-dageming",
    "title": "新旧三民主义",
    "titleTokens": [
      {
        "type": "text",
        "text": "新旧三民主义",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "旧三民主义：",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "驱除鞑虏，恢复中华",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "创立民国",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "平均地权",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "旧三民主义的局限：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "民族主义的局限性",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "没有从正面鲜明地提出反对帝国主义的主张",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "没有保证广大劳动群众在国家中的地位",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "民生主义指的是“平均地权”，其局限性表现在没有正面触及封建土地所有制，不能满足广大农民的土地要求",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "新三民主义：",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "民族：突出反帝内容，对外实行民族独立，对内主张民族平等",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "民权：民主权利“为一般平民所共有”，不应为“少数人所得私”",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "民生：平均地权和节制资本（后又提出耕者有其田）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "并提出改善工农生活状况",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "三民无主",
            "color": "#DC7705",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "新旧三民主义，都是民族，民生，民权。从来没有民主，有民主就错",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-5ff2e88665935f.png",
            "alt": "⭕"
          },
          {
            "type": "text",
            "text": "新三民主义的政纲同中国共产党在民主革命阶段的纲领基本一致，因而有了国共合作的政治基础",
            "color": "#DC7705",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-d0d1cdbbc25dcf.png",
            "alt": "❗"
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-d0d1cdbbc25dcf.png",
            "alt": "❗"
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-d0d1cdbbc25dcf.png",
            "alt": "❗"
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "048 大革命 新旧三民主义 旧三民主义： 驱除鞑虏，恢复中华 创立民国 平均地权 旧三民主义的局限： 民族主义的局限性 没有从正面鲜明地提出反对帝国主义的主张 没有保证广大劳动群众在国家中的地位 民生主义指的是“平均地权”，其局限性表现在没有正面触及封建土地所有制，不能满足广大农民的土地要求 新三民主义： 民族：突出反帝内容，对外实行民族独立，对内主张民族平等 民权：民主权利“为一般平民所共有”，不应为“少数人所得私” 民生：平均地权和节制资本（后又提出耕者有其田） 并提出改善工农生活状况 三民无主 新旧三民主义，都是民族，民生，民权。从来没有民主，有民主就错 新三民主义的政纲同中国共产党在民主革命阶段的纲领基本一致，因而有了国共合作的政治基础"
  },
  {
    "id": "p-049",
    "num": 49,
    "code": "049",
    "major": "shigang",
    "topic": "大革命",
    "topicId": "sg-dageming",
    "title": "旧民主主义革命的终结和新民主主义革命的开端",
    "titleTokens": [
      {
        "type": "text",
        "text": "旧民主主义革命的终结和新民主主义革命的开端",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "护法运动的失败",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "不仅是孙中山个人的失败",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "也标志着整个中国民族资产阶级领导的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "旧民主主义革命的终结",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "使孙中山认识到“南与北如一丘之貉”，想依靠南方军阀来反对北洋军阀行不通的事件是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "护法运动",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "五四运动",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "成为中国革命的新阶段即",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "新民主主义革命",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "阶段",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的开端",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "无产阶级的领导权是中国革命的中心问题，也是新民主主义革命理论的核心问题。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "区别新、旧两种不同范畴的民主主义革命的根本标志",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "革命的领导权是掌握在无产阶级手中还是掌握在资产阶级手中",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "一定要注意，虽然“新民主主义革命”有个“新”字，但其性质依然是资产阶级民主主义革命",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "(由社会性质、革命对象、革命任务等决定)。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "但是，中国革命已不是旧式的、一般的资产阶级民主主义革命，而是新式的、特殊的资产阶级民主主义革命。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "049 大革命 旧民主主义革命的终结和新民主主义革命的开端 护法运动的失败不仅是孙中山个人的失败 也标志着整个中国民族资产阶级领导的旧民主主义革命的终结 使孙中山认识到“南与北如一丘之貉”，想依靠南方军阀来反对北洋军阀行不通的事件是护法运动 五四运动成为中国革命的新阶段即新民主主义革命阶段的开端  无产阶级的领导权是中国革命的中心问题，也是新民主主义革命理论的核心问题。 区别新、旧两种不同范畴的民主主义革命的根本标志是，革命的领导权是掌握在无产阶级手中还是掌握在资产阶级手中。 一定要注意，虽然“新民主主义革命”有个“新”字，但其性质依然是资产阶级民主主义革命(由社会性质、革命对象、革命任务等决定)。 但是，中国革命已不是旧式的、一般的资产阶级民主主义革命，而是新式的、特殊的资产阶级民主主义革命。"
  },
  {
    "id": "p-050",
    "num": 50,
    "code": "050",
    "major": "shigang",
    "topic": "大革命",
    "topicId": "sg-dageming",
    "title": "辛亥革命",
    "titleTokens": [
      {
        "type": "text",
        "text": "辛亥革命",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "辛亥革命之所以失败，从根本上说，是因为",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "在帝国主义时代，在半殖民地半封建的中国，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本主义的建国方案行不通",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "毛泽东说辛亥革命\"只把一个皇帝赶跑\"是指",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "反帝反封建的革命任务没有完成",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "南京临时政府在《告友邦书》中，企图以承认清政府的不平等条约和外债来换取列强承认。所以",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《中华民国临时约法》是",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "承认",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "清政府与列强签订的一系列不平等条约的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "050 大革命 辛亥革命 辛亥革命之所以失败，从根本上说，是因为 在帝国主义时代，在半殖民地半封建的中国，资本主义的建国方案行不通毛泽东说辛亥革命\"只把一个皇帝赶跑\"是指反帝反封建的革命任务没有完成南京临时政府在《告友邦书》中，企图以承认清政府的不平等条约和外债来换取列强承认。所以《中华民国临时约法》是承认清政府与列强签订的一系列不平等条约的。"
  },
  {
    "id": "p-051",
    "num": 51,
    "code": "051",
    "major": "shigang",
    "topic": "土地革命",
    "topicId": "sg-tudi",
    "title": "中国革命能坚持和发展的原因",
    "titleTokens": [
      {
        "type": "text",
        "text": "中国革命能坚持和发展的原因",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "在大革命失败、白色恐怖极其严重的条件下",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国革命之所以能够得到坚持和发展",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "根本原因",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "就在于中国共产党",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "紧紧地",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "依靠农民",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": " ",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "领导农民进行了土地制度的革命",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "051 土地革命 中国革命能坚持和发展的原因 在大革命失败、白色恐怖极其严重的条件下 中国革命之所以能够得到坚持和发展 根本原因就在于中国共产党 紧紧地依靠农民 领导农民进行了土地制度的革命"
  },
  {
    "id": "p-052",
    "num": 52,
    "code": "052",
    "major": "shigang",
    "topic": "土地革命",
    "topicId": "sg-tudi",
    "title": "秋收起义与南昌起义",
    "titleTokens": [
      {
        "type": "text",
        "text": "秋收起义与南昌起义",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "区别：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-79bc44425ef0cd.png",
            "alt": "✳️"
          },
          {
            "type": "text",
            "text": "秋收起义：【",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工农革命军",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "】的旗帜",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "南昌起义：【",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国民革命军",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "】的旗帜",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-79bc44425ef0cd.png",
            "alt": "✳️"
          },
          {
            "type": "text",
            "text": "秋收起义不仅是军队的行动，而且有数量众多的工农武装参加",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "联系：",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-79bc44425ef0cd.png",
            "alt": "✳️"
          },
          {
            "type": "text",
            "text": "秋收起义的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "目标",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是攻打中心城市长沙，",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在攻打中心城市受挫后，毛泽东果断改变计划，决定向敌人控制比较薄弱的农村转移，这一点与南昌起义是相同的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-79bc44425ef0cd.png",
            "alt": "✳️"
          },
          {
            "type": "text",
            "text": "南昌起义和秋收起义都是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国共产党独立领导的革命战争",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "052 土地革命 秋收起义与南昌起义 区别： 秋收起义：【工农革命军】的旗帜 南昌起义：【国民革命军】的旗帜 秋收起义不仅是军队的行动，而且有数量众多的工农武装参加 联系： 秋收起义的目标是攻打中心城市长沙，在攻打中心城市受挫后，毛泽东果断改变计划，决定向敌人控制比较薄弱的农村转移，这一点与南昌起义是相同的 南昌起义和秋收起义都是 中国共产党独立领导的革命战争"
  },
  {
    "id": "p-053",
    "num": 53,
    "code": "053",
    "major": "shigang",
    "topic": "土地革命",
    "topicId": "sg-tudi",
    "title": "长征",
    "titleTokens": [
      {
        "type": "text",
        "text": "长征",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "中央红军进行长征的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "直接原因",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "红军在",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第五次反“围剿”作战中遭到失败",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "红军已无在原地扭转战局的可能",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "长征的胜利",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "极大地促进了党在政治上和思想上的成熟",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是中国革命转危为安的关键",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实现了中国共产党和中国革命事业从挫折走向胜利的伟大转折",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "中央红军突围以来",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "最壮烈、最关键的一仗",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "湘江战役",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "053 土地革命 长征 中央红军进行长征的直接原因 红军在第五次反“围剿”作战中遭到失败 红军已无在原地扭转战局的可能 长征的胜利 极大地促进了党在政治上和思想上的成熟 是中国革命转危为安的关键 实现了中国共产党和中国革命事业从挫折走向胜利的伟大转折 中央红军突围以来最壮烈、最关键的一仗湘江战役"
  },
  {
    "id": "p-054",
    "num": 54,
    "code": "054",
    "major": "shigang",
    "topic": "土地革命",
    "topicId": "sg-tudi",
    "title": "党对军队的绝对领导",
    "titleTokens": [
      {
        "type": "text",
        "text": "党对军队的绝对领导",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "Fa男鸡弯腚鼓",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "党对军队的绝对领导",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "发",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "端于",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "南",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "昌起义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "奠",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "于三",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "湾",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "改编",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "定",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "型于",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "古",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "田会议",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "南昌起义",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "打响了武装反抗国民党反动派的第一枪，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "党独立领导革命战争、创建人民军队和武装夺取政权的开端",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "湾改编",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "从",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "组织",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "上确立了党对军队的领导",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "建设无产阶级领导的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "新",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "型人民军队的重要开端",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "三星确立了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "支部建在连上",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的原则和制度",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "Fa男鸡弯腚鼓 + 三星",
    "mnemonicBreakdown": [
      {
        "cue": "Fa男",
        "target": "发端于南昌起义"
      },
      {
        "cue": "鸡弯",
        "target": "奠基于三湾改编"
      },
      {
        "cue": "腚鼓",
        "target": "定型于古田会议"
      },
      {
        "cue": "三星",
        "target": "三湾改编 = 建设无产阶级领导的新型人民军队的重要开端"
      }
    ],
    "searchText": "054 土地革命 党对军队的绝对领导 fa男鸡弯腚鼓 党对军队的绝对领导 发端于南昌起义 奠基于三湾改编 定型于古田会议 南昌起义 打响了武装反抗国民党反动派的第一枪， 党独立领导革命战争、创建人民军队和武装夺取政权的开端三湾改编从组织上确立了党对军队的领导建设无产阶级领导的新型人民军队的重要开端三星确立了支部建在连上的原则和制度"
  },
  {
    "id": "p-055",
    "num": 55,
    "code": "055",
    "major": "shigang",
    "topic": "抗日战争",
    "topicId": "sg-kangri",
    "title": "抗日战争",
    "titleTokens": [
      {
        "type": "text",
        "text": "抗日战争",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "起点",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，局部抗战的开始：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1931",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "九一八",
            "color": "#2000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "事变",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "十年",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "内战",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的局面由此",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "结束",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1936.12",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "西安事变",
            "color": "#2000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的和平解决",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "西安事变的和平解决",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "成为时局转换的枢纽，十年内战局面基本结束，国内和平初步实现",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "进入",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全民族抗战",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "时期：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1937.7",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "七七/卢沟桥事变",
            "color": "#2000FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "抗日战争的胜利 1945",
            "color": "#275BD1",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是近代以来中国人民反抗外敌入侵第一次取得完全胜利的民族解放斗争，是中华民族从近代以来陷人深重危机走向伟大复兴的历史转折点",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "055 抗日战争 抗日战争 起点，局部抗战的开始：1931九一八事变 十年内战的局面由此结束：1936.12西安事变的和平解决西安事变的和平解决成为时局转换的枢纽，十年内战局面基本结束，国内和平初步实现 进入全民族抗战时期：1937.7七七/卢沟桥事变 抗日战争的胜利 1945 是近代以来中国人民反抗外敌入侵第一次取得完全胜利的民族解放斗争，是中华民族从近代以来陷人深重危机走向伟大复兴的历史转折点"
  },
  {
    "id": "p-056",
    "num": 56,
    "code": "056",
    "major": "shigang",
    "topic": "抗日战争",
    "topicId": "sg-kangri",
    "title": "三三制",
    "titleTokens": [
      {
        "type": "text",
        "text": "三三制",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "“三三制”原则：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "共产党员、党外进步人士和中间派各占 1/3共产党员:代表工人和农⺠党外进步人士:代表小资产阶级中间派:代表⺠族资产阶级和开明绅士(无地方实力派)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "只用知道",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三三制",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日根据地的政权建设",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "就够了，三三制常作为干扰项出现",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "056 抗日战争 三三制 “三三制”原则： 共产党员、党外进步人士和中间派各占 1/3共产党员:代表工人和农⺠党外进步人士:代表小资产阶级中间派:代表⺠族资产阶级和开明绅士(无地方实力派) 只用知道三三制是抗日根据地的政权建设就够了，三三制常作为干扰项出现"
  },
  {
    "id": "p-057",
    "num": 57,
    "code": "057",
    "major": "shigang",
    "topic": "抗日战争",
    "topicId": "sg-kangri",
    "title": "游击战争",
    "titleTokens": [
      {
        "type": "text",
        "text": "游击战争",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "在战略防御阶段",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "国民党正面战场的正规战是主要的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "敌后游击战是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "辅助",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "在战略相持阶段",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "敌后游击战争成为",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主要",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的抗日作战方式",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "主要是在",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "外线单独作战",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，而不是在内线配合正规军作战",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "大规模的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，而不是小规模的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "灵活作战，敌退我进，敌进我退，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不是进攻战也不是防守战",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "057 抗日战争 游击战争 在战略防御阶段 国民党正面战场的正规战是主要的 敌后游击战是辅助的 在战略相持阶段 敌后游击战争成为主要的抗日作战方式 主要是在外线单独作战，而不是在内线配合正规军作战 是大规模的，而不是小规模的 灵活作战，敌退我进，敌进我退，不是进攻战也不是防守战"
  },
  {
    "id": "p-058",
    "num": 58,
    "code": "058",
    "major": "shigang",
    "topic": "抗日战争",
    "topicId": "sg-kangri",
    "title": "抗日民族统一战线",
    "titleTokens": [
      {
        "type": "text",
        "text": "抗日民族统一战线",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "抗日⺠族统一战线的策略总方针:",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "发展进步势力,争取中间势力,孤立顽固势力",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "依靠中间势力",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "进步势力:",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工人、农⺠和城市小资产阶级",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中间势力:",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "⺠族资产阶级、开明绅士和地方实力派",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "顽固势力",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": ":大地主、大资产阶级的抗日派,",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "即以蒋介石集团为代表的国⺠党亲英美派",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "中国共产党对顽固派贯彻",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "又联合又斗争",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的政策方针。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "在同顽固派作斗争时，坚持",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "有理、有利、有节",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的原则。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "058 抗日战争 抗日民族统一战线 抗日⺠族统一战线的策略总方针: 发展进步势力,争取中间势力,孤立顽固势力 依靠中间势力 进步势力:工人、农⺠和城市小资产阶级 中间势力:⺠族资产阶级、开明绅士和地方实力派 顽固势力:大地主、大资产阶级的抗日派, 即以蒋介石集团为代表的国⺠党亲英美派 中国共产党对顽固派贯彻又联合又斗争的政策方针。 在同顽固派作斗争时，坚持有理、有利、有节的原则。"
  },
  {
    "id": "p-059",
    "num": 59,
    "code": "059",
    "major": "shigang",
    "topic": "抗日战争",
    "topicId": "sg-kangri",
    "title": "延安整风运动",
    "titleTokens": [
      {
        "type": "text",
        "text": "延安整风运动",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "延安整风运动的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "点",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "教",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "条主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "尊师",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重教",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "整风运动",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "最主要的任务",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": ":",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "反对主观主义以整顿学风",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "一切从实际出发 理论联系实际 ",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实事求是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "的马克思主义思想路线 在全党范围",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "确立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "提出的对待犯错误同志的正确方针：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“惩前毖后、治病救人”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "尊师重教",
    "mnemonicBreakdown": [
      {
        "cue": "重教",
        "target": "延安整风运动的重点是反对教条主义（最主要任务是反对主观主义以整顿学风）"
      }
    ],
    "searchText": "059 抗日战争 延安整风运动 延安整风运动的重点是教条主义尊师重教 整风运动最主要的任务:反对主观主义以整顿学风 一切从实际出发 理论联系实际 实事求是 的马克思主义思想路线 在全党范围确立 提出的对待犯错误同志的正确方针： “惩前毖后、治病救人”"
  },
  {
    "id": "p-060",
    "num": 60,
    "code": "060",
    "major": "shigang",
    "topic": "解放战争",
    "topicId": "sg-jiefang",
    "title": "中间路线",
    "titleTokens": [
      {
        "type": "text",
        "text": "中间路线",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "抗日战争胜利后，某些民主党派的领导人曾经鼓吹“中间路线”，",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "企图在国共对立的纲领之外寻找第三条道路。他们主张：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "在政治上，“必须实现英美式的民主政治”，但不准地主官僚资本家操纵；",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "在经济上，“应当实行改良的资本主义”，但不容官僚买办资本横行。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实行的方法，则是走和平改良的道路",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "他们所提倡的，是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资产阶级共和国",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的方案，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "他们所主张的，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实质上是旧民主主义的道路",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "但是，中国在战后面临的是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "两种命运、两个前途的尖锐斗争",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "客观形势",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "决定了中国没有走中间路线的余地。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "060 解放战争 中间路线 抗日战争胜利后，某些民主党派的领导人曾经鼓吹“中间路线”，企图在国共对立的纲领之外寻找第三条道路。他们主张： 在政治上，“必须实现英美式的民主政治”，但不准地主官僚资本家操纵； 在经济上，“应当实行改良的资本主义”，但不容官僚买办资本横行。 实行的方法，则是走和平改良的道路 他们所提倡的，是资产阶级共和国的方案， 他们所主张的，实质上是旧民主主义的道路。 但是，中国在战后面临的是两种命运、两个前途的尖锐斗争。 客观形势决定了中国没有走中间路线的余地。"
  },
  {
    "id": "p-061",
    "num": 61,
    "code": "061",
    "major": "shigang",
    "topic": "解放战争",
    "topicId": "sg-jiefang",
    "title": "解放战争",
    "titleTokens": [
      {
        "type": "text",
        "text": "解放战争",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "标志着人民解放战争战略进攻的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "序幕",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "由此揭开：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三路大军相互策应",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（刘邓晋冀鲁豫野战军、陈粟华东野战军、陈谢晋冀鲁豫野战军）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "为",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "打败蒋介石",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "、建立新中国奠定了深厚的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "群众基础",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的是",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "土地制度改革",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "土地制度改革是从根本上摧毁中国封建制度根基的社会大变革从1947年3月至6月，人民解放军经过4个月的内线作战，努力打退国民党军的重点进攻，并在东北、热河、冀东、豫南等地开始局部反攻。人民解放军在这一阶段的作战标志着",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "从根本上粉碎了国民党统治集团的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "速战速决计划",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三大战役后",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "国民党赖以维持其反动统治的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主要军事力量",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基本上被摧毁",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "061 解放战争 解放战争 标志着人民解放战争战略进攻的序幕由此揭开：三路大军相互策应（刘邓晋冀鲁豫野战军、陈粟华东野战军、陈谢晋冀鲁豫野战军） 为打败蒋介石、建立新中国奠定了深厚的群众基础的是土地制度改革 土地制度改革是从根本上摧毁中国封建制度根基的社会大变革从1947年3月至6月，人民解放军经过4个月的内线作战，努力打退国民党军的重点进攻，并在东北、热河、冀东、豫南等地开始局部反攻。人民解放军在这一阶段的作战标志着从根本上粉碎了国民党统治集团的速战速决计划三大战役后国民党赖以维持其反动统治的主要军事力量基本上被摧毁"
  },
  {
    "id": "p-062",
    "num": 62,
    "code": "062",
    "major": "shigang",
    "topic": "解放战争",
    "topicId": "sg-jiefang",
    "title": "转折点",
    "titleTokens": [
      {
        "type": "text",
        "text": "转折点",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "1947米脂县 革命两个转折点（米帝死期",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-cb5ca5abe1fddc.png",
            "alt": "🇲🇾"
          },
          {
            "type": "text",
            "text": "）",
            "color": "#FF0000",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1949进北平 革命重心开始变",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "1947",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "年12月 中共中央在陕北",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "米脂县",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "杨家沟召开会议制定了夺取全国胜利的行动纲领毛泽东指出 中国革命已经发展到了一个历史的转折点",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "蒋",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "介石20年反革命统治由发展到消灭的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "转折点",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "一百多年来",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "帝",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "国主义在中国的统治由发展到消灭的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "转折点",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "1949",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "年3月25日 毛泽东等中央领导人与中央机关人民解放军总部",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "进",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "驻",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "北平",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（北京）香山",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着中国",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "革命重心",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "从农村转向城市",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "辨析",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "秋收起义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "城市转农村",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "进驻香山",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农村转城市",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "七届二中全会",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "说明了党的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工作重心",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "必须",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "由农村转移到城市",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "1947米脂县 革命两个转折点（米帝死期）；1949进北平 革命重心开始变",
    "mnemonicBreakdown": [
      {
        "cue": "米帝死期（1947）",
        "target": "1947 米脂县杨家沟会议 · 蒋介石20年统治 & 帝国主义百年统治由发展到消灭的转折点"
      },
      {
        "cue": "1949 进北平",
        "target": "1949.3.25 进驻北平香山 · 革命重心从农村转向城市"
      }
    ],
    "searchText": "062 解放战争 转折点 1947米脂县 革命两个转折点（米帝死期） 1949进北平 革命重心开始变 1947年12月 中共中央在陕北米脂县杨家沟召开会议制定了夺取全国胜利的行动纲领毛泽东指出 中国革命已经发展到了一个历史的转折点 蒋介石20年反革命统治由发展到消灭的转折点 一百多年来帝国主义在中国的统治由发展到消灭的转折点 1949年3月25日 毛泽东等中央领导人与中央机关人民解放军总部进驻北平（北京）香山标志着中国革命重心从农村转向城市 辨析 秋收起义—城市转农村 进驻香山—农村转城市 七届二中全会说明了党的工作重心必须由农村转移到城市"
  },
  {
    "id": "p-063",
    "num": 63,
    "code": "063",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "建国初期",
    "titleTokens": [
      {
        "type": "text",
        "text": "建国初期",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "三大外交政策",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "一边",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "倒",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "另起",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "炉灶",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "打扫",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "干净",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "屋子",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "再请客",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "打扫屋子倒炉灶",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "针对党政干部中存在的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "腐化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "问题",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国共产党开展了",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三反运动",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "反",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "贪污",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，反",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "浪费",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，反",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "官僚主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "063 建国后 建国初期 三大外交政策 一边倒， 另起炉灶， 打扫干净屋子再请客 打扫屋子倒炉灶 针对党政干部中存在的腐化问题 中国共产党开展了三反运动： 反贪污，反浪费，反官僚主义"
  },
  {
    "id": "p-064",
    "num": 64,
    "code": "064",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "中国社会的阶级构成",
    "titleTokens": [
      {
        "type": "text",
        "text": "中国社会的阶级构成",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "工农小民",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（无产阶级也称为工人阶级）",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "新民主主义时期 中国社会的阶级构成：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "工",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "人阶级",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "农",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "民阶级",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "小",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "资产阶级",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "民",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "族资产阶级",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "工农小民",
    "mnemonicBreakdown": [
      {
        "cue": "工",
        "target": "工人阶级（无产阶级）"
      },
      {
        "cue": "农",
        "target": "农民阶级"
      },
      {
        "cue": "小",
        "target": "小资产阶级"
      },
      {
        "cue": "民",
        "target": "民族资产阶级"
      }
    ],
    "searchText": "064 建国后 中国社会的阶级构成 工农小民（无产阶级也称为工人阶级） 新民主主义时期 中国社会的阶级构成： 工人阶级 农民阶级 小资产阶级 民族资产阶级"
  },
  {
    "id": "p-065",
    "num": 65,
    "code": "065",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "多党合作和政治协商格局的形成",
    "titleTokens": [
      {
        "type": "text",
        "text": "多党合作和政治协商格局的形成",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "喊话",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "——",
            "color": "#D16056",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "五一口号",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "得到了热烈回应；揭开了序幕；奠定了基础。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "回应",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "——",
            "color": "#D16056",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《对时局的意见》",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "各党派和无党派公开自愿接受共产党的领导。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "民主党派和无党派民主人士决心走",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人民革命",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的道路",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "谈话",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "——",
            "color": "#D16056",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东谈话（1949春）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“积极参政，共同建设新中国”；",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "标志着民主党派地位的根本变化",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "确立",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "——",
            "color": "#D16056",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1949 年人民政协",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "确立了中国的新型政党制度",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "辨析",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "1946年政协会议协议还",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "不是新民主主义性质",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，但它有利于冲破蒋介石的独裁统治和实行民主政治，有利于和平建国，因而在相当程度上有利于人民",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "1949年人民政协是以工农联盟为基础的人民民主统一战线的组织形式",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "065 建国后 多党合作和政治协商格局的形成 喊话——五一口号 得到了热烈回应；揭开了序幕；奠定了基础。 回应——《对时局的意见》 各党派和无党派公开自愿接受共产党的领导。 民主党派和无党派民主人士决心走人民革命的道路 谈话——毛泽东谈话（1949春） “积极参政，共同建设新中国”； 标志着民主党派地位的根本变化 确立——1949 年人民政协 确立了中国的新型政党制度 辨析 1946年政协会议协议还不是新民主主义性质的，但它有利于冲破蒋介石的独裁统治和实行民主政治，有利于和平建国，因而在相当程度上有利于人民 1949年人民政协是以工农联盟为基础的人民民主统一战线的组织形式"
  },
  {
    "id": "p-066",
    "num": 66,
    "code": "066",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "“一五”计划",
    "titleTokens": [
      {
        "type": "text",
        "text": "“一五”计划",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "“一五”计划确定的经济建设指导方针突出的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "核心要点",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是集中主要力量发展",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重工业",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，建立国家工业化和国防现代化的初步基础",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1952年左右，我国工业化建设取得巨大成就",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "066 建国后 “一五”计划 “一五”计划确定的经济建设指导方针突出的核心要点是集中主要力量发展重工业，建立国家工业化和国防现代化的初步基础 1952年左右，我国工业化建设取得巨大成就"
  },
  {
    "id": "p-067",
    "num": 67,
    "code": "067",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "对个体手工业的社会主义改造的方法",
    "titleTokens": [
      {
        "type": "text",
        "text": "对个体手工业的社会主义改造的方法",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "对个体手工业的社会主义改造的方",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "法",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "说",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "服教育 典型示范和国家帮助",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（说法）",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "补充",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "对手工业的社会主义改造的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "方",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "针",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "积极",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "领导 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "稳",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "步前进",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（针积极 针",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "滴",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "稳）",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-ce487281ad018d.png",
            "alt": "🔺"
          },
          {
            "type": "text",
            "text": "对农业的社会主义改造也是这个方针",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "067 建国后 对个体手工业的社会主义改造的方法 对个体手工业的社会主义改造的方法： 说服教育 典型示范和国家帮助 （说法） 补充 对手工业的社会主义改造的方针： 积极领导 稳步前进（针积极 针滴稳） 对农业的社会主义改造也是这个方针"
  },
  {
    "id": "p-068",
    "num": 68,
    "code": "068",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "农业社会主义改造遵循的原则",
    "titleTokens": [
      {
        "type": "text",
        "text": "农业社会主义改造遵循的原则",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "农原立典",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "农",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "业社会主义改造遵循的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "原",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "则是",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "自愿互",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "利 典",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "型示范和国家帮助",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "农原立典",
    "mnemonicBreakdown": [
      {
        "cue": "农",
        "target": "农业社会主义改造遵循的原则"
      },
      {
        "cue": "原立",
        "target": "自愿互利"
      },
      {
        "cue": "典",
        "target": "典型示范（和国家帮助）"
      }
    ],
    "searchText": "068 建国后 农业社会主义改造遵循的原则 农原立典 农业社会主义改造遵循的原则是 自愿互利 典型示范和国家帮助"
  },
  {
    "id": "p-069",
    "num": 69,
    "code": "069",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "资本主义工商业改造",
    "titleTokens": [
      {
        "type": "text",
        "text": "资本主义工商业改造",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "资本主义工商业改造三大步骤：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "第一步：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "初级形式国家资本主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，形式为计划订货，统购包销-代工厂特点：国家与私人企业在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "企业外部",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的合作性质：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义萌芽性质(具有社会主义因素)",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "第二步：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "个人企业公私合营",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "特点：生产资料归国家和资本家共同占有，公方占领导地位",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（一，二步都是四马分肥）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "性质：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "半社会主义性质",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "第三步：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全行业公私合营",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "特点：企业变成社会主义国营企业",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "性质：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "完全的社会主义性质",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9eff39d37616a9.png",
            "alt": "⭐"
          },
          {
            "type": "text",
            "text": "我国对资本主义工商业的社会主义改造执行的是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "和平赎买",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的政策",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义改造成功的历史经验包括公有制经济可以和非公有制经济共同发展",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "对社会主义改造基本完成以后",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "公有制经济可以和非公有制经济共同发展",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "缺乏认识",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，是改造中的一个偏差",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "069 建国后 资本主义工商业改造 资本主义工商业改造三大步骤： 第一步：初级形式国家资本主义，形式为计划订货，统购包销-代工厂特点：国家与私人企业在企业外部的合作性质：社会主义萌芽性质(具有社会主义因素) 第二步：个人企业公私合营 特点：生产资料归国家和资本家共同占有，公方占领导地位（一，二步都是四马分肥） 性质：半社会主义性质 第三步：全行业公私合营 特点：企业变成社会主义国营企业 性质：完全的社会主义性质 我国对资本主义工商业的社会主义改造执行的是和平赎买的政策社会主义改造成功的历史经验包括公有制经济可以和非公有制经济共同发展对社会主义改造基本完成以后公有制经济可以和非公有制经济共同发展缺乏认识，是改造中的一个偏差"
  },
  {
    "id": "p-070",
    "num": 70,
    "code": "070",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "五种经济成分",
    "titleTokens": [
      {
        "type": "text",
        "text": "五种经济成分",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "合作社经济：从个体经济向社会主义集体经济过渡的形式",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "国家资本主义经济",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：私人资本主义经济向社会主义国营经济过渡的形式",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "改造资本主义工商业并向社会主义过渡的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "必经之路",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国家资本主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "新民主主义社会的五种经济成分中",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "处于",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "十字路口",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的经济成分是：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "个体经济",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "十字路口有路标",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-9d19d320d9fbae.png",
            "alt": "⬆️"
          },
          {
            "type": "text",
            "text": "像“个”",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "十字路口有路标 ⬆️ 像“个”",
    "mnemonicBreakdown": [
      {
        "cue": "十字路口 → “个”",
        "target": "新民主主义五种经济成分中，处于十字路口的是「个体经济」"
      }
    ],
    "searchText": "070 建国后 五种经济成分 合作社经济：从个体经济向社会主义集体经济过渡的形式 国家资本主义经济：私人资本主义经济向社会主义国营经济过渡的形式 改造资本主义工商业并向社会主义过渡的必经之路是国家资本主义 新民主主义社会的五种经济成分中 处于十字路口的经济成分是：个体经济 十字路口有路标像“个”"
  },
  {
    "id": "p-071",
    "num": 71,
    "code": "071",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "中国进入社会主义社会最主要的标志",
    "titleTokens": [
      {
        "type": "text",
        "text": "中国进入社会主义社会最主要的标志",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国进入社会主义社会最主要的标志是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义经济制度的确立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "不是社会主义政治制度的确立",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "因为",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "经济基础决定上层建筑",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "071 建国后 中国进入社会主义社会最主要的标志 中国进入社会主义社会最主要的标志是 社会主义经济制度的确立 不是社会主义政治制度的确立 因为经济基础决定上层建筑"
  },
  {
    "id": "p-072",
    "num": 72,
    "code": "072",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "邓小平理论",
    "titleTokens": [
      {
        "type": "text",
        "text": "邓小平理论",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "1. 深刻回答了什么是社会主义、怎样建设社会主义这一根本问题。",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "2. 深刻揭示社会主义本质。",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "3.",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "为我国改革开放和社会主义现代化建设提供了行动指南。",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "4. 是中国特色社会主义理论体系的奠基之作。",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "邓小平理论",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的精髓：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "解放思想、",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实事求是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "辨析",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "邓小平理论———什么是社会主义、怎样建设社会主义",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7de913c8c85160.png",
            "alt": "💡"
          },
          {
            "type": "text",
            "text": "看到",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "邓小平",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，就想",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“三个代表”重要思想———建设什么样的党、怎样建设党科学发展观——实现什么样的发展、怎样发展习思想——“新时代坚持和发展什么样的中国特色社会主义、怎样坚持和发展中国特色社会主义，建设什么样的社会主义现代化强国、怎样建设社会主义现代化强国，建设什么样的长期执政的马克思主义政党、怎样建设长期执政的马克思主义政党”。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "072 建国后 邓小平理论 1. 深刻回答了什么是社会主义、怎样建设社会主义这一根本问题。 2. 深刻揭示社会主义本质。 3. 为我国改革开放和社会主义现代化建设提供了行动指南。 4. 是中国特色社会主义理论体系的奠基之作。 邓小平理论的精髓： 解放思想、实事求是 辨析 邓小平理论———什么是社会主义、怎样建设社会主义 看到邓小平，就想社会主义 “三个代表”重要思想———建设什么样的党、怎样建设党科学发展观——实现什么样的发展、怎样发展习思想——“新时代坚持和发展什么样的中国特色社会主义、怎样坚持和发展中国特色社会主义，建设什么样的社会主义现代化强国、怎样建设社会主义现代化强国，建设什么样的长期执政的马克思主义政党、怎样建设长期执政的马克思主义政党”。"
  },
  {
    "id": "p-073",
    "num": 73,
    "code": "073",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "邓思想补充",
    "titleTokens": [
      {
        "type": "text",
        "text": "邓思想补充",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "党际关系“四项原则”",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“独立自",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "、完全",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "平",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "等、互",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "相",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "尊重、互不干涉",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "内部事务",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "”",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": " 竹坪乡",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "内部事务",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "和平与发展",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是当今世界的两大主题的重要论断",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "如果一切从本本出发思想僵化，迷信盛行，那它就不能前进",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1979党的理论工作务虚会首次提出",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“四项基本原则”",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1982十二大提出",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "建设有中国特色的社会主义",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "为建设中国特色社会主义提供",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "总依据",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的是",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义初级阶段理论",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义初级阶段基本路线的核心内容",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“一个中心、两个基本点”",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "以经济建设为",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中心",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "坚持",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "四项基本原则，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "坚持",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "改革开放",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "邓小平在领导",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "改革开放和现代化建设",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "这一新的革命过程中",
            "color": "#90959B",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不断提出和反复思考的",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "首要的基本的理论问题",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "什么是社会主义、怎样建设社会主义",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "搞清楚这一基本理论问题，",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关键是要",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在坚持社会主义基本制度的基础上进一步认清社会主义的本质",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "竹坪乡的内部事务",
    "mnemonicBreakdown": [
      {
        "cue": "竹（主）",
        "target": "独立自主"
      },
      {
        "cue": "坪（平）",
        "target": "完全平等"
      },
      {
        "cue": "乡（相）",
        "target": "互相尊重"
      },
      {
        "cue": "内部事务",
        "target": "互不干涉内部事务"
      }
    ],
    "searchText": "073 建国后 邓思想补充 党际关系“四项原则” “独立自主、完全平等、互相尊重、互不干涉内部事务”  竹坪乡的内部事务 和平与发展是当今世界的两大主题的重要论断 如果一切从本本出发思想僵化，迷信盛行，那它就不能前进1979党的理论工作务虚会首次提出“四项基本原则” 1982十二大提出 建设有中国特色的社会主义 为建设中国特色社会主义提供总依据的是 社会主义初级阶段理论 社会主义初级阶段基本路线的核心内容 “一个中心、两个基本点” 以经济建设为中心，坚持四项基本原则，坚持改革开放邓小平在领导改革开放和现代化建设这一新的革命过程中不断提出和反复思考的首要的基本的理论问题是什么是社会主义、怎样建设社会主义搞清楚这一基本理论问题，关键是要在坚持社会主义基本制度的基础上进一步认清社会主义的本质"
  },
  {
    "id": "p-074",
    "num": 74,
    "code": "074",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "南方谈话",
    "titleTokens": [
      {
        "type": "text",
        "text": "南方谈话",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "计划和市场",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "都是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "经济手段",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，不是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "与",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "资本主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的本质区别。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "邓小平的南方谈话",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "从理论上深刻回答了长期困扰和束缚人们思想的许多重大问题，是把改革开放和现代化建设推向新阶段的又一个解放思想、实事求是的宣言书，不仅对之后召开的党的十四大具有十分重要的指导作用，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "而且对中国整个社会主义现代化建设事业具有重大而深远的意义。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "邓小平理论也",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "逐步走向成熟",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "074 建国后 南方谈话 计划和市场都是经济手段，不是社会主义与资本主义的本质区别。 邓小平的南方谈话 从理论上深刻回答了长期困扰和束缚人们思想的许多重大问题，是把改革开放和现代化建设推向新阶段的又一个解放思想、实事求是的宣言书，不仅对之后召开的党的十四大具有十分重要的指导作用，而且对中国整个社会主义现代化建设事业具有重大而深远的意义。 邓小平理论也逐步走向成熟"
  },
  {
    "id": "p-075",
    "num": 75,
    "code": "075",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "宣言书",
    "titleTokens": [
      {
        "type": "text",
        "text": "宣言书",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "抗美援朝的胜利",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国人民站起来后屹立于世界东方的宣言书",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "《解放思想 实事求是 团结一致向前看》",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "开辟中国特色社会主义",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "道路",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "、",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "开创",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中国特色社会",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "理论",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "宣言书",
            "color": "#DC7705",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "解放思想、开辟新时期新道路的宣言书",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "南方谈话",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "推进改革开放和社会主义现代化建设",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "进入新阶段",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "又一个",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "解放思想、实事求是的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "宣言书",
            "color": "#DC7705",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "075 建国后 宣言书 抗美援朝的胜利 中国人民站起来后屹立于世界东方的宣言书 《解放思想 实事求是 团结一致向前看》 开辟中国特色社会主义道路、开创中国特色社会理论的宣言书解放思想、开辟新时期新道路的宣言书 南方谈话 推进改革开放和社会主义现代化建设进入新阶段的又一个解放思想、实事求是的宣言书"
  },
  {
    "id": "p-076",
    "num": 76,
    "code": "076",
    "major": "shigang",
    "topic": "建国后",
    "topicId": "sg-jianguo",
    "title": "宪法",
    "titleTokens": [
      {
        "type": "text",
        "text": "宪法",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "三大改造前，政协第一届全体会议通过的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《中国人民政治协商会议共同纲领》",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，成为中国人民的大宪章，在一个时期内起着新中国临时宪法的作用。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "但它还",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不是社会主义类型的宪法",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "三大改造后，1954年9月，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中华人民共和国第一届全国人民代表大会第一次会议通过的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《中华人民共和国宪法》",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是一部社会主义类型的宪法",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，体现了人民民主原则和社会主义原则。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "076 建国后 宪法 三大改造前，政协第一届全体会议通过的《中国人民政治协商会议共同纲领》，成为中国人民的大宪章，在一个时期内起着新中国临时宪法的作用。 但它还不是社会主义类型的宪法。 三大改造后，1954年9月， 中华人民共和国第一届全国人民代表大会第一次会议通过的《中华人民共和国宪法》，是一部社会主义类型的宪法，体现了人民民主原则和社会主义原则。"
  },
  {
    "id": "p-077",
    "num": 77,
    "code": "077",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "土地政策",
    "titleTokens": [
      {
        "type": "text",
        "text": "土地政策",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "康熙底线心存贞洁",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "土",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "地",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "革命时期：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "限",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "制富农",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《兴国土地法》",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "将“没收一切土地〞改为“",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "没收一切公共土地及地主阶级的土地",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "〞这是一个原则性的改正",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "抗",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "日战争时期：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "减租减",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "息",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "解",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "放战争时期：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“五四指示”",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "改“减租减息”为“耕者有其田”",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《土地法大纲》",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "征",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "收富农多余土地",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "新",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中国成立后",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": "《中华人民共和国土地改革法》",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "废除",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "地主阶级封建剥削的土地所有制",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，实行农民的土地所有制，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "保",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "存",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "富农经济的政策",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4a68823f4d5149.png",
            "alt": ""
          },
          {
            "type": "text",
            "text": " 社会主义改造时期",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "从限制富农到逐步消灭富农",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "“地主不分田，富农分坏田”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "—王明“左”倾教条主义错误",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "没收地主土地，不再对地主分配土地",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "康熙底线心存贞洁",
    "mnemonicBreakdown": [
      {
        "cue": "康熙（抗息）",
        "target": "抗日战争时期：减租减息"
      },
      {
        "cue": "底线（地限）",
        "target": "土地革命时期：限制富农"
      },
      {
        "cue": "心存（新存）",
        "target": "新中国成立后：保存富农经济"
      },
      {
        "cue": "贞洁（征解）",
        "target": "解放战争时期：征收富农多余土地"
      }
    ],
    "searchText": "077 重要专题 土地政策 康熙底线心存贞洁 土地革命时期：限制富农 《兴国土地法》将“没收一切土地〞改为“没收一切公共土地及地主阶级的土地〞这是一个原则性的改正 抗日战争时期：减租减息 解放战争时期： “五四指示”改“减租减息”为“耕者有其田” 《土地法大纲》征收富农多余土地 新中国成立后 《中华人民共和国土地改革法》 废除地主阶级封建剥削的土地所有制，实行农民的土地所有制，保存富农经济的政策  社会主义改造时期从限制富农到逐步消灭富农 “地主不分田，富农分坏田”—王明“左”倾教条主义错误 没收地主土地，不再对地主分配土地"
  },
  {
    "id": "p-078",
    "num": 78,
    "code": "078",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "统一战线",
    "titleTokens": [
      {
        "type": "text",
        "text": "统一战线",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "四个统一战线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①大革命时期",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国民革命联合战线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②土地革命时期",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，因为大革命后汪蒋叛变，民资和部分小资跟国民党跑了只剩下工人和农民留在共产党，故此时是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工农民主统一战线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③抗日战争时期",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日民族统一战线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "④解放战争时期",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "我们争求尽可能的人民（除了工农也包括富农，民资等）与国民党进行最终决战，此时形成",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人民民主统一战线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "新民主主义革命时期，以",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "国共合作",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "为基础所建立的统一战线有：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "国民革命联合战线，抗日民族统一战线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "必要性和可能性：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①中国革命",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "必须",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "建立最广泛的统一战线",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，这是由中国半殖民地半封建社会的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "阶级",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "状况所决定的中国革命的长期性、残酷性及其发展的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不平衡",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "性所決定的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②半殖民地半封建的中国社会交织在一起的诸多矛盾，决定的是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "建立最广泛的统一战线的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "可能性",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，而不是必要性。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "决定必要性的是阶级 ，不平衡",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "必须",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "选国情，",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "可能",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "选矛盾",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "必须选国情，可能选矛盾",
    "mnemonicBreakdown": [
      {
        "cue": "必须 → 国情",
        "target": "建立统一战线的「必要性」由半殖民地半封建社会的阶级状况与革命不平衡性决定"
      },
      {
        "cue": "可能 → 矛盾",
        "target": "建立统一战线的「可能性」由诸多交织的社会矛盾决定"
      }
    ],
    "searchText": "078 重要专题 统一战线 四个统一战线 ①大革命时期，国民革命联合战线 ②土地革命时期，因为大革命后汪蒋叛变，民资和部分小资跟国民党跑了只剩下工人和农民留在共产党，故此时是工农民主统一战线 ③抗日战争时期，抗日民族统一战线 ④解放战争时期我们争求尽可能的人民（除了工农也包括富农，民资等）与国民党进行最终决战，此时形成人民民主统一战线新民主主义革命时期，以国共合作为基础所建立的统一战线有： 国民革命联合战线，抗日民族统一战线 必要性和可能性： ①中国革命必须建立最广泛的统一战线，这是由中国半殖民地半封建社会的阶级状况所决定的中国革命的长期性、残酷性及其发展的不平衡性所決定的 ②半殖民地半封建的中国社会交织在一起的诸多矛盾，决定的是建立最广泛的统一战线的可能性，而不是必要性。 决定必要性的是阶级 ，不平衡 必须选国情，可能选矛盾"
  },
  {
    "id": "p-079",
    "num": 79,
    "code": "079",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "政权性质",
    "titleTokens": [
      {
        "type": "text",
        "text": "政权性质",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "土地革命战争时期建立的苏维埃政权的性质",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "工农民主专政",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中华苏维埃共和国是中国历史上第一个全国性的工农民主政权",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日战争时期建立的政权的性质",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日民族统一战线",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "性质的政权是一切赞成",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "又赞成",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "民主",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的人们的政权",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "解放战争时期建立的政权的性质",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "各个革命阶级的联合专政",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "新中国成立初期建立的政权的性质",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人民民主专政",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "079 重要专题 政权性质 土地革命战争时期建立的苏维埃政权的性质 工农民主专政 中华苏维埃共和国是中国历史上第一个全国性的工农民主政权抗日战争时期建立的政权的性质是抗日民族统一战线性质的政权是一切赞成抗日又赞成民主的人们的政权解放战争时期建立的政权的性质各个革命阶级的联合专政新中国成立初期建立的政权的性质人民民主专政"
  },
  {
    "id": "p-080",
    "num": 80,
    "code": "080",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "马克思主义中国化",
    "titleTokens": [
      {
        "type": "text",
        "text": "马克思主义中国化",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "马克思主义中国化",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "三次飞跃",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（成果）",
            "color": "#DF00FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "中共七大",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "确立",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东思想",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为党的指导思想",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（第一次）",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "中国特色社会主义理论体系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": " ",
            "color": "#273039",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "改革开放后",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（第二次）",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "习近平新时代中国特色社会主义思想",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "（新的飞跃非第三次）",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "马克思主义中国化的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "两次结合",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "（过程）",
            "color": "#DF00FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义同",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中国",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "革命",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "实际的结合",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "正式提出命题",
            "color": "#FF00BF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": " ",
            "color": "#8000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "六届六中全会《论新阶段》",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "共产党成立就开始了",
            "color": "#DF00FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "马克思主义同",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中国社会主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "建设",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "实际的结合",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1956《论十大关系》",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "六六结合",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "七大飞跃",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "五六结合",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bc218d4d48dc09.png",
            "alt": "➡️"
          },
          {
            "type": "text",
            "text": "改革飞跃",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "关于结合完成问题",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "20世纪30年代 ",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思主义与中国实际第一次相结合",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“第一次结合”",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "即实行马克思主义同中国新民主主义革命结合这一任务是",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "完成了",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "形成了",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "毛泽东思想，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "取得了",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "新民主主义革命的胜利",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "1956年社会主义基本制度在中国确立的时候",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "毛泽东明确提出了把马克思列宁主义基本原理同中国具体实际进行",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“第二次结合”",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "但是，毛泽东",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "没有完成",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "这一任务，邓小平也",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "没有完成",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "第二次结合事实上“三个代表”重要思想、科学发展观等都属于马克思主义与中国实际的第二次结合的范畴，因此",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "不能说",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "邓小平同志完成了马克思主义与中国实际的第二次结合",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "两个结合",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "把马克思主义基本原理同",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中国具体实际",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "相结合",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "把马克思主义基本原理同",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中华优秀传统文化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "相结合",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "毛泽东思想",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "无改革",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " 中国特色社会主义理论体系",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "无革命",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "马克思主义中国化时代化",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "都有",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中特理论体系——",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "革命",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和建设 ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          },
          {
            "type": "text",
            "text": "错误",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "毛泽东思想——革命和建设 ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-bf9a696f7c24a8.png",
            "alt": "✔️"
          },
          {
            "type": "text",
            "text": "正确",
            "color": "#36B59D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-94946f4bdc7793.png",
            "alt": "🎩"
          },
          {
            "type": "text",
            "text": "马克思主义中国化时代化",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "魂脉",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "根脉",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—",
            "color": "#000000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中华优秀传统文化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9eff39d37616a9.png",
            "alt": "⭐"
          },
          {
            "type": "text",
            "text": "四种提法的正误判断",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "中国早期的马克思主义者",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "已在",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实际上初步形成了马克思主义应当与中国具体实际相结合的思想 ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "中国早期的马克思主义思想运动",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "从一开始就",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "明确提出",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "马克思主义与中国实际相结合的命题",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "中国早期的马克思主义者",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "一开始就",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "坚持了马克思主义中国化的革命原则和正确方向",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-4c451bd04d38d5.png",
            "alt": "❌"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "中国共产党所领导的改革开放",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "从一开始就",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "具有明确的社会主义方向",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "080 重要专题 马克思主义中国化 马克思主义中国化三次飞跃（成果） 中共七大确立毛泽东思想为党的指导思想（第一次） 中国特色社会主义理论体系 改革开放后（第二次） 习近平新时代中国特色社会主义思想（新的飞跃非第三次） 马克思主义中国化的两次结合（过程） 马克思主义同中国革命实际的结合 正式提出命题 六届六中全会《论新阶段》 共产党成立就开始了 马克思主义同中国社会主义建设实际的结合 1956《论十大关系》 六六结合七大飞跃五六结合改革飞跃 关于结合完成问题 20世纪30年代 马克思主义与中国实际第一次相结合“第一次结合”即实行马克思主义同中国新民主主义革命结合这一任务是完成了的，形成了毛泽东思想，取得了新民主主义革命的胜利 1956年社会主义基本制度在中国确立的时候 毛泽东明确提出了把马克思列宁主义基本原理同中国具体实际进行“第二次结合” 但是，毛泽东没有完成这一任务，邓小平也没有完成第二次结合事实上“三个代表”重要思想、科学发展观等都属于马克思主义与中国实际的第二次结合的范畴，因此不能说邓小平同志完成了马克思主义与中国实际的第二次结合 两个结合 把马克思主义基本原理同中国具体实际相结合 把马克思主义基本原理同中华优秀传统文化相结合 毛泽东思想无改革 中国特色社会主义理论体系无革命马克思主义中国化时代化都有中特理论体系——革命和建设 错误毛泽东思想——革命和建设 正确 马克思主义中国化时代化 魂脉—马克思主义 根脉—中华优秀传统文化 四种提法的正误判断 中国早期的马克思主义者 已在实际上初步形成了马克思主义应当与中国具体实际相结合的思想  中国早期的马克思主义思想运动 从一开始就明确提出马克思主义与中国实际相结合的命题  中国早期的马克思主义者 一开始就坚持了马克思主义中国化的革命原则和正确方向  中国共产党所领导的改革开放 从一开始就具有明确的社会主义方向"
  },
  {
    "id": "p-081",
    "num": 81,
    "code": "081",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "毛泽东思想形成与发展各时期著作",
    "titleTokens": [
      {
        "type": "text",
        "text": "毛泽东思想形成与发展各时期著作",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "开始萌芽：",
            "color": "#FF00BF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "一阶级两农民",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "大革命时期 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关于新民主主义革命的基本思想的提出",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《中国社会各",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "阶级",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "分析》《国民革命与",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农民",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "运动》《湖南",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农民",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "运动考察报告》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "开始形成/初步形成：",
            "color": "#FF00BF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "红星冈本",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "土地革命时期 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "理论上阐述了中国革命的新道路：",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "农村包围城市、武装夺取政权的思想",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-efd56ba04bd1c8.png",
            "alt": "🇨🇳"
          },
          {
            "type": "text",
            "text": "中国的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "红",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "色政权为什么能够存在》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-9eff39d37616a9.png",
            "alt": "⭐"
          },
          {
            "type": "text",
            "text": "星",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "星之火 可以燎原》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-716ac40172122b.png",
            "alt": "🏔️"
          },
          {
            "type": "text",
            "text": "井",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "冈",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "山的斗争》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-663412df19cef0.png",
            "alt": "📝"
          },
          {
            "type": "text",
            "text": "反对",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "本",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "本主义》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "趋于成熟：",
            "color": "#FF00BF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "两党三论改造政府",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "遵义会议以后直至抗日战争时期",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "对新民主主义革命理论作了系统的阐述",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《实践",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "论",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《矛盾",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "论",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《〈共产",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "党",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "人〉发刊词》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《中国革命和中国共产",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "党",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《新民主主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "论",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "改造",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "我们的学习》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《论联合",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政府",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "继续发展：",
            "color": "#DF00FF",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "两论两在一关于",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "人民民主专政理论的完整论述",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中国共产党第七届中央委员会第二次全体会议上的报告》《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "晋绥干部会议上的讲话》《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "论",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "人民民主专政》《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "论",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "十大关系》《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关于",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "正确处理人民内部矛盾的问题》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-ce487281ad018d.png",
            "alt": "🔺"
          },
          {
            "type": "text",
            "text": "毛泽东思想命名：中共七大",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "081 重要专题 毛泽东思想形成与发展各时期著作 开始萌芽：一阶级两农民 大革命时期 关于新民主主义革命的基本思想的提出《中国社会各阶级分析》《国民革命与农民运动》《湖南农民运动考察报告》 开始形成/初步形成：红星冈本 土地革命时期 理论上阐述了中国革命的新道路： 农村包围城市、武装夺取政权的思想 《中国的红色政权为什么能够存在》 《星星之火 可以燎原》 《井冈山的斗争》 《反对本本主义》 趋于成熟：两党三论改造政府 遵义会议以后直至抗日战争时期 对新民主主义革命理论作了系统的阐述 《实践论》 《矛盾论》 《〈共产党人〉发刊词》 《中国革命和中国共产党》 《新民主主义论》 《改造我们的学习》 《论联合政府》 继续发展：两论两在一关于 人民民主专政理论的完整论述 《在中国共产党第七届中央委员会第二次全体会议上的报告》《在晋绥干部会议上的讲话》《论人民民主专政》《论十大关系》《关于正确处理人民内部矛盾的问题》 毛泽东思想命名：中共七大"
  },
  {
    "id": "p-082",
    "num": 82,
    "code": "082",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "萌芽",
    "titleTokens": [
      {
        "type": "text",
        "text": "萌芽",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "《中国社会各阶级分析》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①分析了各阶级在革命中的作用和地位",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②提出“谁是我们的敌人？谁是我们的朋友”这个革命的首要问题",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "即",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "分清敌友是革命的首要问题",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "中国社会是一个",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "两头小中间大",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的社会",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "两小头",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "无产阶级",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "地主大资产阶级",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "一大头",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农民、城市小资产阶级以及其他的中间阶级",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "082 重要专题 萌芽 《中国社会各阶级分析》： ①分析了各阶级在革命中的作用和地位 ②提出“谁是我们的敌人？谁是我们的朋友”这个革命的首要问题即分清敌友是革命的首要问题 中国社会是一个两头小中间大的社会 两小头：无产阶级和地主大资产阶级 一大头：农民、城市小资产阶级以及其他的中间阶级"
  },
  {
    "id": "p-083",
    "num": 83,
    "code": "083",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "开始形成/初步形成",
    "titleTokens": [
      {
        "type": "text",
        "text": "开始形成/初步形成",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1) ",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《中国的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "红色",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政权为什么能够存在？》《",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "井冈山",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的斗争》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "论证了红色政权能够长期存在并发展的主客观条件",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "提出了",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工农武装割据",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的思想",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "口诀：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工农割据",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "了",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "红色井冈山",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《星星之火，可以燎原》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "回答了",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“红旗到底打得多久〞",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的疑问。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《反对本本主义》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①为了",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "反对",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "当时红军中的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "教条主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "思想而写的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②提出了",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“没有",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "调查",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，没有发言权”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "调查",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "就像‘十月怀胎’，解决问题就像‘一朝分娩’，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "调查",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "就是解决问题”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "“中国革命斗争的胜利要靠中国同志",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "了解",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中国",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "情况",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（这是独立自主思想的最初的明确表述）",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "记住调查和了解情况这两个词即可",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "083 重要专题 开始形成/初步形成 (1) 《中国的红色政权为什么能够存在？》《井冈山的斗争》： 论证了红色政权能够长期存在并发展的主客观条件 提出了工农武装割据的思想 口诀：工农割据了红色井冈山 (2)《星星之火，可以燎原》： 回答了“红旗到底打得多久〞的疑问。 (3)《反对本本主义》： ①为了反对当时红军中的教条主义思想而写的 ②提出了“没有调查，没有发言权” “调查就像‘十月怀胎’，解决问题就像‘一朝分娩’，调查就是解决问题” “中国革命斗争的胜利要靠中国同志了解中国情况” （这是独立自主思想的最初的明确表述） 记住调查和了解情况这两个词即可"
  },
  {
    "id": "p-084",
    "num": 84,
    "code": "084",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "成熟",
    "titleTokens": [
      {
        "type": "text",
        "text": "成熟",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "《论反对日本帝国主义的策略》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：（瓦窑堡会议的文件）",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "系统地说明了党的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政治策略",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "上的诸问题。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《论持久战》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①分析了中日双方相互矛盾的四个基本特点",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②科学地预测了抗日战争的发展进程，即",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日战争将经过战略防御、战略相持、战略反攻三个阶段",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "其中，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "战略相持阶段",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，是中国抗日战争取得最后胜利的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "最关键",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的阶段。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③驳斥了“速胜论”和“亡国论”，提出",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“兵民是胜利之本”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的论断。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《论",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "联合",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政府》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "进一步把新民主主义的",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政治、经济和文化",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "与党的基本",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "纲领",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "联系起来，进行了具体阐述，",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "形成了新民主主义的基本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "纲领",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "只用记住三纲联合",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "新民主主义的经济纲领",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①没收封建地主阶级的土地归农民",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②没收官僚资本归新民主主义国家",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "保护民族工商业",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "（也是新民主主义经济纲领中极具",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "特色",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的一项内容）",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "084 重要专题 成熟 《论反对日本帝国主义的策略》：（瓦窑堡会议的文件） 系统地说明了党的政治策略上的诸问题。 《论持久战》： ①分析了中日双方相互矛盾的四个基本特点 ②科学地预测了抗日战争的发展进程，即抗日战争将经过战略防御、战略相持、战略反攻三个阶段。 其中，战略相持阶段，是中国抗日战争取得最后胜利的最关键的阶段。 ③驳斥了“速胜论”和“亡国论”，提出“兵民是胜利之本”的论断。 《论联合政府》： 进一步把新民主主义的政治、经济和文化与党的基本纲领联系起来，进行了具体阐述，形成了新民主主义的基本纲领。 只用记住三纲联合 新民主主义的经济纲领 ①没收封建地主阶级的土地归农民 ②没收官僚资本归新民主主义国家 ③保护民族工商业 （也是新民主主义经济纲领中极具特色的一项内容）"
  },
  {
    "id": "p-085",
    "num": 85,
    "code": "085",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "继续发展",
    "titleTokens": [
      {
        "type": "text",
        "text": "继续发展",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《在晋绥干部会议上的讲话》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "完整地",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "提出新民主主义革命总路线和总政策",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "完整：在革命对象中增加了官僚资本主义",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《论人民民主专政》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "总结了党成立以来",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "领导民主革命的经验",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "工人阶级（经过共产党）领导的以工农联盟为基础的人民民主专政",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七届二中全会的决议和毛泽东的《论人民民主专政》,构成了《中国人民政治协商会议共同纲领》的基础",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3) 1956年4月",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《论十大关系》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①初步总结了我国社会主义建设的经验，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "明确提出了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "以苏为鉴、独立自主",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "地探索适合中国情况的社会主义建设道路",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "另一种说法：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "明确了建设社会主义的根本思想是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根据本国情况走自己的路",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②围绕一个",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基本方针",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，即",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "调动一切积极因素为社会主义服务",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是以毛泽东为主要代表的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中国共产党人开始探索适合中国国情的社会主义建设道路",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的标志",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "/",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "党探索中国社会主义建设道路的良好开端",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "。",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十全十美好开端",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "它在新的历史条件下从经济和政治方面提出了新的指导方针，为",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中共八大",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的召开作了理论准备。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "④",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "论述的第一大关系是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重工业、轻工业和农业",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的关系",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4) 1957年2月",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "《关于正确处理人民内部矛盾的问题》",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东明确提出了中国工业化道路的问题，主要是指重工业和轻工业、农业的发展关系问题",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "强调要走一条",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "有别于苏联",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的中国工业化道路",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "形成一套系统的关于",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义社会矛盾",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的学说",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义社会的基本矛盾同以往社会的基本矛盾具有根本不同的性质和情况是：",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义基本矛盾",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“又相适应又相矛盾”",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "解决人民内部矛盾的一系列具体方针原则：",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政治思想领域",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "上实行",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“团结—批评一团结”",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的方针",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "共产党与民主党派的关系",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "上实行",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“长期共存、互相监督”",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的方针",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "科学文化工作",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中实行",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“百花齐放、百家争鸣”",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的方针",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "在",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "物质利益分配",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "方面中实行",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“统筹兼顾、适当安排”",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "的方针",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7f202871d47f0f.png",
            "alt": "5️⃣"
          },
          {
            "type": "text",
            "text": "民族",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "之间实行",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“民主平等，团结互助”",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的方针",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7b3717d6150114.png",
            "alt": "6️⃣"
          },
          {
            "type": "text",
            "text": "对于",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人民群众和政府机关",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，要坚持",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "民主集中制原则",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "③关于正确处理人民内部矛盾的问题是社会主义国家政治生活的主题。这一论断的",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "根本着眼点",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "调动一切积极因素为社会主义服务",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "085 重要专题 继续发展 (1)《在晋绥干部会议上的讲话》： 完整地提出新民主主义革命总路线和总政策 完整：在革命对象中增加了官僚资本主义 (2)《论人民民主专政》： 总结了党成立以来领导民主革命的经验： 工人阶级（经过共产党）领导的以工农联盟为基础的人民民主专政 七届二中全会的决议和毛泽东的《论人民民主专政》,构成了《中国人民政治协商会议共同纲领》的基础 (3) 1956年4月《论十大关系》： ①初步总结了我国社会主义建设的经验， 明确提出了以苏为鉴、独立自主地探索适合中国情况的社会主义建设道路。 另一种说法：明确了建设社会主义的根本思想是根据本国情况走自己的路。 ②围绕一个基本方针，即调动一切积极因素为社会主义服务。 ③是以毛泽东为主要代表的中国共产党人开始探索适合中国国情的社会主义建设道路的标志 /标志着党探索中国社会主义建设道路的良好开端。 十全十美好开端 它在新的历史条件下从经济和政治方面提出了新的指导方针，为中共八大的召开作了理论准备。 ④论述的第一大关系是重工业、轻工业和农业的关系。 (4) 1957年2月《关于正确处理人民内部矛盾的问题》： ①毛泽东明确提出了中国工业化道路的问题，主要是指重工业和轻工业、农业的发展关系问题，强调要走一条有别于苏联的中国工业化道路。 ②形成一套系统的关于社会主义社会矛盾的学说 社会主义社会的基本矛盾同以往社会的基本矛盾具有根本不同的性质和情况是： 社会主义基本矛盾“又相适应又相矛盾” 解决人民内部矛盾的一系列具体方针原则： 在政治思想领域上实行“团结—批评一团结”的方针 在共产党与民主党派的关系上实行“长期共存、互相监督”的方针 在科学文化工作中实行“百花齐放、百家争鸣”的方针 在物质利益分配方面中实行“统筹兼顾、适当安排” 的方针 民族之间实行“民主平等，团结互助”的方针 对于人民群众和政府机关，要坚持民主集中制原则 ③关于正确处理人民内部矛盾的问题是社会主义国家政治生活的主题。这一论断的根本着眼点，调动一切积极因素为社会主义服务"
  },
  {
    "id": "p-086",
    "num": 86,
    "code": "086",
    "major": "shigang",
    "topic": "重要专题",
    "topicId": "sg-special",
    "title": "毛泽东的思想汇总",
    "titleTokens": [
      {
        "type": "text",
        "text": "毛泽东的思想汇总",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-43265780df09b2.png",
            "alt": "1️⃣"
          },
          {
            "type": "text",
            "text": "社会主义社会矛盾学说 ",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-9728784e3a5801.png",
            "alt": "2️⃣"
          },
          {
            "type": "text",
            "text": "没有调查，没有发言权",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7384b52823d905.png",
            "alt": "3️⃣"
          },
          {
            "type": "text",
            "text": "我们要坚持用马克思主义之“矢”去射中国革命之“的”",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-3d4f176b7fa759.png",
            "alt": "4️⃣"
          },
          {
            "type": "text",
            "text": "以农业为基础，以工业为主导，以农轻重为序发展国民经济的总方针，以及一整套“两条腿走路”的工业化发展思路",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-7f202871d47f0f.png",
            "alt": "5️⃣"
          },
          {
            "type": "text",
            "text": " “中间地带”",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-7b3717d6150114.png",
            "alt": "6️⃣"
          },
          {
            "type": "text",
            "text": "“三个世界划分”",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "这里不是背的，知道这里都是毛的，注意别和邓混淆即可，真题常考！",
            "color": "#2000FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "086 重要专题 毛泽东的思想汇总 社会主义社会矛盾学说 没有调查，没有发言权 我们要坚持用马克思主义之“矢”去射中国革命之“的” 以农业为基础，以工业为主导，以农轻重为序发展国民经济的总方针，以及一整套“两条腿走路”的工业化发展思路  “中间地带”“三个世界划分” 这里不是背的，知道这里都是毛的，注意别和邓混淆即可，真题常考！"
  },
  {
    "id": "p-087",
    "num": 87,
    "code": "087",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "党的三大优良作风",
    "titleTokens": [
      {
        "type": "text",
        "text": "党的三大优良作风",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "理论联系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "际",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "密切联系",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "群",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "众",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "批评与自我",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "批",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "评",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "1945七大《论联合政府》",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "087 三大辨析 党的三大优良作风 理论联系实际 密切联系群众 批评与自我批评 1945七大《论联合政府》"
  },
  {
    "id": "p-088",
    "num": 88,
    "code": "088",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "三大法宝",
    "titleTokens": [
      {
        "type": "text",
        "text": "三大法宝",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "战斗党",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国共产党在中国革命中战胜敌人的三个法宝",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "统一",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "战",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "武装",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "斗",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "争",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "党",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的建设",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《〈共产党人〉发刊词》",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "战斗党",
    "mnemonicBreakdown": [
      {
        "cue": "战",
        "target": "统一战线"
      },
      {
        "cue": "斗",
        "target": "武装斗争"
      },
      {
        "cue": "党",
        "target": "党的建设"
      }
    ],
    "searchText": "088 三大辨析 三大法宝 战斗党 中国共产党在中国革命中战胜敌人的三个法宝 统一战线 武装斗争 党的建设 《〈共产党人〉发刊词》"
  },
  {
    "id": "p-089",
    "num": 89,
    "code": "089",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "工农武装割据",
    "titleTokens": [
      {
        "type": "text",
        "text": "工农武装割据",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "武弟弟",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "土",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "地",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "革命",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "武",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "装斗争",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "根据",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "地",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "建设",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中国革命走",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农村包围城市、武装夺取政权",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的道路，根本在于处理好",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "土地革命、武装斗争、农村革命根据地建设",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "三者之间的关系。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "武弟弟",
    "mnemonicBreakdown": [
      {
        "cue": "武",
        "target": "武装斗争"
      },
      {
        "cue": "弟1（地）",
        "target": "土地革命"
      },
      {
        "cue": "弟2（地）",
        "target": "根据地建设"
      }
    ],
    "searchText": "089 三大辨析 工农武装割据 武弟弟 土地革命 武装斗争 根据地建设 中国革命走农村包围城市、武装夺取政权的道路，根本在于处理好土地革命、武装斗争、农村革命根据地建设三者之间的关系。"
  },
  {
    "id": "p-090",
    "num": 90,
    "code": "090",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "毛泽东思想活的灵魂",
    "titleTokens": [
      {
        "type": "text",
        "text": "毛泽东思想活的灵魂",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "是群主",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实事求",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "群",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "众路线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "独立自",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十一届六中全会",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《关于建国以来党的若干历史问题的决议》",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-9eff39d37616a9.png",
            "alt": "⭐"
          },
          {
            "type": "text",
            "text": "这三个里最重要的是",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实事求是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "因为“我就记得一句话，实事求是”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "以下是四种具体表述，读一遍即可",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实事求是是",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "毛泽东思想的基本点",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "毛泽东思想的精髓",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "党的思想路线的核心",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "党的根本思想路线",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "是群主",
    "mnemonicBreakdown": [
      {
        "cue": "是",
        "target": "实事求是（最重要）"
      },
      {
        "cue": "群",
        "target": "群众路线"
      },
      {
        "cue": "主",
        "target": "独立自主"
      }
    ],
    "searchText": "090 三大辨析 毛泽东思想活的灵魂 是群主 实事求是 群众路线 独立自主 十一届六中全会 《关于建国以来党的若干历史问题的决议》 这三个里最重要的是实事求是 因为“我就记得一句话，实事求是” 以下是四种具体表述，读一遍即可 实事求是是 毛泽东思想的基本点 毛泽东思想的精髓 党的思想路线的核心 党的根本思想路线"
  },
  {
    "id": "p-091",
    "num": 91,
    "code": "091",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "会议大观",
    "titleTokens": [
      {
        "type": "text",
        "text": "会议大观",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "一大党二大二反",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "三大国共要合作",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "国民一大合作成",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "四大领导工农盟",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "五大争取革命权",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "八七枪杆出政权",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "古田军队要增强",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "遵义军事与组织",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "瓦窑堡一起来抗日",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洛川全面来抗战",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "六届六中马中化",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "六届七中整完风",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七大确定毛领导",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七届二中转城市 两转变两务必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "人民政协政党立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七届三中转经济",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "八大矛盾定方针",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十一三中改开放",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十一六中通《决议》 社初提",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十二大上中特提",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十二三中有计划",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十三阶段与路线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十四市场经济体",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十五邓理论成指导",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十六三个代表 小康奋斗目标",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十七科学发展观",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十八全面小康新时代",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十八三中破冰",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": null,
    "mnemonicBreakdown": [],
    "searchText": "091 三大辨析 会议大观 一大党二大二反 三大国共要合作 国民一大合作成 四大领导工农盟 五大争取革命权 八七枪杆出政权 古田军队要增强 遵义军事与组织 瓦窑堡一起来抗日 洛川全面来抗战 六届六中马中化 六届七中整完风 七大确定毛领导 七届二中转城市 两转变两务必 人民政协政党立 七届三中转经济 八大矛盾定方针 十一三中改开放 十一六中通《决议》 社初提 十二大上中特提 十二三中有计划 十三阶段与路线 十四市场经济体 十五邓理论成指导 十六三个代表 小康奋斗目标 十七科学发展观 十八全面小康新时代 十八三中破冰"
  },
  {
    "id": "p-092",
    "num": 92,
    "code": "092",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "会议大观上",
    "titleTokens": [
      {
        "type": "text",
        "text": "会议大观上",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "中共一大 1921",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)大会",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "确定党的名称",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "为“中国共产党”,通过中国共产党的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一个纲领",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和决议。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)大会在讨论实际工作计划时，决定",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "首先集中精力组织工人",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)大会决定设立中央局作为党的临时领导机构。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中共二大 1922",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)第一次提出了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "反帝反封建",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的民主革命的纲领",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)开始采取",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "群众路线",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的方法",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)正式提出",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "民主联合战线",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的主张，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "这是党最早提出关于",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "统一战线",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的思想和主张，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "主要目的是实现",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "反帝反军阀",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的革命目标",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中共三大 1923",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "正式决定全体共产党员以",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "个人名义",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "加入国民党",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "国民党一大 1924",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)对三民主义作出新的解释，即",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“新三民主义”",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "事实上确认了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "联俄、联共、扶助农工",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的三大革命政策",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "新三民主义的政纲同当时中共基本一致，因而成为国共合作的政治基础",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)标志着",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一次国共合作正式形成",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中共四大 1925",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)提出了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "无产阶级在民主革命中的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "领导权",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "问题",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)提出了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "工农联盟",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "问题",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)对民主革命的内容作了更加完整的规定",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中共五大 1927",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)提出",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "争取无产阶级对革命的领导权",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)建立革命民主政权和实行土地革命等一些正确的原则",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "但对无产阶级如何争取革命领导权、如何领导农民实行土地革命,特别是如何建立党领导的革命武装等问题,没有提出有效的具体措施,难以承担起挽救革命的任务。",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "八七会议 1927",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)八七会议总结了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "大革命失败",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的经验教训 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "巴适",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)坚决纠正和结束了陈独秀的右倾主义错误",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)确定了土地革命和武装反抗国民党反动派的总方针",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)第一次提出了“政权是由枪杆子中取得的”思想",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "古田会议 1929",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)立了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "思想建党、政治建军",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "原则",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中心思想是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "要用无产阶级思想进行军队和党的建设",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)阐述了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "加强党的思想建设的极端重要性，指明党内各种非无产阶级思想的表现、来源及纠正办法",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)规定了中国的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "红军是一个执行革命的政治任务的武装集团",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)创造性地解决了在农村环境中、 在党组织和军队以农民为主要成分的条件下，如何保持党的无产阶级",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "先锋",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "队性质和建设党领导的新型人民",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "军队",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的重大问题",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "古田先锋军队",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "遵义会议 1935",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)党的历史上一个",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "生死攸关的转折点",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)事实上确立了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在党中央和红军的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "领导地位",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "开始确立以毛泽东同志为主要代表的马克思主义正确路线在党中央的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "领导地位",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "开始形成以",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东同志为核心",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "第一代中央领导集体",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)集中解决了当时具有决定意义的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "军事问题和组织问题",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "遵君主",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)遵义会议的一系列重大决策",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是在中国共产党同共产国际的联系中断的情况下",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "独立自主",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "地作出的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "遵义会议开启了党",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "独立自主",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "解决中国革命实际问题的新阶段 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "尊嘟假嘟",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(5)遵义会议的鲜明特点是",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "坚持真理、修正错误 ",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "遵义修理",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "瓦窑堡 1935",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)解决党的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "政治路线",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "问题 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "镇馆之宝",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)提出了党的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "抗日民族统一战线",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的新政策 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "瓦罗兰特，统一战线",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "洛川会议 1937",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)洛川会议制定了抗日救国十大纲领",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "强调要打倒日本帝国主义 关键在于：",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "使已然发动的抗战成为全面的全民族的抗战",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着党的全面抗战路线的正式形成",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "川面/洛克王国，全面抗战",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      }
    ],
    "mnemonicCue": "巴适 · 遵君主 · 尊嘟假嘟 · 遵义修理 · 镇馆之宝 · 瓦罗兰特 · 川面",
    "mnemonicBreakdown": [
      {
        "cue": "巴适（八失）",
        "target": "八七会议总结大革命失败经验教训"
      },
      {
        "cue": "遵君主（军组）",
        "target": "遵义会议集中解决军事问题和组织问题"
      },
      {
        "cue": "尊嘟假嘟（独）",
        "target": "遵义会议开启党独立自主解决中国革命实际问题新阶段"
      },
      {
        "cue": "遵义修理",
        "target": "遵义会议鲜明特点：坚持真理、修正错误"
      },
      {
        "cue": "镇馆之宝（政·瓦窑堡）",
        "target": "瓦窑堡会议解决党的政治路线问题"
      },
      {
        "cue": "瓦罗兰特（统一战线）",
        "target": "瓦窑堡会议提出抗日民族统一战线新政策"
      },
      {
        "cue": "川面（洛川·全面）",
        "target": "洛川会议标志全面抗战路线正式形成"
      }
    ],
    "searchText": "092 三大辨析 会议大观上 中共一大 1921 (1)大会确定党的名称为“中国共产党”,通过中国共产党的第一个纲领和决议。 (2)大会在讨论实际工作计划时，决定首先集中精力组织工人 (3)大会决定设立中央局作为党的临时领导机构。 中共二大 1922 (1)第一次提出了反帝反封建的民主革命的纲领 (2)开始采取群众路线的方法 (3)正式提出民主联合战线的主张， 这是党最早提出关于统一战线的思想和主张， 主要目的是实现反帝反军阀的革命目标 中共三大 1923 正式决定全体共产党员以个人名义加入国民党 国民党一大 1924 (1)对三民主义作出新的解释，即“新三民主义” 事实上确认了联俄、联共、扶助农工的三大革命政策 (2)新三民主义的政纲同当时中共基本一致，因而成为国共合作的政治基础 (3)标志着第一次国共合作正式形成 中共四大 1925 (1)提出了无产阶级在民主革命中的领导权问题 (2)提出了工农联盟问题 (3)对民主革命的内容作了更加完整的规定 中共五大 1927 (1)提出争取无产阶级对革命的领导权 (2)建立革命民主政权和实行土地革命等一些正确的原则 但对无产阶级如何争取革命领导权、如何领导农民实行土地革命,特别是如何建立党领导的革命武装等问题,没有提出有效的具体措施,难以承担起挽救革命的任务。 八七会议 1927 (1)八七会议总结了大革命失败的经验教训 巴适 (2)坚决纠正和结束了陈独秀的右倾主义错误 (3)确定了土地革命和武装反抗国民党反动派的总方针 (4)第一次提出了“政权是由枪杆子中取得的”思想 古田会议 1929 (1)立了思想建党、政治建军原则 中心思想是要用无产阶级思想进行军队和党的建设 (2)阐述了加强党的思想建设的极端重要性，指明党内各种非无产阶级思想的表现、来源及纠正办法 (3)规定了中国的红军是一个执行革命的政治任务的武装集团 (4)创造性地解决了在农村环境中、 在党组织和军队以农民为主要成分的条件下，如何保持党的无产阶级先锋队性质和建设党领导的新型人民军队的重大问题 古田先锋军队 遵义会议 1935 (1)党的历史上一个生死攸关的转折点 (2)事实上确立了毛泽东在党中央和红军的领导地位开始确立以毛泽东同志为主要代表的马克思主义正确路线在党中央的领导地位开始形成以毛泽东同志为核心的第一代中央领导集体 (3)集中解决了当时具有决定意义的军事问题和组织问题 遵君主 (4)遵义会议的一系列重大决策 是在中国共产党同共产国际的联系中断的情况下独立自主地作出的 遵义会议开启了党独立自主解决中国革命实际问题的新阶段 尊嘟假嘟 (5)遵义会议的鲜明特点是坚持真理、修正错误  遵义修理 瓦窑堡 1935 (1)解决党的政治路线问题 镇馆之宝 (2)提出了党的抗日民族统一战线的新政策  瓦罗兰特，统一战线 洛川会议 1937 (1)洛川会议制定了抗日救国十大纲领 强调要打倒日本帝国主义 关键在于： 使已然发动的抗战成为全面的全民族的抗战 (2)标志着党的全面抗战路线的正式形成 川面/洛克王国，全面抗战"
  },
  {
    "id": "p-093",
    "num": 93,
    "code": "093",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "会议大观中",
    "titleTokens": [
      {
        "type": "text",
        "text": "会议大观中",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "《实践论》《矛盾论》 1937",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "从马克思主义认识论的新高度总结中国共产党的历史经验",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "揭露和批判党内的主观主义 尤其是教条主义错误",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "深入论证马克思列宁主义基本原理同中国具体实际相结合的原则",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "科学阐明了党的马克思主义的思想路线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "六届六中 1938",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东明确提出",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "“马克思主义的中国化”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "命题",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全会基本",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "纠正了王明的右倾",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "错误",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "延安整风 1941-1945",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "一切从实际出发 理论联系实际",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实事求是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的马克思主义思想路线 在全党范围",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "确立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "六届七中 《关于若干历史问题的决议》1945",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "使全党特别是党的高级干部对中国革命基本问题的认识达到了一致",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " 增强了全党团结",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "充分肯定了确立毛泽东在全党领导地位的重大意义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，分清了是非",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为七大的胜利召开",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在思想上做了充分准备",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着延安整风运动的胜利结束",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七大 1945",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东在会上作题为《论联合政府》的书面报告和《愚公移山》闭幕词",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "七个小矮人联合起来愚公移山",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "把毛泽东思想确立为党的指导思想并写入党章 ",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "胀气",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中共七大把党在长期奋斗中形成的优良作风概括为",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "三大作风",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着我们党在政治上 思想上 组织上走向了成熟 ",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "中共七大三成熟",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政治",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "上 党通过延安整风",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "使全党团结在毛泽东的旗帜下",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实现了党的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "空前统一和团结",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "思想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "上 党确立了毛泽东",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "思想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在全党的指导地位把毛泽东思想写入了党章",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "组织",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "上",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "党形成了一支高举毛泽东旗帜的久经考验的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政治家集团",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(5)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "制定了党的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政治路线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，",
            "color": "#FF6000",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "制定了新民主主义国家在",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政治、经济、文化方面的纲领",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，为建立新民主主义的新中国制定了",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "正确路线方针政策",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "提出",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "实现中国工业化的宏伟任务",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(6)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为党后来不断从胜利走向胜利指明了正确方向开辟了正确道路",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七届二中 1949",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "提出了",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "“两个务必”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的思想：",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "务必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "继续保持谦虚、谨慎、不骄、不躁的作风，",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "务必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "继续保持艰苦奋斗的作风",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "指出",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "党的工作重心必须由农村转移到城市",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "规定了党在全国胜利后在政治、经济、外交方面应当采取的基本政策",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "指出了中国",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "由农业国转变为工业国",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "、",
            "color": "#FF6000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "由新民主主义社会转变为社会主义社会",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的发展方向",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中国人民政治协商会议第一届全体会议",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " ",
            "color": "#FF6000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1949",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "人民政协的召开，",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "标志着中国的新型政党制度的确立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "——中国共产党领导的多党合作和政治协商制度",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "会议通过的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "《共同纲领》在当时是全国人民的大宪章",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，起着临时宪法的作用",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "七届三中 1950",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "制定了党在建国初期的战略策略方针：",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "不要四面出击",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "不要四 那就三",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)提出当前阶段",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "中心任务",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "争取国家财政经济状况的基本好转",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "八大 1956",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "分析了改造完成后的",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "主要矛盾",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "主要任务",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "在经济建设上，大会坚持既反保守又反冒进，即",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "在综合平衡中稳步前进的方针 ",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "四平八稳",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "对中国建设社会主义道路的探索，站在",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "比较高的历史起点",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "上，取得了初步成果",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "八届九中全会",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": " ",
            "color": "#FF6000",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "1961",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "对国民经济实行",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "“调整、巩固、充实、提高”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "方针",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "七个小矮人联合起来愚公移山 · 胀气 · 不要四那就三 · 四平八稳",
    "mnemonicBreakdown": [
      {
        "cue": "七个小矮人联合愚公移山",
        "target": "中共七大：《论联合政府》书面报告 + 《愚公移山》闭幕词"
      },
      {
        "cue": "胀气（章七）",
        "target": "中共七大把毛泽东思想写入党章确立为指导思想"
      },
      {
        "cue": "不要四那就三",
        "target": "七届三中全会：不要四面出击"
      },
      {
        "cue": "四平八稳",
        "target": "中共八大：在综合平衡中稳步前进的方针"
      }
    ],
    "searchText": "093 三大辨析 会议大观中 《实践论》《矛盾论》 1937 (1)从马克思主义认识论的新高度总结中国共产党的历史经验 (2)揭露和批判党内的主观主义 尤其是教条主义错误 (3)深入论证马克思列宁主义基本原理同中国具体实际相结合的原则 (4)科学阐明了党的马克思主义的思想路线 六届六中 1938 (1)毛泽东明确提出“马克思主义的中国化”命题 (2)全会基本纠正了王明的右倾错误 延安整风 1941-1945 一切从实际出发 理论联系实际 实事求是的马克思主义思想路线 在全党范围确立 六届七中 《关于若干历史问题的决议》1945 (1)使全党特别是党的高级干部对中国革命基本问题的认识达到了一致 增强了全党团结 (2)充分肯定了确立毛泽东在全党领导地位的重大意义，分清了是非 (3)为七大的胜利召开在思想上做了充分准备 (4)标志着延安整风运动的胜利结束 七大 1945 (1)毛泽东在会上作题为《论联合政府》的书面报告和《愚公移山》闭幕词 七个小矮人联合起来愚公移山 (2)把毛泽东思想确立为党的指导思想并写入党章 胀气 (3)中共七大把党在长期奋斗中形成的优良作风概括为三大作风 (4)标志着我们党在政治上 思想上 组织上走向了成熟  中共七大三成熟 ——在政治上 党通过延安整风 使全党团结在毛泽东的旗帜下 实现了党的空前统一和团结 ——在思想上 党确立了毛泽东思想在全党的指导地位把毛泽东思想写入了党章 ——在组织上 党形成了一支高举毛泽东旗帜的久经考验的政治家集团 (5)制定了党的政治路线， 制定了新民主主义国家在政治、经济、文化方面的纲领，为建立新民主主义的新中国制定了正确路线方针政策提出实现中国工业化的宏伟任务 (6)为党后来不断从胜利走向胜利指明了正确方向开辟了正确道路 七届二中 1949 (1)提出了“两个务必”的思想： 务必继续保持谦虚、谨慎、不骄、不躁的作风，务必继续保持艰苦奋斗的作风 (2)指出党的工作重心必须由农村转移到城市 (3)规定了党在全国胜利后在政治、经济、外交方面应当采取的基本政策 (4)指出了中国由农业国转变为工业国、由新民主主义社会转变为社会主义社会的发展方向中国人民政治协商会议第一届全体会议 1949 (1)人民政协的召开，标志着中国的新型政党制度的确立 ——中国共产党领导的多党合作和政治协商制度 (2)会议通过的《共同纲领》在当时是全国人民的大宪章，起着临时宪法的作用 七届三中 1950 (1)制定了党在建国初期的战略策略方针：不要四面出击 不要四 那就三 (2)提出当前阶段的中心任务是争取国家财政经济状况的基本好转 八大 1956 (1)分析了改造完成后的主要矛盾和主要任务 (2)在经济建设上，大会坚持既反保守又反冒进，即在综合平衡中稳步前进的方针 四平八稳 (3)对中国建设社会主义道路的探索，站在比较高的历史起点上，取得了初步成果 八届九中全会 1961 对国民经济实行“调整、巩固、充实、提高”方针"
  },
  {
    "id": "p-094",
    "num": 94,
    "code": "094",
    "major": "shigang",
    "topic": "三大辨析",
    "topicId": "sg-three",
    "title": "会议大观下",
    "titleTokens": [
      {
        "type": "text",
        "text": "会议大观下",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "text",
            "text": "关于真理标准问题的讨论 1978",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "真理标准问题的讨论是继五四运动和延安整风运动之后又一场",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思主义思想解放运动",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "其实质在于是不是坚持",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思列宁主义 毛泽东思想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "讨论明确地",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "解决了党的思想路线问题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为党重新确立实事求是思想路线 纠正长期以来的左倾错误实现历史性的转折作了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "思想理论准备",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "成为正本清源、拨乱反正和改革开放的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "思想先导",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十一届三中 1978",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全会",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "冲破",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "长期",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“左”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的错误的严重束缚，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "彻底否定了",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“两个凡是”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的错误方针高度评价了关于真理标准问题的讨论，并且",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "断然否定",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“以阶级斗争为纲”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的指导思想",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "作出了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "把工作重点转移到社会主义现代化建设上来",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "和",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实行改革开放的",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "战略决策",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重新确立了",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "马克思主义",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的思想路线 政治路线和组织路线 ",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "三线三中",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "/重新确立解放思想，",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实事求是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "思想路线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "全会恢复了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "党的民主集中制",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的优良传统",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "审查解决了历史上遗留的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "一批重大问题",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "一些重要领导人",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的功过是非问题",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(5)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "会议",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "形成了以邓小平为核心的党的中央领导集体揭开了社会主义改革开放的序幕",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(6)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "以这次全会为起点，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "中国进入了改革开放和社会主义现代化建设的历史新时期",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(7)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实现了党的历史上",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "具有深远意义的伟大转折",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十一届六中《关于建国以来党的若干历史问题的决议》（简称《决议》）1981",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "邓小平对《决议》的起草提出三条指导原则：",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第一，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "确立",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东同志",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的历史地位，坚持和发展",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东思想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，这是最",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "核心",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的一条",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第二，对建国30年来历史上的大事，要进行",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实事求是",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的分析，包括一些负责同志的功过是非，要作出公正的评价；",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第三，这个总结",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "宜粗不宜细",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，总结过去是为了引导大家",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "团结一致向前看",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "《关于建国以来党的若干历史问题的决议》",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(1)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着党在指导思想上的拨乱反正胜利完成",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-a69d62cc408697.png",
            "alt": "🚩"
          },
          {
            "type": "text",
            "text": "我们党在改革开放和社会主义现代化建设新时期实现的",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "最根本的拨乱反正",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "：",
            "color": "#0040FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "以经济建设为中心",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(2)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "回顾了新中国成立以前党的历史，总结了新中国成立以后社会主义革命和建设的历史经验。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(3)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "彻底否定",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“文化大革命”",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "，对新中国成立以来的重大历史事件和重要历史人物作出了基本结论。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(4)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "科学地评价了",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东和毛泽东思想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的历史地位",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "对",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "毛泽东思想",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的科学体系和活的灵魂作了概括",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，强调毛泽东思想是我们党的宝贵的精神财富，它将长期指导我们的行动。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(5)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "对党的十一届三中全会以来逐步确立的适合中国情况的建设社会主义现代化强国的道路，从十个方面作了概括，",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "实质上初步提出了在中国建设什么样的社会主义和怎样建设社会主义的问题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(6)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "该决议解决了两个相互联系的重大历史课题即",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "①科学评价毛泽东的历史地位和毛泽东思想的科学体系；",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "②根据新的实际和发展要求实行改革开放、确立中国社会主义现代化建设正确道路。",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "(7)",
            "color": "#555555",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "指出社会主义改造基本完成以后，我国所要解决的主要矛盾，是人民日益增长的物质文化需要同落后的社会生产之间的矛盾",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十二大 1982",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第一次提出了“",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "建设有中国特色的社会主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "”命题标志着邓小平理论",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的形成，标志着中特理论",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的形成从此，“中国特色社会主义”成为我们党的全部理论和实践创新的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "这一重大命题的提出具有里程碑意义，是中国共产党人对科学社会主义发展的开创性贡献",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十二届三中 1984",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "指出我国社会主义经济是在公有制基础上的有计划的商品经济 ",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "有计划 一二三",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十三大 1987",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "社会主义初级阶段的基本路线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "第一次对中特理论进行系统的概括",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "标志着邓小平理论",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "轮廓",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的形成，中特理论",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "轮廓",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的形成",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "基本路线中",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "回答了",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "社会主义的根本任务问题",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的是：",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "“以经济建设为中心”",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "回答了社会主义的发展动力和外部条件问题：“坚持改革开放”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实现奋斗目标的领导力量和依靠力量：“领导和团结各族人民”",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十四大 1992",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "明确以",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "建立社会主义市场经济体制",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "为我国经济体制改革的目标",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "南方谈话和十四大",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "标志着",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "改革开放和现代化建设事业进入从计划经济体制向社会主义市场经济体制转变的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "新阶段",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "，由此打开了中国经济、政治、文化发展",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "崭新局面",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十五大 1997",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "邓小平理论确立为党的指导思想",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "首次明确提出了社会主义初级阶段的基本",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "纲领",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十六大 2002",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "三个代表 小康奋斗目标",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "二三四五六 中路经（过只）刚小乔",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十七大 2007",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "科学发展观",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "提出了“中国特色社会主义理论体系”的科学概念标志着中国特色社会主义理论和实践的",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "进一步成熟 ",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-1a21a78ee99527.png",
            "alt": "🔞"
          },
          {
            "type": "text",
            "text": "17-18还需进一步成熟",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "十八三中 2013",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "实现了改革",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "由局部探索、破冰突围到系统集成、全面深化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "的转变，开创了我国改革开放新局面",
            "color": "#009FFF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "二十三中 2024",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "进一步全面深化改革的重点是深化经济体制改革",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "三线三中 · 有计划一二三 · 二三四五六 中路经（过只）刚小乔",
    "mnemonicBreakdown": [
      {
        "cue": "三线三中",
        "target": "十一届三中全会：重新确立马克思主义思想/政治/组织三条路线"
      },
      {
        "cue": "有计划一二三",
        "target": "十二届三中全会：公有制基础上的有计划的商品经济"
      },
      {
        "cue": "二·中",
        "target": "十二大：建设有中国特色的社会主义"
      },
      {
        "cue": "三·路",
        "target": "十三大：社会主义初级阶段基本路线"
      },
      {
        "cue": "四·经",
        "target": "十四大：建立社会主义市场经济体制"
      },
      {
        "cue": "五·刚（纲）",
        "target": "十五大：邓小平理论确立指导思想 + 首次提出初级阶段基本纲领"
      },
      {
        "cue": "六·小",
        "target": "十六大：三个代表 + 全面建设小康社会奋斗目标"
      }
    ],
    "searchText": "094 三大辨析 会议大观下 关于真理标准问题的讨论 1978 (1)真理标准问题的讨论是继五四运动和延安整风运动之后又一场马克思主义思想解放运动其实质在于是不是坚持马克思列宁主义 毛泽东思想 (2)讨论明确地解决了党的思想路线问题 (3)为党重新确立实事求是思想路线 纠正长期以来的左倾错误实现历史性的转折作了思想理论准备 (4)成为正本清源、拨乱反正和改革开放的思想先导 十一届三中 1978 (1)全会冲破长期“左”的错误的严重束缚，彻底否定了“两个凡是”的错误方针高度评价了关于真理标准问题的讨论，并且断然否定“以阶级斗争为纲”的指导思想 (2)作出了把工作重点转移到社会主义现代化建设上来和实行改革开放的战略决策 (3)重新确立了马克思主义的思想路线 政治路线和组织路线 三线三中 /重新确立解放思想，实事求是思想路线 (4)全会恢复了党的民主集中制的优良传统 审查解决了历史上遗留的一批重大问题和一些重要领导人的功过是非问题 (5)会议形成了以邓小平为核心的党的中央领导集体揭开了社会主义改革开放的序幕 (6)以这次全会为起点，中国进入了改革开放和社会主义现代化建设的历史新时期 (7)实现了党的历史上具有深远意义的伟大转折 十一届六中《关于建国以来党的若干历史问题的决议》（简称《决议》）1981邓小平对《决议》的起草提出三条指导原则： 第一，确立毛泽东同志的历史地位，坚持和发展毛泽东思想，这是最核心的一条 第二，对建国30年来历史上的大事，要进行实事求是的分析，包括一些负责同志的功过是非，要作出公正的评价； 第三，这个总结宜粗不宜细，总结过去是为了引导大家团结一致向前看。 《关于建国以来党的若干历史问题的决议》 (1)标志着党在指导思想上的拨乱反正胜利完成 我们党在改革开放和社会主义现代化建设新时期实现的最根本的拨乱反正：以经济建设为中心 (2)回顾了新中国成立以前党的历史，总结了新中国成立以后社会主义革命和建设的历史经验。 (3)彻底否定“文化大革命”，对新中国成立以来的重大历史事件和重要历史人物作出了基本结论。 (4)科学地评价了毛泽东和毛泽东思想的历史地位。 对毛泽东思想的科学体系和活的灵魂作了概括，强调毛泽东思想是我们党的宝贵的精神财富，它将长期指导我们的行动。 (5)对党的十一届三中全会以来逐步确立的适合中国情况的建设社会主义现代化强国的道路，从十个方面作了概括，实质上初步提出了在中国建设什么样的社会主义和怎样建设社会主义的问题。 (6)该决议解决了两个相互联系的重大历史课题即 ①科学评价毛泽东的历史地位和毛泽东思想的科学体系； ②根据新的实际和发展要求实行改革开放、确立中国社会主义现代化建设正确道路。 (7)指出社会主义改造基本完成以后，我国所要解决的主要矛盾，是人民日益增长的物质文化需要同落后的社会生产之间的矛盾 十二大 1982 第一次提出了“建设有中国特色的社会主义”命题标志着邓小平理论主题的形成，标志着中特理论主题的形成从此，“中国特色社会主义”成为我们党的全部理论和实践创新的主题这一重大命题的提出具有里程碑意义，是中国共产党人对科学社会主义发展的开创性贡献 十二届三中 1984 指出我国社会主义经济是在公有制基础上的有计划的商品经济 有计划 一二三 十三大 1987 社会主义初级阶段的基本路线 第一次对中特理论进行系统的概括 标志着邓小平理论轮廓的形成，中特理论轮廓的形成 基本路线中 回答了社会主义的根本任务问题的是：“以经济建设为中心” 回答了社会主义的发展动力和外部条件问题：“坚持改革开放” 实现奋斗目标的领导力量和依靠力量：“领导和团结各族人民” 十四大 1992 明确以建立社会主义市场经济体制为我国经济体制改革的目标 南方谈话和十四大标志着 改革开放和现代化建设事业进入从计划经济体制向社会主义市场经济体制转变的新阶段，由此打开了中国经济、政治、文化发展崭新局面 十五大 1997 邓小平理论确立为党的指导思想 首次明确提出了社会主义初级阶段的基本纲领 十六大 2002 三个代表 小康奋斗目标 二三四五六 中路经（过只）刚小乔 十七大 2007 科学发展观 提出了“中国特色社会主义理论体系”的科学概念标志着中国特色社会主义理论和实践的进一步成熟 17-18还需进一步成熟 十八三中 2013 实现了改革由局部探索、破冰突围到系统集成、全面深化的转变，开创了我国改革开放新局面 二十三中 2024 进一步全面深化改革的重点是深化经济体制改革"
  },
  {
    "id": "p-095",
    "num": 95,
    "code": "095",
    "major": "other",
    "topic": "其他",
    "topicId": "other-all",
    "title": "高质量发展",
    "titleTokens": [
      {
        "type": "text",
        "text": "高质量发展",
        "color": "#000000",
        "bold": true
      },
      {
        "type": "icon",
        "src": "./politics-assets/sym-580103ed865750.png",
        "alt": "🚁"
      },
      {
        "type": "icon",
        "src": "./politics-assets/sym-c9c077b92ba3f4.png",
        "alt": "🏀"
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "科比公主",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "爱打",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农药 ",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "是",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "歌姬 ",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "没有",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "福目",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "推动高质量发展的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "必",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "由之路—加快实现高水平",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "科",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "技自立自强",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "推动高质量发展的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "主",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "线—深化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "供",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "给侧改革",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "推动高质量发展的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "必然",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "要",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "求—推进",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "农",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "业现代化",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "推动高质量发展的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "战略",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "点—加快构建新发展",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "格",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "局",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "推动高质量发展的",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "最终",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "目",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的—人民幸",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "福",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "安康",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "高质量现任",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "高质量",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "发展",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "是全面建设社会主义",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "现",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "代化国家的首要",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "任",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "务",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "科比公主爱打农药 是歌姬 没有福目 + 高质量现任",
    "mnemonicBreakdown": [
      {
        "cue": "科比",
        "target": "加快实现高水平科技自立自强 — 必由之路"
      },
      {
        "cue": "公主（供主）",
        "target": "深化供给侧改革 — 主线"
      },
      {
        "cue": "农药（农要）",
        "target": "推进农业现代化 — 必然要求"
      },
      {
        "cue": "歌姬（格基）",
        "target": "加快构建新发展格局 — 战略基点"
      },
      {
        "cue": "福目",
        "target": "人民幸福安康 — 最终目的"
      },
      {
        "cue": "高质量现任",
        "target": "高质量发展 = 全面建设社会主义现代化国家的首要任务"
      }
    ],
    "searchText": "095 其他 高质量发展 科比公主爱打农药 是歌姬 没有福目 推动高质量发展的必由之路—加快实现高水平科技自立自强推动高质量发展的主线—深化供给侧改革推动高质量发展的必然要求—推进农业现代化推动高质量发展的战略基点—加快构建新发展格局推动高质量发展的最终目的—人民幸福安康 高质量现任 高质量发展 是全面建设社会主义现代化国家的首要任务"
  },
  {
    "id": "p-096",
    "num": 96,
    "code": "096",
    "major": "other",
    "topic": "其他",
    "topicId": "other-all",
    "title": "新发展格局",
    "titleTokens": [
      {
        "type": "text",
        "text": "新发展格局",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "店内神仙本子多 房间灌肠留成绩",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "icon",
            "src": "./politics-assets/sym-1a21a78ee99527.png",
            "alt": "🔞"
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "构建新发展格局",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "基本立足",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "点",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—满足国",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "内",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "需求",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "战略基",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "点",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—扩大",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "内",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "需",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "主",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "线",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "深",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "化供给侧结构性改革",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "最",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "本",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "质特征—实现高水平",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "自",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "立自强",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "战略",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "方",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "向—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "坚",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "持供给侧结构性改革",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "关",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "键—经济循环",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "畅",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "通无阻",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "战略支",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "撑",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "—科",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "技",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "自立自强",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "我们要构建的新发展格局：",
            "color": "#275BD1",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "以国内大循环为主体、",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "国内国际双循环相互促进",
            "color": "#555555",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "店内神仙本子多 房间灌肠留成绩",
    "mnemonicBreakdown": [
      {
        "cue": "店内（点内）",
        "target": "基本立足点—满足国内需求 · 战略基点—扩大内需"
      },
      {
        "cue": "神仙（深线）",
        "target": "主线 — 深化供给侧结构性改革"
      },
      {
        "cue": "本子（本自）",
        "target": "最本质特征 — 实现高水平自立自强"
      },
      {
        "cue": "房间（方坚）",
        "target": "战略方向 — 坚持供给侧结构性改革"
      },
      {
        "cue": "灌肠（关畅）",
        "target": "关键 — 经济循环畅通无阻"
      },
      {
        "cue": "成绩（撑技）",
        "target": "战略支撑 — 科技自立自强"
      }
    ],
    "searchText": "096 其他 新发展格局 店内神仙本子多 房间灌肠留成绩 构建新发展格局 基本立足点—满足国内需求 战略基点—扩大内需 主线—深化供给侧结构性改革 最本质特征—实现高水平自立自强 战略方向—坚持供给侧结构性改革 关键—经济循环畅通无阻 战略支撑—科技自立自强 我们要构建的新发展格局： 以国内大循环为主体、 国内国际双循环相互促进"
  },
  {
    "id": "p-097",
    "num": 97,
    "code": "097",
    "major": "other",
    "topic": "其他",
    "topicId": "other-all",
    "title": "全面依法治国",
    "titleTokens": [
      {
        "type": "text",
        "text": "全面依法治国",
        "color": "#000000",
        "bold": true
      },
      {
        "type": "icon",
        "src": "./politics-assets/sym-246dc3424bc355.png",
        "alt": "🦋"
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "李倩只管四种手机",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "科学",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "前",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "提",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "严格",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "执",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "键",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "司",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法保障—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "点",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "全民",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "守",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "基",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "础",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "李倩只管四种手机",
    "mnemonicBreakdown": [
      {
        "cue": "李倩（立前）",
        "target": "科学立法 — 前提"
      },
      {
        "cue": "只管（执关）",
        "target": "严格执法 — 关键"
      },
      {
        "cue": "四种（司重）",
        "target": "司法保障 — 重点"
      },
      {
        "cue": "手机（守基）",
        "target": "全民守法 — 基础"
      }
    ],
    "searchText": "097 其他 全面依法治国 李倩只管四种手机 科学立法—前提 严格执法—关键 司法保障—重点 全民守法—基础"
  },
  {
    "id": "p-098",
    "num": 98,
    "code": "098",
    "major": "other",
    "topic": "其他",
    "topicId": "other-all",
    "title": "建设中特法治体系",
    "titleTokens": [
      {
        "type": "text",
        "text": "建设中特法治体系",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "高中前辈",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "用",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "医保",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "买了",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "药膳",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "和",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "煎包",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "高",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "效的法治实施体系—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "重",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "点",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "完",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "备",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的法律规范体系—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "前",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "提",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "有力的法治",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "保",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "障体系—重要",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "依",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "托",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "完",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "善",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的党内法规体系—本质",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "要",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "求",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "严密的法治",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "监",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "督体系—重要",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "保",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "障",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "高中前辈用医保买了药膳和煎包",
    "mnemonicBreakdown": [
      {
        "cue": "高中（高重）",
        "target": "高效的法治实施体系 — 重点"
      },
      {
        "cue": "前辈（前备）",
        "target": "完备的法律规范体系 — 前提"
      },
      {
        "cue": "医保（依托·保障）",
        "target": "有力的法治保障体系 — 重要依托"
      },
      {
        "cue": "药膳（要善）",
        "target": "完善的党内法规体系 — 本质要求"
      },
      {
        "cue": "煎包（监保）",
        "target": "严密的法治监督体系 — 重要保障"
      }
    ],
    "searchText": "098 其他 建设中特法治体系 高中前辈用医保买了药膳和煎包 高效的法治实施体系—重点 完备的法律规范体系—前提 有力的法治保障体系—重要依托 完善的党内法规体系—本质要求 严密的法治监督体系—重要保障"
  },
  {
    "id": "p-099",
    "num": 99,
    "code": "099",
    "major": "other",
    "topic": "其他",
    "topicId": "other-all",
    "title": "权利保障",
    "titleTokens": [
      {
        "type": "text",
        "text": "权利保障",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "县里行司 前要管后",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "宪",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法保障—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "前",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "提和基础",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "立",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法保障—重",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "要",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "条件",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "行",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "政保护—",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "关",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "键环节",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "司",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "法保障—最",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "后",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "防线",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "县里行司 前要管后",
    "mnemonicBreakdown": [
      {
        "cue": "县→前",
        "target": "宪法保障 — 前提和基础"
      },
      {
        "cue": "里→要",
        "target": "立法保障 — 重要条件"
      },
      {
        "cue": "行→管（关）",
        "target": "行政保护 — 关键环节"
      },
      {
        "cue": "司→后",
        "target": "司法保障 — 最后防线"
      }
    ],
    "searchText": "099 其他 权利保障 县里行司 前要管后 宪法保障—前提和基础 立法保障—重要条件 行政保护—关键环节 司法保障—最后防线"
  },
  {
    "id": "p-100",
    "num": 100,
    "code": "100",
    "major": "other",
    "topic": "其他",
    "topicId": "other-all",
    "title": "法律至上",
    "titleTokens": [
      {
        "type": "text",
        "text": "法律至上",
        "color": "#000000",
        "bold": true
      }
    ],
    "lines": [
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-45e4a54aeb9cb7.png",
            "alt": "✅"
          },
          {
            "type": "text",
            "text": "事事为",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": true
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "法律至上 具体表现为法律的：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "普遍",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "适",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "用性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "优先",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "适",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "用性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不可",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "违",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "反性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "icon",
            "src": "./politics-assets/sym-92c2ddf0e2683d.png",
            "alt": "⚠️"
          },
          {
            "type": "text",
            "text": "辨析：",
            "color": "#8000FF",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "普遍",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "适用性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "关键词：所有人、所有机构、所有组织、都必须遵守",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "优先",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "适用性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "多种规范矛盾 ",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "优先考虑法律规范",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "的适用",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不可违反",
            "color": "#FF0000",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "性",
            "color": "#2000FF",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "：",
            "color": "#AAAAAA",
            "bold": false,
            "highlight": false
          }
        ],
        "isMnemonic": false
      },
      {
        "tokens": [
          {
            "type": "text",
            "text": "不论权力大小、职位高低，",
            "color": "#D16056",
            "bold": false,
            "highlight": true
          },
          {
            "type": "text",
            "text": "只要有违法行为，就要受",
            "color": "#5D5D5D",
            "bold": false,
            "highlight": false
          },
          {
            "type": "text",
            "text": "法律制裁",
            "color": "#FF6000",
            "bold": false,
            "highlight": true
          }
        ],
        "isMnemonic": false
      }
    ],
    "mnemonicCue": "事事为",
    "mnemonicBreakdown": [
      {
        "cue": "事1（适）",
        "target": "普遍适用性"
      },
      {
        "cue": "事2（适）",
        "target": "优先适用性"
      },
      {
        "cue": "为（违）",
        "target": "不可违反性"
      }
    ],
    "searchText": "100 其他 法律至上 事事为 法律至上 具体表现为法律的： 普遍适用性 优先适用性 不可违反性 辨析： 普遍适用性： 关键词：所有人、所有机构、所有组织、都必须遵守优先适用性： 多种规范矛盾 优先考虑法律规范的适用 不可违反性： 不论权力大小、职位高低，只要有违法行为，就要受法律制裁"
  }
];

export const POLITICS_CARD_MAP: Record<string, PoliticsCard> = Object.fromEntries(
  POLITICS_CARDS.map((c) => [c.id, c])
);

export const POLITICS_CARD_IDS: string[] = POLITICS_CARDS.map((c) => c.id);
