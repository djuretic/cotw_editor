// source: https://www.gamefaqs.com/pc/574556-castle-of-the-winds-1-a-question-of-vengeance/faqs/2405

// https://stackoverflow.com/a/6182993
export const spellIds = [
  "healMinorWounds",
  "detectObjects",
  "light",
  "magicArrow",
  "phaseDoor",
  "shield",
  "clairvoyance",
  "coldBolt",
  "detectMonsters",
  "detectTraps",
  "identify",
  "levitation",
  "neutralizePoison",
  "coldBall",
  "healMed.Wounds",
  "fireBolt",
  "lightningBolt",
  "removeCurse",
  "resistFire",
  "resistCold",
  "resistLightning",
  "resistAcid",
  "resistFear",
  "sleepMonster",
  "slowMonster",
  "teleport",
  "runeOfReturn",
  "healMajorWounds",
  "fireball",
  "ballLightning",
  "healing",
  "trans.Monster",
  "createTraps",
  "hasteMonster",
  "teleportAway",
  "cloneMonster",
] as const
export const spellTypes = [
  "attack",
  "defense",
  "healing",
  "movement",
  "divination",
  "misc",
] as const

export type SpellType = (typeof spellTypes)[number]
export type SpellId = (typeof spellIds)[number]
export const nonLearnableSpellIds: SpellId[] = [
  "createTraps",
  "hasteMonster",
  "teleportAway",
  "cloneMonster",
]
export const SPELL_TYPES: Record<SpellType, SpellId[]> = {
  attack: [
    "magicArrow",
    "coldBolt",
    "coldBall",
    "fireBolt",
    "lightningBolt",
    "sleepMonster",
    "slowMonster",
    "fireball",
    "ballLightning",
    "trans.Monster",
  ],
  defense: [
    "shield",
    "resistFire",
    "resistCold",
    "resistLightning",
    "resistAcid",
    "resistFear",
  ],
  healing: [
    "healMinorWounds",
    "neutralizePoison",
    "healMed.Wounds",
    "healMajorWounds",
  ],
  movement: ["phaseDoor", "levitation", "teleport", "runeOfReturn"],
  divination: [
    "detectObjects",
    "clairvoyance",
    "detectMonsters",
    "detectTraps",
    "identify",
  ],
  misc: ["light", "removeCurse"],
}

export const spellBarInitOffset = 0x38e

export const SPELLS: Record<SpellId, { offset: number; mp: number }> = {
  healMinorWounds: { offset: 0x1b2, mp: 1 },
  detectObjects: { offset: 0x1be, mp: 1 },
  light: { offset: 0x1ca, mp: 1 },
  magicArrow: { offset: 0x1d6, mp: 1 },
  phaseDoor: { offset: 0x1e2, mp: 1 },
  shield: { offset: 0x1ee, mp: 1 },
  clairvoyance: { offset: 0x1fa, mp: 4 },
  coldBolt: { offset: 0x206, mp: 3 },
  detectMonsters: { offset: 0x212, mp: 3 },
  detectTraps: { offset: 0x21e, mp: 3 },
  identify: { offset: 0x22a, mp: 3 },
  levitation: { offset: 0x236, mp: 3 },
  neutralizePoison: { offset: 0x242, mp: 4 },
  coldBall: { offset: 0x24e, mp: 6 },
  "healMed.Wounds": { offset: 0x25a, mp: 4 },
  fireBolt: { offset: 0x266, mp: 4 },
  lightningBolt: { offset: 0x272, mp: 4 },
  removeCurse: { offset: 0x27e, mp: 4 },
  resistFire: { offset: 0x28a, mp: 4 },
  resistCold: { offset: 0x296, mp: 4 },
  resistLightning: { offset: 0x2a2, mp: 4 },
  resistAcid: { offset: 0x2ae, mp: 4 },
  resistFear: { offset: 0x2ba, mp: 4 },
  sleepMonster: { offset: 0x2c6, mp: 6 },
  slowMonster: { offset: 0x2d2, mp: 6 },
  teleport: { offset: 0x2de, mp: 4 },
  runeOfReturn: { offset: 0x2ea, mp: 4 },
  healMajorWounds: { offset: 0x2f6, mp: 7 },
  fireball: { offset: 0x302, mp: 7 },
  ballLightning: { offset: 0x30e, mp: 6 },
  healing: { offset: 0x31a, mp: 9 },
  "trans.Monster": { offset: 0x326, mp: 9 },
  createTraps: { offset: 0x332, mp: 0 },
  hasteMonster: { offset: 0x33e, mp: 0 },
  teleportAway: { offset: 0x34a, mp: 0 },
  cloneMonster: { offset: 0x356, mp: 0 },
}

export function emptySpellbook(): Record<SpellId, number> {
  return {
    healMinorWounds: -1,
    detectObjects: -1,
    light: -1,
    magicArrow: -1,
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
    "healMed.Wounds": -1,
    fireBolt: -1,
    lightningBolt: -1,
    removeCurse: -1,
    resistFire: -1,
    resistCold: -1,
    resistLightning: -1,
    resistAcid: -1,
    resistFear: -1,
    sleepMonster: -1,
    slowMonster: -1,
    teleport: -1,
    runeOfReturn: -1,
    healMajorWounds: -1,
    fireball: -1,
    ballLightning: -1,
    healing: -1,
    "trans.Monster": -1,
    createTraps: -1,
    hasteMonster: -1,
    teleportAway: -1,
    cloneMonster: -1,
  }
}

