import styles from './Tags.module.scss'
import { Typography } from '@components/common/typography/Typography'
import { ReactElement } from 'react'

interface TagsProp {
  tags: string
}

export const Tags = (props: TagsProp): ReactElement => {
  const { tags } = props
  return (
    <Typography
      variant={'caption'}
      className={styles.tag}
      as={'span'}
      color={'black'}
    >
      # {tags}
    </Typography>
  )
}
