import React, { useEffect } from 'react'
import ItemFrame from '/images/item-frame.png'
import { useLocation } from 'react-router-dom'
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io"

function ItemBox({ data, tempCart, setTempCart, setAlertMessage }) {
  const location = useLocation()
  const isInInventory = location.pathname === '/inventory' ? true : false
  
  const itemPrice = isInInventory ? data.sellPrice : data.buyPrice
  const textColor = isInInventory ? 'text-green-500' : 'text-red-500'

  useEffect(() => {
    setTempCart([])
  }, [])

  const updateTempCart = (type, key, price) => {
    const existingItemIndex = tempCart.findIndex(item => item.key === key)
    const isInInventory = location.pathname === '/inventory'
  
    if(type === 'addItem'){
      if(existingItemIndex !== -1){
        const existingItem = tempCart[existingItemIndex]
        const canAddItem = isInInventory ? existingItem.quantity < data.quantity : true
  
        if(canAddItem){
          const updatedTempCart = tempCart.map((item, index) => index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item)
          setTempCart(updatedTempCart)
        } else{
          setAlertMessage('Cannot add more.')
        }
      } else{
        const canAddNewItem = isInInventory ? data.quantity > 0 : true
  
        if(canAddNewItem){
          const updatedTempCart = [...tempCart, { key, price, quantity: 1 }]
          setTempCart(updatedTempCart)
        } else{
          setAlertMessage('Cannot add more.')
        }
      }
    } else if(type === 'removeItem' && existingItemIndex !== -1){
      const existingItem = tempCart[existingItemIndex]
      const updatedTempCart = existingItem.quantity > 1
        ? tempCart.map((item, index) => index === existingItemIndex ? 
          { ...item, quantity: item.quantity - 1 } : item )
        : 
          tempCart.filter((_, index) => index !== existingItemIndex)
      setTempCart(updatedTempCart)
    }
  }
  
  return (
    <div className='border flex flex-col bg-gray-700 text-lg p-1'>
      <div className='relative flex flex-col p-1'>
        <div className='grid grid-cols-10 items-center w-full justify-between'>
          <div className='col-span-2 sm:col-span-1 h-24 w-16 flex bg-cover bg-no-repeat bg-center items-center justify-center' style={{ backgroundImage: `url(${ItemFrame})` }}>
            <img src={data.icon} alt={data.value} className='h-10 w-10'/>
          </div>  
          <div className='col-span-8 sm:col-span-4 text-justify font-dotgothic16-regular p-2'>
            <p>{data.description}</p>
          </div>
          <div className='sm:col-span-2 font-dotgothic16-regular hidden sm:block'>
            <p>Price: <span className={textColor}>{itemPrice}</span></p>
          </div>
          <div className='sm:col-span-2 font-dotgothic16-regular hidden sm:block'>
            <p>Owned: {data.quantity}</p>
          </div>
          <div className='col-start-11'>
            <div className='font-dotgothic16-regular place-items-center flex flex-col'>
              <button onClick={() => updateTempCart('addItem', data.key, itemPrice)}>
                <IoMdArrowDropup className='h-8 w-8'/>
              </button>
              <p>{tempCart.find(item => item.key === data.key)?.quantity || 0}{location.pathname == '/inventory' && '/' + data.quantity}</p>
              <button onClick={() => updateTempCart('removeItem', data.key, itemPrice)}>
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