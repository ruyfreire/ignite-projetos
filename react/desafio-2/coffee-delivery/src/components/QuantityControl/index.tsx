import { Minus, Plus } from 'phosphor-react'

import { Wrapper } from './styles'

export function QuantityControl() {
  return (
    <Wrapper>
      <button>
        <Minus size={14} weight="bold" />
      </button>

      <input type="number" min={0} max={99} step={1} defaultValue={1} />

      <button>
        <Plus size={14} weight="bold" />
      </button>
    </Wrapper>
  )
}
