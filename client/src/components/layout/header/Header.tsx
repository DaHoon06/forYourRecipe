import styles from './Header.module.scss'

export const Header = () => {
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
            <label htmlFor={'search-input'}>
              <input id={'search-input'} type={'text'} placeholder={'Search'} />
            </label>
            <button type={'submit'}>검색</button>
          </form>
          <button type={'button'}>Hamburger</button>
        </div>
      </div>
    </header>
  )
}
