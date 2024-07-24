import React from 'react'

const HealthBar = ({ health, maxHealth, entity }) => {
  const isPlayer = entity == 'player' ? true : false
  return (
    <div className='relative flex w-60 h-8 bg-white rounded-md border-2 border-[#FEBF4C] items-center'>
      <div 
        className='h-full flex absolute rounded-md justify-center bg-red-500 font-bold'
        style={{ width: `${health}%`}}
      >
        {health}%
      </div>
    </div>
  )
}

export default HealthBar