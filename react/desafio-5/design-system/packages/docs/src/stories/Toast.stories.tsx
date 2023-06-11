import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/client-api'
import { Box, Button, Toast, ToastProps } from '@ruyfreire/ui-react'

export default {
  title: 'Data display/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {
    title: {
      type: 'string'
    },
    content: {
      type: 'string'
    },
    open: {
      type: 'boolean'
    }
  },
  decorators: [
    (Story) => {
      return (
        <Box css={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          {Story()}
        </Box>
      )
    }
  ]
} as Meta<ToastProps>

export const Primary: StoryObj<ToastProps> = {
  render: (args) => {
    const [, updateArgs] = useArgs();

    return (
      <>
        <Button onClick={() => updateArgs({ open: !args.open })}>Toggle Toast</Button>

        <Toast {...args} onOpenChange={(state) => updateArgs({ open: state })} />
      </>
    )

  },
  args: {
    title: 'Lorem ipsum',
    content: 'Lorem ipsum dolor sit',
    open: false
  }
}

export const OnlyTitle: StoryObj<ToastProps> = {
  args: {
    title: 'Lorem ipsum',
    open: true
  }
}

export const OnlyContent: StoryObj<ToastProps> = {
  args: {
    content: 'Lorem ipsum dolor sit',
    open: true
  }
}
