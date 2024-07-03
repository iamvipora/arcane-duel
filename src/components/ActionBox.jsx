import React from 'react'

function ActionBox({ data, itemName, items }) {
  const itemIndex = items.findIndex(item => item.key === data.value)

  return (
    <button 
      className={`flex p-2 border ${!data.isBtnDisabled ? 'bg-gray-700' : 'bg-gray-900'}`}
      value={data.value} 
      onClick={(e) => data.handleClick(e.currentTarget.value)}
      disabled={data.isBtnDisabled}
    >
      {itemName.includes(data.value) && <p className='top-0 left-0 text-[0.6rem] font-press-start'>{items[itemIndex].quantity}x</p>}
      <div className='flex items-center gap-2 text-left'>
        <img className={`${itemName.includes(data.value) ? 'py-2 pr-2' : 'p-2'}`} src={data.icon} alt='Icon'/>
        {data.description}
      </div>
    </button>
  )
}

export default ActionBox