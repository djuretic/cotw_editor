
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Grid, Row, Col, Modal} from 'react-bootstrap';
import '../assets/css/main.css';
import SavegameParser from './savegame_parser';

import Spellbook from './components/Spellbook';
import CharacterProfile from './components/CharacterProfile';

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
				<Row className={this.isLoaded() ? '' : 'hidden'}>
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
				<fieldset className={this.isLoaded() ? '' : 'hidden'}>
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