import type { FC } from 'react';

import { memo } from 'react';

import { View } from './PageHome.view';

export type Exploration = {
  href: string;
  title: string;
};

export interface ControllerProps {
  className?: string;
}

const explorations: Exploration[] = [
  {
    title: 'Marquee Motion',
    href: '/marquee-motion',
  },
  {
    title: 'Custom Select',
    href: '/custom-select',
  },
];

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} explorations={explorations} />;
});

Controller.displayName = 'PageHome_Controller';
