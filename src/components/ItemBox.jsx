import React from 'react'
import { useLocation } from 'react-router-dom'

function ItemBox(props) {

  const location = useLocation()

  const updateQuantity = (type, item) => {
    const newQuantity = (type == 'removeItem') ? props.cartItemQuantity[item] - 1 : props.cartItemQuantity[item] + 1
    props.setCartItemQuantity(prevState => ({
      ...prevState,
      [item]: Math.max(newQuantity, 0)
    }))
  }

  const updateCart = (type, action, price, item) => {
    if(action == 'buy'){
      if(type == 'addItem'){
        if (props.cartTotalPrice + price <= props.playerGold){
            props.setCartTotalPrice(prevState => prevState + price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && props.cartItemQuantity[item] > 0){
            props.setCartTotalPrice(prevState => prevState - price)
            updateQuantity(type, item)
          }
    } else if(action == 'sell'){
      if(type == 'addItem'){
        if(props.cartItemQuantity[item] + 1 <= props.playerItem[item]){
            props.setCartTotalPrice(prevState => prevState + price)
            updateQuantity(type, item)
          }
        } else if(type == 'removeItem' && props.cartItemQuantity[item] > 0){
            props.setCartTotalPrice(prevState => prevState - price)
            updateQuantity(type, item)
          }
    }
  }
  
  return (
    <div className='border flex flex-col bg-gray-600 hover:bg-gray-800 items-center mb-auto'>
        <div className='relative flex items-start p-1'>
          {location.pathname == '/inventory' && <p className='top-0 left-0 text-[0.6rem]'>{props.data.quantity}x</p>}
          <div className='flex items-center'>
            <img 
              src={props.data.icon} 
              alt={props.data.value}
              className='mx-1'
            />
            <div className='text-left font-dotgothic16-regular p-2'>
              {props.data.description}
            </div>
          </div>  
        </div>
        {location.pathname == '/shop' && props.shopState !== 'off' ?
        props.shopState == 'buy' ?
          <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center'>
            <div className='text-sm font-dotgothic16-regular flex w-3/4 justify-between'>
              <p> Price: <span className='text-green-500'>{props.data.buyPrice}</span></p>
              <p className='flex gap-2'>
                Quanitity: {props.cartItemQuantity[props.data.value]}
                <button onClick={() => updateCart('removeItem', 'buy', props.data.buyPrice, props.data.value)}>
                  -
                </button>
                |
                <button onClick={() => updateCart('addItem', 'buy', props.data.buyPrice, props.data.value)}>
                  +
                </button>
              </p>
            </div>
          </div>
          :
          <div className='w-full bg-gray-700 m-0 py-1 px-2 flex justify-center'>
            <div className='text-sm font-dotgothic16-regular flex justify-between w-3/4'>
              <p> Price: <span className='text-red-500'>{props.data.sellPrice}</span></p>
              <p className='flex gap-2'>
                Quanitity: {`${props.cartItemQuantity[props.data.value]}/${props.playerItem[props.data.value]}`}
                <button onClick={() => updateCart('removeItem', 'sell', props.data.buyPrice, props.data.value)}>
                  -
                </button>
                |
                <button onClick={() => updateCart('addItem', 'sell', props.data.buyPrice, props.data.value)}>
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