import { Outlet } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import * as S from './styles'

export const Main = () => {
  return (
    <div>
      <S.CoverContainer />

      <S.ContentContainer>
        <img className="main-logo" src={Logo} alt="" />
        <Outlet />
      </S.ContentContainer>
    </div>
  )
}
