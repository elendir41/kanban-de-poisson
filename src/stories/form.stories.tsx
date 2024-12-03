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

// const Template: Story = (args) => {
//   const methods = useForm();
//   return (
//     <Form {...args} {...methods}>
//       <FormItem>
//         <FormLabel>Label</FormLabel>
//         <FormControl as="input" name="example" />
//         <FormDescription>Description</FormDescription>
//         <FormMessage>Error message</FormMessage>
//       </FormItem>
//     </Form>
//   );
// };

// export const Default: Story = Template.bind({});
// Default.args = {
//   children: (
//     <FormField name="example">
//       <FormItem>
//         <FormLabel>Label</FormLabel>
//         <FormControl as="input" />
//         <FormDescription>Description</FormDescription>
//         <FormMessage>Error message</FormMessage>
//       </FormItem>
//     </FormField>
//   ),
// };

export const Default: Story = {
  args: {
  }
};
