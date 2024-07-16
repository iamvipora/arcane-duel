import React from 'react'
import HeartFull from '/images/heart-full.png'
import HeartEmpty from '/images/heart-empty.png'

const HealthBar = ({ currentHealth, entity }) => {
  const maxHearts = 100 / 20
  const numberOfHearts = currentHealth / 20
  const hearts = []
  for(let i = 0; i < maxHearts ; i++){
    hearts.push(
      <img
        key={i}
        src={i < numberOfHearts ? HeartFull : HeartEmpty}
        alt={i < numberOfHearts ? 'Full Heart' : 'Empty Heart'}
      />
    )
  }
  if(entity == 'enemy'){
    hearts.reverse()
  }
  return <div className='flex mx-1 gap-1'>{hearts}</div>
}

export default HealthBar