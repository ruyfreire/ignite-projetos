import { Box, Text, styled } from '@ignite-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$4',
  marginTop: '$8',

  '@media (max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const ErrorMessage = styled('div', {
  marginTop: '$2',

  variants: {
    hasError: {
      true: {
        [`${Text}`]: {
          color: '#FFA0AC',
        },
      },
    },
  },

  defaultVariants: {
    hasError: false,
  },
})
