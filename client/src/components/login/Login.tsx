import React, { ReactElement, useState } from 'react'
import styles from './Login.module.scss'
import { KakaoLogin } from '@components/login/KakaoLogin'
import { Input } from '@components/common/input/Input'
import { Button } from '@components/common/button/Button'
import { Typography } from '@components/common/typography/Typography'
import { axiosInstance } from '@libs/axios-instance/axios'

interface LoginProps {
  closeModal: () => void
}

interface ILoginData {
  id: string
  password: string
}

export const Login = (props: LoginProps): ReactElement => {
  const { closeModal } = props
  const [loginData, setLoginData] = useState<ILoginData>({
    id: '',
    password: '',
  })

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  //TODO: 사용자 정보 관리
  const login = async () => {
    try {
      const { data } = await axiosInstance.post('/users/login', {
        body: { loginData },
      })
      console.log(data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.login}>
      <Button type={'button'} onClick={closeModal}>
        x
      </Button>
      <div className={styles.login_body}>
        <p>로그 위치</p>
        <form onSubmit={login} className={styles.login_form}>
          <Input
            name={'id'}
            placeholder={'ID'}
            value={loginData.id}
            onChange={onChangeInput}
          />
          <Input
            name={'password'}
            placeholder={'PW'}
            value={loginData.password}
            onChange={onChangeInput}
          />
          <Button type={'submit'}>
            <Typography>Login</Typography>
          </Button>
        </form>
        <KakaoLogin />
      </div>
    </div>
  )
}
