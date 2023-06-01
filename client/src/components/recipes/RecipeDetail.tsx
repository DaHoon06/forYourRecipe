import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export const RecipeDetail = () => {
  const [recipeNo, setRecipeNo] = useState('')
  const params = useParams()

  useEffect(() => {
    if (params) {
      const { recipeNo } = params
      if (recipeNo) setRecipeNo(recipeNo)
    }
  }, [params])

  return <main>롸</main>
}