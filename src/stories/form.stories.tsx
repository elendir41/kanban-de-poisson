import type { Meta, StoryObj } from "@storybook/react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "../components/ui/form";
import { useForm } from "react-hook-form";

const Component = () => {
  const methods = useForm();
  return (
    <Form {...methods}>
      <FormField
        name="example"
        render={() => (
          <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl />
            <FormDescription>Description</FormDescription>
            <FormMessage>Error message</FormMessage>
          </FormItem>
        )}
      />
    </Form>
  );
};

const meta = {
  title: "Components/ui/Form",
  component: Component,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Component>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  }
};
