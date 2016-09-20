import Modernizr from 'modernizr';
import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Grid, Row, Col, Modal} from 'react-bootstrap';
import '../assets/css/main.css';
import SavegameParser from './savegame_parser';

import Spellbook from './components/Spellbook';
import CharacterProfile from './components/CharacterProfile';
import OutdatedBrowserWarning from './components/OutdatedBrowserWarning';

const browserSupported = Modernizr.typedarrays && Modernizr.xhrresponsetypearraybuffer;

var FileInput = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired,
		onLoadExample: React.PropTypes.func.isRequired,
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
				<Row>
					<Col md={5}><input ref={(ref) => this.fileInput = ref} type='file' id='file' onChange={this.props.onChange} /></Col>
					<Col md={1}>or</Col>
					<Col md={5}><Button bsStyle="primary" onClick={this.props.onLoadExample}>Use example savegame</Button></Col>
				</Row>
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
	downloadSavefile(e) {
		e.preventDefault();
		var form = document.getElementsByTagName('form')[0];
		if(form.checkValidity()){
			SavegameParser.write(this.state);
		}
	},
	handleChange(attribute, event) {
		this.setState({[attribute]: event.target.value});
	},
	handleSpellChange(spell, event) {
		//source: 2nd comment of http://stackoverflow.com/a/18934259
		this.setState({spellBook: { ...this.state.spellBook, [spell]: event.target.value}});
	},
	isLoaded() {
		return !!this.state.level;
	},
	loadExample(){
		var xhr = new XMLHttpRequest();
		xhr.open('GET', 'build/example.cwg');
		xhr.setRequestHeader('Content-Type', 'application/octet-stream');
		xhr.responseType = 'arraybuffer';
		xhr.onload = () => {
			if (xhr.status === 200) {
				this.refs.fileinput.clear();
				SavegameParser.parse(xhr.response, (state) => this.setState(state), this.informError);
			}else {
				alert('Error loading the example file. Returned status of ' + xhr.status);
			}
		};
		xhr.send();

	},
	render() {
		return (
			<Grid>
				<OutdatedBrowserWarning initialShow={!browserSupported}/>
				<h1><img src={require('../assets/icon.png')} height="32" width="32" />Castle of the Winds Editor</h1>
				<FileInput ref="fileinput" onChange={this.savefileSelected} onLoadExample={this.loadExample}/>
				<form>
					<Row className={this.isLoaded() ? '' : 'hidden'}>
						<Col md={4}>
							<CharacterProfile
								str={this.state.str} int={this.state.int} con={this.state.con} dex={this.state.dex}
								hp={this.state.hp} maxHp={this.state.maxHp}
								mp={this.state.mp} maxMp={this.state.maxMp}
								exp={this.state.exp} armorClass={this.state.armorClass} level={this.state.level}
								bulk={this.state.bulk} maxBulk={this.state.maxBulk} name={this.state.name}
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
						<Button type="submit" bsStyle="primary" disabled={!this.isLoaded()} onClick={this.downloadSavefile}>Download savegame</Button>
					</fieldset>
				</form>

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