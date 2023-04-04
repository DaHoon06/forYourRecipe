import TextLabel from "@/components/common/TextLabel.vue";
import { Story } from "@storybook/vue3";

export default {
  title: "components/TextLabel",
  component: TextLabel,
};

interface Prop {
  label: string;
}

const Template: Story<Prop> = (args: Prop) => ({
  components: { TextLabel },
  setup() {
    return { ...args };
  },
  template: '<text-label :label="label" />',
});
export const Label = Template.bind({});
Label.args = { label: "BOOKMARK RECIPES" };
