import type { Meta, StoryObj } from '@storybook/react'
import { Heading, HeadingProps } from '@ruyfreire/ui-react'

export default {
  title: 'Typography/Heading',
  component: Heading,
  tags: ['autodocs'],
  args: {
    children:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam veniam vel, illo laborum voluptate voluptatibus nobis. Quasi quod, recusandae similique veritatis est consequuntur vitae architecto quaerat accusantium odio animi esse.',
  },
} as Meta<HeadingProps>

export const Primary: StoryObj<HeadingProps> = {}

export const CustomTag: StoryObj<HeadingProps> = {
  args: {
    as: 'h1',
    children: 'H1 Heading',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Por padrão o heading sempre será um `h2`, mas podemos alterar isso com a propriedade `as`.',
      },
    },
  },
}
