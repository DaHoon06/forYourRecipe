import React from 'react'
import { render, screen } from '@testing-library/react'
import { Header } from '@components/layout/header/Header'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

describe('Header Components Test Code', () => {
  const headerRender = () => {
    render(<Header />, { wrapper: BrowserRouter })
  }

  const user = userEvent.setup()

  test('Logo를 클릭했을 때 /로 이동되는지?', async () => {
    headerRender()
    const logo = screen.getByRole('img', { name: 'logo' })
    expect(logo).toBeInTheDocument()

    await user.click(logo)
  })
})
