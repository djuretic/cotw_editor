import React from 'react'
import { Button } from 'react-bootstrap'
import { SpellNumber } from '../constants'
import SpellIcon from './SpellIcon'

interface SpellBarProps {
  bar: SpellNumber[]
}


class SpellBar extends React.Component<SpellBarProps> {

  render() {
    let spells = []
    for (let spell of this.props.bar) {
      spells.push(<Button variant="outline-secondary"><SpellIcon spellNumber={spell} /></Button>)
    }
    return (
      <fieldset>
        <legend>Spell Menu</legend>
        <p>{spells}</p>
      </fieldset>
    )
  }
}

export default SpellBar
