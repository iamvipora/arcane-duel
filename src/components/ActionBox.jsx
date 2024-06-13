import React from 'react'

function ActionBox(props) {

  const items = ['potion', 'barrier', 'doubleSword']

  return (
    <button 
      className={`flex p-2 border ${!props.data.isBtnDisabled ? 'bg-gray-600' : 'bg-gray-900'}`}
      value={props.data.value} 
      onClick={(e) => props.data.handleClick(e.currentTarget.value)}
      disabled={props.data.isBtnDisabled}
    >
      {items.includes(props.data.value) && <p className='top-0 left-0 text-[0.6rem] font-press-start'>{props.playerItem[props.data.value]}x</p>}
      <div className='flex items-center gap-2 text-left'>
        <img className={`${items.includes(props.data.value) ? 'py-2 pr-2' : 'p-2'}`} src={props.data.icon} alt='Icon'/>
        {props.data.description}
      </div>
    </button>
  )
}

export default ActionBox