import type { Meta, StoryObj } from '@storybook/react'
import { Box, BoxProps, Text } from '@ignite-ui/react'

export default {
  title: 'Surfaces/Box',
  component: Box,
  tags: ['autodocs'],
  args: {
    children: (
      <Text>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro veniam
        dolore sit ad voluptatum! Perferendis corporis dicta, saepe doloremque
        ea illo maiores consectetur perspiciatis facere consequatur aperiam
        ipsam aspernatur deleniti.
      </Text>
    ),
  },
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}
