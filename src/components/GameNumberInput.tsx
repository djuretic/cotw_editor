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

class GameNumberInput extends React.Component<GameNumberInputProps> {
  render() {
    return (
      <Form.Control className={this.props.valid ? '' : 'has-error'} type="number" min={this.props.min} max={this.props.max} value={this.props.value}
        onChange={this.props.onChange} id={this.props.id} required/>
    )
  }
}

export default GameNumberInput
