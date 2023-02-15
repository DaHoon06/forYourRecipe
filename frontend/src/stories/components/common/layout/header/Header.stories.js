import MyHeader from "./Header.vue";
// import Header from "../../../../components/common/Header.vue";

export default {
  title: "Example/components/common/layout/Header",
  component: MyHeader,
  parameters: {
    layout: "fullscreen",
  },
};

const Template = (args) => ({
  components: { MyHeader },
  setup() {
    return { ...args };
  },
  template: '<my-header :user="user" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {
    name: "Jane Doe",
  },
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: null,
};
