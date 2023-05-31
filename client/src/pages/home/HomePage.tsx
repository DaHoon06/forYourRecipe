import { RecipeLists } from '@components/recipes/RecipeLists'
import { Typography } from '@components/typography/Typography'
import styles from './Home.module.scss'

export const HomePage = () => {
  return (
    <main>
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
