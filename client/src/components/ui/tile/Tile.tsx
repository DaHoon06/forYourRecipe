import styles from './Tile.module.scss'
import classNames from 'classnames'
import { IRecipe } from '@interfaces/IRecipe'
import { axiosInstance } from '@libs/axios'
import { useQuery } from 'react-query'

//TODD MOCK DATA
export const Tile = () => {
  const load = async (): Promise<IRecipe.Card[]> => {
    try {
      const { data } = await axiosInstance.get('/recipes/random-recipes')
      return data
    } catch (e) {
      throw e
    }
  }

  const { data, isLoading, isError, isIdle } = useQuery<IRecipe.Card[]>(
    'recipes',
    load,
    {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
    }
  )

  if (isLoading || isIdle) return <div>Loading....</div>
  if (isError)
    return (
      <>
        <h1>ERROR!!!!</h1>
      </>
    )

  return (
    <>
      <p>TILE UI</p>
      <div className={classNames(styles.tile)}>
        <div className={classNames(styles.item)}>1</div>
        <div className={classNames(styles.item)}>2</div>
        <div className={classNames(styles.item)}>3</div>
        <div className={classNames(styles.item)}>4</div>
      </div>
    </>
  )
}
