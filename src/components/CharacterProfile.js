import React from 'react';
import {Row, Col} from 'react-bootstrap';
import CharacterAttribute from './CharacterAttribute';

var CharacterProfile = React.createClass({
	render() {
		return (
			<fieldset>
				<legend>Character</legend>
				<img src={this.props.gender === 1 ? require('../../assets/hero_female.png'): require('../../assets/hero_male.png')} className="center-block"/>
				<CharacterAttribute name="HP" vars={['hp', 'maxHp']} values={[this.props.hp, this.props.maxHp]} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Mana" vars={['mp', 'maxMp']} values={[this.props.mp, this.props.maxMp]} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Armor Class" var="armorClass" value={this.props.armorClass} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Experience" var="exp" value={this.props.exp} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Strength" var="str" value={this.props.str} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Intelligence" var="int" value={this.props.int} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Constitution" var="con" value={this.props.con} onChange={this.props.handleChange}/>
				<CharacterAttribute name="Dextery" var="dex" value={this.props.dex} onChange={this.props.handleChange}/>
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

export default CharacterProfile;