import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

import * as S from './styles'
import { useNavigate } from 'react-router-dom'
import { Social } from '../../components/Social'

export const Home = () => {
  const navigate = useNavigate()

  const [issues, setIssues] = useState(
    Array(6).fill(new Date(2023, 3, 30, 10, 30))
  )

  const publishedAtTitle = format(issues[0], "dd 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR,
  })

  return (
    <div>
      <S.ProfileContainer>
        <img src="https://github.com/ruyfreire.png" alt="" />

        <S.ProfileInfo>
          <div className="title">
            <h2>Ruy Freire</h2>
            <a href="https://github.com/ruyfreire" target="_blank">
              Github
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>

          <p className="description">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
            voluptatum, ab autem in sit quidem eum maxime nulla necessitatibus
            nisi, voluptate modi repellat neque odio libero! Nostrum magnam
            nobis voluptatibus?
          </p>

          <Social
            list={[
              {
                icon: faGithub,
                name: 'ruyfreire',
              },
              {
                icon: faBuilding,
                name: 'rocketseat',
              },
              {
                icon: faUserGroup,
                name: '32 seguidores',
              },
            ]}
          />
        </S.ProfileInfo>
      </S.ProfileContainer>

      <S.SearchContainer>
        <div className="subtitle">
          <p>Publicações</p>
          <span>6 publicações</span>
        </div>

        <input placeholder="Buscar conteúdo" />
      </S.SearchContainer>

      <S.CardContainer>
        {issues.map((date, i) => (
          <S.Card key={i} onClick={() => navigate(`/post/${i}`)}>
            <header>
              <h2>JavaScript data types and data structures</h2>
              <time title={publishedAtTitle} dateTime={date.toISOString()}>
                {formatDistanceToNow(date, {
                  addSuffix: true,
                  locale: ptBR,
                })}
              </time>
            </header>

            <p>
              Programming languages all have built-in data structures, but these
              often differ from one language to another. This article attempts
              to list the built-in data structures available in...
            </p>
          </S.Card>
        ))}
      </S.CardContainer>
    </div>
  )
}
