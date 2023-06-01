import styles from './Header.module.scss'
import { useCallback, useState } from 'react'
import { Typography } from '@components/typography/Typography'
import classNames from 'classnames'
import { Button } from '@components/button/Button'
import { SearchIcon } from '@components/icons/SearchIcon'
import { UserIcon } from '@components/icons/UserIcon'
import { SearchForm } from '@components/search/SearchForm'
import { Link } from 'react-router-dom'

export const Top = () => {
  const [searchFormOpen, setSearchFormOpen] = useState(false)

  const showSearchForm = useCallback(() => {
    setSearchFormOpen(!searchFormOpen)
  }, [searchFormOpen])

  return (
    <>
      <div className={styles.header_container}>
        <Link to={'/'}>
          <Typography variant={'h1'} color={'primary'} weight={'bold'}>
            No1. Recipe
          </Typography>
        </Link>
        <div className={classNames('flex align-center')}>
          <Button
            data-testid={'search'}
            variant={'icon'}
            className={classNames('mr-10')}
            onClick={showSearchForm}
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
