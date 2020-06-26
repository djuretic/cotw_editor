import React from 'react'
import { Modal, Button, Row, Col } from 'react-bootstrap'
import { SpellNumber, spellIds } from '../constants'
import { formatSpellName } from '../utils'
import SpellIcon from './SpellIcon'

interface SelectSpellModalProps {
  show: boolean,
  slot: number | null,
  value: SpellNumber | null,
  onHide: () => void
}

class SelectSpellModal extends React.Component<SelectSpellModalProps> {
  render() {
    if (this.props.slot === null) {
      return null
    }
    let spells = []
    for (let spellId of spellIds) {
      const n = spellIds.indexOf(spellId)
      spells.push(
        <Col xs={4}>
          <Button key={`spell-${n}`} variant="outline-primary">
            <SpellIcon spellNumber={n}/>
            {formatSpellName(spellId)}
          </Button>
        </Col>
      )
    }
    return (
      <Modal size="lg" show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
        <Modal.Title>Select spell for slot {this.props.slot + 1}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>{spells}</Row>
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
