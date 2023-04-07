import { ShoppingCart } from 'phosphor-react'

import { QuantityControl, QuantityControlData } from '../QuantityControl'
import { Coffee } from '../../utils/coffees'
import { useCartContext } from '../../contexts/CartContext'
import { formatCurrency } from '../../utils/currency'

import { Wrapper } from './styles'
import { FormEvent } from 'react'

interface CardCatalogProps {
  coffee: Coffee
}

interface QuantityData {
  quantity: number
}

export function CardCatalog({ coffee }: CardCatalogProps) {
  const { addItemCart } = useCartContext()

  const handleAddCart = (event: FormEvent, coffee: Coffee) => {
    event.preventDefault()

    const { quantity } =
      event.target as unknown as QuantityControlData<QuantityData>

    addItemCart({
      id: coffee.id,
      name: coffee.name,
      image_url: coffee.image_url,
      quantity: Number(quantity.value),
      unit_value: coffee.unit_value,
    })
  }

  return (
    <Wrapper key={coffee.id}>
      <img src={coffee.image_url} alt={`Imagem do ${coffee.name}`} />

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
          <span>R$ </span> {formatCurrency(coffee.unit_value)}
        </p>

        <form
          className="box"
          onSubmit={(event) => handleAddCart(event, coffee)}
        >
          <QuantityControl name="quantity" />

          <button type="submit" className="button-cart">
            <ShoppingCart size={22} weight="fill" />
          </button>
        </form>
      </footer>
    </Wrapper>
  )
}
