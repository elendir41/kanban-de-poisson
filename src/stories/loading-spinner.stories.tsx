import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../components/ui/loading-spinner';

const meta = {
  title: 'Components/ui/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
};