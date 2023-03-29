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

/**
 * @description: 버튼 모아보기
 * @constructor
 */
export const AllButton = () => ({
  components: { Button },
  template: `
    <div style="display: flex; margin-bottom: 16px">
    <Button variant="black" label="black" type="button"/> &nbsp;&nbsp;
    <Button variant="gray" label="gray" type="button"/> &nbsp;&nbsp;
    <Button variant="black-square" label="black-square" type="button"/> &nbsp;&nbsp;
    <Button variant="gray-square" label="gray-square" type="button"/> &nbsp;&nbsp;
    </div>

    <div style="display: flex; margin-bottom: 16px">
    <Button variant="black-rounded" label="black-rounded" type="button"/> &nbsp;&nbsp;
    <Button variant="gray-rounded" label="gray-rounded" type="button"/> &nbsp;&nbsp;
    <Button variant="icon-button" label="icon-button" type="button"/> &nbsp;&nbsp;
    </div>
  `,
});
AllButton.storyName = "All Custom Button";

/**
 * @description: variant 에 따른 버튼 형태
 * @param args
 * @constructor
 */
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
  variant: "black-rounded",
  label: "button",
  type: "button",
};
export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  variant: "gray-rounded",
  label: "button",
  type: "button",
};

export const IconButton = Template.bind({});
IconButton.args = { variant: "icon-button ", label: "icon", type: "button" };
