import styles from './Header.module.scss'
import { ReactElement, useCallback, useState } from 'react'
import { Typography } from '@components/common/typography/Typography'
import classNames from 'classnames'
import { Button } from '@components/common/button/Button'
import { SearchIcon } from '@components/common/icons/SearchIcon'
import { UserIcon } from '@components/common/icons/UserIcon'
import { SearchForm } from '@components/search/SearchForm'
import { Link } from 'react-router-dom'

export const Top = (): ReactElement => {
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
