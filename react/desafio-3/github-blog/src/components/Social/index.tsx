import React from 'react'
import * as S from './styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

interface SocialItem {
  name: string
  icon: IconDefinition
}

interface SocialProps extends React.HTMLAttributes<HTMLUListElement> {
  list: SocialItem[]
}

export const Social = ({ list }: SocialProps) => {
  return (
    <S.SocialContainer>
      {list.map((item) => (
        <li key={item.name}>
          <FontAwesomeIcon icon={item.icon} />
          <span>{item.name}</span>
        </li>
      ))}
    </S.SocialContainer>
  )
}
