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
  margin: 0 auto 2rem;
`

export const ProfileContainer = styled.section`
  position: relative;
  background: ${(props) => props.theme.colors.base.profile};
  border-radius: 10px;
  padding: 2rem 2.5rem;
  margin-top: -5.5rem;
  margin-bottom: 4.5rem;
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

export const SearchContainer = styled.section`
  margin-bottom: 3rem;

  .subtitle {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    p {
      font: ${(props) => props.theme.fonts.title.small};
      color: ${(props) => props.theme.colors.base.subtitle};
    }

    span {
      font: ${(props) => props.theme.fonts.text.small};
      color: ${(props) => props.theme.colors.base.span};
    }
  }

  input {
    width: 100%;
    border: 1px solid ${(props) => props.theme.colors.base.border};
    background: ${(props) => props.theme.colors.base.input};
    padding: 0.75rem 1rem;
    border-radius: 6px;

    font: ${(props) => props.theme.fonts.text.medium};
    color: ${(props) => props.theme.colors.base.text};

    &::placeholder {
      color: ${(props) => props.theme.colors.base.label};
    }
  }
`

export const CardContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
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
      font: ${(props) => props.theme.fonts.title.medium};
      color: ${(props) => props.theme.colors.base.title};
      flex: 1;
    }

    time {
      font: ${(props) => props.theme.fonts.text.small};
      color: ${(props) => props.theme.colors.base.span};
    }
  }

  p {
    font: ${(props) => props.theme.fonts.text.medium};
    color: ${(props) => props.theme.colors.base.text};
  }
`
