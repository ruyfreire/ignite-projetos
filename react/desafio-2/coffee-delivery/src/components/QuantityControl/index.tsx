import { useEffect, useRef, useState } from 'react'
import { Minus, Plus } from 'phosphor-react'

import { Wrapper } from './styles'

interface QuantityControlProps {
  name: string
  initialValue?: number
  onChange?: (value: number) => void
}

export type QuantityControlData<Type> = {
  // eslint-disable-next-line no-unused-vars
  [Property in keyof Type]: {
    value: string
  }
}

const minValue = 1
const maxValue = 99

export function QuantityControl({
  name,
  onChange,
  initialValue = 1,
}: QuantityControlProps) {
  const [qtdValue, setQtdValue] = useState(initialValue)
  const started = useRef(false)

  const increment = () => {
    setQtdValue((state) => (state < maxValue ? state + 1 : state))
    started.current = true
  }

  const decrement = () => {
    setQtdValue((state) => (state > minValue ? state - 1 : state))
    started.current = true
  }

  const handleOnChange = (number: number) => {
    if (
      Number.isInteger(number) &&
      number >= minValue &&
      number <= maxValue &&
      qtdValue !== number
    ) {
      setQtdValue(number)
      started.current = true
    }
  }

  useEffect(() => {
    if (started.current && onChange) onChange(qtdValue)
  }, [qtdValue])

  return (
    <Wrapper>
      <button
        type="button"
        onClick={decrement}
        disabled={qtdValue === minValue}
      >
        <Minus size={14} weight="bold" />
      </button>

      <input
        type="number"
        name={name}
        min={minValue}
        max={maxValue}
        step={1}
        value={qtdValue}
        onChange={(event) => handleOnChange(Number(event.target.value))}
      />

      <button
        type="button"
        onClick={increment}
        disabled={qtdValue === maxValue}
      >
        <Plus size={14} weight="bold" />
      </button>
    </Wrapper>
  )
}
