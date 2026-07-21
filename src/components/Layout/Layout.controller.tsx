import type { FC, ReactNode } from 'react';

import { memo } from 'react';

import { View } from './Layout.view';

export interface ControllerProps {
  children: ReactNode;
  className?: string;
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'Layout_Controller';
