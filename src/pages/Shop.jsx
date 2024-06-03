import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import { FaShoppingCart } from "react-icons/fa"
import BackgroundImage from '/images/background.jpg'
import PotionIcon from '/images/potion.png'
import DoubleEdgedSwordIcon from '/images/2-sword.png'
import BarrierIcon from '/images/barrier.png'
import GoldCoinsIcon from '/images/gold-coins.png'

function Shop(props) {

  const [cartItemQuantity, setCartItemQuantity] = useState({potion: 0, barrier: 0, doubleSword: 0})
  const [cartQuantity, setCartQuantity] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const [shopState, setShopState] = useState('off')

  const resetShop = () => {
    setShopState('off')
    setCartItemQuantity({potion: 0, barrier: 0, doubleSword: 0})
    setCartQuantity(0)
    setCartTotalPrice(0)
  }

  const handleClick = (action) => {
    if(action == 'buy'){
      setShopState('buy')
    } else if(action == 'sell'){
      setShopState('sell')
    } else if(action == 'cancel'){
      resetShop()
    }

    if(action == 'buyItems'){
      if(props.playerGold >= cartTotalPrice){
        props.setPlayerItem(prevState => ({
          ...prevState,
          potion: prevState.potion + cartItemQuantity.potion,
          barrier: prevState.barrier + cartItemQuantity.barrier,
          doubleSword: prevState.doubleSword + cartItemQuantity.doubleSword
        }))
        props.setPlayerGold(prevState => prevState - cartTotalPrice)
      }
      resetShop()
    } else if(action == 'sellItems'){
      
    }
  }

  useEffect(() => {
    let newCartQuantity = cartItemQuantity.potion + cartItemQuantity.barrier + cartItemQuantity.doubleSword
    setCartQuantity(newCartQuantity)
  }, [cartItemQuantity])


  const items = [
    {
      icon: PotionIcon,
      value: 'potion',
      description: 'Consume a red potion and gain 20 HP back.',
      quantity: props.playerItem.potion,
      key: 'potion',
      buyPrice: 100,
      sellPrice: 50
    },
    {
      icon: BarrierIcon,
      value: 'barrier',
      description: 'Cast a barrier on yourself and block the next attack.',
      quantity: props.playerItem.barrier,
      key: 'barrier',
      buyPrice: 150,
      sellPrice: 75
    },
    {
      icon: DoubleEdgedSwordIcon,
      value: 'doubleSword',
      description: 'Increase damage dealt and receive by 2x for 1 turn.',
      quantity: props.playerItem.doubleSword,
      key: 'doubleSword',
      buyPrice: 200,
      sellPrice: 100
    }
  ]

  const renderItemBox = items.map((value) => {
    return <ItemBox
    key={value.key}
    data={value}
    shopState={shopState}
    cartItemQuantity={cartItemQuantity}
    setCartItemQuantity={setCartItemQuantity}
    cartTotalPrice={cartTotalPrice}
    setCartTotalPrice={setCartTotalPrice}
  />
  })

  return (
    <div className='min-h-screen h-full w-screen flex place-content-center text-white bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='flex flex-col max-w-[375px] my-5 font-press-start text-center'>
        <h1 className='text-3xl'>Shop</h1>
        <div className='h-full m-5 p-2 border rounded-md bg-gray-800'>
          <div className='flex font-dotgothic16-regular justify-between'>
            <div className='flex items-center justify-between'>
              <img src={GoldCoinsIcon} alt='Icon'/>
              {props.playerGold}
            </div> 
            <div className='flex items-center gap-2'>
              <FaShoppingCart className='h-6 w-6'/>
              <p className=''>{cartQuantity}</p>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            {renderItemBox}
          </div>
          <div className='flex gap-2 font-dotgothic16-regular place-content-center m-4'>
            <button 
              className='border px-4 bg-gray-600'
              value={shopState !== 'buy' && shopState !== 'sell' ? 'buy' : 'cancel'}
              onClick={(e) => handleClick(e.currentTarget.value)}  
            >
              <p>{shopState == 'off' ? 'Buy' : 'Cancel'}</p>
            </button>
            <button 
              className='border px-4 bg-gray-600'
              value={shopState == 'buy' ? 'buyItems' : shopState == 'sell' ? 'sellItems' : 'sell'}
              onClick={(e) => handleClick(e.currentTarget.value)}  
            > 
              <p>{shopState == 'buy' ? 'Buy' : 'Sell'}</p>
            </button>
          </div>
        {cartTotalPrice > 0 && <p className='font-dotgothic16-regular'>{`Total price: ${cartTotalPrice} for ${cartQuantity} items.`}</p>}           
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

export default Shop