import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarProps } from '@ruyfreire/ui-react'

export default {
  title: 'Data display/Avatar',
  component: Avatar,
  tags: ['autodocs'],
} as Meta<AvatarProps>

export const Primary: StoryObj<AvatarProps> = {
  args: {
    src: 'https://github.com/ruyfreire.png',
    alt: 'Ruy Freire',
  },
}

export const WithFallback: StoryObj<AvatarProps> = {
  args: {
    src: undefined,
  },
}
