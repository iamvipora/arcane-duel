import React from 'react'

function ActionButtons({activeTab, setActiveTab, isBtnDisabled, handleClick, flee, items}) {
  const buttonConfigs = {
    menu: [
      { btnName: 'Attack', handleClick: () => setActiveTab('attack') },
      { btnName: 'Items', handleClick: () => setActiveTab('items') },
      { btnName: 'Flee', handleClick: () => flee() },
      { btnName: '???', handleClick: null }
    ],
    attack: [
      { btnName: 'Dark Bolt', handleClick: () => handleClick('darkBolt') },
      { btnName: 'Fire Bomb', handleClick: () => handleClick('fireBomb') },
      { btnName: 'Lightning', handleClick: () => handleClick('lightning') },
      { btnName: 'Back', handleClick: () => setActiveTab('menu') }
    ],
    items: [
      { btnName: 'Potion', handleClick: () => handleClick('potion') },
      { btnName: 'Barrier', handleClick: () => handleClick('barrier') },
      { btnName: 'Double Sword', handleClick: () => handleClick('doubleSword') },
      { btnName: 'Back', handleClick: () => setActiveTab('menu') }
    ]
  }

  const buttons = buttonConfigs[activeTab]
  
  const renderButtons = buttons.map((btn, index) => {
    return <button 
      key={index}
      className={`lg:w-40 px-4 border-2 border-[#FEBF4C] rounded-md ${isBtnDisabled ? 'bg-[#4C4449]' : 'bg-[#5e575b]'}`}
      onClick={btn.handleClick}
    > 
      {btn.btnName}
    </button>
  })

  return (
    <div className='grid grid-cols-2 grid-rows-2 h-28 w-full gap-1'>
      {renderButtons}
    </div>
  )
}

export default ActionButtons