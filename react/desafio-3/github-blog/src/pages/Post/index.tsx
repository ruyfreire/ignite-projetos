import { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import ReactMarkdown from 'react-markdown'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faCalendarDay,
  faChevronLeft,
  faComment,
} from '@fortawesome/free-solid-svg-icons'

import { Social } from '../../components/Social'
import { BoxSpinner } from '../../components/BoxSpinner'
import { IssueContext } from '../../contexts/issueContext'

import { defaultTheme } from '../../styles/themes/default'
import * as S from './styles'

export const Post = () => {
  const { id } = useParams()
  const { issue, getIssueData } = useContext(IssueContext)

  useEffect(() => {
    getIssueData(Number(id))
  }, [id, getIssueData])

  return (
    <S.PostContainer>
      <S.ProfileContainer>
        {issue ? (
          <S.ProfileInfo>
            <div className="redirects">
              <Link to="/">
                <FontAwesomeIcon icon={faChevronLeft} />
                Voltar
              </Link>

              <a href={issue.html_url} target="_blank">
                Ver no Github
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </a>
            </div>

            <h2 className="title">{issue.title}</h2>

            <Social
              list={[
                {
                  icon: faGithub,
                  name: issue.user.login,
                },
                {
                  icon: faCalendarDay,
                  name: formatDistanceToNow(new Date(issue.created_at), {
                    addSuffix: true,
                    locale: ptBR,
                  }),
                },
                {
                  icon: faComment,
                  name: `${issue.comments} comentários`,
                },
              ]}
            />
          </S.ProfileInfo>
        ) : (
          <BoxSpinner />
        )}
      </S.ProfileContainer>

      {issue ? (
        <div className="body-issue">
          <ReactMarkdown
            children={issue.body}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    style={tomorrowNightBlue}
                    PreTag="div"
                    customStyle={{
                      backgroundColor: defaultTheme.colors.base.post,
                      borderRadius: '2px',
                      padding: '1rem',
                      margin: '1rem 0',
                    }}
                  />
                ) : (
                  <code {...props} className={className}>
                    {children}
                  </code>
                )
              },
            }}
          />
        </div>
      ) : (
        <p>Sem dados</p>
      )}
    </S.PostContainer>
  )
}
