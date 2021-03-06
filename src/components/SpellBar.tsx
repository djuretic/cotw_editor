import React from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { SpellNumber, spellIds } from '../constants'
import SpellIcon from './SpellIcon'
import { formatSpellName } from '../utils'

interface SpellBarProps {
  bar: SpellNumber[],
  onClick: (slot: number) => void
}


const SpellBar: React.FC<SpellBarProps> = ({bar, onClick}) => {
  let spells = []
  let n = 0
  for (let spell of bar) {
    // needed for closure
    let current = n
    spells.push(
      <OverlayTrigger
        key={`menu-bar-${n}`}
        placement="bottom"
        overlay={
        <Tooltip id={`tooltip-${spell}`}>Slot {n+1}: {formatSpellName(spellIds[spell]) || "(None)"}</Tooltip>
        }>
        <Button
          className="spell-menu-button"
          variant="outline-secondary"
          onClick={() => {onClick(current)}}>
            <SpellIcon spellNumber={spell} />
        </Button>
      </OverlayTrigger>
    )
    n++
  }
  return (
    <fieldset>
      <legend>Spell menu</legend>
      <p>You can even set spells that you haven't learned, and that includes Create Traps, Haste Monster, Teleport Away and Clone Monster.</p>
      <p>{spells}</p>
    </fieldset>
  )

}

export default SpellBar
