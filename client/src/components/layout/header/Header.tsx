import styles from './Header.module.scss'
import { Input } from '@components/input/Input'
import { useState } from 'react'

export const Header = () => {
  const [keyword, setKeyword] = useState('')
  // TODO ERROR Action Update
  const search = () => {
    try {
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div role={'img'}>Logo</div>
        <div>
          <form onSubmit={search}>
            <Input
              placeholder={'Search...'}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              id={'search-input'}
            />
            <button type={'submit'}>검색</button>
          </form>
          <button type={'button'}>Hamburger</button>
        </div>
      </div>
    </header>
  )
}
