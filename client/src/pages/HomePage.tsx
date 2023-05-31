import {RecipeLists} from '@components/recipes/RecipeLists'
import {Typography} from '@components/typography/Typography'

export const HomePage = () => {
  return (
    <main>
      <div className={'flex align-center justify-center'}>
        | <Typography weight={'bold'} color={'black'}>
        RECIPES
      </Typography> |
      </div>
      <RecipeLists/>
    </main>
  )
}
