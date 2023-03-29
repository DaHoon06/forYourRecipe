import CardUi from "@/components/ui/CardUi.vue";
import { Recipe } from "@/interfaces/recipe";
import { Story } from "@storybook/vue3";
import { ListData } from "@/stories/constant/default-data";

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
  template: '<card-ui style="display: inline-block;" :cardItem="cardItem" />',
});
export const Card = Template.bind({});

Card.args = {
  cardItem: ListData,
};

Card.storyName = "Card Layer";
