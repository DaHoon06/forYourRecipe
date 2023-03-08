import Footer from "@/components/layout/FooterComponent.vue";

export default {
  title: "components/layout/Footer",
  component: Footer,
};

export const FooterBlack = () => ({
  components: { Footer },
  template: "<Footer />",
});
FooterBlack.storyName = "Footer";
