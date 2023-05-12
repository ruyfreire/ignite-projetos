import { Link } from 'react-router-dom'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowUpRightFromSquare,
  faCalendarDay,
  faChevronLeft,
  faComment,
} from '@fortawesome/free-solid-svg-icons'

import { Social } from '../../components/Social'
import * as S from './styles'
import { defaultTheme } from '../../styles/themes/default'

export const Post = () => {
  const code = `let foo = 42; // foo is now a number
foo = 'bar'; // foo is now a string
foo = true; // foo is now a boolean`

  return (
    <S.PostContainer>
      <S.ProfileContainer>
        <S.ProfileInfo>
          <div className="redirects">
            <Link to="/">
              <FontAwesomeIcon icon={faChevronLeft} />
              Voltar
            </Link>

            <a href="https://github.com/ruyfreire" target="_blank">
              Ver no Github
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </a>
          </div>

          <h2 className="title">JavaScript data types and data structures</h2>

          <Social
            list={[
              {
                icon: faGithub,
                name: 'ruyfreire',
              },
              {
                icon: faCalendarDay,
                name: 'Há 1 dia',
              },
              {
                icon: faComment,
                name: '5 comentários',
              },
            ]}
          />
        </S.ProfileInfo>
      </S.ProfileContainer>

      <p className="mb-3">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam vitae
        perspiciatis, ad officia reiciendis, maiores dolor aperiam porro quidem
        nam iste minus rem hic temporibus reprehenderit distinctio? Atque,
        possimus velit!
      </p>

      <SyntaxHighlighter
        language="javascript"
        style={tomorrowNightBlue}
        customStyle={{
          backgroundColor: defaultTheme.colors.base.post,
          borderRadius: '2px',
          padding: '1rem',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </S.PostContainer>
  )
}
