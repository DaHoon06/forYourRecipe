import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { ComponentProps } from 'react'

const cx = classNames.bind(styles)

interface ButtonProps extends ComponentProps<'button'> {
  variant:
    | 'black'
    | 'white'
    | 'primary'
    | 'primary-outline'
    | 'gray'
    | 'gray-outline'
    | 'icon'
  icon?: JSX.Element
}

export const Button = (props: ButtonProps) => {
  const { variant, className, icon, children, ...rest } = props
  return (
    <button className={cx(styles[variant], className)} {...rest}>
      {icon}
      {children}
    </button>
  )
}
