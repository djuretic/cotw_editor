import React from 'react'
import { Row, Col, Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import SpellFilter from './SpellFilter'
import SpellRow from './SpellRow'
import {
  SpellId, spellIds, emptySpellbook, spellTypes,
  SpellType, SPELL_TYPES, nonLearnableSpellIds
} from '../constants'

interface SpellbookProps {
  spells: Record<SpellId, number>,
  handleChange: (spellName: SpellId, event: React.ChangeEvent<HTMLInputElement>) => void
}

interface SpellbookState {
  spells: Record<SpellId, number>,
  filterText: string,
  spellType: SpellType | ""
}

class Spellbook extends React.Component<SpellbookProps, SpellbookState> {
  state: SpellbookState = {spells: emptySpellbook(), filterText: '', spellType: ""}

  handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({filterText: event.target.value.replace(/\s+/g, '')});
  }

  handleTypeChange = (spellType: SpellType | "") => {
    this.setState({spellType: spellType})
  }

  render() {
    let spells = []
    const spellType = this.state.spellType
    for (let spellId of spellIds) {
      if (spellType && !SPELL_TYPES[spellType].includes(spellId)) {
        continue
      }
      if (nonLearnableSpellIds.includes(spellId)) {
        continue
      }
      let filtered = spellId.toUpperCase().indexOf(this.state.filterText.toUpperCase()) >= 0
      if (filtered) {
        let value = this.props.spells[spellId]
        const n = spellIds.indexOf(spellId)
        spells.push(<SpellRow key={spellId} spellName={spellId} index={n} value={value} handleChange={this.props.handleChange} />)
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
            <SpellFilter onChange={this.handleFilterChange}/>
            <Col xs={6}>
              <ToggleButtonGroup onChange={this.handleTypeChange} type="radio" name="spellType" defaultValue="">
                <ToggleButton variant="secondary" value="">all</ToggleButton>
                {spellTypeButtons}
              </ToggleButtonGroup>
            </Col>
          </Row>
          <Row>
            {spells}
          </Row>
        </Container>
      </fieldset>
    )
  }
}

export default Spellbook
