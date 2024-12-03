import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from '../components/ui/separator';

const meta = {
  title: 'Components/ui/Separator',
  component: Separator,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
  },
};

export const CustomClassName: Story = {
  args: {
    orientation: 'horizontal',
    className: 'bg-red-500',
  },
};