import * as Toast from '@radix-ui/react-toast'

import { styled, keyframes } from '../../styles'

export const ToastViewport = styled(Toast.Viewport, {
  position: 'fixed',
  bottom: '$8',
  right: '$8',
  margin: 0,
  padding: 0,
  zIndex: 10,
})

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
})

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + $space$8))` },
  to: { transform: 'translateX(0)' },
})

const swipeOut = keyframes({
  from: { transform: 'translateX(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateX(calc(100% + $space$8))` },
})

export const ToastRoot = styled(Toast.Root, {
  backgroundColor: '$gray800',
  borderRadius: '$sm',
  padding: '$3 $5',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '$2',
  border: '1px solid $colors$gray600',

  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${hide} 100ms ease-in`,
  },
  '&[data-swipe="move"]': {
    transform: 'translateX(var(--radix-toast-swipe-move-x))',
  },
  '&[data-swipe="cancel"]': {
    transform: 'translateX(0)',
    transition: 'transform 200ms ease-out',
  },
  '&[data-swipe="end"]': {
    animation: `${swipeOut} 100ms ease-out`,
  },
})

export const ToastTitle = styled(Toast.Title, {
  fontFamily: '$default',
  fontSize: '$xl',
  fontWeight: '$bold',
  color: '$white',
  lineHeight: '$base',
  marginBottom: '$1',
})

export const ToastDescription = styled(Toast.Description, {
  fontFamily: '$default',
  fontSize: '$sm',
  fontWeight: '$regular',
  color: '$gray200',
  lineHeight: '$base',
})

export const ToastAction = styled(Toast.Action, {
  all: 'unset',
  fontSize: 0,
  cursor: 'pointer',
  color: '$gray200',
  padding: '$1',
  transition: 'color 200ms ease-in-out',

  '&:hover': {
    color: '$gray100',
  },
})
