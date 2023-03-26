import React from 'react'
import clsx from 'clsx'

import { Wrapper } from './styles'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string
  icon?: React.ReactNode
  selected?: boolean
  size?: 'md' | 'sm'
}

export function Button({
  children,
  className,
  selected = false,
  icon = null,
  size = 'md',
}: ButtonProps) {
  return (
    <Wrapper className={clsx([className], { selected })} size={size}>
      {icon}
      {children}
    </Wrapper>
  )
}
