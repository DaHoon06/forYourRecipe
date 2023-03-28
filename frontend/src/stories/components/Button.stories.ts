import Button from "@/components/common/custom/CustomButton.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "components/Button",
  component: Button,
};

interface Prop {
  variant: string;
  label: string;
  type: string;
}

const Template: Story<Prop> = (args: Prop) => ({
  components: { Button },
  setup() {
    return { ...args };
  },
  template: '<Button :variant="variant" :label="label" :type="type" />',
});

export const Black = Template.bind({});
Black.args = { variant: "black", label: "button", type: "button" };
export const Gray = Template.bind({});
Gray.args = { variant: "gray", label: "button", type: "button" };

export const BlackSquare = Template.bind({});
BlackSquare.args = { variant: "black-square", label: "button", type: "button" };
export const GraySquare = Template.bind({});
GraySquare.args = { variant: "gray-square", label: "button", type: "button" };

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  variant: "primary-outline",
  label: "button",
  type: "button",
};
export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  variant: "secondary-outline",
  label: "button",
  type: "button",
};

export const IconButton = Template.bind({});
IconButton.args = { variant: "icon-button ", label: "icon", type: "button" };
