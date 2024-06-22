import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import ShoppingCart from '../components/ShoppingCart'
import { FaShoppingCart } from "react-icons/fa"
import BackgroundImage from '/images/background.jpg'
import GoldCoinsIcon from '/images/gold-coins.png'

function Shop({ playerGold, playerItem, setPlayerGold, setPlayerItem, items }) {
  const [cartItemQuantity, setCartItemQuantity] = useState({potion: 0, barrier: 0, doubleSword: 0})
  const [cartQuantity, setCartQuantity] = useState(0)
  const [cartTotalPrice, setCartTotalPrice] = useState(0)

  const [shopState, setShopState] = useState('off')
  const [showCart, setShowCart] = useState(false)
  
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeClass, setFadeClass] = useState('animate-fadeIn')
  
  useEffect(() => {
    let newCartQuantity = cartItemQuantity.potion + cartItemQuantity.barrier + cartItemQuantity.doubleSword
    setCartQuantity(newCartQuantity)
  }, [cartItemQuantity])

  useEffect(() => {
    setIsAlertVisible(true)
    setFadeClass('animate-fadeIn')

    const timer = setTimeout(() => {
      setFadeClass('animate-fadeOut')
      setTimeout(() => {
        setIsAlertVisible(false)
        setAlertMessage('')
      }, 900)
    }, 3000)

    return () => clearTimeout(timer);
  }, [alertMessage])
  
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
      if(cartQuantity){
        setPlayerItem(prevState => ({
          ...prevState,
          potion: prevState.potion + cartItemQuantity.potion,
          barrier: prevState.barrier + cartItemQuantity.barrier,
          doubleSword: prevState.doubleSword + cartItemQuantity.doubleSword
        }))
        setAlertMessage(`Bought ${cartQuantity} item(s) for ${cartTotalPrice}.`)
        setPlayerGold(prevState => prevState - cartTotalPrice)
      } else{
        setAlertMessage('There were no items on the cart.')
      }
      resetShop()
    } else if(action == 'sellItems'){
      if(cartQuantity){
        setPlayerItem(prevState => ({
          ...prevState,
          potion: prevState.potion - cartItemQuantity.potion,                   
          barrier: prevState.barrier - cartItemQuantity.barrier,
          doubleSword: prevState.doubleSword - cartItemQuantity.doubleSword
        }))
        setAlertMessage(`Sold ${cartQuantity} item(s) for ${cartTotalPrice}.`)
        setPlayerGold(prevState => prevState + cartTotalPrice)
      } else{
        setAlertMessage('There were no items on the cart.')
      }
      resetShop()
    }
  }

  const renderItemBox = items.map((data) => {
    return <ItemBox
      key={data.key}
      data={data}
      shopState={shopState}
      playerGold={playerGold}
      playerItem={playerItem}  
      cartTotalPrice={cartTotalPrice}
      cartItemQuantity={cartItemQuantity}
      setCartTotalPrice={setCartTotalPrice}
      setCartItemQuantity={setCartItemQuantity}
    />
  })

  return (
    <>
    {showCart && 
      <div className='flex h-screen w-screen backdrop-blur-sm fixed z-10 items-center place-content-center'>
        <ShoppingCart
          items={items}
          shopState={shopState}
          cartQuantity={cartQuantity}
          cartItemQuantity={cartItemQuantity}
          cartTotalPrice={cartTotalPrice}
          showCart={showCart}
          setShowCart={setShowCart}
        />
      </div>
    }
    <div className='min-h-screen h-ful lw-screen min-w-[375px] flex place-content-center text-white bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='min-w-[320px] max-w-[800px] flex flex-col my-5 font-press-start text-center'>
        <h1 className='text-3xl'>Shop</h1>
        <div className='h-full m-5 p-2 border rounded-md bg-gray-800'>
          <div className='flex justify-between font-dotgothic16-regular '>
            <div className='flex items-center justify-between'>
              <img src={GoldCoinsIcon} alt='Icon'/>
              {playerGold}
            </div> 
            <div className='flex items-center gap-2'>
              <FaShoppingCart 
                className='h-6 w-6 cursor-pointer'
                onClick={() => {setShowCart(prev => !prev)}}
              />
              <p className=''>{cartQuantity}</p>
            </div>
          </div>
          <div className='flex flex-col gap-3'>
            {renderItemBox}
          </div>
          <div className='flex gap-2 font-dotgothic16-regular place-content-center my-4 w-full'>
            <button 
              className='border px-4 bg-gray-700 w-1/2 p-1'
              value={shopState !== 'buy' && shopState !== 'sell' ? 'buy' : 'cancel'}
              onClick={(e) => handleClick(e.currentTarget.value)}  
            >
              <p>{shopState == 'off' ? 'Buy' : 'Cancel'}</p>
            </button>
            <button 
              className='border px-4 bg-gray-700 w-1/2 p-1'
              value={shopState == 'buy' ? 'buyItems' : shopState == 'sell' ? 'sellItems' : 'sell'}
              onClick={(e) => handleClick(e.currentTarget.value)}  
            > 
              <p>{shopState == 'buy' ? 'Buy' : 'Sell'}</p>
            </button>
          </div>
          <div className='flex flex-col gap-2'>
            {cartTotalPrice > 0 && <p className='font-dotgothic16-regular'>{`Total price: ${cartTotalPrice} for ${cartQuantity} items.`}</p>} 
            {isAlertVisible && <p className={`font-dotgothic16-regular ${fadeClass}`}>{alertMessage}</p>}       
          </div>
        </div>
        <footer>  
          <Link to='/'>
            Back
          </Link>
        </footer>    
      </div>
    </div>
    </>
  )
}

export default Shop