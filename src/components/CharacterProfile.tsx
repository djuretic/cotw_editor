import React from 'react'
import {Row, Col} from 'react-bootstrap'
import CharacterAttribute from './CharacterAttribute'
import {FieldId} from '../constants'

import HeroFemale from '../../assets/hero_female.png'
import HeroMale from '../../assets/hero_male.png'

interface CharacterProfileProps {
  handleChange: (value: FieldId | undefined, event: React.ChangeEvent<HTMLInputElement>) => void,
  str: number,
  int: number,
  con: number,
  dex: number,
  hp: number,
  maxHp: number,
  mp: number,
  maxMp: number,
  exp: number,
  armorClass: number,
  level: number,
  bulk: number,
  maxBulk: number,
  weight: number,
  maxWeight: number,
  name: string,
  gender: number
}


const CharacterProfile: React.FC<CharacterProfileProps> = (props) => {
  return (
    <fieldset>
      <legend>Character</legend>
      <img src={props.gender === 1 ? HeroFemale : HeroMale} className="d-block mx-auto"/>
      <div className="mx-auto text-center">{props.name} (level {props.level})</div>
      <CharacterAttribute name="HP" vars={['hp', 'maxHp']} values={[props.hp, props.maxHp]} onChange={props.handleChange}/>
      <CharacterAttribute name="Mana" vars={['mp', 'maxMp']} values={[props.mp, props.maxMp]} onChange={props.handleChange}/>
      <CharacterAttribute name="Armor Class" varr="armorClass" value={props.armorClass} onChange={props.handleChange}/>
      <CharacterAttribute name="Experience" varr="exp" value={props.exp} onChange={props.handleChange}/>
      <CharacterAttribute name="Strength" varr="str" value={props.str} onChange={props.handleChange}/>
      <CharacterAttribute name="Intelligence" varr="int" value={props.int} onChange={props.handleChange}/>
      <CharacterAttribute name="Constitution" varr="con" value={props.con} onChange={props.handleChange}/>
      <CharacterAttribute name="Dextery" varr="dex" value={props.dex} onChange={props.handleChange}/>
      <Row>
        <Col xs={4} md={6} className="text-right">Bulk</Col>
        <Col xs={8} md={6}>{props.bulk} / {props.maxBulk}</Col>
      </Row>
      <Row>
        <Col xs={4} md={6} className="text-right">Weight</Col>
        <Col xs={8} md={6}>{props.weight} / {props.maxWeight}</Col>
      </Row>
    </fieldset>
  )
}

export default CharacterProfile