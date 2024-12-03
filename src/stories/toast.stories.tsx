import type { Meta, StoryObj } from '@storybook/react';
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose, ToastAction } from '../components/ui/toast';

const meta = {
  title: 'Components/ui/Toast',
  component: Toast,
  decorators: [
    (Story) => (
      <ToastProvider>
        <ToastViewport />
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <ToastTitle>Default Toast</ToastTitle>
        <ToastDescription>This is a default toast message.</ToastDescription>
        <ToastClose />
      </>
    ),
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: (
      <>
        <ToastTitle>Destructive Toast</ToastTitle>
        <ToastDescription>This is a destructive toast message.</ToastDescription>
        <ToastClose />
      </>
    ),
  },
};

export const WithAction: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <ToastTitle>Toast with Action</ToastTitle>
        <ToastDescription>This toast has an action button.</ToastDescription>
        <ToastAction altText='close'>Close</ToastAction>
        <ToastClose />
      </>
    ),
  },
};