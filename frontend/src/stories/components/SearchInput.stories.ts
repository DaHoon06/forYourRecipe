import SearchInput from "@/components/common/SearchInput.vue";

export default {
  title: "components/SearchInput",
  component: SearchInput,
};

export const Search = () => ({
  components: { SearchInput },
  template: "<search-input />",
});
Search.storyName = "SearchInput";
