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


class SpellRow extends React.Component<SpellRowProps> {
  render() {
    const isValid = isInt(this.props.value)
    let learned = false
    if (isValid) {
      // @ts-ignore
      const intValue = parseInt(this.props.value) // TODO value can be string
      learned = isValid && intValue !== -1 && intValue !== -2
    }
    const n = this.props.index || 0
    const cssClases = 'spell '+(learned ? 'spell-learned ' : 'spell-not-learned ') + (isValid ? '' : 'has-error')
    return (
      <React.Fragment>
        <Col xs={4} md={3} className={"text-right " + cssClases}>
          <SpellIcon spellNumber={n} />
          <Form.Label className="hide-overflow" htmlFor={`spell-${this.props.spellName}`}>{formatSpellName(this.props.spellName)}</Form.Label>
        </Col>
        <Col xs={2} md={1} className={cssClases}>
          <Form.Control
            id={`spell-${this.props.spellName}`}
            type="number"
            value={this.props.value}
            min="-9"
            max="9"
            onChange={(event) => {if(this.props.handleChange) this.props.handleChange(this.props.spellName, event as React.ChangeEvent<HTMLInputElement>)}}
            required
          />
        </Col>
      </React.Fragment>
    )
  }
}

export default SpellRow
