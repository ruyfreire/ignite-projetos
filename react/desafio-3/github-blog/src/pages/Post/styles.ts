import styled from 'styled-components'
import { ProfileBox } from '../../components/styles/ProfileBox'

export const PostContainer = styled.div`
  width: 100%;

  .body-issue {
    p {
      margin-bottom: 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 2rem 0 1rem;
    }

    img,
    svg {
      max-width: 100%;
    }
  }
`

export const ProfileContainer = styled(ProfileBox)``

export const ProfileInfo = styled.div`
  .redirects {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;

      font: ${(props) => props.theme.fonts.components.link};
      color: ${(props) => props.theme.colors.brand.blue};
      text-transform: uppercase;
    }
  }

  h2 {
    font: ${(props) => props.theme.fonts.title.large};
    color: ${(props) => props.theme.colors.base.title};
    margin-bottom: 0.5rem;
  }
`
