import { within, userEvent } from "@storybook/testing-library";
import MyPage from "./Page.vue";

export default {
  title: "Example/views/Page",
  component: MyPage,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = () => ({
  components: { MyPage },
  template: "<my-page />",
});

export const LoggedOut = Template.bind({});

export const LoggedIn = Template.bind({});
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const loginButton = await canvas.getByRole("button", { name: /Log in/i });
  await userEvent.click(loginButton);
};
