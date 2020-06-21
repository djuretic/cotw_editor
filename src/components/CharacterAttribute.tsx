import React from 'react'
import {Row, Col, InputGroup, ControlLabel} from 'react-bootstrap'
import { FIELDS } from '../constants'
import { isInt } from '../utils'
import GameNumberInput from './GameNumberInput'

interface CharacterAttributeProps {
  name: string,
  var?: string,
  vars?: string[],
  value?: number,
  values?: number[],
  onChange: (value: string | undefined, event: React.ChangeEvent) => void,
}

class CharacterAttribute extends React.Component<CharacterAttributeProps> {
	attributeRules(attributeName: string, value: number) {
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
			const rules = [0,1].map( i => this.attributeRules(this.props.vars[i], this.props.values[i]) );
			isValid = rules[0].valid && rules[1].valid;
			inputs = (
				<InputGroup>
					<GameNumberInput id={inputId} value={this.props.values[0]} onChange={e => this.props.onChange(this.props.vars[0], e)} {...rules[0]}/>
					<InputGroup.Addon>/</InputGroup.Addon>
					<GameNumberInput value={this.props.values[1]} onChange={e => this.props.onChange(this.props.vars[1], e)} {...rules[1]}/>
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
					<ControlLabel htmlFor={inputId}>{this.props.name}</ControlLabel>
				</Col>
				<Col xs={8} md={6}>{inputs}</Col>
			</Row>
		);
	}
}

export default CharacterAttribute