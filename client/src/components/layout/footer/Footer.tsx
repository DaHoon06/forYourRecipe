import styles from './Footer.module.scss'
import { ReactElement } from 'react'
import { Typography } from '@components/common/typography/Typography'

export const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <div>
        <Typography color={'black100'} variant={'caption'}>
          ⓒ 2023. DaHoon06. All rights reserved.
        </Typography>
      </div>
    </footer>
  )
}
