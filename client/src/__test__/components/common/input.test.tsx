import { render, screen, act } from '@testing-library/react'
import { Input } from '@components/input/Input'
import userEvent from '@testing-library/user-event'

describe('Input Component Test Code', () => {
  test('input의 value 값이 지정한 값으로 변하는지 확인', async () => {
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
  //TODO: input disabled
  test('특정 상황에서 input 요소가 disabled이 되는지??', () => {})
})
