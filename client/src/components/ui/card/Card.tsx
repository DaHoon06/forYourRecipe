import styles from './Card.module.scss'
import classNames from 'classnames'

export const Card = (props: any) => {
  const { children } = props
  return (
    <article className={classNames(styles.card)}>
      <div>{children}</div>
    </article>
  )
}
