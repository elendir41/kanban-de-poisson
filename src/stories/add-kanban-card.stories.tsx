import type { Meta, StoryObj } from '@storybook/react';
import AddKanbanCard from '../components/ui/add-kanban-card';

const meta = {
  title: 'Components/ui/AddKanbanCard',
  component: AddKanbanCard,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddKanbanCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'New Task',
  },
};