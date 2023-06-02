import styles from './Tags.module.scss'
import { Typography } from '@components/common/typography/Typography'

interface TagsProp {
  tags: string
}

export const Tags = (props: TagsProp) => {
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
