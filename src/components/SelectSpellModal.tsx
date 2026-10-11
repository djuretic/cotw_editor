import { Button, Col, Modal, Row } from "react-bootstrap"
import { type SpellNumber, spellIds } from "../constants"
import { formatSpellName } from "../utils"
import SpellIcon from "./SpellIcon"

interface SelectSpellModalProps {
  show: boolean
  slot: number | null
  onHide: () => void
  onSelectSpell: (slot: number | null, spellNumber: SpellNumber) => void
}

const SelectSpellModal: React.FC<SelectSpellModalProps> = ({
  show,
  slot,
  onHide,
  onSelectSpell,
}) => {
  if (slot === null) {
    return null
  }
  const cellClass = "select-spell"
  const spells = [
    <Col
      key={-1}
      xs={4}
      className={cellClass}
      onClick={() => {
        onSelectSpell(slot, -1)
        onHide()
      }}
    >
      <SpellIcon spellNumber={-1} />
      (None)
    </Col>,
  ]
  for (const spellId of spellIds) {
    const n = spellIds.indexOf(spellId)
    spells.push(
      <Col
        key={n}
        xs={4}
        className={cellClass}
        onClick={() => {
          onSelectSpell(slot, n)
          onHide()
        }}
      >
        <SpellIcon spellNumber={n} />
        {formatSpellName(spellId)}
      </Col>,
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
