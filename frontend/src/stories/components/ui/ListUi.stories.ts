import ListsUi from "@/components/ui/ListsUi.vue";
import { Recipe } from "@/interfaces/recipe";
import { Story } from "@storybook/vue3";

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
  template: '<lists-ui :listItem="listItem" />',
});
export const List = Template.bind({});

List.args = {
  listItem: {
    _id: "1",
    name: "title",
    detailedIngredient: [{ _id: "", name: "무", img: "" }],
    profileImage:
      "https://4u-recipe.s3.ap-northeast-2.amazonaws.com/foods/default.jpg",
    createdAt: new Date(),
    updatedAt: new Date(),
    modified: false,
    user: "writer",
    steps: [{ _id: "", step: 1, desc: "description" }],
    desc: "description",
    likes: [],
  },
};
