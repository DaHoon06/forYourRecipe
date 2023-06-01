import styles from './Header.module.scss'
import { useState } from 'react'
import { Typography } from '@components/typography/Typography'
import classNames from 'classnames'
import { Button } from '@components/button/Button'
import { SearchIcon } from '@components/icons/SearchIcon'
import { UserIcon } from '@components/icons/UserIcon'
import { SearchForm } from '@components/search/SearchForm'

export const Top = () => {
  const [searchFormOpen, setSearchFormOpen] = useState(false)
  return (
    <>
      <div className={styles.header_container}>
        <Typography variant={'h1'} color={'primary'} weight={'bold'}>
          No1. Recipe
        </Typography>
        <div className={classNames('flex align-center')}>
          <Button
            data-testid={'search'}
            variant={'icon'}
            className={classNames('mr-10')}
            onClick={() => setSearchFormOpen(!searchFormOpen)}
          >
            <SearchIcon />
          </Button>
          <Button data-testid={'login'} variant={'icon'}>
            <UserIcon />
          </Button>
        </div>
      </div>
      <SearchForm
        open={searchFormOpen}
        closeSearchForm={(payload: boolean) => setSearchFormOpen(payload)}
      />
    </>
  )
}
