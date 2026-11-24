/**
 * 文本规范化：统一中英文标点、引号、撇号、空白与大小写比较。
 */

export function unifyPunctuation(input: string): string {
  return input
    .replace(/[\u2018\u2019\uFF07]/g, "'")
    .replace(/[\u201C\u201D\uFF02]/g, '"')
    .replace(/，/g, ',')
    .replace(/。/g, '.')
    .replace(/；/g, ';')
    .replace(/：/g, ':')
    .replace(/！/g, '!')
    .replace(/？/g, '?')
    .replace(/【/g, '[')
    .replace(/】/g, ']')
    .replace(/（/g, '(')
    .replace(/）/g, ')')
    .replace(/\u00A0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export interface TargetPart {
  kind: 'word' | 'slot';
  raw: string;
  normalized: string; // lowercase word without punctuation, or slot id
  slotId?: string;
  defaultValue?: string;
  trailingPunct?: string;
}

export function parseTargetSentence(en: string): TargetPart[] {
  const unified = unifyPunctuation(en);
  const parts: TargetPart[] = [];
  // Match {{VAR}} or {{VAR|multi word default}} plus optional trailing punctuation, or regular whitespace-separated tokens
  const regex = /(\{\{[^}]+\}\}[.,;:!?]*|[^\s]+)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(unified)) !== null) {
    const token = match[0];
    const slotMatch = token.match(/^\{\{(\w+)(?:\|([^}]+))?\}\}([.,;:!?]*)$/);
    if (slotMatch) {
      parts.push({
        kind: 'slot',
        raw: slotMatch[2]
          ? `{{${slotMatch[1]}|${slotMatch[2]}}}`
          : `{{${slotMatch[1]}}}`,
        normalized: slotMatch[1],
        slotId: slotMatch[1],
        defaultValue: slotMatch[2] || undefined,
        trailingPunct: slotMatch[3] || undefined,
      });
    } else {
      const punctMatch = token.match(/^([A-Za-z0-9'-]+)([.,;:!?]*)$/);
      if (punctMatch) {
        parts.push({
          kind: 'word',
          raw: punctMatch[1],
          normalized: punctMatch[1].toLowerCase(),
          trailingPunct: punctMatch[2] || undefined,
        });
      } else {
        const cleaned = token.replace(/[.,;:!?]/g, '');
        if (cleaned) {
          parts.push({
            kind: 'word',
            raw: cleaned,
            normalized: cleaned.toLowerCase(),
          });
        }
      }
    }
  }
  return parts;
}

export interface UserWordToken {
  raw: string;
  normalized: string;
  isPlaceholder: boolean;
  trailingPunct?: string;
}

export function tokenizeUserInput(input: string): UserWordToken[] {
  const unified = unifyPunctuation(input);
  if (!unified) return [];

  // Keep bracket placeholders like [X], [能力], [] as single tokens
  const regex = /(\[[^\]]*\][.,;:!?]*|[^\s]+)/g;
  const tokens: UserWordToken[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(unified)) !== null) {
    const token = match[0];
    const bracketMatch = token.match(/^(\[[^\]]*\])([.,;:!?]*)$/);
    if (bracketMatch) {
      tokens.push({
        raw: bracketMatch[1],
        normalized: bracketMatch[1].toLowerCase(),
        isPlaceholder: true,
        trailingPunct: bracketMatch[2] || undefined,
      });
      continue;
    }

    const punctMatch = token.match(/^([^.,;:!?]+)([.,;:!?]*)$/);
    if (punctMatch) {
      tokens.push({
        raw: punctMatch[1],
        normalized: punctMatch[1].toLowerCase(),
        isPlaceholder: false,
        trailingPunct: punctMatch[2] || undefined,
      });
    }
  }
  return tokens;
}

export function hasTrailingPeriod(input: string): boolean {
  const unified = unifyPunctuation(input);
  return /[.!?]$/.test(unified);
}

export function countCommas(input: string): number {
  const unified = unifyPunctuation(input);
  return (unified.match(/,/g) || []).length;
}
