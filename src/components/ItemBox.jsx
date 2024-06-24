import React from 'react'
import { useLocation } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function ItemBox({ data, playerGold, playerItem, cart, setCart}) {
  const location = useLocation()
  const itemPrice = location.pathname == '/shop' ? data.buyPrice : data.sellPrice
  const actionType = location.pathname == '/shop' ? 'buy' : 'sell'

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
            <p className='text-lg'>{data.description}</p>
          </div>
          <div className='flex flex-col font-dotgothic16-regular'>
            <button onClick={() => updateCart('addItem', actionType, itemPrice, data.value)}>
              <IoMdArrowDropup className='h-8 w-8'/>
            </button>
            <p>{cart.items[data.value]}</p>
            <button onClick={() => updateCart('removeItem', actionType, itemPrice, data.value)}>
              <IoMdArrowDropdown className='h-8 w-8'/>
            </button> 
          </div>       
        </div>        
      </div>
      <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center'>
        <div className='flex items-center place-content-center gap-10 w-3/4 font-dotgothic16-regular'>
          <p>Price: <span className={`${location.pathname == '/shop' ? 'text-green-500' : 'text-red-500'}`}>{itemPrice}</span></p>
          <p>Owned: {data.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemBox