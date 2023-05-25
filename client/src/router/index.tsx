import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { LayoutPage } from '@pages/LayoutPage'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<LayoutPage />}>
        <Route index element={<Navigate to={'/'} />} />
      </Route>
    </Route>
  )
)
