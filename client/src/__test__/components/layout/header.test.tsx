import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@components/layout/header'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { Footer } from '@components/layout/footer/Footer'
import { SERVER } from '@tests/mocks/server'
import { rest } from 'msw'

const renderWithRouter = (ui: any, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test Page', route)

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: BrowserRouter }),
  }
}

describe('Header Components Test Code', () => {
  const user = userEvent.setup()
  const headerRender = () => {
    render(<Header />, { wrapper: BrowserRouter })
  }

  test('Logo를 클릭했을 때 /로 이동되는지?', async () => {
    headerRender()

    const logo = screen.getByRole('img', { name: 'logo' })
    expect(logo).toBeInTheDocument()
    await user.click(logo)
    const route = '/'
    renderWithRouter(<Footer />, { route })
    //TODO 무슨 페이지로 redirect 할 것인지 설정
    expect(screen.getByTestId('render-footer')).toHaveTextContent(route)
  })
})

describe('Search Input Test Code', () => {
  const user = userEvent.setup()
  const headerRender = () => {
    render(<Header />, { wrapper: BrowserRouter })
  }

  const expectKeyword = '볶음밥'

  test('header component에 검색창이 존재하는지 확인', () => {
    headerRender()
    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toBeInTheDocument()
  })

  test('검색창에 text 입력이 되는지 확인', async () => {
    headerRender()
    const searchInput = screen.getByRole('textbox')
    await user.click(searchInput)
    await user.type(searchInput, expectKeyword)
    expect(searchInput).toHaveValue(expectKeyword)
  })

  //TODO: server에 검색 keyword 전송 후 반환 값 돌려받기
  // 전송 후 검색어가 지워졌는지 확인
  test('검색어가 서버에 전송이 되는지?', async () => {
    headerRender()
    const searchInput = screen.getByRole('textbox')
    await user.click(searchInput)
    await user.type(searchInput, expectKeyword)

    const submitButton = screen.getByRole('button', { name: '검색' })
    await user.click(submitButton)

    //TODO: "볶음밥" 을 넘겼을 때에대한 결과 값 확인
    SERVER.resetHandlers(
      rest.post('https://localhost:4000/api/search', (req, res, ctx) => {
        return res(ctx.body(expectKeyword))
      })
    )
  })

  test('검색어가 쿠키에 저장이 되었는지 확인', () => {})

  //TODO: 검색 결과 페이지로 redirect
  test('검색 결과 화면으로 이동이 되는지', () => {})
})

describe('Side Menu Test Code', () => {
  //TODO: 반응형으로 구현 예정이라 만약 존재하지 않는다면 Navigation 이 존재해야한다.
  test('side menu button 이 존재하는지 check', () => {})
})
