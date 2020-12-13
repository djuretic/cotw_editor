import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { isInt, formatSpellName } from '../utils'
import { SpellId } from '../constants'
import SpellIcon from './SpellIcon'

interface SpellRowProps {
  spellName: SpellId,
  index?: number,
  value?: number,
  handleChange?: (spellName: SpellId, event: React.ChangeEvent<HTMLInputElement>) => void
}


const SpellRow: React.FC<SpellRowProps> = ({spellName, index, value, handleChange}) => {
  const isValid = isInt(value)
  let learned = false
  if (isValid) {
    // @ts-ignore
    const intValue = parseInt(value) // TODO value can be string
    learned = isValid && intValue !== -1 && intValue !== -2
  }
  const n = index || 0
  const cssClases = 'spell '+(learned ? 'spell-learned ' : 'spell-not-learned ') + (isValid ? '' : 'has-error')
  return (
    <React.Fragment>
      <Col xs={4} md={3} className={"text-right " + cssClases}>
        <SpellIcon spellNumber={n} />
        <Form.Label className="hide-overflow" htmlFor={`spell-${spellName}`}>{formatSpellName(spellName)}</Form.Label>
      </Col>
      <Col xs={2} md={1} className={cssClases}>
        <Form.Control
          id={`spell-${spellName}`}
          type="number"
          value={value}
          min="-9"
          max="9"
          onChange={(event) => {if(handleChange) handleChange(spellName, event as React.ChangeEvent<HTMLInputElement>)}}
          required
        />
      </Col>
    </React.Fragment>
  )
}

export default SpellRow
