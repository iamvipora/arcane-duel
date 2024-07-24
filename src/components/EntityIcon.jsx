import React from 'react'
import WizardIcon from '/images/wizard-icon.png'
import DemonIcon from '/images/demon-icon.png'

const EntityIcon = ({ entity }) => {
  const isPlayer = entity == 'player' ? true : false
  const Icon = isPlayer ? WizardIcon : DemonIcon
  return (
    <div className='flex'>
      <div className='rounded-full border-2 border-[#FEBF4C] bg-[#5e575b] h-24 w-24 items-center flex overflow-hidden'>
        <img src={Icon} alt="demonIcon" className='h-full w-full'/>
      </div>
      <div>

      </div>
    </div>
  )
}

export default EntityIcon