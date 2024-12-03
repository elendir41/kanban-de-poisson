import type { Meta, StoryObj } from '@storybook/react';
import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '../components/ui/alert-dialog';

const meta = {
  title: 'Components/ui/AlertDialog',
  component: AlertDialog,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button>Open Dialog</button>
      </AlertDialogTrigger>
      <AlertDialogPortal>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Title</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            This is a description of the alert dialog.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogPortal>
    </AlertDialog>
  ),
};