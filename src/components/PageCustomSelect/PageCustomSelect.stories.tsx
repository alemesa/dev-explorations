import type { Meta, StoryObj } from '@storybook/react-vite';

import type { SelectOption } from './PageCustomSelect.controller';

import { View } from './PageCustomSelect.view';

const meta = {
  title: 'pages/PageCustomSelect',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

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
];

export const Default: Story = {
  args: {
    options,
  },
};
