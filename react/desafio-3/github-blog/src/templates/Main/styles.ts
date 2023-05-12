import styled from 'styled-components'

export const CoverContainer = styled.section`
  display: flex;
  min-height: 16rem;
  background-image: url('/cover.svg');
  background-size: cover;

  img {
    width: 100%;
  }
`

export const ContentContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 46px;

  width: 100%;
  max-width: 56rem;
  padding: 0 1rem;
  margin: -14rem auto 2rem;
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
