import React from 'react'
import {Form} from 'react-bootstrap'

interface GameNumberInputProps {
  min: number,
  max: number,
  value?: number,
  valid?: boolean,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  id?: string,
}

const GameNumberInput: React.FC<GameNumberInputProps> = ({min, max, value, valid, onChange, id}) => {
  return (
    <Form.Control className={valid ? '' : 'has-error'} type="number" min={min} max={max} value={value}
      onChange={onChange} id={id} required/>
  )
}

export default GameNumberInput
