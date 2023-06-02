import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useQuery, useQueryClient } from 'react-query'
import { axiosInstance } from '@libs/axios'
import { IRecipe } from '@interfaces/IRecipe'
import './RecipeDetail.scss'
import { Image } from '@components/image/Image'

export const RecipeDetail = () => {
  const [recipeId, setRecipeId] = useState('')
  const params = useParams()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (params) {
      const { recipeNo } = params
      if (recipeNo) {
        setRecipeId(recipeNo)
        queryClient.prefetchQuery(['recipeDetail', recipeId], getRecipe)
      }
    }
  }, [recipeId, queryClient])

  const getRecipe = async () => {
    try {
      const { data } = await axiosInstance.get(`/recipes/detail/${recipeId}`)
      return data
    } catch (e) {
      console.log(e)
    }
  }

  const { data, isLoading, isError, isIdle } = useQuery<IRecipe.RecipeDetail>(
    ['recipeDetail', recipeId],
    getRecipe,
    {
      staleTime: 2000,
      keepPreviousData: true,
    }
  )

  if (isLoading || isIdle) return <div>Loading....</div>
  if (isError) return <div>ERROR</div>

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
                  <p>{data.name}</p>
                  <div className="pt-16 pb-16 tags--wrapper">
                    {data.detailedIngredient &&
                      data.detailedIngredient.map((tag, index) => {
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
                  {data.allIngredient &&
                    data.allIngredient[0].ingredients.map(
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
                  {data.allIngredient &&
                    data.allIngredient[1].ingredients.map(
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
            {data.user && (
              <section>
                <div className="flex">
                  <picture>
                    <Image
                      src={
                        data.user.img ||
                        'https://4u-recipe.s3.ap-northeast-2.amazonaws.com/profile/profile.svg'
                      }
                      alt="테스트 이미지"
                    />
                  </picture>
                  <div className="flex-column justify-content-around pl-10">
                    <p>{data.user.name}</p>
                    <p>{data.user.introduce}</p>
                  </div>
                </div>
              </section>
            )}
          </section>
          <section className="recipe-detail--bottom mt-30">
            <p>레시피</p>

            <hr />

            {data.steps &&
              data.steps.map((step) => {
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
