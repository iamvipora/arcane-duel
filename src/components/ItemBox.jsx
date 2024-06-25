import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function ItemBox({ data, playerGold, playerItem, cart, setCart, tempCart, setTempCart, setAlertMessage}) {
  const location = useLocation()
  const itemPrice = location.pathname == '/shop' ? data.buyPrice : data.sellPrice
  const actionType = location.pathname == '/shop' ? 'buy' : 'sell'

  useEffect(() => {
    setTempCart({
      items: {
        potion: 0,
        barrier: 0,
        doubleSword: 0
      },
      totalQuantity: 0,
      totalPrice: 0
    })
  }, [])

  const updateQuantity = (type, item) => {
    const newQuantity = (type === 'addItem') ? tempCart.items[item] + 1 : tempCart.items[item] - 1
    setTempCart(prevState => ({
      ...prevState,
      items: {
        ...prevState.items,
        [item]: Math.max(newQuantity, 0)
      }
    }))
  }

  const updatePrice = (price) => {
    const newtotalPrice = tempCart.totalPrice + price
    setTempCart(prevState => ({
      ...prevState,
      totalPrice: newtotalPrice
    }))
  }

  const updateTempCart = (type, action, price, item) => {
    if(action == 'buy'){
      if(type == 'addItem'){
        if(tempCart.totalPrice + price <= playerGold){
            updatePrice(price)
            updateQuantity(type, item)
          }else{
            setAlertMessage('Not enough gold.')
          }
        } else if(type == 'removeItem' && tempCart.items[item] > 0){
            updatePrice(-price)
            updateQuantity(type, item)
          }
    } else if(action == 'sell'){
      if(type == 'addItem'){
        if(tempCart.items[item] + 1 <= playerItem[item]){
            updatePrice(price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && tempCart.items[item] > 0){
            updatePrice(-price)
            updateQuantity(type, item)
          }
    }
  }

  return (
    <div className='border flex flex-col bg-gray-700 text-lg p-2'>
      <div className='relative flex flex-col p-1'>
        <div className='flex items-center w-full justify-between sm:grid sm:grid-cols-10'>
          <img src={data.icon} alt={data.value} className='h-14 w-14'/>
          <div className='text-left font-dotgothic16-regular p-2 sm:col-span-4'>
            <p>{data.description}</p>
          </div>
          <div className='font-dotgothic16-regular hidden sm:block sm:col-span-2'>
            <p>Price: <span className={`${location.pathname === '/shop' ? 'text-green-500' : 'text-red-500'}`}>{itemPrice}</span></p>
          </div>
          <div className='font-dotgothic16-regular hidden sm:block sm:col-span-2'>
            <p>Owned: {data.quantity}</p>
          </div>
          <div className='sm:col-start-11'>
            <div className='font-dotgothic16-regular place-items-center flex flex-col'>
              <button onClick={() => updateTempCart('addItem', actionType, itemPrice, data.value)}>
                <IoMdArrowDropup className='h-8 w-8'/>
              </button>
              <p>{tempCart.items[data.value]}{location.pathname === '/inventory' && <span>/{data.quantity}</span>}</p>
              <button onClick={() => updateTempCart('removeItem', actionType, itemPrice, data.value)}>
                <IoMdArrowDropdown className='h-8 w-8'/>
              </button> 
            </div>
          </div>       
        </div>        
      </div>
      <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center sm:hidden'>
        <div className='flex items-center place-content-center gap-10 w-3/4 font-dotgothic16-regular'>
          <p>Price: <span className={`${location.pathname === '/shop' ? 'text-green-500' : 'text-red-500'}`}>{itemPrice}</span></p>
          <p>Owned: {data.quantity}</p>
        </div>
      </div>
    </div>
  )
}

export default ItemBox