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
			console.log(self);
			var dataView = new DataView(reader.result);
			// source: https://www.gamefaqs.com/pc/574556-castle-of-the-winds-1-a-question-of-vengeance/faqs/2405
			self.setState({
				str: dataView.getInt8(0x80),
				int: dataView.getInt8(0x81),
				con: dataView.getInt8(0x82),
				dex: dataView.getInt8(0x83),
				strBase: dataView.getInt8(0x84),
				intBase: dataView.getInt8(0x85),
				conBase: dataView.getInt8(0x86),
				dexBase: dataView.getInt8(0x87),

				hp: dataView.getInt16(0x94, true),
				maxHp: dataView.getInt16(0x96, true),
				mp: dataView.getInt16(0x98, true),
				maxMp: dataView.getInt16(0x9A, true),
				armorClass: dataView.getInt16(0xA6, true),

				exp: dataView.getInt32(0x9E, true),
				expAlt: dataView.getInt32(0xA2, true)
			});
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