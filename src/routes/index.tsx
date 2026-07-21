import { createFileRoute } from '@tanstack/react-router';

import { PageHome } from '@/components/PageHome';

export const Route = createFileRoute('/')({
  component: PageHome,
});
