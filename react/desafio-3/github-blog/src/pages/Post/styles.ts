import styled from 'styled-components'
import { ProfileBox } from '../../components/styles/ProfileBox'

export const PostContainer = styled.div`
  .mb-1 {
    margin-bottom: 0.5rem;
  }
  .mb-2 {
    margin-bottom: 1rem;
  }
  .mb-3 {
    margin-bottom: 1.5rem;
  }
  .mb-4 {
    margin-bottom: 2rem;
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
