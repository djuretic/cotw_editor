import React from 'react';
import {Row, Col, FormControl, ControlLabel} from 'react-bootstrap';
import SpellFilter from './SpellFilter.js';

var Spellbook = React.createClass({
	getInitialState() {
		return {spells: {}, filterText: ''};
	},
	handleFilterChange(event) {
		this.setState({filterText: event.target.value.replace(/\s+/g, '')});
	},
	render() {
		const allSpellNames = Object.keys(this.props.spells);
		const spells = allSpellNames.filter(str => str.toUpperCase().indexOf(this.state.filterText.toUpperCase()) >= 0).map((spellName) => {
			let value = this.props.spells[spellName];
			const learned = value !== -1 && value !== -2;
			const handleChange = (event) => this.props.handleChange(spellName, event);
			// source: http://stackoverflow.com/a/1026087
			let longSpellName = spellName.charAt(0).toUpperCase() + spellName.slice(1);
			longSpellName = longSpellName.replace(/([a-z.])([A-Z])/g, '$1 $2');
			const n = allSpellNames.indexOf(spellName);
			// the last 4 spells don't have icons
			const spriteStyles = n >= 32 ? {background: 'none'} : {backgroundPosition: `-${24*n}px -${22*Math.floor(n/8)}px`};
			return (
				<div key={spellName} className={'spell '+(learned ? 'spell-learned' : 'spell-not-learned')}>
					<Col md={3} className="text-right">
						<span className="spell-icon" style={spriteStyles}/>
						<ControlLabel htmlFor={`spell-${spellName}`}>{longSpellName}</ControlLabel>
					</Col>
					<Col md={1}>
						<FormControl id={`spell-${spellName}`} type="number" value={value} min="-9" max="9" onChange={handleChange}/>
					</Col>
				</div>
				);
		});
		return (
			<fieldset>
				<legend>Spellbook</legend>
				<p>The number next to the spell is the MP cost, setting a spell to 0 makes it free. Setting it to a value other
				than -1 or -2 will make the spell casteable.</p>
				<p>Note: leveling up will update the MP cost for all the casteable spells to the real cost. </p>
				<Row>
					<SpellFilter onChange={this.handleFilterChange}/>
				</Row>
				<Row>
					{spells}
				</Row>
			</fieldset>
		);
	}
});

export default Spellbook;
