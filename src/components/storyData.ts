import type {
  ArticleCategory,
  ArticleDetail,
  ArticleListItem,
} from '@/data/articles.types';
import type { SourceListItem } from '@/data/sources.types';

const imageUrl = '/images/news-placeholder.svg';

export const sampleArticle: ArticleListItem = {
  id: '1',
  slug: 'frog-peptides',
  title: 'A rare skin compound helps peptides last longer',
  field: 'Biochemistry',
  fieldSlug: 'biochemistry',
  shortPopularization:
    'Short peptides from a mountain frog fight bacteria. An unusual amino acid makes them harder to break down.',
  imageUrl,
  publishedAt: '2026-03-12T08:00:00.000Z',
  paperPublishedAt: '2026-03-12T00:00:00.000Z',
  featured: true,
  recentViews: 0,
  authors: ['Ada Lovelace', 'Jane Doe'],
  commentCount: 4,
};

export const sampleArticleDetail: ArticleDetail = {
  ...sampleArticle,
  realTitle:
    'D-alloisoleucine-containing antimicrobial peptides from Bombina variegata skin',
  mediumPopularization:
    'Researchers isolated short peptides from the skin of a mountain frog and tested how they act against bacteria.\n\nSome of the peptides contain D-alloisoleucine, an unusual amino acid that made them more resistant to a peptide-degrading enzyme in the lab.',
  fullPopularization:
    'The team sequenced the peptides and compared variants with and without the unusual residue.\n\nThe D-alloisoleucine versions lasted longer in enzyme assays, which may help explain their activity on the skin.\n\nThe authors note that this is a laboratory study and does not by itself show a new drug.',
  doi: '10.1234/example.peptides',
  year: 2026,
  journal: 'Nature',
  sourceUrl: 'https://doi.org/10.1234/example.peptides',
  downloadUrl: 'https://example.com/paper.pdf',
  needsPopularization: false,
  popularizationModel: null,
  communityPopularization: null,
};

export const sampleArticles: ArticleListItem[] = [
  sampleArticle,
  {
    id: '2',
    slug: 'axolotl-viruses',
    title: 'Viruses on axolotl skin shift with the environment',
    field: 'Microbial ecology',
    fieldSlug: 'microbial-ecology',
    shortPopularization:
      'DNA from Ambystoma altamirani skin linked phage diversity to water conditions and the local bacteria.',
    imageUrl,
    publishedAt: '2026-03-11T08:00:00.000Z',
    paperPublishedAt: '2026-03-11T00:00:00.000Z',
    featured: false,
    recentViews: 0,
    authors: ['Grace Hopper'],
    commentCount: 0,
  },
  {
    id: '3',
    slug: 'cows-self-suckling',
    title: 'Why some cows suckle their own milk',
    field: 'Animal behaviour',
    fieldSlug: 'animal-behaviour',
    shortPopularization:
      'Self-suckling is tied to rearing, feed and housing, and can mean lost milk and udder health risks.',
    imageUrl,
    publishedAt: '2026-03-10T08:00:00.000Z',
    paperPublishedAt: '2026-03-10T00:00:00.000Z',
    featured: false,
    recentViews: 0,
    authors: ['Mary Anning', 'Charles Lyell'],
    commentCount: 2,
  },
  {
    id: '4',
    slug: 'delta-salinity',
    title: 'River discharge shapes salinity near megadeltas',
    field: 'Biochemistry',
    fieldSlug: 'biochemistry',
    shortPopularization:
      'Inland streamflow through large catchments helps set sea surface salinity close to the world’s megadeltas.',
    imageUrl,
    publishedAt: '2026-03-09T08:00:00.000Z',
    paperPublishedAt: '2026-03-09T00:00:00.000Z',
    featured: false,
    recentViews: 0,
    authors: ['Katherine Johnson'],
    commentCount: 1,
  },
  {
    id: '5',
    slug: 'campylobacter-pump',
    title: 'How a Campylobacter efflux pump became more potent',
    field: 'Microbial ecology',
    fieldSlug: 'microbial-ecology',
    shortPopularization:
      'Mutations in the RE-CmeABC pump help Campylobacter jejuni shrug off several classes of antibiotics.',
    imageUrl,
    publishedAt: '2026-03-08T08:00:00.000Z',
    paperPublishedAt: '2026-03-08T00:00:00.000Z',
    featured: false,
    recentViews: 0,
    authors: ['Rosalind Franklin', 'Maurice Wilkins'],
    commentCount: 11,
  },
  {
    id: '6',
    slug: 'barn-light',
    title: 'Barn lighting changes how calves rest',
    field: 'Animal behaviour',
    fieldSlug: 'animal-behaviour',
    shortPopularization:
      'A longer dusk period in the barn was linked to more lying time and fewer restless bouts overnight.',
    imageUrl,
    publishedAt: '2026-03-07T08:00:00.000Z',
    paperPublishedAt: '2026-03-07T00:00:00.000Z',
    featured: false,
    recentViews: 0,
    authors: ['Barbara McClintock'],
    commentCount: 0,
  },
];

export const sampleCategories: ArticleCategory[] = [
  { slug: 'biochemistry', field: 'Biochemistry' },
  { slug: 'microbial-ecology', field: 'Microbial ecology' },
  { slug: 'animal-behaviour', field: 'Animal behaviour' },
];

export const sampleSources: SourceListItem[] = [
  {
    id: 'core',
    name: 'CORE API',
    url: 'https://core.ac.uk/',
    summary:
      'An open repository of research papers. We fetch articles from journals such as Nature, Science, Cell, Lancet and PNAS.',
  },
];
