import React from 'react'
import { useLocation } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function ItemBox({ data, playerGold, playerItem, cart, setCart}) {
  const location = useLocation()

  const updateQuantity = (type, item) => {
    const newQuantity = (type === 'addItem') ? cart.items[item] + 1 : cart.items[item] - 1
    setCart(prevState => ({
      ...prevState,
      items: {
        ...prevState.items,
        [item]: Math.max(newQuantity, 0)
      }
    }))
  }

  const updatePrice = (price) => {
    const newtotalPrice = cart.totalPrice + price
    setCart(prevState => ({
      ...prevState,
      totalPrice: newtotalPrice
    }))
  }

  const updateCart = (type, action, price, item) => {
    if(action == 'buy'){
      if(type == 'addItem'){
        if(cart.totalPrice + price <= playerGold){
            updatePrice(price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && cart.items[item] > 0){
            updatePrice(-price)
            updateQuantity(type, item)
          }
    } else if(action == 'sell'){
      if(type == 'addItem'){
        if(cart.items[item] + 1 <= playerItem[item]){
            updatePrice(price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && cart.items[item] > 0){
            updatePrice(-price)
            updateQuantity(type, item)
          }
    }
  }
  
  return (
    <div className='border flex flex-col bg-gray-700'>
      <div className='relative flex items-start p-1'>
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
      {location.pathname == '/shop' ?
        <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center'>
          <div className='flex items-center justify-between w-3/4 font-dotgothic16-regular'>
            <p> Price: <span className='text-green-500'>{data.buyPrice}</span></p>
            <p> Owned: {data.quantity}</p>
            <p className='flex gap-2'>
              Quanitity: {cart.items[data.value]}
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
          <div className='flex items-center justify-between w-3/4 font-dotgothic16-regular'>
            <p> Price: <span className='text-red-500'>{data.sellPrice}</span></p>
            <p> Owned: {data.quantity}</p>
            <p className='flex gap-2'>
              Quanitity: {`${cart.items[data.value]}/${playerItem[data.value]}`}
              <button onClick={() => updateCart('removeItem', 'sell', data.sellPrice, data.value)}>
                -
              </button>
              |
              <button onClick={() => updateCart('addItem', 'sell', data.sellPrice, data.value)}>
                +
              </button>
            </p>
          </div>
        </div>
      }         
    </div>
  )
}

export default ItemBox