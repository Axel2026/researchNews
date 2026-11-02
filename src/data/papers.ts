import papersData from './prace-badawcze.json';

export type Paper = {
  id: string;
  slug: string;
  authors: string[];
  field: string;
  title: string;
  realTitle: string;
  shortPopularization: string;
  mediumPopularization: string;
  fullPopularization: string;
};

export const papers: Paper[] = papersData;

export function getPaperBySlug(slug: string): Paper | undefined {
  return papers.find((paper) => paper.slug === slug);
}

export function getPaperSlugs(): string[] {
  return papers.map((paper) => paper.slug);
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function getPaperParagraphs(
  paper: Paper,
  field: 'mediumPopularization' | 'fullPopularization',
): string[] {
  return splitParagraphs(paper[field]);
}
