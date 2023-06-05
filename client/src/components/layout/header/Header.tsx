import styles from './Header.module.scss'
import { ReactElement, useCallback, useState } from 'react'
import { Typography } from '@components/common/typography/Typography'
import classNames from 'classnames'
import { Button } from '@components/common/button/Button'
import { SearchIcon } from '@components/common/icons/SearchIcon'
import { UserIcon } from '@components/common/icons/UserIcon'
import { SearchForm } from '@components/search/SearchForm'
import { Link } from 'react-router-dom'
import { Modal } from '@components/common/modal/Modal'
import { Login } from '@components/login/Login'

export const Top = (): ReactElement => {
  const [searchFormOpen, setSearchFormOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const showSearchForm = useCallback(() => {
    const arr = [202301, 202302, 202303]
    const newArr = arr.map((value) => Number(value.toString().substring(4, 6)))
    console.log(newArr)
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
          <Button
            data-testid={'login'}
            variant={'icon'}
            onClick={() => setModalOpen(!modalOpen)}
          >
            <UserIcon />
          </Button>
        </div>
      </div>
      <SearchForm
        open={searchFormOpen}
        closeSearchForm={(payload: boolean) => setSearchFormOpen(payload)}
      />
      <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)}>
        <Login closeModal={() => setModalOpen(false)} />
      </Modal>
    </>
  )
}
