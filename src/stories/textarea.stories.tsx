import type { Meta, StoryObj } from '@storybook/react';

import { Textarea } from '../components/ui/textarea';

const meta = {
  title: 'Components/ui/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  }
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Task Description',
  },
};
