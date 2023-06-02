import { RecipeLists } from '@components/recipes/RecipeLists'
import { Typography } from '@components/common/typography/Typography'
import styles from './Home.module.scss'
import { Tile } from '@components/ui/tile/Tile'

export const HomePage = () => {
  return (
    <main>
      <Tile />
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
