# Badania

Aplikacja webowa z newsami opisującymi badania naukowe. Każdy news dotyczy jednej pracy badawczej.

## Zakres obecnego etapu

Etap 1 obejmuje konfigurację projektu (Next.js, TypeScript, pnpm, ESLint, Prettier) oraz puste strony do sprawdzenia routingu. Dane, model newsa i lista opracowań pojawią się później.

## Wymagania

- Node.js 26.13.0
- pnpm 12.16.1 (z pola `packageManager` w `package.json`)

## Instalacja i uruchomienie

```bash
pnpm install
pnpm dev
```

Lokalny adres aplikacji: [http://localhost:3000](http://localhost:3000)

Design system i komponenty: [http://localhost:6006](http://localhost:6006) (`pnpm storybook`)

## Polecenia

| Polecenie           | Opis                                         |
| ------------------- | -------------------------------------------- |
| `pnpm dev`          | Serwer deweloperski Next.js z Turbopackiem   |
| `pnpm build`        | Produkcyjny build                            |
| `pnpm start`        | Uruchomienie zbudowanej aplikacji            |
| `pnpm lint`         | ESLint (zero ostrzeżeń)                      |
| `pnpm typecheck`    | Sprawdzenie TypeScript bez emitowania plików |
| `pnpm format`       | Formatowanie Prettierem                      |
| `pnpm format:check` | Kontrola formatowania                        |
| `pnpm storybook`    | Storybook z design systemem (port 6006)      |
| `pnpm build-storybook` | Statyczny build Storybooka                |

## Routing

- `/` — strona główna (w przyszłości lista newsów)
- `/news/[slug]` — strona pojedynczego opracowania (na razie placeholder dla dowolnego sluga)
