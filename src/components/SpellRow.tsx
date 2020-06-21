import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { isInt } from '../utils'
import { SpellId } from '../constants'

interface SpellRowProps {
  spellName: SpellId,
  index?: number,
  value?: number,
  handleChange?: (spellName: SpellId, event: React.ChangeEvent<HTMLInputElement>) => void
}


class SpellRow extends React.Component<SpellRowProps> {
  render() {
    const isValid = isInt(this.props.value)
    const learned = isValid && this.props.value !== -1 && this.props.value !== -2
    // source: http://stackoverflow.com/a/1026087
    let longSpellName = this.props.spellName.charAt(0).toUpperCase() + this.props.spellName.slice(1);
    longSpellName = longSpellName.replace(/([a-z.])([A-Z])/g, '$1 $2')
    const n = this.props.index || 0
    // the last 4 spells don't have icons
    const spriteStyles = n >= 32 ? {background: 'none'} : {backgroundPosition: `-${24*n}px -${22*Math.floor(n/8)}px`}
    return (
      <div className={'spell '+(learned ? 'spell-learned ' : 'spell-not-learned ') + (isValid ? '' : 'has-error')}>
        <Col xs={4} md={3} className="text-right">
          <span className="spell-icon" style={spriteStyles}/>
          <Form.Label className="hide-overflow" htmlFor={`spell-${this.props.spellName}`}>{longSpellName}</Form.Label>
        </Col>
        <Col xs={2} md={1}>
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
      </div>
    )
  }
}

export default SpellRow
