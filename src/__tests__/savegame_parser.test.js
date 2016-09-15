import SavegameParser from '../savegame_parser';
import fs from 'fs';

// source: http://stackoverflow.com/a/12101012
// Convert from Node buffer to ArrayBuffer
function toArrayBuffer(buf) {
	var ab = new ArrayBuffer(buf.length);
	var view = new Uint8Array(ab);
	for (var i = 0; i < buf.length; ++i) {
		view[i] = buf[i];
	}
	return ab;
}

const originalFileReader = window.FileReader;

describe('SavegameParser', () => {

	beforeEach(() => {
		window.FileReader = function FileReader() {
			this.listeners = [];
			this.addEventListener = function(type, listener) {
				this.listeners.push(listener);
			};
			this.readAsArrayBuffer = function() {
				this.result = toArrayBuffer(fs.readFileSync(__dirname + '/example.cwg'));
				this.listeners.forEach((listener) => listener());
			};
		};
	});

	afterEach(() => {
		window.FileReader = originalFileReader;
	});

	it('reads file', () => {
		const fn = jest.fn();
		const failFn = jest.fn();
		SavegameParser.parse(new Blob(), fn, failFn);
		expect(fn).toBeCalled();
		expect(failFn).not.toBeCalled();
	});

	it('reads spellbook', () => {
		const fn = jest.fn();
		SavegameParser.parse(new Blob(), fn);
		expect(fn.mock.calls[0][0].spellBook).toEqual({
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
			'trans.Monster': -1
		});
	});

	it('reads character information', () => {
		const fn = jest.fn();
		SavegameParser.parse(new Blob(), fn);
		var state = fn.mock.calls[0][0];
		var expected = {
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
			maxBulk: 1000000
		};
		for(let property in expected){
			if(expected.hasOwnProperty(property)){
				expect(state[property]).toBe(expected[property]);
			}
		}
	});

});
