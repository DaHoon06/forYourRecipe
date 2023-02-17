import Header from "@/components/layout/Header.vue";

export default  {
  title: 'components/layout/Header',
  component: Header
}

export const HeaderBlock = () => ({
  components: {Header},
  template: '<Header />'
})

HeaderBlock.storyName = 'Header';
