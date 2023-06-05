import { ReactElement } from 'react'
import { Outlet } from 'react-router'

export const RecipePage = (): ReactElement => {
  return (
    <main>
      <Outlet />
    </main>
  )
}
