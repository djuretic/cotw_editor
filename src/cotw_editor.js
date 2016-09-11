
var {Button, Grid, Row, Col, FormControl, ControlLabel} = ReactBootstrap;

// source: https://www.gamefaqs.com/pc/574556-castle-of-the-winds-1-a-question-of-vengeance/faqs/2405
// fieldName: [offset, numberOfBytes (littleEndian)]
const FIELDS = {
	// green bars, base value
	strBase: [0x80, 1],
	intBase: [0x81, 1],
	conBase: [0x82, 1],
	dexBase: [0x83, 1],
	// blue bars, affected by items
	str: [0x84, 1],
	int: [0x85, 1],
	con: [0x86, 1],
	dex: [0x87, 1],

	strPenalty: [0x88, 1],
	intPenalty: [0x89, 1],
	conPenalty: [0x8A, 1],
	dexPenalty: [0x8B, 1],
	strBonus: [0x90, 1],
	intBonus: [0x91, 1],
	conBonus: [0x92, 1],
	dexBonus: [0x93, 1],

	hp: [0x94, 2],
	maxHp: [0x96, 2],
	mp: [0x98, 2],
	maxMp: [0x9A, 2],
	level: [0x9C, 2],
	armorClass: [0xA6, 2],

	exp: [0x9E, 4],
	expAlt: [0xA2, 4],

	bonusHit: [0xA8, 2],
	bonusDamage: [0xAA, 2],

	gender: [0xBA, 1],

	resistFire: [0x150, 2],
	resistCold: [0x152, 2],
	resistLightning: [0x154, 2],
	resistAcid: [0x156, 2],
	resistFear: [0x158, 2],
	resistDrainLife: [0x15A, 2],

	weight: [0x3FE, 4],
	bulk: [0x402, 4],
	maxWeight: [0x406, 4],
	maxBulk: [0x40A, 4],
};

const SPELLS = {
	healMinorWounds: 0x1B2,
	detectObjects: 0x1BE,
	light: 0x1CA,
	magicArrow: 0x1D6,
	phaseDoor: 0x1E2,
	shield: 0x1EE,
	clairvoyance: 0x1FA,
	coldBolt: 0x206,
	detectMonsters: 0x212,
	detectTraps: 0x21E,
	identify: 0x22A,
	levitation: 0x236,
	neutralizePoison: 0x242,
	coldBall: 0x24E,
	'healMed.Wounds': 0x25A,
	fireBolt: 0x266,
	lightningBolt: 0x272,
	removeCurse: 0x27E,
	resistFire: 0x28A,
	resistCold: 0x296,
	resistLightning: 0x2A2,
	resistAcid: 0x2AE,
	resistFear: 0x2BA,
	sleepMonster: 0x2C6,
	slowMonster: 0x2D2,
	teleport: 0x2DE,
	runeOfReturn: 0x2EA,
	healMajorWounds: 0x2F6,
	fireball: 0x302,
	ballLightning: 0x30E,
	healing: 0x31A,
	'trans.Monster': 0x326,
	createTraps: 0x332,
	hasteMonster: 0x33E,
	teleportAway: 0x34A,
	cloneMonster: 0x356
};

var FileInput = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired
	},
	render() {
		return (
			<fieldset>
				<legend>Select a savegame file</legend>
				<input type='file' id='file' onChange={this.props.onChange} />
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
				<img src={this.props.gender === 1 ? 'assets/hero_female.png': 'assets/hero_male.png'} className="center-block"/>
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
			const spriteStyles = n >= 32 ? {background: 'none'} : {'background-position': `-${24*n}px -${22*Math.floor(n/8)}px`};
			return (
				<div className="spell">
					<Col md={3} className="text-right" style={learned ? {} : {color: 'gray'} }>
						<span className="spell-icon" style={spriteStyles}/>
						<ControlLabel htmlFor={`spell-${spellName}`}>{longSpellName}</ControlLabel>
					</Col>
					<Col md={1}>
						<FormControl id={`spell-${spellName}`} type="number" value={value} onChange={handleChange}/>
					</Col>
				</div>
				);
		});
		return (
			<fieldset>
				<legend>Spellbook</legend>
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
		return {spellBook: {}};
	},
	savefileSelected(e) {
		var reader = new FileReader();
		reader.onload = (() => {
			var dataView = new DataView(reader.result);
			var state = {spellBook: {}, rawFile: reader.result};
			var readInt = function(_dataView, _offset, _numBytes){
				if (_numBytes === 1){
					return _dataView.getInt8(_offset);
				} else if (_numBytes === 2){
					return _dataView.getInt16(_offset, true);
				} else if (_numBytes === 4){
					return _dataView.getInt32(_offset, true);
				}
			};
			for(let property in FIELDS){
				if(FIELDS.hasOwnProperty(property)){
					let [offset, numBytes] = FIELDS[property];
					state[property] = readInt(dataView, offset, numBytes);
				}
			}

			for(let property in SPELLS){
				if(SPELLS.hasOwnProperty(property)){
					let offset = SPELLS[property];
					state.spellBook[property] = readInt(dataView, offset, 1);
				}
			}

			this.setState(state);
		});
		reader.readAsArrayBuffer(e.target.files[0]);
	},
	downloadSavefile() {
		let dataView = new DataView(this.state.rawFile);
		let writeInt = function(_dataView, _offset, _value, _numBytes){
			if (_numBytes === 1){
				return _dataView.setInt8(_offset, _value);
			} else if (_numBytes === 2){
				return _dataView.setInt16(_offset, _value, true);
			} else if (_numBytes === 4){
				return _dataView.setInt32(_offset, _value, true);
			}
		};
		for(let property in FIELDS){
			if(FIELDS.hasOwnProperty(property)){
				let [offset, numBytes] = FIELDS[property];
				writeInt(dataView, offset, this.state[property], numBytes);
			}
		}
		for(let property in SPELLS){
			if(SPELLS.hasOwnProperty(property)){
				let offset = SPELLS[property];
				writeInt(dataView, offset, this.state.spellBook[property], 1);
			}
		}
		let blob = new Blob([dataView]);
		saveAs(blob, 'savegame.cwg');
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
				<h1><img src="assets/icon.png" height="32" width="32" />Castle of the Winds Editor</h1>
				<FileInput onChange={this.savefileSelected} />
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
			</Grid>
		);
	}
});

ReactDOM.render(<MainEditor />, document.getElementById('react-app'));