import styled from 'styled-components'

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
