import React from 'react'
import {render, screen, act} from '@testing-library/react'
import {Header} from '@components/layout/header'
import userEvent from '@testing-library/user-event'
import {BrowserRouter} from 'react-router-dom'
import {Footer} from '@components/layout/footer/Footer'
import {SERVER} from '@tests/mocks/server'
import {rest} from 'msw'
import {SearchForm} from '@components/search/SearchForm'
import {useState as useStateMock} from 'react'
import {fireEvent} from '@storybook/testing-library'

const renderWithRouter = (ui: any, {route = '/'} = {}) => {
  window.history.pushState({}, 'Test Page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, {wrapper: BrowserRouter}),
  }
}

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))

const setState = jest.fn()

describe('Header Components Test Code', () => {
  const user = userEvent.setup()
  const headerRender = () => {
    render(<Header/>, {wrapper: BrowserRouter})
  }

  test('Logo를 클릭했을 때 /로 이동되는지?', async () => {
    headerRender()
    const name = 'No1. Recipe'
    const logo = screen.getByRole('h1', {name: name})
    expect(logo).toBeInTheDocument()
    await user.click(logo)
    const route = '/'
    renderWithRouter(<Footer/>, {route})
    //TODO 무슨 페이지로 redirect 할 것인지 설정
    expect(screen.getByTestId('render-footer')).toHaveTextContent(route)
  })
})

describe('click search button renders the search component', () => {
  beforeEach(() => {
    // @ts-ignore
    useStateMock.mockImplementation((init: any) => [init, setState])
  })

  const user = userEvent.setup()
  const headerRender = () => {
    render(<Header/>, {wrapper: BrowserRouter})
  }

  test.only('SearchForm component rendering test', async () => {
    headerRender()
    const expectKeyword = '볶음밥'

    // @ts-ignore
    useStateMock.mockImplementationOnce(() => [false, setState])
    const searchButton = screen.getByTestId('search')
    expect(searchButton).toBeInTheDocument()

    // 1. TODO SearchForm Component 가 열리는지 확인
    await user.click(searchButton)

    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toBeInTheDocument()

    await user.click(searchInput)

    // 2. TODO 검색어 입력이 되는지 확인
    await user.type(searchInput, expectKeyword)
    screen.debug(searchInput)
    expect(searchInput).toHaveValue(expectKeyword)

    // 3. TODO. 검색한 결과값을 서버에서 가져오는지 확인
    //const submitButton = screen.getByRole('button', { name: '검색' })
    //     await user.click(submitButton)
    //     SERVER.resetHandlers(
    //       rest.post('https://localhost:4000/api/search', (req, res, ctx) => {
    //         return res(ctx.body(expectKe yword))
    //       })
    //     )
    // 4. TODO 검색한 키워드가 쿠키에 저장이 되는지 확인
  })
})

describe('The Modal opens when clicked login button', () => {
  const user = userEvent.setup()
  const headerRender = () => {
    render(<Header/>, {wrapper: BrowserRouter})
  }

  test('로그인 버튼이 존재하는지 확인', () => {
    headerRender()

    const loginButton = screen.getByTestId('login')
    expect(loginButton).toBeInTheDocument()

    user.click(loginButton)

    // TODO: 1. Login Modal 이 뜨는지 확인
  })
})
