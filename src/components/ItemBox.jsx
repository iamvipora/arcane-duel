import React from 'react'
import { useLocation } from 'react-router-dom'

function ItemBox(props) {

  const location = useLocation()
  const updateItemQuantity = (type, price, item, newQuantity) => {
    props.setCartItemQuantity(prevState => ({
      ...prevState,
      [item]: Math.max(newQuantity, 0)
    }))
    props.setCartTotalPrice(prevState => prevState + price)
    // if(type == 'buy') {
    //   console.log('buy')
    // } else if(type == 'sell') {
    //   console.log('sell')
    // }
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
                <button onClick={() => updateItemQuantity('buy', props.data.buyPrice, props.data.value, props.cartItemQuantity[props.data.value] - 1)}>
                  -
                </button>
                |
                <button onClick={() => updateItemQuantity('buy', props.data.buyPrice, props.data.value, props.cartItemQuantity[props.data.value] + 1)}>
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
                Quanitity: {props.cartItemQuantity[props.data.value]}
                <button onClick={() => updateItemQuantity('sell', props.data.sellPrice, props.data.value, props.cartItemQuantity[props.data.value] - 1)}>
                  -
                </button>
                |
                <button onClick={() => updateItemQuantity('sell', props.data.sellPrice, props.data.value, props.cartItemQuantity[props.data.value] + 1)}>
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