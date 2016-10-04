import React, { PropTypes } from 'react';
import {Row, Col, InputGroup, ControlLabel} from 'react-bootstrap';
import { FIELDS } from '../constants';
import { isInt } from '../utils';
import GameNumberInput from './GameNumberInput';

var CharacterAttribute = React.createClass({
	propTypes: {
		name: PropTypes.string.isRequired,
		var: PropTypes.string,
		vars: PropTypes.arrayOf(PropTypes.string),
		value: PropTypes.number,
		values: PropTypes.arrayOf(PropTypes.number),
		onChange: PropTypes.func.isRequired,
	},
	attributeRules(attributeName, value) {
		const field = FIELDS[attributeName];
		const min = field.min ? field.min : 0;
		const max = field.max ? field.max : Math.pow(2, 8*field.numBytes-1)-1;
		const valid = isInt(value) && min <= value && value <= max;
		return {min, max, valid};
	},
	render() {
		var inputs;
		const inputId = 'attribute-' + (this.props.vars ? this.props.vars[0] : this.props.var);
		let isValid = false;
		if(this.props.vars) {
			const rules = [0,1].map( i => this.attributeRules(this.props.vars[i], this.props.values[i]) );
			isValid = rules[0].valid && rules[1].valid;
			inputs = (
				<InputGroup>
					<GameNumberInput id={inputId} value={this.props.values[0]} onChange={e => this.props.onChange(this.props.vars[0], e)} {...rules[0]}/>
					<InputGroup.Addon>/</InputGroup.Addon>
					<GameNumberInput value={this.props.values[1]} onChange={e => this.props.onChange(this.props.vars[1], e)} {...rules[1]}/>
				</InputGroup>
			);
		} else {
			const rules = this.attributeRules(this.props.var, this.props.value);
			isValid = rules.valid;
			inputs = <GameNumberInput id={inputId} value={this.props.value} onChange={e => this.props.onChange(this.props.var, e)} {...rules} />;
		}
		return (
			<Row className={isValid ? '' : 'has-error'}>
				<Col md={6} className="text-right">
					<ControlLabel htmlFor={inputId}>{this.props.name}</ControlLabel>
				</Col>
				<Col md={6}>{inputs}</Col>
			</Row>
		);
	}
});

export default CharacterAttribute;