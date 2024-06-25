import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import ShoppingCart from '../components/ShoppingCart'
import BackgroundImage from '/images/background.jpg'
import GoldCoinsIcon from '/images/gold-coins.png'

function Shop({ items, playerGold, playerItem, cart, tempCart, showCart, isAlertVisible, alertMessage, fadeClass, setCart, setTempCart, setShowCart, setAlertMessage, buySell, addToCart, FaShoppingCart }) {
  const renderItemBox = items.map((data) => {
    return <ItemBox
      key={data.key}
      data={data}
      playerGold={playerGold}
      playerItem={playerItem}  
      cart={cart}
      tempCart={tempCart}
      setCart={setCart}
      setTempCart={setTempCart}
      setAlertMessage={setAlertMessage}
    />
  })
  
  return (
    <>
      {showCart && 
        <div className='flex h-screen w-screen backdrop-blur-sm fixed z-10 items-center place-content-center'>
          <ShoppingCart
            items={items}
            cart={cart}
            setCart={cart}
            showCart={showCart}
            setShowCart={setShowCart}
            buySell={buySell}
          />
        </div>
      }
      <div className='min-h-screen h-full w-screen min-w-[375px] flex place-content-center text-white text-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className='min-w-[320px] max-w-[800px] flex flex-col my-5 font-press-start text-center'>
          <h1 className='text-3xl'>Shop</h1>
          <div className='h-full m-5 p-2 border rounded-md bg-gray-800'>
            <div className='flex justify-between font-dotgothic16-regular '>
              <div className='flex items-center justify-between'>
                <img src={GoldCoinsIcon} alt='Icon'/>
                <p>{playerGold}</p>
              </div> 
              <div className='flex items-center gap-2'>
                <FaShoppingCart 
                  className='h-8 w-8 cursor-pointer'
                  onClick={() => {setShowCart(prevState => !prevState)}}
                />
                <p>{cart.totalQuantity}</p>
              </div> 
            </div>
            <div className='flex flex-col gap-3'>
              {renderItemBox}
            </div>
            <div className='flex gap-2 my-4 w-full font-dotgothic16-regular place-content-center sm:place-content-end'>
              <button 
                className='border px-4 bg-gray-700 w-40 p-1'
                onClick={addToCart} 
              >
                <p>Add to cart</p>
              </button>
            </div>
            <div className='flex flex-col gap-2'>
              {isAlertVisible && <p className={`font-dotgothic16-regular ${fadeClass}`}>{alertMessage}</p>}       
            </div>
          </div>
          <footer>  
            <Link to='/'>
              <p className='text-xl'>Back</p>
            </Link>
          </footer>    
        </div>
      </div>
    </>
  )
}

export default Shop