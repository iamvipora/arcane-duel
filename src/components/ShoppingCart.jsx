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
      <>
        {whichCart.items[item.key] ?
          <div className='p-2 flex bg-gray-700 border gap-4'>
            <img src={item.icon} alt="" />
              <p>Price: <br/>{itemPrice}</p>
            <p>Owned: <br/>{item.quantity}</p>
            <p>Quantity: <br/>{whichCart.items[item.key]}</p>    
          </div>
        :
          ''
        }
    </>
    )
  })

  return (
    // Fix add unique key per prop error
    <div className='flex flex-col font-dotgothic16-regular text-center text-white border bg-gray-800 p-2 h-96 justify-between rounded-md'>
      <h1 className='font-press-start'>Shopping Cart</h1>
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
      <button 
        className='font-press-start'
        onClick={() => setShowCart(prev => !prev)}
      >
        Back  
      </button> 
    </div>
  )
}

export default ShoppingCart