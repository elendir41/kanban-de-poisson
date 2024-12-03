import type { Meta, StoryObj } from "@storybook/react";
import ColumnContainer from "../components/ui/column-container";

const meta = {
  title: "Components/ui/ColumnContainer",
  component: ColumnContainer,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ColumnContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Column Title",
    columnId: "1",
    onDelete: () => {},
    children: (
      <>
        <div className="p-2 bg-gray-200 rounded">Item 1</div>
        <div className="p-2 bg-gray-200 rounded">Item 2</div>
        <div className="p-2 bg-gray-200 rounded">Item 3</div>
      </>
    ),
  },
};

export const ManyElements: Story = {
  args: {
    title: "Column Title",
    columnId: "1",
    onDelete: () => {},
    children: (
      <>
        <div className="p-2 bg-gray-200 rounded">Item 1</div>
        <div className="p-2 bg-gray-200 rounded">Item 2</div>
        <div className="p-2 bg-gray-200 rounded">Item 3</div>
        <div className="p-2 bg-gray-200 rounded">Item 4</div>
        <div className="p-2 bg-gray-200 rounded">Item 5</div>
        <div className="p-2 bg-gray-200 rounded">Item 6</div>
        <div className="p-2 bg-gray-200 rounded">Item 7</div>
        <div className="p-2 bg-gray-200 rounded">Item 8</div>
        <div className="p-2 bg-gray-200 rounded">Item 9</div>
        <div className="p-2 bg-gray-200 rounded">Item 10</div>
        <div className="p-2 bg-gray-200 rounded">Item 11</div>
        <div className="p-2 bg-gray-200 rounded">Item 12</div>
      </>
    ),
  },
};

export const LongTitle: Story = {
  args: {
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse",
    columnId: "1",
    onDelete: () => {},
    children: (
      <>
        <div className="p-2 bg-gray-200 rounded">Item 1</div>
        <div className="p-2 bg-gray-200 rounded">Item 2</div>
        <div className="p-2 bg-gray-200 rounded">Item 3</div>
      </>
    ),
  },
};

export const LongContent: Story = {
  args: {
    title: "Title",
    columnId: "1",
    onDelete: () => {},
    children: (
      <>
        <div className="p-2 bg-gray-200 rounded">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse
        </div>
        <div className="p-2 bg-gray-200 rounded">Item 2</div>
        <div className="p-2 bg-gray-200 rounded">Item 3</div>
      </>
    ),
  },
};
