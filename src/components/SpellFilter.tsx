import React from 'react'
import {Col, Form} from 'react-bootstrap'

interface SpellFilterProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SpellFilter: React.FC<SpellFilterProps> = ({onChange}) => {
  return (
    <Col md={4}>
      Filter by name:
      <Form.Control type="text" placeholder="Enter spell name here" onChange={onChange} />
    </Col>
  )
}

export default SpellFilter