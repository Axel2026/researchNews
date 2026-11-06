<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Frontend conventions

Apply these when adding or editing frontend code. Do not refactor unrelated files only to match them.

Reply in English when working in this frontend. Code, identifiers, comments, commit messages, and Storybook copy are English.

## Components

- One component per file. Put it in `Component/Component.tsx` once it has siblings (styles, types, stories, utils, hooks). A component that is only that one module may stay a single file. Do not add `index.ts` barrels.
- When the same substantial piece of UI shows up in more than one component, extract it into its own component instead of copying the markup. A repeated block with its own structure, styles, or behavior belongs in one place. A one-line wrapper can stay duplicated.
- Reusable components under `atoms`, `molecules`, `organisms`, and `templates` get a colocated `*.stories.tsx`. Skip one-off page wrappers.
- Named exports. Destructure parameters: `({ a, b, c })`, including utils. Do not take `(props)` or a positional list `(a, b)`.
- No `React.FC`. Signature: `function Name({ a, b }: NameProps)`.
- Next.js special files (`page`, `layout`, `loading`, `error`, `route`, `middleware`) keep their required default export. Everything else is a named export.
- Import the module path (`@/components/atoms/Button/Button`). Do not add barrel `index.ts` files.
- No logic in JSX prop values. Compute it in a variable or helper first.
- `'use client'` only on the component that uses state, effects, or browser APIs.

```tsx
export function ConfirmModal({ open, title, onClose }: ConfirmModalProps) {
  const descriptionId = useDescriptionId({ title });
  return (
    <Modal
      open={open}
      title={title}
      describedBy={descriptionId}
      onClose={onClose}
    />
  );
}
```

## Types and helpers

- Prefer `type` over `interface`.
- Define types in a sibling `*.types.ts` or `*.types.tsx`.
- Move isolated helpers to `*.utils.ts` or `*.utils.tsx`. Keep `onChange`, `onSubmit`, and similar handlers in the component when they close over its state.
- Move a hook to a sibling `*.hooks.ts` when it is reused or longer than a few lines.

## Styles and copy

- Colocate styles in `*.module.css`. Use tokens from `design-system` (`var(--color-…)`, `var(--font-…)`).
- No `style={{ … }}` except a value that CSS cannot express and that is computed at runtime. Storybook may use `style={{ … }}` for canvas layout: `*.stories.tsx`, `*.stories.ts`, `.storybook/`, and `src/components/storybook`.
- User-facing strings go through next-intl (`useTranslations` / `getTranslations`) and `src/messages/*.json`. Add the key to every locale file.

## Rendering

Prefer static pages. Use ISR when the content should refresh without a rebuild. Use `force-dynamic` only when the page depends on the request (search, session).

- Home (`app/[locale]/page.tsx`), sources (`app/[locale]/sources/page.tsx`), and category pages (`app/[locale]/category/**`) stay ISR: `export const revalidate = ARTICLES_REVALIDATE_SECONDS` from `@/data/articles`.
