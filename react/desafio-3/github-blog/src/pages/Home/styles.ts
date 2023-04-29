import styled from 'styled-components'

export const CoverContainer = styled.section`
  display: flex;

  img {
    width: 100%;
  }
`

export const ContentContainer = styled.main`
  width: 100%;
  max-width: 56rem;
  padding: 0 1rem;
  margin: 0 auto;
`

export const ProfileContainer = styled.section`
  position: relative;
  background: ${(props) => props.theme.colors.base.profile};
  border-radius: 10px;
  padding: 2rem 2.5rem;
  margin-top: -5.5rem;
  box-shadow: 0px 2px 28px rgba(0, 0, 0, 0.2);

  display: flex;
  gap: 2rem;

  img {
    width: 9.25rem;
    height: 9.25rem;
    border-radius: 8px;
  }
`

export const ProfileInfo = styled.div`
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
      align-items: baseline;
      gap: 0.5rem;

      font: ${(props) => props.theme.fonts.components.link};
      color: ${(props) => props.theme.colors.brand.blue};
      text-transform: uppercase;
    }
  }

  .description {
    font: ${(props) => props.theme.fonts.text.medium};
    color: ${(props) => props.theme.colors.base.text};
    margin-bottom: 1.5rem;
  }

  .social {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 1.5rem;

    li {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      span {
        font: ${(props) => props.theme.fonts.text.medium};
        color: ${(props) => props.theme.colors.base.subtitle};
      }

      svg {
        color: ${(props) => props.theme.colors.base.label};
        font-size: 1.125rem;
      }
    }
  }
`
