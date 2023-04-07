import { Trash } from 'phosphor-react'

import { Button } from '../Button'
import { QuantityControl } from '../QuantityControl'
import { Item } from '../../reducers/cart'
import { formatCurrency } from '../../utils/currency'
import { useCartContext } from '../../contexts/CartContext'
import { Wrapper } from './styles'

interface CardCheckoutProps {
  itemCart: Item
}

export function CardCheckout({ itemCart }: CardCheckoutProps) {
  const { updateItemCart } = useCartContext()

  const handleChangeValue = (quantity: number) => {
    updateItemCart({
      id: itemCart.id,
      image_url: itemCart.image_url,
      name: itemCart.name,
      quantity,
      unit_value: itemCart.unit_value,
    })
  }

  return (
    <Wrapper>
      <div className="card">
        <img src={itemCart.image_url} alt="" />

        <div className="card-content">
          <p className="card-name">{itemCart.name}</p>

          <QuantityControl
            name="quantity"
            initialValue={itemCart.quantity}
            onChange={handleChangeValue}
          />

          <Button icon={<Trash size={16} />} size="sm">
            Remover
          </Button>
        </div>

        <p className="card-value">{formatCurrency(itemCart.total_value)}</p>
      </div>
    </Wrapper>
  )
}
