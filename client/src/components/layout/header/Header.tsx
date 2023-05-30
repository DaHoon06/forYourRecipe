import styles from './Header.module.scss'
import { Input } from '@components/input/Input'
import { useState } from 'react'
import { Typography } from '@components/typography/Typography'
import classNames from 'classnames'
import { Button } from '@components/button/Button'
import { SearchIcon } from '@components/icons/SearchIcon'

export const Top = () => {
  const [keyword, setKeyword] = useState('')
  // TODO ERROR Action Update
  const search = () => {
    try {
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <div className={styles.header_container}>
        <Typography variant={'h1'} color={'primary'} weight={'bold'}>
          No1. Recipe
        </Typography>
        <div className={classNames('flex align-center')}>
          <form onSubmit={search} className={classNames('flex align-center')}>
            <Input
              placeholder={'Search...'}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              id={'search-input'}
            />
            <Button variant={'icon'}>
              <SearchIcon />
            </Button>
          </form>
          <Typography weight={'medium'} color={'black'} variant={'body2'}>
            Login
          </Typography>
        </div>
      </div>
    </>
  )
}
