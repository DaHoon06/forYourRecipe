import { render, screen, fireEvent, act } from '@testing-library/react'
import { Input } from '@components/input/Input'
import userEvent from '@testing-library/user-event'

test('Custom Input Test', async () => {
  const user = userEvent.setup()
  let initialText = '전다훈 Test Initialize'
  const expectedKeyword = '전다훈 Test'
  render(
    <Input
      value={initialText}
      onChange={(e) => (initialText = e.target.value)}
    />
  )
  await act(async () => {
    const input = screen.getByRole('textbox')
    await user.clear(input)
    await user.type(input, expectedKeyword)
    expect(input).toHaveValue(expectedKeyword)
  })
})
