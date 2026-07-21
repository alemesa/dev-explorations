import type { FC } from 'react';
import type { ControllerProps } from './Layout.controller';

import classNames from 'classnames';

import { useRefs } from '@/hooks/use-refs';

import { Nav } from '../Nav';
import css from './Layout.module.scss';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ViewProps extends ControllerProps {}

export type ViewRefs = {
  root: HTMLDivElement;
};

export const View: FC<ViewProps> = ({ children, className }) => {
  const createRef = useRefs<ViewRefs>();
  const rootRef = createRef('root');

  return (
    <div className={classNames('Layout', css.root, className)} ref={rootRef}>
      <Nav />
      {children}
    </div>
  );
};

View.displayName = 'Layout_View';
