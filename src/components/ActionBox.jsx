import React from 'react'

function ActionBox(props) {
  return (
    <button 
      className={`flex gap-2 p-2 border items-center text-left ${!props.data.isBtnDisabled ? 'bg-gray-600' : 'bg-gray-900'}`}
      value={props.data.value} 
      onClick={(e) => props.data.handleClick(e.target.value)}
      disabled={props.data.isBtnDisabled}
    >
      <img className='p-2' src={props.data.icon} alt='Icon'/>
      {props.data.description}
    </button>
  )
}

export default ActionBox