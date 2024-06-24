import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Index from './pages/Index'
import Combat from './pages/Combat'
import Inventory from './pages/Inventory'
import Shop from './pages/Shop'
import PotionIcon from '/images/potion.png'
import BarrierIcon from '/images/barrier.png'
import DoubleEdgedSwordIcon from '/images/2-sword.png'
import { FaShoppingCart } from "react-icons/fa"

function App() {
  const [playerGold, setPlayerGold] = useState(JSON.parse(localStorage.getItem('playerGold')) || 1000)
  const [playerItem, setPlayerItem] = useState(JSON.parse(localStorage.getItem('playerItem')) || {potion: 0, barrier: 0, doubleSword: 0})
  const [cart, setCart] = useState({
    items: {
      potion: 0,
      barrier: 0,
      doubleSword: 0
    },
    totalQuantity: 0,
    totalPrice: 0
  })

  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeClass, setFadeClass] = useState('animate-fadeIn')

  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    localStorage.setItem('playerGold', JSON.stringify(playerGold))
  }, [playerGold])

  useEffect(() => {
    localStorage.setItem('playerItem', JSON.stringify(playerItem))
  }, [playerItem])

  useEffect(() => {
    let newTotalQuantity = cart.items.potion + cart.items.barrier + cart.items.doubleSword
    setCart(prevState => ({
      ...prevState,
      totalQuantity: newTotalQuantity
    }))
  }, [cart.items])

  useEffect(() => {
    setIsAlertVisible(true)
    setFadeClass('animate-fadeIn')

    const timer = setTimeout(() => {
      setFadeClass('animate-fadeOut')
      setTimeout(() => {
        setIsAlertVisible(false)
        setAlertMessage('')
      }, 900)
    }, 3000)

    return () => clearTimeout(timer);
  }, [alertMessage])

  const clearCart = () => {
    setCart({items: {
        potion: 0,
        barrier: 0,
        doubleSword: 0
      },
      totalQuantity: 0,
      totalPrice: 0
    })
  }

  const buySell = (action) => {
    if(action == 'buyItems'){
      if(cart.totalQuantity){
        setPlayerItem(prevState => ({
          ...prevState,
          potion: prevState.potion + cart.items.potion,
          barrier: prevState.barrier + cart.items.barrier,
          doubleSword: prevState.doubleSword + cart.items.doubleSword
        }))
        setAlertMessage(`Bought ${cart.totalQuantity} item(s) for ${cart.totalPrice}.`)
        setPlayerGold(prevState => prevState - cart.totalPrice)
      } else{
        setAlertMessage('There were no items on the cart.')
      }
      clearCart()
    } else if(action == 'sellItems'){
      if(cart.totalQuantity){
        setPlayerItem(prevState => ({
          ...prevState,
          potion: prevState.potion - cart.items.potion,                   
          barrier: prevState.barrier - cart.items.barrier,
          doubleSword: prevState.doubleSword - cart.items.doubleSword
        }))
        setAlertMessage(`Sold ${cart.totalQuantity} item(s) for ${cart.totalPrice}.`)
        setPlayerGold(prevState => prevState + cart.totalPrice)
      } else{
        setAlertMessage('There were no items on the cart.')
      }
      clearCart()
    }
  }

  const items = [
    {
      key: 'potion',
      icon: PotionIcon,
      value: 'potion',
      description: 'Consume a red potion and gain 20 HP back.',
      quantity: playerItem.potion,
      buyPrice: 100,
      sellPrice: 50
    },
    {
      key: 'barrier',
      icon: BarrierIcon,
      value: 'barrier',
      description: 'Cast a barrier on yourself and block the next attack.',
      quantity: playerItem.barrier,
      buyPrice: 150,
      sellPrice: 75  
    },
    {
      key: 'doubleSword',
      icon: DoubleEdgedSwordIcon,
      value: 'doubleSword',
      description: 'Increase damage dealt and receive by 2x for 1 turn.',
      quantity: playerItem.doubleSword,
      buyPrice: 200,
      sellPrice: 100
    }
  ]

  const commonProps = {
    items,
    playerGold,
    playerItem,
    setPlayerGold,
    setPlayerItem,
  }

  const buySellProps = {
    cart,
    showCart, 
    isAlertVisible, 
    alertMessage, 
    fadeClass, 
    setCart,
    setShowCart, 
    buySell,
    FaShoppingCart
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Index />} />
        <Route path='/combat' element={<Combat {...commonProps} />} />
        <Route path='/inventory' element={<Inventory {...commonProps} {...buySellProps} />} />
        <Route path='/shop' element={<Shop {...commonProps} {...buySellProps} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App