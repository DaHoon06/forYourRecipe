import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@components/common/button/Button'

const meta: Meta<typeof Button> = {
  title: 'COMMON/Button',
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  render: () => <Button />,
}
