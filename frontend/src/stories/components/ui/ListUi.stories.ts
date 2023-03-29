import ListsUi from "@/components/ui/ListsUi.vue";
import { Recipe } from "@/interfaces/recipe";
import { Story } from "@storybook/vue3";
import { ListData } from "@/stories/constant/default-data";

export default {
  title: "components/ui/List",
  component: ListsUi,
};

interface Props {
  listItem: Recipe.Info;
}

const Template: Story<Props> = (args: Props) => ({
  components: { ListsUi },
  setup() {
    return { ...args };
  },
  template: '<lists-ui style="display: inline-block;" :listItem="listItem" />',
});
export const List = Template.bind({});

List.args = {
  listItem: ListData,
};

List.storyName = "List Layer";
