import type { FC } from 'react';

import { memo } from 'react';

import { View } from './PageMarqueeMotion.view';

export type Marquee = {
  imageAlt: string;
  imageSrc: string;
  items: string[];
  title: string;
};

export interface ControllerProps {
  className?: string;
}

const marquees: Marquee[] = [
  {
    title: 'Toronto',
    items: ['CN Tower', 'Ontario', 'Canada', 'Blue Jays'],
    imageAlt: 'Toronto skyline',
    imageSrc: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Palermo',
    items: ['Pizza', 'Sicily', 'Romans', 'Italy'],
    imageAlt: 'A Sicilian street',
    imageSrc: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Medellín',
    items: ['Bandeja Paisa', 'Envigado', 'Colombia', 'Antioquia'],
    imageAlt: 'Medellín cityscape',
    imageSrc: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Rio de Janeiro',
    items: ['Carnival', 'Concert', 'Beach', 'Ipanema'],
    imageAlt: 'Rio de Janeiro beach',
    imageSrc: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Paris',
    items: ['Eiffel Tower', 'Napoleon', 'France', 'Notre-Dame'],
    imageAlt: 'Eiffel Tower',
    imageSrc: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
  },
];

export const Controller: FC<ControllerProps> = memo((props) => {
  return <View {...props} marquees={marquees} />;
});

Controller.displayName = 'PageMarqueeMotion_Controller';
