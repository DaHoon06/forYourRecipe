import { ReactElement } from 'react'
import styles from './Login.module.scss'
import { KakaoLogin } from '@components/login/KakaoLogin'

interface LoginProps {
  closeModal: () => void
}

export const Login = (props: LoginProps): ReactElement => {
  const { closeModal } = props

  return (
    <div className={styles.login}>
      <button type={'button'} onClick={closeModal}>
        x
      </button>
      <div className={styles.login_body}>
        <p>로그 위치</p>
        <form className={styles.login_form}>
          <input />
          <input />
          <button>Login</button>
        </form>
        <KakaoLogin />
      </div>
    </div>
  )
}
