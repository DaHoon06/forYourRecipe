import SpinnerComponent from "@/components/common/LoadingSpinner.vue";

export default {
  title: "components/Spinner",
  component: SpinnerComponent,
};

export const Spinner = () => ({
  components: { SpinnerComponent },
  template: "<spinner-component />",
});
Spinner.storyName = "Spinner";
