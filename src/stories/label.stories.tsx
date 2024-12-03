import type { Meta, StoryObj } from '@storybook/react';
import { Label } from '@/components/ui/label';

const meta = {
  title: 'Components/ui/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};