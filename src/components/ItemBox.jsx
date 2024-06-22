import React from 'react'
import { useLocation } from 'react-router-dom'

function ItemBox({data, shopState, playerGold, playerItem, cartTotalPrice, cartItemQuantity, setCartTotalPrice, setCartItemQuantity}) {

  const location = useLocation()

  const updateQuantity = (type, item) => {
    const newQuantity = (type == 'removeItem') ? cartItemQuantity[item] - 1 : cartItemQuantity[item] + 1
    setCartItemQuantity(prevState => ({
      ...prevState,
      [item]: Math.max(newQuantity, 0)
    }))
  }

  const updateCart = (type, action, price, item) => {
    if(action == 'buy'){
      if(type == 'addItem'){
        if (cartTotalPrice + price <= playerGold){
            setCartTotalPrice(prevState => prevState + price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && cartItemQuantity[item] > 0){
            setCartTotalPrice(prevState => prevState - price)
            updateQuantity(type, item)
          }
    } else if(action == 'sell'){
      if(type == 'addItem'){
        if(cartItemQuantity[item] + 1 <= playerItem[item]){
            setCartTotalPrice(prevState => prevState + price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && cartItemQuantity[item] > 0){
            setCartTotalPrice(prevState => prevState - price)
            updateQuantity(type, item)
          }
    }
  }
  
  return (
    <div className='border flex flex-col bg-gray-700 hover:bg-gray-800 mb-auto'>
      <div className='relative flex items-start p-1'>
        {location.pathname == '/inventory' && <p className='top-0 left-0 text-[0.6rem]'>{data.quantity}x</p>}
        <div className='flex items-center w-full'>
          <img 
            src={data.icon} 
            alt={data.value}
            className='mx-1'
          />
          <div className='text-left font-dotgothic16-regular p-2'>
            {data.description}
          </div>       
        </div>  
        
      </div>
      {location.pathname == '/shop' && shopState !== 'off' ?
        shopState == 'buy' ?
          <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center'>
            <div className='flex items-center justify-between w-3/4 font-dotgothic16-regular text-sm'>
              <p> Price: <span className='text-green-500'>{data.buyPrice}</span></p>
              <p className='flex gap-2'>
                Quanitity: {cartItemQuantity[data.value]}
                <button onClick={() => updateCart('removeItem', 'buy', data.buyPrice, data.value)}>
                  -
                </button>
                |
                <button onClick={() => updateCart('addItem', 'buy', data.buyPrice, data.value)}>
                  +
                </button>
              </p>
            </div>
          </div>
          :
          <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center'>
            <div className='flex items-center justify-between w-3/4 font-dotgothic16-regular text-sm'>
              <p> Price: <span className='text-red-500'>{data.sellPrice}</span></p>
              <p className='flex gap-2'>
                Quanitity: {`${cartItemQuantity[data.value]}/${playerItem[data.value]}`}
                <button onClick={() => updateCart('removeItem', 'sell', data.buyPrice, data.value)}>
                  -
                </button>
                |
                <button onClick={() => updateCart('addItem', 'sell', data.buyPrice, data.value)}>
                  +
                </button>
              </p>
            </div>
          </div>
        :
          ''
        }         
    </div>
  )
}

export default ItemBox