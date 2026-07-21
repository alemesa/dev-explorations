import type { FC } from 'react';

import { memo } from 'react';

import { View } from './PageCustomSelect.view';

export type SelectOption = {
  description: string;
  icon: string;
  label: string;
  value: string;
};

export interface ControllerProps {
  className?: string;
}

const options: SelectOption[] = [
  {
    value: 'italy',
    label: 'Italy',
    description: 'Rome · Central European time',
    icon: '🇮🇹',
  },
  {
    value: 'japan',
    label: 'Japan',
    description: 'Tokyo · Japan Standard Time',
    icon: '🇯🇵',
  },
  {
    value: 'brazil',
    label: 'Brazil',
    description: 'São Paulo · Brasília time',
    icon: '🇧🇷',
  },
  {
    value: 'new-zealand',
    label: 'New Zealand',
    description: 'Auckland · New Zealand time',
    icon: '🇳🇿',
  },
];

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} options={options} />;
});

Controller.displayName = 'PageCustomSelect_Controller';
