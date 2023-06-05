import {RecipeLists} from '@components/recipes/RecipeLists'
import {Tile} from '@components/ui/tile/Tile'
import {ReactElement, useState} from 'react'
import {useRandomRecipe} from '@libs/react-query/hooks/recipe/useRecipe'
import {IRecipe} from '@interfaces/IRecipe'
import {BannerLabel} from '@components/ui/banner-label/BannerLabel'
import {IngredientsBox} from "@components/ingredients/IngredientsBox";

export const HomePage = (): ReactElement => {
  const [page, setPage] = useState(1)
  const items = useRandomRecipe(page)

  return (
    <main>
      <BannerLabel title={'오늘의 추천 요리'} description={'맛있어용'}/>
      <Tile items={items as IRecipe.Card[]}/>

      <IngredientsBox/>

      <BannerLabel title={'RECIPE LISTS'}/>
      <RecipeLists/>
    </main>
  )
}
