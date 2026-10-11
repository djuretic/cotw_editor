import type { SpellId } from "./constants"

export function isInt(value: number | string | undefined): boolean {
  if (value === undefined) {
    return false
  }
  if (typeof value === "number") {
    return Number.isInteger(value)
  }
  return value.trim() !== "" && Number.isInteger(Number(value))
}

export function formatSpellName(name: SpellId) {
  if (!name) {
    return ""
  }
  const longSpellName = name.charAt(0).toUpperCase() + name.slice(1)
  return longSpellName.replace(/([a-z.])([A-Z])/g, "$1 $2")
}
