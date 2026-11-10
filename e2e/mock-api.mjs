import { createServer } from 'node:http';

const port = 4100;

const article = {
  id: '1',
  slug: 'frog-peptides',
  title: 'A rare skin compound helps peptides last longer',
  field: 'Biochemistry',
  fieldSlug: 'biochemistry',
  shortPopularization:
    'Short peptides from a mountain frog fight bacteria. An unusual amino acid makes them harder to break down.',
  imageUrl: '/images/news-placeholder.svg',
  publishedAt: '2026-03-12T08:00:00.000Z',
  paperPublishedAt: '2026-03-12T00:00:00.000Z',
  featured: true,
  recentViews: 0,
  authors: ['Ada Lovelace'],
  commentCount: 0,
};

const detail = {
  ...article,
  realTitle: 'Peptides from Bombina variegata skin',
  mediumPopularization: 'Researchers isolated short peptides from frog skin.',
  fullPopularization:
    'The team compared peptide variants in laboratory enzyme assays.',
  doi: '10.1234/example.peptides',
  year: 2026,
  journal: 'Nature',
  sourceUrl: 'https://doi.org/10.1234/example.peptides',
  downloadUrl: null,
  needsPopularization: false,
  popularizationModel: null,
  communityPopularization: null,
};

function send(response, status, body) {
  const payload = body == null ? '' : JSON.stringify(body);
  response.writeHead(status, {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'authorization,content-type',
    'content-type': 'application/json',
  });
  response.end(payload);
}

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', 'http://127.0.0.1');

  if (request.method === 'OPTIONS') {
    send(response, 204);
    return;
  }

  if (url.pathname === '/health') {
    send(response, 200, { ok: true });
    return;
  }

  if (url.pathname === '/categories') {
    send(response, 200, [{ slug: 'biochemistry', field: 'Biochemistry' }]);
    return;
  }

  const category = url.pathname.match(/^\/categories\/([^/]+)$/);
  if (category && request.method === 'GET') {
    const slug = decodeURIComponent(category[1]);
    if (slug !== 'biochemistry') {
      send(response, 404);
      return;
    }

    send(response, 200, {
      slug: 'biochemistry',
      field: 'Biochemistry',
      articles: [article],
      page: Number(url.searchParams.get('page') ?? '1'),
      pageSize: 12,
      total: 1,
    });
    return;
  }

  if (url.pathname === '/sources') {
    send(response, 200, [
      {
        id: 'core',
        name: 'CORE API',
        url: 'https://core.ac.uk/',
        summary: 'An open repository of research papers.',
      },
    ]);
    return;
  }

  if (url.pathname === '/articles') {
    if (url.searchParams.has('page') || url.searchParams.has('sort')) {
      const query = (url.searchParams.get('q') ?? '').trim().toLowerCase();
      const matches =
        query.length === 0 ||
        article.title.toLowerCase().includes(query) ||
        article.shortPopularization.toLowerCase().includes(query);
      const articles = matches ? [article] : [];

      send(response, 200, {
        articles,
        page: 1,
        pageSize: 12,
        total: articles.length,
      });
      return;
    }

    send(response, 200, [article]);
    return;
  }

  const comments = url.pathname.match(/^\/articles\/([^/]+)\/comments$/);
  if (comments && request.method === 'GET') {
    send(response, 200, { comments: [], truncated: false });
    return;
  }

  const view = url.pathname.match(/^\/articles\/([^/]+)\/view$/);
  if (view && request.method === 'POST') {
    send(response, 204);
    return;
  }

  const one = url.pathname.match(/^\/articles\/([^/]+)$/);
  if (one && request.method === 'GET') {
    const slug = decodeURIComponent(one[1]);
    if (slug === article.slug) {
      send(response, 200, detail);
      return;
    }

    send(response, 404);
    return;
  }

  send(response, 404);
});

server.listen(port, '127.0.0.1');
