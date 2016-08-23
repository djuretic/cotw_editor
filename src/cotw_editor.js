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

	// spells: {
	// 	heaMinorWounds: [0x1B2, 1],
	// 	fireBall: [0x31A, 1]
	// },

	// spellsSlots:
	// 	[
	// 		[0x38E, 2], [0x390, 2], [0x392, 2], [0x394, 2], [0x396, 2], [0x398, 2], [0x39A, 2], [0x39C, 2], [0x39E, 2], [0x3A0, 2]
	// 	]
}

var FileInput = React.createClass({
	propTypes: {
		onChange: React.PropTypes.func.isRequired
	},
	render: function(){
		return <input type='file' id='file' onChange={this.props.onChange} />;
	}
})

var CharacterProfile = React.createClass({
	render: function(){
		return (
			<div>
				<img src='assets/hero_male.png' />
				<div>HP: {this.props.hp} / {this.props.maxHp}</div>
				<div>Mana: {this.props.mp} / {this.props.maxMp}</div>
				<div>Armor Class: {this.props.armorClass}</div>
				<div>Experience: {this.props.exp}</div>
				<div>Strength: {this.props.str}</div>
				<div>Intelligence: {this.props.int}</div>
				<div>Constitution: {this.props.con}</div>
				<div>Dextery: {this.props.dex}</div>
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
		reader.onload = (function(theFile) {
			console.log(reader.result.byteLength + ' bytes');
			var dataView = new DataView(reader.result);
			var state = {};
			for(var property in FIELDS){
				if(FIELDS.hasOwnProperty(property)){
					let [offset, numBytes] = FIELDS[property];
					if (numBytes === 1){
						state[property] = dataView.getInt8(offset);
					} else if (numBytes === 2){
						state[property] = dataView.getInt16(offset, true);
					} else if (numBytes === 4){
						state[property] = dataView.getInt32(offset, true);
					}
				}
			}
			self.setState(state);
			console.log(self.state);
		});
		reader.readAsArrayBuffer(e.target.files[0]);
	},
	render: function(){
		return (
			<div>
				<FileInput onChange={this.savefileSelected} />
				<CharacterProfile
					str={this.state.str} int={this.state.int} con={this.state.con} dex={this.state.dex}
					hp={this.state.hp} maxHp={this.state.maxHp}
					mp={this.state.mp} maxMp={this.state.maxMp}
					exp={this.state.exp} armorClass={this.state.armorClass} />
			</div>
		);
	}
});

ReactDOM.render(<MainEditor />, document.getElementById('react-app'));