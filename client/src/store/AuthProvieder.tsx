import { createContext, useContext, useState } from 'react'

export interface IAuthContext {
  isLogin: boolean
  oauthLogin: boolean
  userInfo: IUserProp
  setUserInfo: (data: IUserProp) => void
  setLoggedIn: () => void
  setOauthLogin: (data: boolean) => void
}

export interface IUserProp {
  nickname: string
  accessToken: string
  refreshToken: string
  roles: string
}

const setUserInitialData = {
  nickname: '',
  accessToken: '',
  refreshToken: '',
  roles: '',
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)

  if (authContext == null)
    throw new Error('No authContext.Provider found when calling authContext.')

  return authContext
}

export function AuthProvider({ children }: { children?: JSX.Element }) {
  const setUserInfo = (data: IUserProp) => {
    setState((prevState) => ({
      ...prevState,
      userInfo: data,
    }))
  }

  const setLoggedIn = () => {
    setState((prevState) => ({
      ...prevState,
      isLogin: !prevState.isLogin,
    }))
  }

  const setOauthLogin = (data: boolean) => {
    setState((prevState) => ({
      ...prevState,
      oauthLogin: data,
    }))
  }

  const initialSate = {
    userInfo: setUserInitialData,
    isLogin: false,
    oauthLogin: false,
    setOauthLogin,
    setUserInfo,
    setLoggedIn,
  }

  const [state, setState] = useState(initialSate)

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}
