import { Minus, Plus } from 'phosphor-react'

import { Wrapper } from './styles'

interface QuantityControlProps {
  value: number
  minValue?: number
  maxValue?: number
  onChange: (value: number, reset?: boolean) => void
}

export function QuantityControl({
  value,
  onChange,
  minValue = 1,
  maxValue = 99,
}: QuantityControlProps) {
  const handleOnChange = (number: number) => {
    if (
      Number.isInteger(number) &&
      number >= minValue &&
      number <= maxValue &&
      value !== number
    ) {
      onChange(number, true)
    }
  }

  return (
    <Wrapper>
      <button onClick={() => onChange(-1)} disabled={value === minValue}>
        <Minus size={14} weight="bold" />
      </button>

      <input
        type="number"
        name="quantity"
        min={minValue}
        max={maxValue}
        step={1}
        value={value}
        onChange={(event) => handleOnChange(Number(event.target.value))}
      />

      <button onClick={() => onChange(1)} disabled={value === maxValue}>
        <Plus size={14} weight="bold" />
      </button>
    </Wrapper>
  )
}
