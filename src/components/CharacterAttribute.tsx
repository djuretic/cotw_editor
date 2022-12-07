import React from 'react'
import {Row, Col, InputGroup, Form} from 'react-bootstrap'
import { FIELDS, NumberFieldId } from '../constants'
import { isInt } from '../utils'
import GameNumberInput from './GameNumberInput'

// https://stackoverflow.com/a/59906630
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
  type FixedLengthArray<T extends any[]> =
  Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
  & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }


interface CharacterAttributeProps {
  name: string,
  // var is a reserved keyword
  varr?: NumberFieldId,
  vars?: FixedLengthArray<[NumberFieldId, NumberFieldId]>,
  value?: number,
  values?: number[],
  onChange: (value: NumberFieldId | undefined, event: React.ChangeEvent<HTMLInputElement>) => void,
}

const attributeRules = (attributeName: NumberFieldId, value: number) => {
  const field = FIELDS[attributeName]
  const min = field.min ? field.min : 0
  const max = field.max ? field.max : Math.pow(2, 8*field.numBytes-1)-1
  const valid = isInt(value) && min <= value && value <= max
  return {min, max, valid}
}

const CharacterAttribute: React.FC<CharacterAttributeProps> = ({name, varr, vars, value, values, onChange}) => {
  var inputs;
  const inputId = 'attribute-' + (vars ? vars[0] : varr);
  let isValid = false;
  if (vars && values) {
    let var1 = vars[0]
    let var2 = vars[1]
    const rules = [
      attributeRules(var1, values[0]),
      attributeRules(var2, values[1]),
    ]
    isValid = rules[0].valid && rules[1].valid
    inputs = (
      <InputGroup>
        <GameNumberInput id={inputId} value={values[0]} onChange={e => onChange(var1, e)} {...rules[0]}/>
        <InputGroup.Text>/</InputGroup.Text>
        <GameNumberInput value={values[1]} onChange={e => onChange(var2, e)} {...rules[1]}/>
      </InputGroup>
    );
  } else if (varr && value !== undefined) {
    const rules = attributeRules(varr, value);
    isValid = rules.valid;
    inputs = <GameNumberInput id={inputId} value={value} onChange={e => onChange(varr, e)} {...rules} />;
  }
  return (
    <Row className={isValid ? '' : 'has-error'}>
      <Col xs={4} md={6} className="text-right">
        <Form.Label htmlFor={inputId}>{name}</Form.Label>
      </Col>
      <Col xs={8} md={6}>{inputs}</Col>
    </Row>
  );
}

export default CharacterAttribute