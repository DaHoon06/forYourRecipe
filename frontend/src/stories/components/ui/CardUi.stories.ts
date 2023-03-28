import CardUi from "@/components/ui/CardUi.vue";
import { Recipe } from "@/interfaces/recipe";
import { Story } from "@storybook/vue3";

export default {
  title: "components/ui/Card",
  component: CardUi,
};

interface Props {
  cardItem: Recipe.Info;
}

const Template: Story<Props> = (args: Props) => ({
  components: { CardUi },
  setup() {
    return { ...args };
  },
  template: '<card-ui :cardItem="cardItem" />',
});
export const Card = Template.bind({});

Card.args = {
  cardItem: {
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
// export const Card = (props: Recipe.Info) => ({
//   components: { CardUi },
//   template: '<card-ui :card-item="props" />',
// });

Card.storyName = "Card";
