import { ReactElement, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CURRENT_TAB } from '@store/actions/utilTypes'
import { RootState } from '@store/reducer/rootReducer'
import './Navigation.scss'
import classNames from 'classnames'
import { Typography } from '@components/common/typography/Typography'
import { Link, useLocation } from 'react-router-dom'

const navLink = [
  {
    to: '/',
    title: 'HOME',
    currentTab: 0,
  },
  {
    to: '/recipe',
    title: 'RECIPE',
    currentTab: 1,
  },
]

const domain = {
  home: '',
  recipe: 'recipe',
}

export const Navigation = (): ReactElement => {
  const [tab, setTab] = useState(1)
  const dispatch = useDispatch()
  const location = useLocation()
  const { currentTab } = useSelector((state: RootState) => state.utilReducer)

  useEffect(() => {
    setTab(currentTab)
  }, [currentTab])

  useEffect(() => {
    const { pathname } = location
    const url = pathname.split('/')[1]
    navigationSwitch(url)
  }, [location])

  const navigationSwitch = (type: string) => {
    switch (type) {
      case domain.home:
        setTab(0)
        break
      case domain.recipe:
        setTab(1)
        break
      default:
        setTab(0)
        break
    }
  }

  const currentPathCheck = (linkTab: number): boolean => {
    return tab === linkTab
  }

  const onClickHandlerNavBar = (type: number): void => {
    dispatch({
      type: CURRENT_TAB,
      value: type,
    })
  }

  return (
    <nav className={'navbar'}>
      <ul className={'navbar-container'}>
        {navLink.map((link) => {
          return (
            <li
              className={classNames(
                'item',
                currentPathCheck(link.currentTab) && 'item-active'
              )}
              key={link.to}
            >
              <Link
                to={link.to}
                onClick={() => onClickHandlerNavBar(link.currentTab)}
              >
                <Typography
                  variant={'body1'}
                  color={currentPathCheck(link.currentTab) ? 'primary' : 'gray'}
                  weight={
                    currentPathCheck(link.currentTab) ? 'semibold' : 'regular'
                  }
                >
                  {link.title}
                </Typography>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
