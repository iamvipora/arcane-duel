import { useLocation } from 'react-router-dom'

const ShoppingCart = ({ items, cart, setShowCart }) => {
  const location = useLocation()

  const cartItem = items.map((item) => ({
    ...item,
    quantity: cart.items[item.value]
  }))

  const renderCartItem = cartItem.map((item) => {
    return (
      <>
        {cart.items[item.key] ?
          <div className='p-2 flex bg-gray-700 border gap-4'>
            <img src={item.icon} alt="" />
            {location.pathname == '/shop' ?
              <p>Price: <br/><span className='text-green-500'>{item.buyPrice}</span></p>
              :
              <p>Price: <br/><span className='text-red-500'>{item.sellPrice}</span></p>
            }
            <p>Owned: <br/>{item.quantity}</p>
            <p>Quantity: <br/>{cart.items[item.key]}</p>    
          </div>
        :
          null
        }
    </>
    )
  })

  return (
    // Fix add unique key per prop error
    <div className='flex flex-col font-dotgothic16-regular text-center text-white border bg-gray-800 p-2 h-96 justify-between rounded-md'>
      <h1 className='font-press-start'>Shopping Cart</h1>
      {cart.totalQuantity ? 
        <div className='flex flex-col gap-2 w-full'>
          {renderCartItem}
        </div>
        :
        'Shopping cart is empty'
        }
      <div>
        <p>Total: {cart.totalPrice}</p>
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