import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const [projectName] = process.argv.slice(2);

if (!projectName || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(projectName)) {
  throw new Error('Provide one lowercase kebab-case project name, for example: pnpm create:project fancy-accordion');
}

const toPascalCase = (value) => value.replace(/(^|-)([a-z0-9])/g, (_, __, character) => character.toUpperCase());
const toTitleCase = (value) =>
  value
    .split('-')
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(' ');

const componentName = `Page${toPascalCase(projectName)}`;
const title = toTitleCase(projectName);
const rootDirectory = process.cwd();
const componentDirectory = path.join(rootDirectory, 'src', 'components', componentName);
const routePath = path.join(rootDirectory, 'src', 'routes', `${projectName}.tsx`);

const files = {
  [path.join(componentDirectory, 'index.ts')]:
    `export type { ControllerProps as ${componentName}Props } from './${componentName}.controller'

export { Controller as ${componentName} } from './${componentName}.controller'
`,
  [path.join(componentDirectory, `${componentName}.controller.tsx`)]: `import type { FC } from 'react'

import { memo } from 'react'

import { View } from './${componentName}.view'

export interface ControllerProps {
  className?: string
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />
})

Controller.displayName = '${componentName}_Controller'
`,
  [path.join(componentDirectory, `${componentName}.view.tsx`)]: `import type { FC } from 'react'
import type { ControllerProps } from './${componentName}.controller'

import classNames from 'classnames'

import { useRefs } from '@/hooks/use-refs'

import css from './${componentName}.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement
}

export const View: FC<ViewProps> = ({ className }) => {
  const createRef = useRefs<ViewRefs>()
  const rootRef = createRef('root')

  return (
    <main className={classNames('${componentName}', css.root, className)} ref={rootRef}>
      <section className={css.content}>
        <p>New exploration</p>
        <h1>${title}</h1>
      </section>
    </main>
  )
}

View.displayName = '${componentName}_View'
`,
  [path.join(componentDirectory, `${componentName}.module.scss`)]: `@import 'shared';

.root {
  display: grid;
  flex: 1;
  min-height: calc(100dvh - #{$navbar-height-mobile});
  padding: px(32) px(24);
  place-items: center;
}

.content {
  text-align: center;

  p {
    margin-bottom: px(12);
    color: rgba($black, 0.55);
    font-size: px(13);
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  h1 {
    font-size: clamp(px(44), 8vw, px(88));
    line-height: 0.95;
    letter-spacing: -0.07em;
  }
}
`,
  [path.join(componentDirectory, `${componentName}.stories.tsx`)]:
    `import type { Meta, StoryObj } from '@storybook/react-vite'

import { View } from './${componentName}.view'

const meta = {
  title: 'pages/${componentName}',
  component: View,
} satisfies Meta<typeof View>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
`,
  [routePath]: `import { createFileRoute } from '@tanstack/react-router'

import { ${componentName} } from '@/components/${componentName}'

export const Route = createFileRoute('/${projectName}')({
  component: ${componentName},
})
`,
};

const existingFile = Object.keys(files).find((file) => existsSync(file));

if (existingFile) {
  throw new Error(`Refusing to overwrite existing file: ${path.relative(rootDirectory, existingFile)}`);
}

mkdirSync(componentDirectory, { recursive: true });
mkdirSync(path.dirname(routePath), { recursive: true });

for (const [file, content] of Object.entries(files)) {
  writeFileSync(file, content);
}

console.log(`Created /${projectName} and ${componentName}.`);
