import { Top } from '@components/layout/header/Header'
import { Navigation } from '@components/layout/header/Navigation'
import styles from '@components/layout/header/Header.module.scss'

export const Header = () => {
  return (
    <header className={styles.header}>
      <Top />
      <Navigation />
    </header>
  )
}
