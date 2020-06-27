import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { SpellNumber, spellIds } from '../constants'
import { formatSpellName } from '../utils'
import SpellIcon from './SpellIcon'

interface SelectSpellModalProps {
  show: boolean,
  slot: number | null,
  value: SpellNumber | null,
  onHide: () => void,
  onSelectSpell: (slot: number | null, spellNumber: SpellNumber) => void
}

class SelectSpellModal extends React.Component<SelectSpellModalProps> {
  handleSelectSpell(spellNumber: SpellNumber) {
    this.props.onSelectSpell(this.props.slot, spellNumber)
    this.props.onHide()
  }


  render() {
    if (this.props.slot === null) {
      return null
    }
    let cellClass = "select-spell"
    let spells = [
      <Col xs={4} className={cellClass} onClick={() => this.handleSelectSpell(-1)}>
        <SpellIcon spellNumber={-1}/>(None)
      </Col>
    ]
    for (let spellId of spellIds) {
      const n = spellIds.indexOf(spellId)
      spells.push(
        <Col xs={4} className={cellClass} onClick={() => this.handleSelectSpell(n)}>
          <SpellIcon spellNumber={n}/>
          {formatSpellName(spellId)}
        </Col>
      )
    }
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
        <Modal.Title>Select spell for slot {this.props.slot + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="spell-modal-row">{spells}</Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={this.props.onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default SelectSpellModal
