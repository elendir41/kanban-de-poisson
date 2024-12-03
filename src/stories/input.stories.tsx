import type { Meta, StoryObj } from '@storybook/react';
import { Input, InputProps } from '../components/ui/input';

const meta = {
  title: 'Components/ui/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'Enter text...',
  },
};

export const Disabled: Story = {
  args: {
    type: 'text',
    placeholder: 'Disabled input...',
    disabled: true,
  },
};