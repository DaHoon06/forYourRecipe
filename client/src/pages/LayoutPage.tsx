import { Outlet } from 'react-router'
import { Header } from '@components/layout/header'
import { Footer } from '@components/layout/footer/Footer'

export const LayoutPage = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
