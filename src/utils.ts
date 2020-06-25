import { SpellId } from './constants'

//source: http://stackoverflow.com/a/14794066
export function isInt(value: any) {
  // @ts-ignore
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10))
}

export function formatSpellName(name: SpellId) {
  if (!name) { return '' }
  let longSpellName = name.charAt(0).toUpperCase() + name.slice(1)
  return longSpellName.replace(/([a-z.])([A-Z])/g, '$1 $2')
}
