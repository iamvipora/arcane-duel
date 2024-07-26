import React from 'react'

const HealthBar = ({ health, maxHealth, entity }) => {
  const isPlayer = entity == 'player' ? true : false
  return (<>
    <div className='flex flex-col'>
      <h1 className={`${isPlayer ? 'text-left ml-1' : 'text-right mr-1'}`}>{isPlayer ? 'Player' : 'Enemy'}</h1>
      <div className={`relative flex w-60 h-8 bg-black rounded-lg border-2 border-[#FEBF4C] items-center ${!isPlayer && 'justify-end'}`}>
        <div className='aboslute flex justify-center w-full'>
          {health == 0 && 'DEAD'}
        </div>
        <div 
          className='h-full flex absolute rounded-md justify-center bg-red-500'
          style={{ width: `${health}%`}}
        >
          {health != 0 && `${health}%`}
        </div>
      </div>
    </div>

  </>)
}

export default HealthBar