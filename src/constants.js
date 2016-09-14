// source: https://www.gamefaqs.com/pc/574556-castle-of-the-winds-1-a-question-of-vengeance/faqs/2405
// fieldName: [offset, numberOfBytes (littleEndian)]
export const FIELDS = {
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

export const SPELLS = {
	healMinorWounds: {offset: 0x1B2, mp: 1},
	detectObjects: {offset: 0x1BE, mp: 1},
	light: {offset: 0x1CA, mp: 1},
	magicArrow: {offset: 0x1D6, mp: 1},
	phaseDoor: {offset: 0x1E2, mp: 1},
	shield: {offset: 0x1EE, mp: 1},
	clairvoyance: {offset: 0x1FA, mp: 4},
	coldBolt: {offset: 0x206, mp: 3},
	detectMonsters: {offset: 0x212, mp: 3},
	detectTraps: {offset: 0x21E, mp: 3},
	identify: {offset: 0x22A, mp: 3},
	levitation: {offset: 0x236, mp: 3},
	neutralizePoison: {offset: 0x242, mp: 4},
	coldBall: {offset: 0x24E, mp: 6},
	'healMed.Wounds': {offset: 0x25A, mp: 4},
	fireBolt: {offset: 0x266, mp: 4},
	lightningBolt: {offset: 0x272, mp: 4},
	removeCurse: {offset: 0x27E, mp: 4},
	resistFire: {offset: 0x28A, mp: 4},
	resistCold: {offset: 0x296, mp: 4},
	resistLightning: {offset: 0x2A2, mp: 4},
	resistAcid: {offset: 0x2AE, mp: 4},
	resistFear: {offset: 0x2BA, mp: 4},
	sleepMonster: {offset: 0x2C6, mp: 6},
	slowMonster: {offset: 0x2D2, mp: 6},
	teleport: {offset: 0x2DE, mp: 4},
	runeOfReturn: {offset: 0x2EA, mp: 4},
	healMajorWounds: {offset: 0x2F6, mp: 7},
	fireball: {offset: 0x302, mp: 7},
	ballLightning: {offset: 0x30E, mp: 6},
	healing: {offset: 0x31A, mp: 9},
	'trans.Monster': {offset: 0x326, mp: 9}
	/*createTraps: {offset: 0x332, mp: 0},
	hasteMonster: {offset: 0x33E, mp: 0},
	teleportAway: {offset: 0x34A, mp: 0},
	cloneMonster: {offset: 0x356, mp: 0}*/
};
