import React from 'react';
import {Row, Col} from 'react-bootstrap';
import GameNumberInput from './GameNumberInput';

var CharacterAttribute = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		var: React.PropTypes.string,
		vars: React.PropTypes.arrayOf(React.PropTypes.string),
		value: React.PropTypes.number,
		values: React.PropTypes.arrayOf(React.PropTypes.number),
		onChange: React.PropTypes.func.isRequired,
	},
	render() {
		var inputs;
		if(this.props.vars) {
			inputs = (
				<Row>
					<Col md={5}><GameNumberInput var={this.props.vars[0]} value={this.props.values[0]} onChange={this.props.onChange}/></Col>
					<Col md={1}>/</Col>
					<Col md={5}><GameNumberInput var={this.props.vars[1]} value={this.props.values[1]} onChange={this.props.onChange}/></Col>
				</Row>
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