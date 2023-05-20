import { globalCss } from './theme'

export const globalStyles = globalCss({
  '*': {
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },

  body: {
    backgroundColor: '$gray900',
    color: '$gray100',
  },

  'body, input, textarea, button': {
    fontFamily: '$base',
    fontWeight: '$regular',
    fontSize: '$md',
  },
})
