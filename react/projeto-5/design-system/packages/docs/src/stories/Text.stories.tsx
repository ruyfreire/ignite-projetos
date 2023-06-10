import type { Meta, StoryObj } from '@storybook/react'
import { Text, TextProps } from '@ruyfreire/ui-react'

export default {
  title: 'Typography/Text',
  component: Text,
  tags: ['autodocs'],
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam veniam vel, illo laborum voluptate voluptatibus nobis. Quasi quod, recusandae similique veritatis est consequuntur vitae architecto quaerat accusantium odio animi esse.',
  },
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}

export const CustomTag: StoryObj<TextProps> = {
  args: {
    as: 'strong',
    children: 'Strong text',
  },
}
