import { useLocation } from 'react-router-dom'

const ShoppingCart = ({ items, sellCart, buyCart, setShowCart, buySell }) => {
  const location = useLocation()
  const whichCart = location.pathname == '/shop' ? buyCart : sellCart

  const cartItem = items.map((item) => ({
    ...item,
    quantity: whichCart.items[item.value]
  }))

  const renderCartItem = cartItem.map((item) => {
    const itemPrice = location.pathname == '/shop' ? <span className='text-green-500'>{item.buyPrice}</span> : <span className='text-red-500'>{item.sellPrice}</span>
    
    return (
      whichCart.items[item.value] && (
        <div key={item.value} className='p-2 flex bg-gray-700 border gap-4'>
          <img src={item.icon} alt="" />
          <p>Price: <br/>{itemPrice}</p>
          <p>Owned: <br/>{item.quantity}</p>
          <p>Quantity: <br/>{whichCart.items[item.value]}</p>    
        </div>
      )
    )
  })

  return (
    <div className='h-full w-full min-w-[325px] flex flex-col font-dotgothic16-regular text-center text-white border bg-gray-800 p-2 m-5 lg:m-0 justify-between rounded-md'>
      {whichCart.totalQuantity ? 
        <div className='flex flex-col gap-2 w-full'>
          {renderCartItem}
        </div>
        :
        'Shopping cart is empty'
        }
      <div>
        {whichCart.totalPrice > 0 && <p className='font-dotgothic16-regular'>{`Total price: ${whichCart.totalPrice} for ${whichCart.totalQuantity} items.`}</p>}
        <button 
          className='border px-4 bg-gray-700 w-40 p-1'
          value={location.pathname == '/shop' ? 'buyItems' : 'sellItems'}
          onClick={(e) => buySell(e.currentTarget.value)}  
        >
          <p>{location.pathname == '/shop' ? 'Buy' : 'Sell'}</p>
        </button>
      </div>
    </div>
  )
}

export default ShoppingCart