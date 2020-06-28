import SavegameParser from '../savegameParser'
import { SavegameDefinition } from '../constants'
const fs = require('fs')

// source: http://stackoverflow.com/a/12101012
// Convert from Node buffer to ArrayBuffer
function toArrayBuffer(buf: Buffer) {
	var ab = new ArrayBuffer(buf.length);
	var view = new Uint8Array(ab)
	for (var i = 0; i < buf.length; ++i) {
		view[i] = buf[i]
	}
	return ab
}

describe('SavegameParser', () => {
	it('reads file', () => {
		const fn = jest.fn()
		const failFn = jest.fn()
		SavegameParser.parse(toArrayBuffer(fs.readFileSync(__dirname + '/example.cwg')), fn, failFn)
		expect(failFn).not.toBeCalled()
		expect(fn).toBeCalled()
	})

	it('reads character information', () => {
    const fn = jest.fn<void, [SavegameDefinition]>()
    const errFn = jest.fn()
		SavegameParser.parse(toArrayBuffer(fs.readFileSync(__dirname + '/example.cwg')), fn, errFn)
    let state = fn.mock.calls[0][0]
		let expected: SavegameDefinition = {
      rawFile: new ArrayBuffer(0),
			name: 'Maria',
			strBase: 59,
			intBase: 59,
			conBase: 58,
			dexBase: 54,
			str: 59,
			int: 59,
			con: 58,
			dex: 54,
			strPenalty: 0,
			intPenalty: 0,
			conPenalty: 0,
			dexPenalty: 0,
			strBonus: 0,
			intBonus: 0,
			conBonus: 0,
			dexBonus: 0,
			hp: 10,
			maxHp: 10,
			mp: 5,
			maxMp: 5,
			level: 1,
			armorClass: 0,
			exp: 0,
			expAlt: 0,
			bonusHit: 0,
			bonusDamage: 0,
			gender: 1,
			resistFire: 0,
			resistCold: 0,
			resistLightning: 0,
			resistAcid: 0,
			resistFear: 0,
			resistDrainLife: 0,
			weight: 3300,
			bulk: 3300,
			maxWeight: 36000,
      maxBulk: 1000000,
      spellBar: [3, -1, -1, -1, -1, -1, -1, -1, -1, -1],
      spellBook: {
        healMinorWounds: -1,
        detectObjects: -1,
        light: -1,
        magicArrow: 1,
        phaseDoor: -1,
        shield: -1,
        clairvoyance: -1,
        coldBolt: -1,
        detectMonsters: -1,
        detectTraps: -1,
        identify: -1,
        levitation: -1,
        neutralizePoison: -1,
        coldBall: -1,
        'healMed.Wounds': -1,
        fireBolt: -1,
        lightningBolt: -1,
        removeCurse: -1,
        resistFire: -1,
        resistCold: -1,
        resistLightning: -1,
        resistAcid: -2,
        resistFear: -2,
        sleepMonster: -1,
        slowMonster: -1,
        teleport: -1,
        runeOfReturn: -1,
        healMajorWounds: -1,
        fireball: -1,
        ballLightning: -1,
        healing: -1,
        'trans.Monster': -1,
        createTraps: -1,
        hasteMonster: -1,
        teleportAway: -1,
        cloneMonster: -1
      }
		}
		for(let property in expected){
      if (property === 'rawFile') {
        expect(state[property]).not.toBeNull()
        continue
      }
			if(expected.hasOwnProperty(property)){
        // @ts-ignore
				expect(state[property]).toStrictEqual(expected[property])
			}
		}
	})

});
