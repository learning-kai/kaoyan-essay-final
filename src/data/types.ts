export type POS = 'noun' | 'verb' | 'doing' | 'clause';
export type Deck = 'small' | 'big';

export interface Slot {
  id: string;
  label: string;
  pos: POS;
  filler: string;
  fillerZh: string;
  hint?: string;
}

export type SentenceLayer = 'L1' | 'L2' | 'L3';
export type SentenceRole =
  | 'emotion'
  | 'purpose'
  | 'lead'
  | 'body'
  | 'closing'
  | 'signoff'
  | 'heading';

export interface Sentence {
  id: string;
  deck?: Deck;
  layer: SentenceLayer;
  role: SentenceRole;
  en: string;
  zh: string;
  cue: string;
  resultWord?: string;
  slots: string[];
  storyNodeIndex?: number;
}

export type TemplateId =
  | 'suggest'
  | 'invite'
  | 'notice'
  | 'apology'
  | 'thanks'
  | 'intro'
  | 'congrats'
  | 'recommend'
  | 'complaint'
  | 'inquiry'
  | 'apply'
  | 'condolence';

export interface Template {
  id: TemplateId;
  name: string;
  priority: number;
  isOptional?: boolean;
  emotionType: 'good' | 'regret' | 'notice';
  purposePhrase: string;
  purposeCueZh: string;
  slotTips: [string, string, string];
  storyLine: string[];
  storyLineDetail: string;
  keywords: string[];
  sentenceIds: string[];
  warnings: string[];
  cueChain: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  layer: SentenceLayer;
  templateId?: TemplateId;
  optional?: boolean;
  sentenceIds: string[];
}
