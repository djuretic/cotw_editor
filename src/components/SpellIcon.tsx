import React from 'react'
import { SpellNumber } from '../constants'

interface SpellIconProps {
  spellNumber: SpellNumber
}

const SpellIcon = ({ spellNumber }: SpellIconProps) => {
  if (spellNumber < 0) {
    return <span className="spell-icon-none" />
  }
  // the last 4 spells don't have icons
  const spriteStyles = spellNumber >= 32
    ? {background: 'none'}
    : {backgroundPosition: `-${24*spellNumber}px -${22*Math.floor(spellNumber/8)}px`}
  return <span className="spell-icon" style={spriteStyles}/>
}

export default SpellIcon
