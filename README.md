# Dev Explorations

Small UI studies, built as a type-safe Vite application with TanStack Router.

## Commands

- `pnpm dev` — start the local app.
- `pnpm build` — produce a production build and type-check it.
- `pnpm lint` — run ESLint and Stylelint.
- `pnpm format:check` — verify Prettier formatting.
- `pnpm storybook` — inspect the presentational views in isolation.

## Architecture

Routes live in `src/routes` and map one-to-one to URLs. Every component in `src/components` has exactly five files:

1. `index.ts` public API
2. `Component.controller.tsx` state and integration boundary
3. `Component.view.tsx` pure presentational markup
4. `Component.module.scss` scoped styles
5. `Component.stories.tsx` isolated Storybook story

Create an isolated page with `pnpm create:project fancy-accordion`. It adds a `/fancy-accordion` TanStack route and a centered `PageFancyAccordion` component using the complete five-file structure.

## Deployment

Deploy directly to Vercel. The app has no required environment variables or deployment configuration.
