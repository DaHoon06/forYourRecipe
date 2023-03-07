import Header from "@/components/layout/HeaderComponent.vue";

export default {
  title: "components/layout/Header",
  component: Header,
};

export const HeaderBlock = () => ({
  components: { Header },
  template: "<Header />",
});

HeaderBlock.storyName = "Header";
