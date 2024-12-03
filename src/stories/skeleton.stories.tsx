import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/ui/skeleton';

const meta = {
  title: 'Components/ui/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: 'h-4 w-32',
  },
};

export const Big: Story = {
  args: {
    className: 'h-8 w-64',
  },
};