type FieldInfo = {
  offset: number
  numBytes: number
  min?: number
  max?: number
  type?: "string"
}

// https://stackoverflow.com/a/6182993
export const numberFieldIds = [
  "strBase",
  "intBase",
  "conBase",
  "dexBase",
  "str",
  "int",
  "con",
  "dex",
  "strPenalty",
  "intPenalty",
  "conPenalty",
  "dexPenalty",
  "strBonus",
  "intBonus",
  "conBonus",
  "dexBonus",
  "hp",
  "maxHp",
  "mp",
  "maxMp",
  "level",
  "armorClass",
  "exp",
  "expAlt",
  "bonusHit",
  "bonusDamage",
  "gender",
  "resistFire",
  "resistCold",
  "resistLightning",
  "resistAcid",
  "resistFear",
  "resistDrainLife",
  "weight",
  "bulk",
  "maxWeight",
  "maxBulk",
] as const
export const stringFieldIds = ["name"] as const
export const fieldIds = [...numberFieldIds, ...stringFieldIds] as const

export type NumberFieldId = (typeof numberFieldIds)[number]
export type StringFieldId = (typeof stringFieldIds)[number]
export type FieldId = (typeof fieldIds)[number]

export const FIELDS: Record<FieldId, FieldInfo> = {
  strBase: { offset: 0x80, numBytes: 1, min: 0, max: 100 },
  intBase: { offset: 0x81, numBytes: 1, min: 0, max: 100 },
  conBase: { offset: 0x82, numBytes: 1, min: 0, max: 100 },
  dexBase: { offset: 0x83, numBytes: 1, min: 0, max: 100 },
  // blue bars, affected by items
  str: { offset: 0x84, numBytes: 1, min: 0, max: 100 },
  int: { offset: 0x85, numBytes: 1, min: 0, max: 100 },
  con: { offset: 0x86, numBytes: 1, min: 0, max: 100 },
  dex: { offset: 0x87, numBytes: 1, min: 0, max: 100 },

  strPenalty: { offset: 0x88, numBytes: 1 },
  intPenalty: { offset: 0x89, numBytes: 1 },
  conPenalty: { offset: 0x8a, numBytes: 1 },
  dexPenalty: { offset: 0x8b, numBytes: 1 },
  strBonus: { offset: 0x90, numBytes: 1 },
  intBonus: { offset: 0x91, numBytes: 1 },
  conBonus: { offset: 0x92, numBytes: 1 },
  dexBonus: { offset: 0x93, numBytes: 1 },

  hp: { offset: 0x94, numBytes: 2 },
  maxHp: { offset: 0x96, numBytes: 2 },
  mp: { offset: 0x98, numBytes: 2 },
  maxMp: { offset: 0x9a, numBytes: 2 },
  level: { offset: 0x9c, numBytes: 2 },
  name: { offset: 0x100, numBytes: 20, type: "string" },
  armorClass: { offset: 0xa6, numBytes: 2 },

  exp: { offset: 0x9e, numBytes: 4 },
  expAlt: { offset: 0xa2, numBytes: 4 },

  bonusHit: { offset: 0xa8, numBytes: 2 },
  bonusDamage: { offset: 0xaa, numBytes: 2 },

  gender: { offset: 0xba, numBytes: 1 },

  resistFire: { offset: 0x150, numBytes: 2 },
  resistCold: { offset: 0x152, numBytes: 2 },
  resistLightning: { offset: 0x154, numBytes: 2 },
  resistAcid: { offset: 0x156, numBytes: 2 },
  resistFear: { offset: 0x158, numBytes: 2 },
  resistDrainLife: { offset: 0x15a, numBytes: 2 },

  weight: { offset: 0x3fe, numBytes: 4 },
  bulk: { offset: 0x402, numBytes: 4 },
  maxWeight: { offset: 0x406, numBytes: 4 },
  maxBulk: { offset: 0x40a, numBytes: 4 },
}

export type SpellNumber = number
export type SavegameDefinition = {
  spellBook: Record<SpellId, number>
  spellBar: SpellNumber[]
  rawFile: ArrayBuffer
} & Record<StringFieldId, string> &
  Record<NumberFieldId, number>

export function emptySavegame(): SavegameDefinition {
  return {
    spellBook: emptySpellbook(),
    spellBar: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    rawFile: new ArrayBuffer(0),
    strBase: 0,
    intBase: 0,
    conBase: 0,
    dexBase: 0,
    str: 0,
    int: 0,
    con: 0,
    dex: 0,
    strPenalty: 0,
    intPenalty: 0,
    conPenalty: 0,
    dexPenalty: 0,
    strBonus: 0,
    intBonus: 0,
    conBonus: 0,
    dexBonus: 0,
    hp: 0,
    maxHp: 0,
    mp: 0,
    maxMp: 0,
    level: 0,
    name: "",
    armorClass: 0,
    exp: 0,
    expAlt: 0,
    bonusHit: 0,
    bonusDamage: 0,
    gender: 0,
    resistFire: 0,
    resistCold: 0,
    resistLightning: 0,
    resistAcid: 0,
    resistFear: 0,
    resistDrainLife: 0,
    weight: 0,
    bulk: 0,
    maxWeight: 0,
    maxBulk: 0,
  }
}
