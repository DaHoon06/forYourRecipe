import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { ComponentProps, ReactElement } from 'react'

const cx = classNames.bind(styles)
type ButtonType = 'button' | 'submit' | 'reset'

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
  type?: ButtonType
}

export const Button = (props: ButtonProps): ReactElement => {
  const { variant, className, type = 'button', icon, children, ...rest } = props
  return (
    <button className={cx(styles[variant], className)} {...rest} type={type}>
      {icon}
      {children}
    </button>
  )
}
