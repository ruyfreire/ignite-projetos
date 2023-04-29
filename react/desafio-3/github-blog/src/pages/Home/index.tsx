import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Cover from '../../assets/cover.svg'

import * as S from './styles'
import {
  faArrowUpRightFromSquare,
  faBuilding,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export const Home = () => {
  return (
    <div>
      <S.CoverContainer>
        <img src={Cover} alt="" />
      </S.CoverContainer>

      <S.ContentContainer>
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

            <ul className="social">
              <li>
                <FontAwesomeIcon icon={faGithub} />
                <span>ruyfreire</span>
              </li>

              <li>
                <FontAwesomeIcon icon={faBuilding} />
                <span>rocketseat</span>
              </li>

              <li>
                <FontAwesomeIcon icon={faUserGroup} />
                <span>32 seguidores</span>
              </li>
            </ul>
          </S.ProfileInfo>
        </S.ProfileContainer>
      </S.ContentContainer>
    </div>
  )
}
