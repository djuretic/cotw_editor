import React, { PropTypes } from 'react';
import { Col, FormControl, ControlLabel } from 'react-bootstrap';
import { isInt } from '../utils';

var SpellRow = React.createClass({
	propTypes: {
		spellName: PropTypes.string.isRequired,
		index: PropTypes.number,
		value: PropTypes.number,
		handleChange: PropTypes.func,
	},

	render() {
		const isValid = isInt(this.props.value);
		const learned = isValid && this.props.value !== -1 && this.props.value !== -2;
		const handleChange = (event) => this.props.handleChange(this.props.spellName, event);
		// source: http://stackoverflow.com/a/1026087
		let longSpellName = this.props.spellName.charAt(0).toUpperCase() + this.props.spellName.slice(1);
		longSpellName = longSpellName.replace(/([a-z.])([A-Z])/g, '$1 $2');
		const n = this.props.index;
		// the last 4 spells don't have icons
		const spriteStyles = n >= 32 ? {background: 'none'} : {backgroundPosition: `-${24*n}px -${22*Math.floor(n/8)}px`};
		return (
			<div className={'spell '+(learned ? 'spell-learned ' : 'spell-not-learned ') + (isValid ? '' : 'has-error')}>
				<Col md={3} className="text-right">
					<span className="spell-icon" style={spriteStyles}/>
					<ControlLabel htmlFor={`spell-${this.props.spellName}`}>{longSpellName}</ControlLabel>
				</Col>
				<Col md={1}>
					<FormControl id={`spell-${this.props.spellName}`} type="number" value={this.props.value} min="-9" max="9" onChange={handleChange} required/>
				</Col>
			</div>
		);
	}
});

export default SpellRow;
