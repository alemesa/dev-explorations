import { createFileRoute } from '@tanstack/react-router';

import { PageCustomSelect } from '@/components/PageCustomSelect';

export const Route = createFileRoute('/custom-select')({
  component: PageCustomSelect,
});
