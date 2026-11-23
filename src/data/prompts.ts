import type { TemplateId } from './types';

export interface ExamPrompt {
  id: string;
  templateId: TemplateId;
  title: string;
  directions: string;
  suggestedKeywords: string[];
  confusable?: boolean;
  confusableNote?: string;
}

/**
 * 21 道原创模拟题（7 类 × 3 题），其中 6 道故意设计为易混淆题。
 */
export const EXAM_PROMPTS: ExamPrompt[] = [
  /* ===== 建议信 (suggest) ===== */
  {
    id: 'suggest-1',
    templateId: 'suggest',
    title: '给图书馆提改进建议',
    directions:
      'Directions: Suppose you are a student at a university. Write a letter to the university library director to make some suggestions on improving the reading room environment and extending opening hours. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['improving the reading room environment', 'library services'],
  },
  {
    id: 'suggest-2',
    templateId: 'suggest',
    title: '给学弟学妹推荐英语学习方法',
    directions:
      'Directions: Your junior schoolmate Zhang Wei asked you how to prepare for the College English Test. Write a letter to recommend effective study methods and daily learning habits to him. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['effective English study methods', 'exam preparation'],
    confusable: true,
    confusableNote: '题干出现 recommend，但对象是「做法/方法（study methods）」，属于建议信而非介绍类。',
  },
  {
    id: 'suggest-3',
    templateId: 'suggest',
    title: '就校园环保提出建议',
    directions:
      'Directions: Write a letter to the campus committee to offer advice on promoting waste sorting and reducing single-use plastics among students. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['promoting waste sorting', 'campus environmental protection'],
  },

  /* ===== 邀请信 (invite) ===== */
  {
    id: 'invite-1',
    templateId: 'invite',
    title: '邀请外教担任演讲比赛评委',
    directions:
      'Directions: Write a letter to Professor Smith, a foreign teacher at your university, to invite him to serve as a judge for the upcoming Campus English Speech Contest. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['the Campus English Speech Contest', 'the speech contest'],
  },
  {
    id: 'invite-2',
    templateId: 'invite',
    title: '邀请留学生参加中秋文化晚会',
    directions:
      'Directions: Your club is going to host a Mid-Autumn Cultural Evening next week. Write a letter to your international friend Jack to inform him of the event details and invite him to join the celebration. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['the Mid-Autumn Cultural Evening', 'this cultural celebration'],
    confusable: true,
    confusableNote: '题干虽含 inform，但是写给个人（Jack）且核心动作是 invite，属于邀请信而非通知。',
  },
  {
    id: 'invite-3',
    templateId: 'invite',
    title: '邀请校友回校做职业规划讲座',
    directions:
      'Directions: Write a letter on behalf of the Career Association to invite an alumnus, Mr. Wang, to give a lecture on career planning for graduating seniors. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['a lecture on career planning', 'this career seminar'],
  },

  /* ===== 通知 (notice) ===== */
  {
    id: 'notice-1',
    templateId: 'notice',
    title: '招募国际会议志愿者通知',
    directions:
      'Directions: The Students\' Union is recruiting volunteers for an upcoming International AI Symposium. Write a notice to announce the schedule, main duties, and requirements for applicants. You should write about 100 words on the ANSWER SHEET. Do not sign your own name. Use "The Students\' Union" instead.',
    suggestedKeywords: ['volunteer recruitment for the International AI Symposium', 'this volunteer program'],
  },
  {
    id: 'notice-2',
    templateId: 'notice',
    title: '面向全校宣布校园读书节安排',
    directions:
      'Directions: Write a notice to inform all students of the upcoming Campus Reading Festival, including its time, main activities, and registration rules. You should write about 100 words on the ANSWER SHEET. Do not sign your own name. Use "The Students\' Union" instead.',
    suggestedKeywords: ['the Campus Reading Festival', 'the reading festival'],
    confusable: true,
    confusableNote: '对象是全体学生（inform all students）且要求写 notice，属于通知而非私人邀请信。',
  },
  {
    id: 'notice-3',
    templateId: 'notice',
    title: '校园摄影大赛征稿通知',
    directions:
      'Directions: The Photography Club plans to hold an annual Campus Photography Contest. Write a notice to inform students of the submission period, competition themes, and participation guidelines. You should write about 100 words on the ANSWER SHEET. Do not sign your own name. Use "The Students\' Union" instead.',
    suggestedKeywords: ['the Campus Photography Contest', 'this competition'],
  },

  /* ===== 道歉信 (apology) ===== */
  {
    id: 'apology-1',
    templateId: 'apology',
    title: '因故缺席朋友聚会道歉',
    directions:
      'Directions: Suppose you promised to attend your friend Lucy\'s graduation dinner, but you cannot make it due to an unexpected family emergency. Write a letter to apologize for your absence and propose a way to make up for it. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['missing your graduation dinner', 'our appointment'],
  },
  {
    id: 'apology-2',
    templateId: 'apology',
    title: '通知导师需延期提交论文并致歉',
    directions:
      'Directions: You failed to finish your term paper before the deadline. Write a letter to Professor Brown to inform him of the delay, explain the reasons, and express your sincere apology. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['the late submission of my term paper', 'the paper deadline'],
    confusable: true,
    confusableNote: '题干含 inform，但对象是导师个人且核心诉求是 express your sincere apology，属于道歉信。',
  },
  {
    id: 'apology-3',
    templateId: 'apology',
    title: '弄坏借来的书籍道歉',
    directions:
      'Directions: You accidentally damaged a reference book borrowed from your classmate David. Write a letter to say sorry, explain what happened, and offer a solution. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['damaging your reference book', 'the borrowed book'],
  },

  /* ===== 感谢信 (thanks) ===== */
  {
    id: 'thanks-1',
    templateId: 'thanks',
    title: '感谢教授撰写推荐信',
    directions:
      'Directions: Professor Green kindly wrote a recommendation letter for your graduate school application. Write a letter to express your sincere gratitude for his support and encouragement. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['writing a recommendation letter for me', 'your generous support'],
  },
  {
    id: 'thanks-2',
    templateId: 'thanks',
    title: '感谢学姐辅导竞赛获奖',
    directions:
      'Directions: With the dedicated guidance of your senior schoolmate Lin, you won a prize in a national design contest. Write a letter to thank her for her selfless help during your preparation. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['your selfless guidance in the design contest', 'my contest preparation'],
    confusable: true,
    confusableNote: '题干提到 won a prize，但写信目的是 thank her for her selfless help，属于感谢信而非祝贺信。',
  },
  {
    id: 'thanks-3',
    templateId: 'thanks',
    title: '感谢寄宿家庭的热情款待',
    directions:
      'Directions: You just returned from a short exchange program abroad. Write a letter to your host family, Mr. and Mrs. Taylor, to express your appreciation for their warm hospitality during your stay. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['your warm hospitality during my stay', 'my exchange visit'],
  },

  /* ===== 介绍类 (intro) ===== */
  {
    id: 'intro-1',
    templateId: 'intro',
    title: '向外国友人推荐一本中国历史书',
    directions:
      'Directions: Your foreign friend Emily wants to learn more about Chinese history. Write a letter to recommend a classic history book to her and describe its main features. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['a classic Chinese history book', 'this book'],
    confusable: true,
    confusableNote: '题干出现 recommend，但对象是具体事物（a classic history book），属于介绍类而非建议信。',
  },
  {
    id: 'intro-2',
    templateId: 'intro',
    title: '介绍家乡一座历史名胜',
    directions:
      'Directions: An international student plans to visit your hometown during the holiday. Write a letter to introduce a famous historical site in your city and explain why it is worth visiting. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['a famous historical site in my hometown', 'this landmark'],
  },
  {
    id: 'intro-3',
    templateId: 'intro',
    title: '介绍中国传统节日端午节',
    directions:
      'Directions: Write a letter to your pen pal Tom to introduce the Dragon Boat Festival, covering its origin, traditional customs, and cultural significance. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['the Dragon Boat Festival', 'this traditional festival'],
  },

  /* ===== 祝贺信 (congrats) ===== */
  {
    id: 'congrats-1',
    templateId: 'congrats',
    title: '祝贺好友考上理想研究生院校',
    directions:
      'Directions: Your close friend Chen has just been admitted to his dream graduate school. Write a letter to congratulate him on this achievement and wish him a bright future. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['your admission to graduate school', 'this academic achievement'],
  },
  {
    id: 'congrats-2',
    templateId: 'congrats',
    title: '祝贺同学获得全国辩论赛冠军',
    directions:
      'Directions: Your classmate Sarah won first place in the National English Debate Competition. Write a letter to extend your warmest congratulations on her remarkable success. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['winning first place in the debate competition', 'your remarkable performance'],
  },
  {
    id: 'congrats-3',
    templateId: 'congrats',
    title: '祝贺学长发表重要学术论文',
    directions:
      'Directions: Your senior fellow student Liu recently published a paper in a top international journal. Write a letter to congratulate him on his research breakthrough. You should write about 100 words on the ANSWER SHEET. Do not use your own name. Use "Li Ming" instead.',
    suggestedKeywords: ['publishing your paper in a top journal', 'your research breakthrough'],
  },
];
