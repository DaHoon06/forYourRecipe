import RecipeUi from "@/components/ui/RecipeUi.vue";

export default {
  title: 'components/ui/RecipeForm',
  component: RecipeUi
}

export const RecipeForm = () => ({
  components: {RecipeUi},
  template: '<recipe-ui>내용</recipe-ui>'
})
RecipeForm.storyName = 'RecipeForm'
