import React from 'react'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import BackgroundImage from '/images/background.jpg'
import PotionIcon from '/images/potion.png'
import DoubleEdgedSwordIcon from '/images/2-sword.png'
import BarrierIcon from '/images/barrier.png'
import GoldCoinsIcon from '/images/gold-coins.png'

function Inventory(props) {

  const items = [
    {
      icon: PotionIcon,
      value: 'Potion',
      description: 'Consume a red potion and gain 20 HP back.',
      quantity: props.playerItem.potion,
      key: 'potion'
    },
    {
      icon: BarrierIcon,
      value: 'Barrier',
      description: 'Cast a barrier on yourself and block the next attack.',
      quantity: props.playerItem.barrier,
      key: 'barrier'
    },
    {
      icon: DoubleEdgedSwordIcon,
      value: 'Double-Edged Sword',
      description: 'Increase damage dealt and receive by 2x for 1 turn.',
      quantity: props.playerItem.doubleSword,
      key: 'double-edged sword'
    }
  ]

  const renderItemBox = items.map((value) => {
    return <ItemBox
    key={value.key}
    data={value}
  />
  })

  return (
    <div className='min-h-screen h-full w-screen flex place-content-center text-white bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='flex flex-col max-w-[375px] my-5 font-press-start text-center'>
        <h1 className='text-3xl'>Inventory</h1>       
          <div className='h-full m-5 p-2 border rounded-md bg-gray-800'>
            <span className='flex items-center font-dotgothic16-regular'>
              <img src={GoldCoinsIcon} alt='Icon'/>
              {props.playerGold}
            </span>
            <div className='flex flex-col gap-3'>
              {renderItemBox}
            </div>
            <div className='flex flex-col gap-2 p-4'>
              <button onClick={()=> {props.setPlayerItem(prevState => ({
                ...prevState,
                potion: prevState.potion + 1,
                barrier: prevState.barrier + 1,
                doubleSword: prevState.doubleSword + 1
              }))}}>
                Add supplies
              </button>
              <button onClick={() =>{props.setPlayerItem({potion: 0, barrier: 0, doubleSword: 0})}}>
                Reset supplies
              </button>
              <button onClick={() =>{props.setPlayerGold(prevState => prevState + 1000)}}>
                Add gold
              </button>
              <button onClick={() =>{props.setPlayerGold(0)}}>
                Reset gold
              </button>
            </div>
          </div>
        <footer>
          <Link to='/'>
            Back
          </Link>
        </footer>  
      </div> 
    </div>
  )
}

export default Inventory