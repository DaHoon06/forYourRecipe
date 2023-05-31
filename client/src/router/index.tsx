import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { LayoutPage } from '@pages/LayoutPage'
import { HomePage } from '@pages/home/HomePage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LayoutPage />}>
        <Route index element={<Navigate to={'/home'} />} />
        <Route element={<HomePage />} path={'home'} />
      </Route>
    </Route>
  )
)
