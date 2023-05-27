import styles from './Input.module.scss'
import { ChangeEvent, ComponentProps, useState } from 'react'
import { Typography } from '@components/typography/Typography'
import classNames from 'classnames'

type InputValue = string | number | ReadonlyArray<string>
type InputChangeEvent = ChangeEvent<HTMLInputElement>

interface InputProps extends ComponentProps<'input'> {
  variant?: ''
  label?: ''
  value?: InputValue
  onChange?: (event: InputChangeEvent) => void
}

export const Input = (props: InputProps) => {
  const {
    variant = 'default',
    label,
    placeholder,
    disabled,
    className,
    value,
    onChange,
    id,
    type = 'text',
    ...rest
  } = props

  const [inputValue, setInputValue] = useState<InputValue>(value || '')
  const onChangeHandler = (event: InputChangeEvent) => {
    const { value } = event.target
    setInputValue(value)
    onChange && onChange(event)
  }

  return (
    <label htmlFor={id}>
      <input
        type={type}
        id={id}
        disabled={disabled}
        className={classNames(styles[variant])}
        value={inputValue}
        onChange={onChangeHandler}
        placeholder={placeholder}
        {...rest}
      />
      {label && <Typography>{label}</Typography>}
    </label>
  )
}
