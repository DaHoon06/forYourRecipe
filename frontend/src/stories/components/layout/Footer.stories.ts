import Footer from "@/components/layout/Footer.vue";

export default {
  title: 'components/layout/Footer',
  component: Footer
}

export const FooterBlack = () => ({
  components: {Footer},
  template: '<Footer />'
})
FooterBlack.storyName = 'Footer';
