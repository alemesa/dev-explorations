import { createFileRoute } from '@tanstack/react-router';

import { PageMarqueeMotion } from '@/components/PageMarqueeMotion';

export const Route = createFileRoute('/marquee-motion')({
  component: PageMarqueeMotion,
});
