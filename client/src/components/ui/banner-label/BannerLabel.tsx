import { ReactElement } from 'react'
import styles from './BannerLabel.module.scss'
import { Typography } from '@components/common/typography/Typography'

interface BannerLabelProps {
  title: string
  description?: string
}

export const BannerLabel = (props: BannerLabelProps): ReactElement => {
  const { title, description } = props

  return (
    <div className={styles.banner_label}>
      <Typography
        className={styles.banner_title}
        variant={'h1'}
        weight={'bold'}
        color={'black'}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          className={styles.label}
          variant={'caption'}
          weight={'bold'}
          color={'black'}
        >
          {description}
        </Typography>
      )}
    </div>
  )
}
