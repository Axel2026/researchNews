import { execSync } from 'node:child_process';

const CHUNK = 30;

function quote(file) {
  return `"${file}"`;
}

function run(command, files) {
  for (let index = 0; index < files.length; index += CHUNK) {
    const group = files
      .slice(index, index + CHUNK)
      .map(quote)
      .join(' ');
    execSync(`${command} ${group}`, { stdio: 'inherit' });
  }

  return [];
}

const config = {
  '*.{js,jsx,ts,tsx,mjs,cjs,json,md,css,yml,yaml}': (files) =>
    run('pnpm exec prettier --check --ignore-unknown', files),
  '*.{js,jsx,ts,tsx,mjs,cjs}': (files) =>
    run('pnpm exec eslint --max-warnings=0', files),
  '*.css': (files) => run('pnpm exec stylelint', files),
};

export default config;
