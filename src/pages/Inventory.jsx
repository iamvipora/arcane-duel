import React from 'react'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import ShoppingCart from '../components/ShoppingCart'
import BackgroundImage from '/images/background.jpg'
import GoldCoinsIcon from '/images/gold-coins.png'

function Inventory({ items, playerGold, playerItem, cart, showCart, isAlertVisible, alertMessage, fadeClass, setPlayerGold, setPlayerItem, setCart, setShowCart, buySell, FaShoppingCart }) {
  const renderItemBox = items.map((data) => {
    return <ItemBox
      key={data.key}
      data={data}
      playerGold={playerGold}
      playerItem={playerItem}  
      cart={cart}
      setCart={setCart}
    />
  })

  return (
    <>
      {showCart && 
        <div className='flex h-screen w-screen backdrop-blur-sm fixed z-10 items-center place-content-center'>
          <ShoppingCart
            items={items}
            cart={cart}
            setCart={setCart}
            setShowCart={setShowCart}
          />
        </div>
      }
      <div className='min-h-screen h-full w-screen min-w-[375px] flex place-content-center text-white text-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className='min-w-[320px] max-w-[800px] flex flex-col my-5 font-press-start text-center'>
          <h1 className='text-3xl'>Inventory</h1>
          <div className='h-full m-5 p-2 border rounded-md bg-gray-800'>
            <div className='flex justify-between font-dotgothic16-regular'>
              <div className='flex items-center justify-between'>
                <img src={GoldCoinsIcon} alt='Icon'/>
                <p>{playerGold}</p>
              </div> 
              <div className='flex items-center gap-2'>
                <FaShoppingCart 
                  className='h-8 w-8 cursor-pointer'
                  onClick={() => {setShowCart(prev => !prev)}}
                />
                <p className=''>{cart.totalQuantity}</p>
              </div>
            </div>
              <div className='flex flex-col gap-3'>
                {renderItemBox}
              </div>
              <div className='flex gap-2 my-4 w-full font-dotgothic16-regular place-content-center sm:place-content-end'>
                <button 
                  className='border px-4 bg-gray-700 w-40 p-1'
                  value='sellItems'
                  onClick={(e) => buySell(e.currentTarget.value)}  
                >
                  <p>Sell</p>
                </button>
              </div>
              <div className='flex flex-col gap-2'>
                {cart.totalPrice > 0 && <p className='font-dotgothic16-regular'>{`Total price: ${cart.totalPrice} for ${cart.totalQuantity} items.`}</p>} 
                {isAlertVisible && <p className={`font-dotgothic16-regular ${fadeClass}`}>{alertMessage}</p>}       
              </div>
              {/* <div className='flex flex-col gap-2 p-4'>
                <button onClick={()=> {setPlayerItem(prevState => ({
                  potion: prevState.potion + 1,
                  barrier: prevState.barrier + 1,
                  doubleSword: prevState.doubleSword + 1
                }))}}>
                  Add supplies
                </button>
                <button onClick={() =>{setPlayerItem({potion: 0, barrier: 0, doubleSword: 0})}}>
                  Reset supplies
                </button>
                <button onClick={() =>{setPlayerGold(prevState => prevState + 1000)}}>
                  Add gold
                </button>
                <button onClick={() =>{setPlayerGold(0)}}>
                  Reset gold
                </button>
              </div> */}
            </div>
          <footer>
            <Link to='/'>
              <p className='text-xl'>Back</p>
            </Link>
          </footer>  
        </div> 
      </div>
    </>
  )
}

export default Inventory