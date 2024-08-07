import React from 'react'
import HealthBar from './HealthBar'
import WizardIcon from '/images/icons/wizard-icon.png'
import DemonIcon from '/images/icons/demon-icon.png'

const EntityIcon = ({ entity, health, maxHealth }) => {
  const isPlayer = entity == 'player' ? true : false
  const Icon = isPlayer ? WizardIcon : DemonIcon
  return (
    <div className='flex'>
      {!isPlayer && <div className='flex pt-1'>
        <HealthBar
          entity={entity}
          health={health}
          maxHealth={maxHealth}
        />
      </div>}
      <div className='rounded-full border-2 border-[#FEBF4C] bg-[#5e575b] h-20 w-20 items-center flex overflow-hidden'>
        <img src={Icon} alt={entity} className='h-full w-full'/>
      </div>
      {isPlayer && <div className='flex pt-1'>
        <HealthBar
          entity={entity}
          health={health}
          maxHealth={maxHealth}
        />
      </div>}
    </div>
  )
}

export default EntityIcon