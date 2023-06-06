import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@components/common/button/Button'
import { ButtonType, ButtonVariant } from '@type/buttonTypes'

interface Prop {
  variant: ButtonVariant
  icon?: JSX.Element
  type?: ButtonType
}

type Story = StoryObj<typeof Button>

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
}

export default meta

const Template: Story<Prop> = (args: Prop) => <Button {...args} />
export const PrimaryButton = Template.bind()
PrimaryButton.args = { variant: 'primary' }
