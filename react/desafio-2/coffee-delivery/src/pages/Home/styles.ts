import styled from 'styled-components'

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.background};

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 2rem;
    width: 100%;
    max-width: 78rem;
    margin: 0 auto;

    > a {
      font-size: 0;

      img {
        height: 2.5rem;
      }
    }
  }
`

export const HeaderCart = styled.div`
  display: flex;
  gap: 0.75rem;

  span,
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 0.5rem;
    border-radius: 8px;
  }

  span {
    background: ${(props) => props.theme.purple.purpleLight};
    color: ${(props) => props.theme.purple.purpleDark};
    font-size: 0.875rem;
    line-height: 130%;

    svg {
      color: ${(props) => props.theme.purple.base};
    }
  }

  a {
    background: ${(props) => props.theme.brand.yellowLight};
    color: ${(props) => props.theme.brand.yellowDark};
  }
`

export const SectionIntro = styled.section`
  img {
    width: 100%;
  }
`
