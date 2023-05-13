import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'

import { Social } from '../../components/Social'
import { BoxSpinner } from '../../components/BoxSpinner'
import { IssueContext } from '../../contexts/issueContext'

import * as S from './styles'

export const Home = () => {
  const navigate = useNavigate()
  const { issues, profile } = useContext(IssueContext)

  const getPublishedTitle = (date: Date) =>
    format(date, "dd 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
    })

  return (
    <div>
      <S.ProfileContainer>
        {profile ? (
          <>
            <img src={profile.avatar_url} alt="" />

            <S.ProfileInfo>
              <div className="title">
                <h2>{profile.name}</h2>
                <a href={profile.html_url} target="_blank">
                  Github
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </a>
              </div>

              <p className="description">{profile.bio || 'Sem biografia'}</p>

              <Social
                list={[
                  {
                    icon: faGithub,
                    name: profile.login,
                  },
                  {
                    icon: faBuilding,
                    name: profile.company || 'Não informado',
                  },
                  {
                    icon: faUserGroup,
                    name: `${profile.followers} seguidores`,
                  },
                ]}
              />
            </S.ProfileInfo>
          </>
        ) : (
          <BoxSpinner />
        )}
      </S.ProfileContainer>

      <S.SearchContainer>
        <div className="subtitle">
          <p>Publicações</p>
          <span>{`${issues?.length || 0} publicações`}</span>
        </div>

        <input placeholder="Buscar conteúdo" />
      </S.SearchContainer>

      <S.CardContainer>
        {issues &&
          issues.map((issue) => (
            <S.Card
              key={issue.id}
              onClick={() => navigate(`/post/${issue.number}`)}
            >
              <header>
                <h2>{issue.title}</h2>
                <time
                  title={getPublishedTitle(new Date(issue.created_at))}
                  dateTime={issue.created_at}
                >
                  {formatDistanceToNow(new Date(issue.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </time>
              </header>

              <p>{issue.body}</p>
            </S.Card>
          ))}
      </S.CardContainer>
    </div>
  )
}
