import type { Meta, StoryObj } from '@storybook/react-vite';

import { View } from './Layout.view';

const meta = {
  title: 'components/Layout',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <main>Exploration content</main>,
  },
};
