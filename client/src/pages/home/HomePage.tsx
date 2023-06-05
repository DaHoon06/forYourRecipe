import { RecipeLists } from '@components/recipes/RecipeLists'
import { Typography } from '@components/common/typography/Typography'
import styles from './Home.module.scss'
import { Tile } from '@components/ui/tile/Tile'
import { ReactElement, useState } from 'react'
import { useRandomRecipe } from '@libs/react-query/hooks/recipe/useRecipe'
import { IRecipe } from '@interfaces/IRecipe'

export const HomePage = (): ReactElement => {
  const [page, setPage] = useState(1)
  const items = useRandomRecipe(page)

  return (
    <main>
      <Tile items={items as IRecipe.Card[]} />
      <section className={styles.main_banner}>
        <Typography
          className={styles.label}
          variant={'h3'}
          weight={'bold'}
          color={'black'}
        >
          RECIPE LIST
        </Typography>
      </section>
      <RecipeLists />
    </main>
  )
}
