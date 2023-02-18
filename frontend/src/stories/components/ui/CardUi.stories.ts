import CardUi from "@/components/ui/CardUi.vue";

export default {
  title: 'components/ui/Card',
  component: CardUi
}

export const Card = () => ({
  components: {CardUi},
  template: '<card-ui>내용</card-ui>'
})

Card.storyName = 'Card';
