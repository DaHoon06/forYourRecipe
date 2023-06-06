import { ReactElement, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import './RecipeDetail.scss'
import { Image } from '@components/common/image/Image'
import { useOneRecipe } from '@libs/react-query/hooks/recipes/useRecipe'
import { Typography } from '@components/common/typography/Typography'

export const RecipeDetail = (): ReactElement => {
  const [recipeId, setRecipeId] = useState('')
  const params = useParams()
  const recipe = useOneRecipe(recipeId)

  useEffect(() => {
    if (params) {
      const { recipeNo } = params
      if (recipeNo) setRecipeId(recipeNo)
    }
  }, [recipeId, params])

  return (
    <div className={'recipe'}>
      <div className={'recipe-detail--container'}>
        <section className="recipe-form--label">
          <div className="flex pb-16" />
        </section>
        <section className="recipe-detail--top">
          <picture className="recipe-detail__img--wrapper mb-16">
            <Image src={recipe.profileImage} alt={recipe.name} />
          </picture>
          <Typography color={'black'} variant={'body1'}>
            {recipe.desc}
          </Typography>
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
              {recipe.allIngredient &&
                recipe.allIngredient.map((value, index) => {
                  return (
                    <div key={value.category + index}>
                      {value.ingredients.map((recipe, index) => {
                        return (
                          <span key={recipe.unit + index}>{recipe.name}</span>
                        )
                      })}
                    </div>
                  )
                })}
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
            recipe.steps.map((step, index) => {
              return (
                <div key={step.step + index}>
                  <div className={'pb-10 recipe-step'}>
                    <span>{step.step}</span>
                  </div>
                  <div className={'recipe-detail--desc'}>
                    <span>{step.desc}</span>
                  </div>
                </div>
              )
            })}
        </section>
      </div>

      <section className="recipe-detail__button--wrapper">목록</section>
    </div>
  )
}
