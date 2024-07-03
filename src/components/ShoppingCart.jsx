import { useLocation } from 'react-router-dom'

function ShoppingCart({ items, sellCart, buyCart, checkOut }) {
  const location = useLocation()
  const isInInventory = location.pathname === '/inventory' ? true : false
  const cart = isInInventory ? sellCart : buyCart

  const cartTotalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0)
  const cartTotalQuantity = cart.reduce((quantity, item) => {
    return quantity + item.quantity
  }, 0)


  const renderCartItems = cart.map(data => {
    const itemIndex = items.findIndex(item => item.key === data.key)

    return (
      <div key={data.key} className='flex flex-col gap-1 p-2 bg-gray-700 border' >
        <div className='flex gap-4 items-center'>
          <img src={items[itemIndex].icon} alt={items[itemIndex].key} className='h-14 w-14' />
          <p>Price: {data.price}</p>
          <p>Owned: {items[itemIndex].quantity}</p>
          <p>Quantity: {data.quantity}</p>
        </div>
      </div>
    )
  })

  return (
    <div className='h-full w-full min-w-[425px] flex flex-col font-dotgothic16-regular text-center text-white border bg-gray-800 p-2 m-5 lg:m-0 justify-between rounded-md'>
       {cart.length ? 
        <div className='flex flex-col gap-2 w-full'>
           {renderCartItems}
        </div>
        :
         'Shopping cart is empty'
       }
       <div className='w-full place-content-center items-center'>
        {cartTotalPrice > 0 && <p className='font-dotgothic16-regular'>{`Total price: ${cartTotalPrice} for ${cartTotalQuantity} items.`}</p>}
        <button 
          className='border px-4 bg-gray-700 w-40 p-1'
          value={location.pathname == '/shop' ? 'buyItems' : 'sellItems'}
          onClick={(e) => checkOut(e.currentTarget.value)}  
        >
          <p>{location.pathname == '/shop' ? 'Buy' : 'Sell'}</p>
        </button>
       </div>
     </div>
  )
}

export default ShoppingCart