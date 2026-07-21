import type { FC } from 'react';

import { memo } from 'react';

import { View } from './Nav.view';

export interface ControllerProps {
  className?: string;
}

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} />;
});

Controller.displayName = 'Nav_Controller';
