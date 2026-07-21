import type { FC } from 'react';
import type { ControllerProps } from './Nav.controller';

import classNames from 'classnames';

import { useRefs } from '@/hooks/use-refs';

import css from './Nav.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLElement;
};

export const View: FC<ViewProps> = ({ className }) => {
  const createRef = useRefs<ViewRefs>();
  const rootRef = createRef('root');

  return (
    <nav aria-label="Main navigation" className={classNames('Nav', css.root, className)} ref={rootRef}>
      <a aria-label="Home" href="/">
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" />
        </svg>
      </a>
    </nav>
  );
};

View.displayName = 'Nav_View';
