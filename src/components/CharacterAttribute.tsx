import { Col, Form, InputGroup, Row } from "react-bootstrap"
import { FIELDS, type NumberFieldId } from "../constants"
import { isInt } from "../utils"
import GameNumberInput from "./GameNumberInput"

interface CharacterAttributeProps {
  name: string
  // var is a reserved keyword
  varr?: NumberFieldId
  vars?: readonly [current: NumberFieldId, max: NumberFieldId]
  value?: number
  values?: readonly [current: number, max: number]
  onChange: (
    value: NumberFieldId | undefined,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => void
}

const attributeRules = (attributeName: NumberFieldId, value: number) => {
  const field = FIELDS[attributeName]
  const min = field.min ? field.min : 0
  const max = field.max ? field.max : 2 ** (8 * field.numBytes - 1) - 1
  const valid = isInt(value) && min <= value && value <= max
  return { min, max, valid }
}

const CharacterAttribute: React.FC<CharacterAttributeProps> = ({
  name,
  varr,
  vars,
  value,
  values,
  onChange,
}) => {
  let inputs = <></>
  const inputId = `attribute-${vars ? vars[0] : varr}`
  let isValid = false
  if (vars && values) {
    const var1 = vars[0]
    const var2 = vars[1]
    const rules = [
      attributeRules(var1, values[0]),
      attributeRules(var2, values[1]),
    ] as const
    isValid = rules[0].valid && rules[1].valid
    inputs = (
      <InputGroup>
        <GameNumberInput
          id={inputId}
          value={values[0]}
          onChange={(e) => onChange(var1, e)}
          {...rules[0]}
        />
        <InputGroup.Text>/</InputGroup.Text>
        <GameNumberInput
          value={values[1]}
          onChange={(e) => onChange(var2, e)}
          {...rules[1]}
        />
      </InputGroup>
    )
  } else if (varr && value !== undefined) {
    const rules = attributeRules(varr, value)
    isValid = rules.valid
    inputs = (
      <GameNumberInput
        id={inputId}
        value={value}
        onChange={(e) => onChange(varr, e)}
        {...rules}
      />
    )
  }
  return (
    <Row className={isValid ? "" : "has-error"}>
      <Col xs={4} md={6} className="text-right">
        <Form.Label htmlFor={inputId}>{name}</Form.Label>
      </Col>
      <Col xs={8} md={6}>
        {inputs}
      </Col>
    </Row>
  )
}

export default CharacterAttribute
