import React, { PropTypes } from 'react';
import {Row, Col, InputGroup} from 'react-bootstrap';
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
	render() {
		var inputs;
		if(this.props.vars) {
			inputs = (
				<InputGroup>
					<GameNumberInput var={this.props.vars[0]} value={this.props.values[0]} onChange={this.props.onChange}/>
					<InputGroup.Addon>/</InputGroup.Addon>
					<GameNumberInput var={this.props.vars[1]} value={this.props.values[1]} onChange={this.props.onChange}/>
				</InputGroup>
			);
		} else {
			inputs = <GameNumberInput var={this.props.var} value={this.props.value} onChange={this.props.onChange}/>;
		}
		return (
			<Row>
				<Col md={6} className="text-right">{this.props.name}</Col>
				<Col md={6}>{inputs}</Col>
			</Row>
		);
	}
});

export default CharacterAttribute;