import styles from './Button.module.scss'
import classNames from 'classnames/bind'
import { ComponentProps, ReactElement } from 'react'
import { ButtonType, ButtonVariant } from '@type/buttonTypes'

const cx = classNames.bind(styles)

interface ButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant
  icon?: JSX.Element
  type?: ButtonType
}

export const Button = (props: ButtonProps): ReactElement => {
  const {
    variant = 'default',
    className,
    type = 'button',
    icon,
    children,
    ...rest
  } = props
  return (
    <button className={cx(styles[variant], className)} {...rest} type={type}>
      {icon}
      {children}
    </button>
  )
}
