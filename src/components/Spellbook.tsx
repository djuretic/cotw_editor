import React, { useState } from 'react'
import { Row, Col, Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import SpellFilter from './SpellFilter'
import SpellRow from './SpellRow'
import {
  SpellId, spellIds, spellTypes,
  SpellType, SPELL_TYPES, nonLearnableSpellIds
} from '../constants'

interface SpellbookProps {
  spells: Record<SpellId, number>,
  handleChange: (spellName: SpellId, event: React.ChangeEvent<HTMLInputElement>) => void
}

const Spellbook: React.FC<SpellbookProps> = ({spells, handleChange}) =>{
  const [filterText, setFilterText] = useState('')
  const [spellType, setSpellType] = useState<SpellType | "">('')
  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value.replace(/\s+/g, ''))
  }

  let filteredSpells = []
  for (let spellId of spellIds) {
    if (spellType && !SPELL_TYPES[spellType].includes(spellId)) {
      continue
    }
    if (nonLearnableSpellIds.includes(spellId)) {
      continue
    }
    let filtered = spellId.toUpperCase().indexOf(filterText.toUpperCase()) >= 0
    if (filtered) {
      let value = spells[spellId]
      const n = spellIds.indexOf(spellId)
      filteredSpells.push(<SpellRow key={spellId} spellName={spellId} index={n} value={value} handleChange={handleChange} />)
    }
  }
  let spellTypeButtons = spellTypes.map(spellType => {
    return <ToggleButton key={spellType} variant="secondary" value={spellType}>{spellType}</ToggleButton>
  })
  return (
    <fieldset>
      <legend>Spellbook</legend>
      <p>The number next to the spell is the MP cost, setting a spell to 0 makes it free. Setting it to a value other
      than -1 or -2 will make the spell casteable.</p>
      <p>Note: leveling up will update the MP cost for all the castable spells to the real cost. </p>
      <Container>
        <Row>
          <SpellFilter onChange={handleFilterChange}/>
          <Col xs={6}>
            <ToggleButtonGroup onChange={setSpellType} type="radio" name="spellType" defaultValue="">
              <ToggleButton variant="secondary" value="">all</ToggleButton>
              {spellTypeButtons}
            </ToggleButtonGroup>
          </Col>
        </Row>
        <Row>
          {filteredSpells}
        </Row>
      </Container>
    </fieldset>
  )
}

export default Spellbook
