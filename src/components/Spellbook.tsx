import React from 'react'
import { Row, Container } from 'react-bootstrap'
import SpellFilter from './SpellFilter'
import SpellRow from './SpellRow'
import {SpellId, spellIds, emptySpellbook} from '../constants'

interface SpellbookProps {
  spells: Record<SpellId, number>,
  handleChange: (spellName: SpellId, event: React.ChangeEvent<HTMLInputElement>) => void
}

interface SpellbookState {
  spells: Record<SpellId, number>,
  filterText: string
}

class Spellbook extends React.Component<SpellbookProps, SpellbookState> {
  state: SpellbookState = {spells: emptySpellbook(), filterText: ''}

  handleFilterChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({filterText: event.target.value.replace(/\s+/g, '')});
  }
  render() {
    let spells = []
    for (let spellId of spellIds) {
      let filtered = spellId.toUpperCase().indexOf(this.state.filterText.toUpperCase()) >= 0
      if (filtered) {
        let value = this.props.spells[spellId]
        const n = spellIds.indexOf(spellId)
        spells.push(<SpellRow key={spellId} spellName={spellId} index={n} value={value} handleChange={this.props.handleChange} />)
      }
    }
    return (
      <fieldset>
        <legend>Spellbook</legend>
        <p>The number next to the spell is the MP cost, setting a spell to 0 makes it free. Setting it to a value other
        than -1 or -2 will make the spell casteable.</p>
        <p>Note: leveling up will update the MP cost for all the castable spells to the real cost. </p>
        <Container>
          <Row>
            <SpellFilter onChange={this.handleFilterChange}/>
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
