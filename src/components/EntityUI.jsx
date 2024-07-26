import React from 'react'
import HealthBar from './HealthBar'
import WizardIcon from '/images/wizard-icon.png'
import DemonIcon from '/images/demon-icon.png'

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
      <div className='rounded-full border-2 border-[#FEBF4C] bg-[#5e575b] h-24 w-24 items-center flex overflow-hidden'>
        <img src={Icon} alt="demonIcon" className='h-full w-full'/>
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