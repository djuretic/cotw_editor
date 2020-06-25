import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { SpellNumber, spellIds } from '../constants'
import SpellIcon from './SpellIcon'
import { formatSpellName } from '../utils'

interface SpellBarProps {
  bar: SpellNumber[]
}


class SpellBar extends React.Component<SpellBarProps> {

  render() {
    let spells = []
    for (let spell of this.props.bar) {
      spells.push(
        <OverlayTrigger
          key={spell}
          placement="bottom"
          overlay={
            <Tooltip id={`tooltip-${spell}`}>{formatSpellName(spellIds[spell]) || "(None)"}</Tooltip>
          }>
          <Button className="spell-menu-button" variant="outline-secondary"><SpellIcon spellNumber={spell} /></Button>
        </OverlayTrigger>
      )
    }
    return (
      <fieldset>
        <legend>Spell Menu</legend>
        <p>You can set spells that you haven't learned, and that includes Create Traps, Haste Monster, Teleport Away and Clone Monster.</p>
        <p>{spells}</p>
      </fieldset>
    )
  }
}

export default SpellBar
