import type { Meta, StoryObj } from '@storybook/react-vite';

import { View } from './PageHome.view';

const meta = {
  title: 'pages/PageHome',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    explorations: [
      {
        title: 'Marquee Motion',
        href: '/marquee-motion',
      },
    ],
  },
};
