import React from 'react'

function ActionBox({ data, itemName, items }) {
  const itemIndex = items.findIndex(item => item.key === data.value)
  const isInInventory = itemName.includes(data.value) ? true : false

  return (
    <button 
      className={`flex p-2 border ${!data.isBtnDisabled ? 'bg-gray-700' : 'bg-gray-900'}`}
      value={data.value} 
      onClick={(e) => data.handleClick(e.currentTarget.value)}
      disabled={data.isBtnDisabled}
    >
      {isInInventory && <p className='top-0 left-0 text-[0.6rem] font-press-start'>{items[itemIndex].quantity}x</p>}
      <div className='flex items-center gap-2 text-left'>
        <img className={`${isInInventory ? 'py-2 pr-2' : 'p-2'}`} src={data.icon} alt='Icon'/>
        <p className='text-justify'>{data.description}</p>
      </div>
    </button>
  )
}

export default ActionBox