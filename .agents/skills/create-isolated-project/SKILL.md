---
name: create-isolated-project
description: Create a new, isolated UI exploration in this Vite and TanStack Router project. Use when a user asks to create a new project, demo, experiment, or page by name (for example, "create fancy-accordion"). It adds a file-based route and a centered five-file page component without changing existing explorations.
---

# Create Isolated Project

Create a named exploration through the repository generator. Treat an exploration as one route plus one self-contained `Page*` component folder.

## Workflow

1. Identify the workspace root by locating `package.json` with a `create:project` script and `src/routes`.
2. Normalize the requested name to lowercase kebab case. Ask for a new name if normalization would be ambiguous.
3. Check that neither `src/routes/<name>.tsx` nor `src/components/Page<PascalName>/` exists. Never overwrite an existing exploration.
4. Run `pnpm create:project <name>` from the workspace root.
5. Run `pnpm build`, then `pnpm lint` and `pnpm format:check`.

The generator creates exactly these files:

```
src/routes/<name>.tsx
src/components/Page<PascalName>/
  index.ts
  Page<PascalName>.controller.tsx
  Page<PascalName>.view.tsx
  Page<PascalName>.module.scss
  Page<PascalName>.stories.tsx
```

The page is centered by default. Keep its markup and styles inside that folder; do not add project-specific behavior to `Layout`, the router, or another exploration.

## Constraints

- Use the generated TanStack file route; do not hand-edit `src/routeTree.gen.ts`.
- Keep the View presentational. Put data, state, router integrations, and external services in its Controller.
- Add the exploration to the home list only when the user asks for it.
- If this is not a compatible Vite/TanStack Router repository, stop and explain that the generator targets this project architecture.
