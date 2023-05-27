import { styled } from '@/styles/theme'

export const SuccessContainer = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
    fontWeight: 'bold',
  },

  p: {
    fontSize: '$xl',
    lineHeight: 1.6,
    color: '$gray300',
    marginTop: '2rem',
    maxWidth: 520,
    textAlign: 'center',
  },

  a: {
    fontSize: '$lg',
    fontWeight: 'bold',
    color: '$green500',
    textDecoration: 'none',
    marginTop: '4rem',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  width: '100%',
  maxWidth: '8rem',
  height: '10rem',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  padding: '0.25rem',
  marginTop: '4rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  img: {
    objectFit: 'cover',
  },
})
