import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './RecipeDetail.scss'
import { Image } from '@components/common/image/Image'
import { queryClient } from '@libs/react-query/queryClient'
import { useOneRecipe } from '@libs/react-query/hooks/recipe/useRecipe'
import { getOneRecipe } from '@libs/react-query/api/recipe'

export const RecipeDetail = (): ReactElement => {
  const [recipeId, setRecipeId] = useState('')
  const params = useParams()
  const recipe = useOneRecipe(recipeId)

  useEffect(() => {
    if (params) {
      const { recipeNo } = params
      if (recipeNo) {
        setRecipeId(recipeNo)
        queryClient.prefetchQuery(['recipeDetail', recipeId], () =>
          getOneRecipe(recipeId)
        )
      }
    }
  }, [recipeId, queryClient])

  return (
    <main>
      <article className={'recipe'}>
        <div className={'recipe-detail--container'}>
          <section className="recipe-form--label">
            <div className="flex pb-16" />
          </section>
          <section className="recipe-detail--top">
            <picture className="recipe-detail__img--wrapper mb-16">
              이미지
            </picture>
            디스크립션
            <div className="recipe-detail-info--container">
              <section className="recipe-detail--title">
                <div>
                  <p>{recipe.name}</p>
                  <div className="pt-16 pb-16 tags--wrapper">
                    {recipe.detailedIngredient &&
                      recipe.detailedIngredient.map((tag, index) => {
                        return (
                          <span className="tags mr-6" key={index}>
                            {tag.name}
                          </span>
                        )
                      })}
                  </div>
                </div>
              </section>

              <section className={'ingredients-container'}>
                <div className="mb-10">
                  주재료
                  <hr />
                  {recipe.allIngredient &&
                    recipe.allIngredient[0].ingredients.map(
                      (ingredient, index) => {
                        return (
                          <div
                            className={'flex justify-between pb-10'}
                            key={`ingredients-${index}`}
                          >
                            <p>{ingredient.name}</p>
                            <p>{ingredient.unit}</p>
                          </div>
                        )
                      }
                    )}
                  양념
                  <hr />
                  {recipe.allIngredient &&
                    recipe.allIngredient[1].ingredients.map(
                      (condiment, index) => {
                        return (
                          <div
                            className={'flex justify-between pb-10'}
                            key={`condiments-${index}`}
                          >
                            <p>{condiment.name}</p>
                            <p>{condiment.unit}</p>
                          </div>
                        )
                      }
                    )}
                </div>
              </section>
            </div>
            <hr />
            {recipe.user && (
              <section>
                <div className="flex">
                  <picture>
                    <Image
                      src={
                        recipe.user.img ||
                        'https://4u-recipe.s3.ap-northeast-2.amazonaws.com/profile/profile.svg'
                      }
                      alt="테스트 이미지"
                    />
                  </picture>
                  <div className="flex-column justify-content-around pl-10">
                    <p>{recipe.user.name}</p>
                    <p>{recipe.user.introduce}</p>
                  </div>
                </div>
              </section>
            )}
          </section>
          <section className="recipe-detail--bottom mt-30">
            <p>레시피</p>

            <hr />

            {recipe.steps &&
              recipe.steps.map((step) => {
                return (
                  <>
                    <section className={'pb-10 recipe-step'} key={step._id}>
                      <span>{step.step}</span>
                    </section>
                    <section className={'recipe-detail--desc'} key={step._id}>
                      <span>{step.desc}</span>
                    </section>
                  </>
                )
              })}
          </section>
        </div>

        <section className="recipe-detail__button--wrapper">목록</section>
      </article>
    </main>
  )
}
