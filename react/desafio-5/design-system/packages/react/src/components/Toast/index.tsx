import { ComponentProps } from 'react'
import * as ToastPrimitive from '@radix-ui/react-toast'
import { X } from 'phosphor-react'

import { ToastAction, ToastDescription, ToastRoot, ToastTitle, ToastViewport } from './styles';

export interface ToastProps extends ComponentProps<typeof ToastRoot> {
  title: string
  content: string
}

export const Toast = ({ title, content, ...props }: ToastProps) => {
  return (
    <ToastPrimitive.Provider swipeDirection="right">
      <ToastRoot {...props}>
        <div>
          <ToastTitle>{title}</ToastTitle>
          <ToastDescription>{content}</ToastDescription>
        </div>

        <ToastAction altText="Fechar alerta">
          <X size={24} />
        </ToastAction>
      </ToastRoot>

      <ToastViewport />
    </ToastPrimitive.Provider>
  )
}
