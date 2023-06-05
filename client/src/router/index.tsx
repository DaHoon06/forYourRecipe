import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
} from 'react-router-dom'
import { LayoutPage } from '@pages/LayoutPage'
import { HomePage } from '@pages/home/HomePage'
import { RecipeDetail } from '@components/recipes/RecipeDetail'
import { RecipePage } from '@pages/recipe/RecipePage'
import { RecipeLists } from '@components/recipes/RecipeLists'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<LayoutPage />}>
      <Route element={<Navigate to={'/'} />} />
      <Route index element={<HomePage />} path={'/'} />
      <Route path={'recipe'} element={<RecipePage />}>
        <Route index element={<RecipeLists />} />
        <Route path={':recipeNo'} element={<RecipeDetail />} />
      </Route>
    </Route>
  )
)
