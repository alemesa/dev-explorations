import type { FC } from 'react';
import type { Exploration, ControllerProps } from './PageHome.controller';

import classNames from 'classnames';

import { useRefs } from '@/hooks/use-refs';

import css from './PageHome.module.scss';

export interface ViewProps extends ControllerProps {
  explorations: Exploration[];
}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ className, explorations }) => {
  const createRef = useRefs<ViewRefs>();
  const rootRef = createRef('root');

  return (
    <main className={classNames('PageHome', css.root, className)} ref={rootRef}>
      <section className={css.content}>
        <h1 className={css.title}>Dev Explorations</h1>
        <ul className={css.list}>
          {explorations.map(({ href, title }) => (
            <li key={href}>
              <a href={href}>{title}</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

View.displayName = 'PageHome_View';
