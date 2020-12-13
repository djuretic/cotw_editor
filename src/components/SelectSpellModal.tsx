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

const SelectSpellModal: React.FC<SelectSpellModalProps> = ({show, slot, value, onHide, onSelectSpell}) => {
  if (slot === null) {
    return null
  }
  let cellClass = "select-spell"
  let spells = [
    <Col xs={4} className={cellClass} onClick={() => {onSelectSpell(slot, -1); onHide()}}>
      <SpellIcon spellNumber={-1}/>(None)
    </Col>
  ]
  for (let spellId of spellIds) {
    const n = spellIds.indexOf(spellId)
    spells.push(
      <Col xs={4} className={cellClass} onClick={() => {onSelectSpell(slot, n); onHide()}}>
        <SpellIcon spellNumber={n}/>
        {formatSpellName(spellId)}
      </Col>
    )
  }
  return (
    <Modal size="lg" show={show} onHide={onHide}>
      <Modal.Header closeButton>
      <Modal.Title>Select spell for slot {slot + 1}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="spell-modal-row">{spells}</Row>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SelectSpellModal
