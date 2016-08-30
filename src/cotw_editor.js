// source: https://www.gamefaqs.com/pc/574556-castle-of-the-winds-1-a-question-of-vengeance/faqs/2405
// fieldName: [offset, numberOfBytes (littleEndian)]
const FIELDS = {
	str: [0x80, 1],
	int: [0x81, 1],
	con: [0x82, 1],
	dex: [0x83, 1],
	strBase: [0x84, 1],
	intBase: [0x85, 1],
	conBase: [0x86, 1],
	dexBase: [0x87, 1],

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
	fireBall: 0x31A
};

const SPELL_SLOTS = [0x38E, 0x390, 0x392, 0x394, 0x396, 0x398, 0x39A, 0x39C, 0x39E, 0x3A0];

var FileInput = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired
	},
	render: function(){
		return <input type='file' id='file' onChange={this.props.onChange} />;
	}
});

var CharacterProfile = React.createClass({
	render: function(){
		return (
			<div>
				<img src='assets/hero_male.png' />
				<div>HP: {this.props.hp} / {this.props.maxHp}</div>
				<div>Mana: {this.props.mp} / {this.props.maxMp}</div>
				<div>Armor Class: {this.props.armorClass}</div>
				<div>Experience: {this.props.exp}</div>
				<div>Strength: <input type="number" min="0" max="100" value={this.props.str} onChange={this.props.handleChangeStr}/></div>
				<div>Intelligence: <input type="number" min="0" max="100" value={this.props.int} onChange={this.props.handleChangeInt}/></div>
				<div>Constitution: <input type="number" min="0" max="100" value={this.props.con} onChange={this.props.handleChangeCon}/></div>
				<div>Dextery: <input type="number" min="0" max="100" value={this.props.dex} onChange={this.props.handleChangeDex}/></div>
				<div>Bulk: {this.props.bulk} / {this.props.maxBulk}</div>
				<div>Weight: {this.props.weight} / {this.props.maxWeight}</div>
			</div>
		);
	}
});

var MainEditor = React.createClass({
	getInitialState: function(){
		return {};
	},
	savefileSelected: function(e) {
		var reader = new FileReader();
		var self = this;
		reader.onload = (function() {
			// console.log(reader.result.byteLength + ' bytes');
			var dataView = new DataView(reader.result);
			var state = {spellBook: {}};
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

			state.spellSlots = SPELL_SLOTS.map((offset) => readInt(dataView, offset, 2));
			self.setState(state);
		});
		reader.readAsArrayBuffer(e.target.files[0]);
	},
	handleChangeStr: function(event) {
		this.setState({str: +event.target.value});
	},
	handleChangeInt: function(event) {
		this.setState({int: +event.target.value});
	},
	handleChangeDex: function(event) {
		this.setState({dex: +event.target.value});
	},
	handleChangeCon: function(event) {
		this.setState({con: +event.target.value});
	},
	render: function(){
		return (
			<div>
				<FileInput onChange={this.savefileSelected} />
				<CharacterProfile
					str={this.state.str} int={this.state.int} con={this.state.con} dex={this.state.dex}
					hp={this.state.hp} maxHp={this.state.maxHp}
					mp={this.state.mp} maxMp={this.state.maxMp}
					exp={this.state.exp} armorClass={this.state.armorClass}
					bulk={this.state.bulk} maxBulk={this.state.maxBulk}
					weight={this.state.weight} maxWeight={this.state.maxWeight}
					handleChangeStr={this.handleChangeStr}
					handleChangeInt={this.handleChangeInt}
					handleChangeCon={this.handleChangeCon}
					handleChangeDex={this.handleChangeDex}
					/>
			</div>
		);
	}
});

ReactDOM.render(<MainEditor />, document.getElementById('react-app'));