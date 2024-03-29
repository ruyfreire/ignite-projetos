import styled from 'styled-components'
import { ProfileBox } from '../../components/styles/ProfileBox'

export const ProfileContainer = styled(ProfileBox)`
  display: flex;
  gap: 2rem;

  img {
    width: 9.25rem;
    height: 9.25rem;
    border-radius: 8px;
  }
`

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;

    h2 {
      font: ${(props) => props.theme.fonts.title.large};
      color: ${(props) => props.theme.colors.base.title};
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;

      font: ${(props) => props.theme.fonts.components.link};
      color: ${(props) => props.theme.colors.brand.blue};
      text-transform: uppercase;
    }
  }

  .description {
    flex: 1;
    font: ${(props) => props.theme.fonts.text.medium};
    color: ${(props) => props.theme.colors.base.text};
    margin-bottom: 1.5rem;
  }
`

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(12.5rem, 1fr));
  }
`

export const Card = styled.div`
  background: ${(props) => props.theme.colors.base.post};
  border: 2px solid transparent;
  border-radius: 0.625rem;
  padding: 2rem;
  cursor: pointer;

  &:hover {
    border-color: ${(props) => props.theme.colors.base.label};
    transition: border 0.2s;
  }

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.25rem;
    gap: 1rem;

    h2 {
      flex: 1;
      font: ${(props) => props.theme.fonts.title.medium};
      color: ${(props) => props.theme.colors.base.title};

      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    time {
      font: ${(props) => props.theme.fonts.text.small};
      color: ${(props) => props.theme.colors.base.span};
    }
  }

  p {
    font: ${(props) => props.theme.fonts.text.medium};
    color: ${(props) => props.theme.colors.base.text};

    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`
