import { useState } from 'react'

import { ShoppingCart } from 'phosphor-react'

import { QuantityControl } from '../QuantityControl'
import { Coffee } from '../../utils/coffees'
import { useCartContext } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/currency'

import { Wrapper } from './styles'

interface CardCatalogProps {
  coffee: Coffee
}

const minValue = 1
const maxValue = 99

export function CardCatalog({ coffee }: CardCatalogProps) {
  const { addItemCart } = useCartContext()

  const [qtdValue, setQtdValue] = useState(1)

  const handleAddCart = (coffee: Coffee) => {
    addItemCart({
      id: coffee.id,
      name: coffee.name,
      quantity: qtdValue,
      unit_value: coffee.value,
    })
  }

  const handleChangeQuantity = (value: number, reset?: boolean) => {
    if (reset) {
      setQtdValue(value)
    } else {
      setQtdValue((state) => (state < maxValue ? state + value : state))
    }
  }

  return (
    <Wrapper key={coffee.id}>
      <img src={coffee.image} alt={`Imagem do ${coffee.name}`} />

      <div className="type-container">
        {coffee.labels.map((label) => (
          <label key={`${coffee.name}_${label}`} className="type">
            {label}
          </label>
        ))}
      </div>

      <h4>{coffee.name}</h4>

      <p className="desc">{coffee.desc}</p>

      <footer>
        <p className="currency">
          <span>R$ </span> {formatCurrency(coffee.value)}
        </p>

        <div className="box">
          <QuantityControl
            value={qtdValue}
            minValue={minValue}
            maxValue={maxValue}
            onChange={handleChangeQuantity}
          />

          <button className="button-cart" onClick={() => handleAddCart(coffee)}>
            <ShoppingCart size={22} weight="fill" />
          </button>
        </div>
      </footer>
    </Wrapper>
  )
}
