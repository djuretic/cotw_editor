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
  var?: NumberFieldId,
  vars?: FixedLengthArray<[NumberFieldId, NumberFieldId]>,
  value?: number,
  values?: number[],
  onChange: (value: NumberFieldId | undefined, event: React.ChangeEvent<HTMLInputElement>) => void,
}

class CharacterAttribute extends React.Component<CharacterAttributeProps> {
  attributeRules(attributeName: NumberFieldId, value: number) {
    const field = FIELDS[attributeName]
    const min = field.min ? field.min : 0
    const max = field.max ? field.max : Math.pow(2, 8*field.numBytes-1)-1
    const valid = isInt(value) && min <= value && value <= max
    return {min, max, valid}
  }

  render() {
    var inputs;
    const inputId = 'attribute-' + (this.props.vars ? this.props.vars[0] : this.props.var);
    let isValid = false;
    if (this.props.vars && this.props.values) {
      let var1 = this.props.vars[0]
      let var2 = this.props.vars[1]
      const rules = [
        this.attributeRules(var1, this.props.values[0]),
        this.attributeRules(var2, this.props.values[1]),
      ]
      isValid = rules[0].valid && rules[1].valid
      inputs = (
        <InputGroup>
          <GameNumberInput id={inputId} value={this.props.values[0]} onChange={e => this.props.onChange(var1, e)} {...rules[0]}/>
          {/* <InputGroup.Addon>/</InputGroup.Addon> */}
          <GameNumberInput value={this.props.values[1]} onChange={e => this.props.onChange(var2, e)} {...rules[1]}/>
        </InputGroup>
      );
    } else if (this.props.var && this.props.value) {
      const rules = this.attributeRules(this.props.var, this.props.value);
      isValid = rules.valid;
      inputs = <GameNumberInput id={inputId} value={this.props.value} onChange={e => this.props.onChange(this.props.var, e)} {...rules} />;
    }
    return (
      <Row className={isValid ? '' : 'has-error'}>
        <Col xs={4} md={6} className="text-right">
          <Form.Label htmlFor={inputId}>{this.props.name}</Form.Label>
        </Col>
        <Col xs={8} md={6}>{inputs}</Col>
      </Row>
    );
  }
}

export default CharacterAttribute