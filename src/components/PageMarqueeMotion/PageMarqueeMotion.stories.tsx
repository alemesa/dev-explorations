import type { Meta, StoryObj } from '@storybook/react-vite';

import { View } from './PageMarqueeMotion.view';

const meta = {
  title: 'pages/PageMarqueeMotion',
  component: View,
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    marquees: [
      {
        title: 'Toronto',
        items: ['CN Tower', 'Ontario', 'Canada', 'Blue Jays'],
        imageAlt: 'Toronto skyline',
        imageSrc: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80',
      },
    ],
  },
};
