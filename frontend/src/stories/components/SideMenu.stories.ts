import SideMenu from "@/components/common/SideMenu.vue";
import {Story} from "@storybook/vue3";

export default {
  title: 'components/SideMenu',
  component: SideMenu
}

interface Prop {
  isOpen: boolean
}

const Template: Story<Prop> = (args: Prop) => ({
  components: {SideMenu},
  setup() {
    return {...args}
  },
  template: '<side-menu :isOpen="isOpen" />'
})

export const SideBar = Template.bind({})
SideBar.args = {isOpen: true}
SideBar.storyName = 'SideMenu'
