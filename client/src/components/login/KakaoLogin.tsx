import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '@store/AuthProvieder'
import { OAuth } from '@utils/OAuth'
import { Image } from '@components/common/image/Image'

export const KakaoLogin = (): ReactElement => {
  const { oauthLogin } = useAuthContext()
  const [popup, setPopup] = useState<Window | null>(null)
  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${OAuth.REST_API_KEY}&redirect_uri=${OAuth.REDIRECT_URI}&response_type=code`
  const kakaoLogin = useCallback(() => popupOpen(url), [url])

  const popupOpen = (url: string): void => {
    const width = 425
    const height = 625
    const left = Math.ceil((window.screen.width - width) / 2)
    const top = Math.ceil((window.screen.height - height) / 2)

    const popup = window.open(
      url,
      '',
      `left=${left}, top=${top}, toolbar=no, width=${width}, height=${height}`
    )
    setPopup(popup)
  }
  useEffect(() => {
    console.log(oauthLogin)
  }, [oauthLogin])
  return (
    <section className="login__items--wrapper">
      <button type="button" className="kakao__button" onClick={kakaoLogin}>
        <Image
          alt="카카오 로그인 이미지"
          className={'ml-20'}
          src={''}
          width={24}
          height={24}
        />
        <span>카카오 계정으로 로그인</span>
      </button>
    </section>
  )
}
