import React from 'react'
import { Link } from 'react-router-dom'
import ItemBox from '../components/ItemBox'
import ShoppingCart from '../components/ShoppingCart'
import BackgroundImage from '/images/background.jpg'
import GoldCoinsIcon from '/images/gold-coins.png'

function Inventory({ items, playerGold, sellCart, tempCart, showCart, isAlertVisible, alertMessage, fadeClass, setPlayerGold, setPlayerItem, setSellCart, setTempCart, setShowCart, setAlertMessage, checkOut, addToCart, FaShoppingCart }) {
  const renderItemBox = items.map((data) => {
    return <ItemBox
      key={data.key}
      data={data}
      playerGold={playerGold}
      sellCart={sellCart}
      tempCart={tempCart}
      setSellCart={setSellCart}
      setTempCart={setTempCart}
      setAlertMessage={setAlertMessage}
    />
  })

  const sellCartTotalQuantity = sellCart.reduce((quantity, item) => {
    return quantity + item.quantity
  }, 0)

  return (
    <>
      {showCart && 
        <div className='flex flex-col h-screen w-screen p-4 backdrop-blur-sm fixed z-10 items-center place-content-center text-white text-lg lg:hidden'>
          <h1 className='font-press-start text-3xl'>Cart</h1>
          <ShoppingCart
            items={items}
            sellCart={sellCart}
            showCart={showCart}
            setSellCart={setSellCart}
            checkOut={checkOut}
          />
          <button 
            className='font-press-start'
            onClick={() => setShowCart(prev => !prev)}
          >
            Back  
          </button> 
        </div>
      }
      <div className='min-h-screen h-full w-screen min-w-[375px] flex place-content-center text-white text-lg bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
        <div className='max-w-[1200px] flex flex-col my-5 font-press-start text-center'>
          <h1 className='text-3xl'>Shop</h1>
          <div className='flex min-w-[320px] h-full m-5'>
            <div className='h-full p-2 border rounded-md bg-gray-800'>
              <div className='flex justify-between font-dotgothic16-regular '>
                <div className='flex items-center justify-between'>
                  <img src={GoldCoinsIcon} alt='Icon'/>
                  <p>{playerGold}</p>
                </div> 
                <div className='flex items-center gap-2 lg:hidden'>
                  <FaShoppingCart 
                    className='h-8 w-8 cursor-pointer'
                    onClick={() => {setShowCart(prevState => !prevState)}}
                  />
                  <p>{sellCartTotalQuantity}</p>
                </div> 
              </div>
              <div className='flex flex-col gap-3'>
                {renderItemBox}
              </div>
              <div className='flex gap-2 my-4 w-full font-dotgothic16-regular place-content-center sm:place-content-end'>
                <button 
                  className='w-40 border py-1 bg-gray-700'
                  onClick={() => addToCart('sell')} 
                >
                  <p>Add to cart</p>
                </button>
              </div>
              
              <div className='flex flex-col gap-2'>
                {isAlertVisible && <p className={`font-dotgothic16-regular ${fadeClass}`}>{alertMessage}</p>}       
              </div>
              <div className='flex flex-col gap-2 p-4'>
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
              </div>
            </div>
            <div className='ml-2 hidden lg:block'>
              <ShoppingCart
                items={items}
                sellCart={sellCart}
                showCart={showCart}
                setSellCart={setSellCart}
                checkOut={checkOut}
              />
            </div>
          </div>
          <Link to='/'>
            <p className='text-xl'>Back</p>
          </Link>
        </div>  
      </div>
    </>
  )
}

export default Inventory