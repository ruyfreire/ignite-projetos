import { HomeContainer, Product } from './styles'

import tShirt1 from '@/assets/t_shirts/1.png'
import tShirt2 from '@/assets/t_shirts/2.png'
import tShirt3 from '@/assets/t_shirts/3.png'
import tShirt4 from '@/assets/t_shirts/4.png'
import Image from 'next/image'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={tShirt1} alt="" />

        <footer>
          <strong>Camiseta</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={tShirt2} alt="" />

        <footer>
          <strong>Camiseta</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
