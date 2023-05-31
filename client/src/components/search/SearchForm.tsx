import { Input } from '@components/input/Input'
import { useEffect, useState } from 'react'
import styles from './SearchForm.module.scss'
import classNames from 'classnames'
import { Button } from '@components/button/Button'
import { Typography } from '@components/typography/Typography'

interface Props {
  open: boolean
  closeSearchForm?: (payload: boolean) => void
}

export const SearchForm = (props: Props) => {
  const { open, closeSearchForm } = props
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    const html = document.querySelector('html')
    if (html) {
      open ? (html.style.overflow = 'hidden') : (html.style.overflow = '')
    }
  }, [open])

  const close = () => {
    if (closeSearchForm) {
      setKeyword('')
      closeSearchForm(false)
    }
  }

  return (
    <div
      className={classNames(
        styles.search__form,
        open ? styles.drop : styles.none
      )}
    >
      <form>
        <Input
          placeholder={'Search...'}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          id={'search-input'}
          variant={'underline'}
        />
        <Button
          className={styles.close__button}
          variant={'icon'}
          onClick={close}
        >
          X
        </Button>
      </form>
      <div className={styles.recently_keyword_container}>
        <ul>
          <Typography variant={'caption'} color={'gray'}>
            최근 검색어
          </Typography>
        </ul>
      </div>
    </div>
  )
}
