import type { Meta, StoryObj } from '@storybook/react';
import { Toaster } from '../components/ui/toaster';
import { ToastProvider } from '../components/ui/toast';

const meta = {
  title: 'Components/ui/Toaster',
  component: Toaster,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toaster>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <Toaster />,
};