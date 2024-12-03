import type { Meta, StoryObj } from '@storybook/react';

import YesNoDialog from '../components/YesNoDialog';

const meta = {
  title: 'Components/ui/YesNoDialog',
  component: YesNoDialog,
  parameters: {
    layout: 'centered',
  }
} satisfies Meta<typeof YesNoDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onYes: () => console.log('Yes'),
    onNo: () => console.log('No'),
  },
};
