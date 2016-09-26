import React, { PropTypes } from 'react';
import { Row } from 'react-bootstrap';
import SpellFilter from './SpellFilter';
import SpellRow from './SpellRow';

var Spellbook = React.createClass({
	propTypes: {
		spells: PropTypes.arrayOf(PropTypes.object),
		handleChange: PropTypes.func,
	},
	getInitialState() {
		return {spells: {}, filterText: ''};
	},
	handleFilterChange(event) {
		this.setState({filterText: event.target.value.replace(/\s+/g, '')});
	},
	render() {
		const allSpellNames = Object.keys(this.props.spells);
		const spells = allSpellNames.filter(str => str.toUpperCase().indexOf(this.state.filterText.toUpperCase()) >= 0).map((spellName) => {
			const n = allSpellNames.indexOf(spellName);
			let value = this.props.spells[spellName];
			return <SpellRow key={spellName} spellName={spellName} index={n} value={value} handleChange={this.props.handleChange} />;
		});
		return (
			<fieldset>
				<legend>Spellbook</legend>
				<p>The number next to the spell is the MP cost, setting a spell to 0 makes it free. Setting it to a value other
				than -1 or -2 will make the spell casteable.</p>
				<p>Note: leveling up will update the MP cost for all the castable spells to the real cost. </p>
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
