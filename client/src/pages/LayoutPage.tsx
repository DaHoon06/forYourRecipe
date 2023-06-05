import { Outlet } from 'react-router'
import { Header } from '@components/layout/header'
import { Footer } from '@components/layout/footer/Footer'
import { ReactElement } from 'react'

export const LayoutPage = (): ReactElement => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
