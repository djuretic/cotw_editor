
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Grid, Row, Col, FormControl, ControlLabel, Modal} from 'react-bootstrap';
import '../app.css';
import SavegameParser from './savegame_parser';

var FileInput = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired
	},
	clear() {
		if(this.fileInput !== null){
			this.fileInput.value = null;
		}
	},
	render() {
		return (
			<fieldset>
				<legend>Select a savegame file</legend>
				<input ref={(ref) => this.fileInput = ref} type='file' id='file' onChange={this.props.onChange} />
				<p className="text-danger">Remember to backup your original savegame file.</p>
			</fieldset>
		);
	}
});

var CharacterAttribute = React.createClass({
	render() {
		return (
			<Row>
				<Col md={6} className="text-right">{this.props.name}</Col>
				<Col md={6}><FormControl type="number" min="0" max={this.props.max} value={this.props.value} onChange={(e) => this.props.onChange(this.props.var, e)}/></Col>
			</Row>
		);
	}
});

var CharacterProfile = React.createClass({
	render() {
		return (
			<fieldset>
				<legend>Character</legend>
				<img src={this.props.gender === 1 ? require('../assets/hero_female.png'): require('../assets/hero_male.png')} className="center-block"/>
				<Row>
					<Col md={6} className="text-right">HP</Col>
					<Col md={6}>{this.props.hp} / {this.props.maxHp}</Col>
				</Row>
				<Row>
					<Col md={6} className="text-right">Mana</Col>
					<Col md={6}>{this.props.mp} / {this.props.maxMp}</Col>
				</Row>
				<Row>
					<Col md={6} className="text-right">Armor Class</Col>
					<Col md={6}>{this.props.armorClass}</Col>
				</Row>
				<CharacterAttribute name="Experience" var="exp" value={this.props.exp} max="99999" onChange={this.props.handleChange}/>
				<CharacterAttribute name="Strength" var="str" value={this.props.str} max="100" onChange={this.props.handleChange}/>
				<CharacterAttribute name="Intelligence" var="int" value={this.props.int} max="100" onChange={this.props.handleChange}/>
				<CharacterAttribute name="Constitution" var="con" value={this.props.con} max="100" onChange={this.props.handleChange}/>
				<CharacterAttribute name="Dextery" var="dex" value={this.props.dex} max="100" onChange={this.props.handleChange}/>
				<Row>
					<Col md={6} className="text-right">Bulk</Col>
					<Col md={6}>{this.props.bulk} / {this.props.maxBulk}</Col>
				</Row>
				<Row>
					<Col md={6} className="text-right">Weight</Col>
					<Col md={6}>{this.props.weight} / {this.props.maxWeight}</Col>
				</Row>
			</fieldset>
		);
	}
});

var SpellFilter = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired,
	},
	render() {
		return (
			<Col md={3}>
				Filter by name:
				<FormControl type="text" placeholder="Enter spell name here" onChange={this.props.onChange} />
			</Col>
		);
	}
});

var Spellbook = React.createClass({
	getInitialState() {
		return {spells: {}, filterText: ''};
	},
	handleFilterChange(event) {
		this.setState({filterText: event.target.value.replace(/\s+/g, '')});
	},
	render() {
		const allSpellNames = Object.keys(this.props.spells);
		const spells = allSpellNames.filter(str => str.toUpperCase().includes(this.state.filterText.toUpperCase())).map((spellName) => {
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


var MainEditor = React.createClass({
	getInitialState() {
		return {spellBook: {}, showModal: false, modalText: ''};
	},
	informError(error) {
		let text = error.message;
		if(error instanceof RangeError){
			text = 'The file is not a valid Castle of the Winds savegame.';
		}
		this.refs.fileinput.clear();
		this.setState({showModal: true, modalText: text});
	},
	closeModal() {
		this.setState({showModal: false});
	},
	savefileSelected(e) {
		SavegameParser.parse(e.target.files[0], (state) => this.setState(state), this.informError);
	},
	downloadSavefile() {
		SavegameParser.write(this.state);
	},
	handleChange(attribute, event) {
		this.setState({[attribute]: +event.target.value});
	},
	handleSpellChange(spell, event) {
		//source: 2nd comment of http://stackoverflow.com/a/18934259
		this.setState({spellBook: { ...this.state.spellBook, [spell]: +event.target.value}});
	},
	isLoaded() {
		return !!this.state.level;
	},
	render() {
		return (
			<Grid>
				<h1><img src={require('../assets/icon.png')} height="32" width="32" />Castle of the Winds Editor</h1>
				<FileInput ref="fileinput" onChange={this.savefileSelected} />
				<Row>
					<Col md={4}>
						<CharacterProfile
							str={this.state.str} int={this.state.int} con={this.state.con} dex={this.state.dex}
							hp={this.state.hp} maxHp={this.state.maxHp}
							mp={this.state.mp} maxMp={this.state.maxMp}
							exp={this.state.exp} armorClass={this.state.armorClass}
							bulk={this.state.bulk} maxBulk={this.state.maxBulk}
							weight={this.state.weight} maxWeight={this.state.maxWeight} gender={this.state.gender}
							handleChange={this.handleChange}
							/>
					</Col>
					<Col md={8}>
						<Spellbook spells={this.state.spellBook} handleChange={this.handleSpellChange}/>
					</Col>
				</Row>
				<fieldset>
					<legend>Download savegame file</legend>
					<Button bsStyle="primary" disabled={!this.isLoaded()} onClick={this.downloadSavefile}>Download savegame</Button>
				</fieldset>

				<Modal show={this.state.showModal} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Error</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<p>Error reading file: {this.state.modalText}</p>
					</Modal.Body>
					<Modal.Footer>
						<Button onClick={this.closeModal}>Close</Button>
					</Modal.Footer>
				</Modal>
			</Grid>
		);
	}
});

ReactDOM.render(<MainEditor />, document.getElementById('react-app'));