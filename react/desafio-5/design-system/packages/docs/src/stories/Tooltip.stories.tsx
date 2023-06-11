import type { Meta, StoryObj } from '@storybook/react'
import { Tooltip, TooltipProps } from '@ruyfreire/ui-react'
import { Info } from 'phosphor-react'

export default {
  title: 'Data display/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  args: {
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
    children: <Info size={24} weight="bold" color="#00875f" cursor="pointer" />,
    side: 'top',
    align: 'center'
  },
  argTypes: {
    content: {
      type: 'string'
    },
    children: {
      control: {
        type: null,
      }
    },
    side: {
      options: ["top", "right", "bottom", "left"],
      control: { type: 'inline-radio' }
    },
    align: {
      options: ["start", "center", "end"],
      control: { type: 'inline-radio' }
    }
  },
  parameters: {
    layout: 'centered',
  }
} as Meta<TooltipProps>

export const Primary: StoryObj<TooltipProps> = {}
