import type { Meta, StoryObj } from '@storybook/react-vite';

import { View } from './Nav.view';

const meta = {
  title: 'components/Nav',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
