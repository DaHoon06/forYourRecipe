import styles from './Tile.module.scss'
import classNames from 'classnames'
import { Image } from '@components/common/image/Image'
import { Link } from 'react-router-dom'
import { IRecipe } from '@interfaces/IRecipe'
import { Typography } from '@components/common/typography/Typography'
import { useEffect, useRef, useState } from 'react'

interface Props {
  items: IRecipe.Card[]
}

export const Tile = (props: Props) => {
  const { items } = props
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const slideRef = useRef<HTMLDivElement>(null)

  // useEffect(() => {
  //   slideTransition()
  //   const timer = setInterval(() => {
  //     console.log('?')
  //     nextSlide()
  //   }, 2000)
  //
  //   return () => clearInterval(timer)
  // }, [currentSlide])

  const slideTransition = () => {
    const { current } = slideRef
    if (current !== null) {
      current.style.transition = 'all 0.5s ease-in-out'
      if (currentSlide === 0)
        current.style.transform = `translateX(-${currentSlide}00%)`
      else current.style.transform = `translateX(-${currentSlide}00%)`
    }
  }

  const nextSlide = () => {
    if (currentSlide >= 4) {
      setCurrentSlide(0)
    } else {
      setCurrentSlide(currentSlide + 1)
    }
  }

  return (
    <div className={styles.tile_container}>
      <div className={classNames(styles.tile)}>
        {items.splice(0, 4).map((recipe) => {
          return (
            <div
              ref={slideRef}
              className={classNames(styles.item)}
              key={recipe._id}
            >
              <Link to={`/recipe/${recipe._id}`} className={'w-100 h-100'}>
                <Image
                  src={recipe.profileImage}
                  alt={'sample1'}
                  className={'h-100 w-100'}
                />
                <div className={styles.item_cover}>
                  <Typography
                    variant={'caption'}
                    color={'white'}
                    weight={'medium'}
                  >
                    {recipe.name}
                  </Typography>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
