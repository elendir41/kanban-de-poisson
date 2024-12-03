import type { Meta, StoryObj } from '@storybook/react';

import { Dialog } from '@/components/ui/dialog';

const meta = {
  title: 'Components/ui/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Dialog',
  },
};
