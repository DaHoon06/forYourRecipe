import styles from './Input.module.scss'
import { ChangeEvent, ComponentProps, useState } from 'react'
import { Typography } from '@components/typography/Typography'

type InputValue = string | number | ReadonlyArray<string>
type InputChangeEvent = ChangeEvent<HTMLInputElement>

interface Input extends ComponentProps<'input'> {
  variant?: ''
  label?: ''
  value?: InputValue
  onChange?: (event: InputChangeEvent) => void
}

export const Input = (props: Input) => {
  const {
    variant = 'default',
    label,
    placeholder,
    disabled,
    className,
    value,
    onChange,
    ...rest
  } = props

  const [inputValue, setInputValue] = useState<InputValue>(value || '')
  const onChangeHandler = (event: InputChangeEvent) => {
    const { value } = event.target
    setInputValue(value)
    onChange && onChange(event)
  }

  return (
    <label>
      <input
        type={'text'}
        disabled={disabled}
        className={styles.input}
        value={inputValue}
        onChange={onChangeHandler}
        placeholder={placeholder}
        {...rest}
      />
      {label && <Typography>{label}</Typography>}
    </label>
  )
}
