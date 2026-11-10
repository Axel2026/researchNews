import { expect, test } from '@playwright/test';

const articleTitle = 'A rare skin compound helps peptides last longer';

test('home shows the edition and opens an article', async ({ page }) => {
  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Research papers, plain language.' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: 'ResearchNews' })).toBeVisible();
  await page.getByRole('link', { name: articleTitle }).click();

  await expect(page).toHaveURL(/\/article\/frog-peptides$/);
  await expect(page.getByRole('heading', { name: articleTitle })).toBeVisible();
});

test('search page accepts a query', async ({ page }) => {
  await page.goto('/search');

  await expect(page.getByRole('heading', { name: 'Search' })).toBeVisible();
  await page.getByLabel('Search query').fill('peptides');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.getByRole('link', { name: articleTitle })).toBeVisible();
});

test('header opens a category and the sources list', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Fields' }).click();
  await page.getByRole('link', { name: 'Biochemistry' }).click();

  await expect(page).toHaveURL(/\/category\/biochemistry$/);
  await expect(
    page.getByRole('heading', { name: 'Biochemistry' }),
  ).toBeVisible();
  await expect(page.getByRole('link', { name: articleTitle })).toBeVisible();

  await page.getByRole('link', { name: 'Sources' }).click();

  await expect(page).toHaveURL(/\/sources$/);
  await expect(page.getByRole('heading', { name: 'Sources' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'CORE API' })).toBeVisible();
});

test('language switch keeps the home page in Polish', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Language' }).click();
  await page.getByRole('link', { name: /Polski/ }).click();

  await expect(page).toHaveURL(/\/pl$/);
  await expect(
    page.getByRole('heading', { name: 'Prace badawcze, po ludzku.' }),
  ).toBeVisible();
});

test('unknown address shows the missing page', async ({ page }) => {
  await page.goto('/missing-page');

  await expect(page.getByRole('heading', { name: '404' })).toBeVisible();
  await expect(page.getByText('This page does not exist.')).toBeVisible();
  await page.getByRole('link', { name: 'Back to the home page' }).click();

  await expect(page).toHaveURL(/\/$/);
  await expect(
    page.getByRole('heading', { name: 'Research papers, plain language.' }),
  ).toBeVisible();
});

test('search with no match shows an empty result', async ({ page }) => {
  await page.goto('/search');

  await page.getByLabel('Search query').fill('xylophone');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page).toHaveURL(/q=xylophone/);
  await expect(page.getByRole('status')).toHaveText(
    'No articles match that search.',
  );
});

test('article links to the paper and shows an empty discussion', async ({
  page,
}) => {
  await page.goto('/article/frog-peptides');

  await expect(page.getByRole('heading', { name: articleTitle })).toBeVisible();
  await expect(
    page.getByRole('link', { name: /View original paper/ }),
  ).toHaveAttribute('href', 'https://doi.org/10.1234/example.peptides');
  await expect(page.getByRole('status')).toHaveText('No comments yet.');
});

test('bookmarks without a session open the login page', async ({ page }) => {
  await page.goto('/bookmarks');

  await expect(page).toHaveURL(/\/login\?next=%2Fbookmarks/);
  await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
});

test('login form rejects an invalid email', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: 'Log in' })).toBeVisible();
  await page.getByLabel('Email').fill('not-an-email');
  await page.getByLabel('Password').fill('longenough');
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(
    page.getByRole('alert').filter({ hasText: 'Enter a valid email address.' }),
  ).toBeVisible();
});
