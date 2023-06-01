import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { LayoutPage } from '@pages/LayoutPage'
import { HomePage } from '@pages/home/HomePage'
import { RecipeDetail } from '@components/recipes/RecipeDetail'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayoutPage />}>
      <Route index element={<Navigate to={'/home'} />} />
      <Route index element={<HomePage />} path={'home'} />
      <Route path={'recipe'}>
        <Route path={':recipeNo'} element={<RecipeDetail />} />
      </Route>
    </Route>
  )
)
