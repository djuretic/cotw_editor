import React from 'react';
import {Row, Col} from 'react-bootstrap';
import GameNumberInput from './GameNumberInput';

var CharacterAttribute = React.createClass({
	propTypes: {
		name: React.PropTypes.string.isRequired,
		var: React.PropTypes.string.isRequired,
		value: React.PropTypes.number,
		onChange: React.PropTypes.func.isRequired,
	},
	render() {
		return (
			<Row>
				<Col md={6} className="text-right">{this.props.name}</Col>
				<Col md={6}>
					<GameNumberInput var={this.props.var} value={this.props.value} onChange={this.props.onChange}/>
				</Col>
			</Row>
		);
	}
});

export default CharacterAttribute;