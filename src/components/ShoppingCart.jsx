import { useLocation } from 'react-router-dom'
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io"

function ShoppingCart({ items, sellCart, buyCart, setSellCart, setBuyCart, checkOut, removeFromCart }) {
  const location = useLocation()
  const isInInventory = location.pathname === '/inventory' ? true : false
  
  const cart = isInInventory ? sellCart : buyCart
  const setCart = isInInventory ? setSellCart : setBuyCart
  const textColor = isInInventory ? 'text-green-500' : 'text-red-500'

  const cartTotalPrice = cart.reduce((total, item) => total + (item.quantity * item.price), 0)
  const cartTotalQuantity = cart.reduce((quantity, item) => {
    return quantity + item.quantity
  }, 0)

  const renderCartItems = cart.map(data => {
    const itemIndex = items.findIndex(item => item.key === data.key)

    const updateCart = (action) => {
      const cartItemIndex = cart.findIndex(item => item.key === data.key)
      const cartItem = cart[cartItemIndex]
      
      if(action == 'addItem'){
        const updatedCart = cart.map((item, index) => cart[index].key === data.key ? { ...item, quantity: item.quantity + 1 } : item)
        setCart(updatedCart)
      } else if(action === 'removeItem'){ 
        const updatedCart = cartItem.quantity > 1
          ? cart.map((item, index) => cart[index].key === data.key ? 
            { ...item, quantity: item.quantity - 1 } : item )
          : 
            cart.filter((_, index) => index !== cartItemIndex)
        setCart(updatedCart)
      }
    }

    return (
      <div key={data.key} className='flex flex-col gap-1 bg-gray-700 border'>
        <div className='flex gap-4 items-center p-2'>
          <img src={items[itemIndex].icon} alt={items[itemIndex].key} className='h-14 w-14' />
          <div className='w-full flex justify-between'>
            <p>Price: <span className={textColor}>{data.price}</span></p>
            <p>Owned: {items[itemIndex].quantity}</p>
            <p className='flex'>
              <button onClick={() => updateCart('removeItem')}>{<IoMdArrowDropleft className='h-8 w-8'/>}</button> 
              {data.quantity}
              <button onClick={() => updateCart('addItem')}>{<IoMdArrowDropright className='h-8 w-8'/>}</button>
            </p>
          </div>
        </div>
        <button 
          className='text-red-500 bg-gray-600 py-1 w-full'
          onClick={() => removeFromCart(data.key, cart, isInInventory)}
        >
          Remove
        </button>
      </div>
    )
  })

  return (
    <div className='h-full w-[375px] flex flex-col font-dotgothic16-regular text-center text-white border bg-gray-800 p-2 m-5 lg:m-0 rounded-md text-lg'>
      <h1 className='text-2xl font-press-start hidden lg:block'>Cart</h1>
      <div className='h-full w-full gap-2 py-4 justify-between'>
        {cart.length ? 
          <div className='flex flex-col gap-2 w-full'>
            {renderCartItems}
          </div>
          :
          <p>Shopping cart is empty</p>
        }
       </div>
       <div className='w-full flex flex-col items-center gap-6 py-10'>
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