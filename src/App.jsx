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
  const [tempCart, setTempCart] = useState({
    items: {
      potion: 0,
      barrier: 0,
      doubleSword: 0
    },
    totalQuantity: 0,
    totalPrice: 0
  })
  const [sellCart, setSellCart] = useState({
    items: {
      potion: 0,
      barrier: 0,
      doubleSword: 0
    },
    totalQuantity: 0,
    totalPrice: 0
  })
  const [buyCart, setBuyCart] = useState({
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
    let newTotalQuantity = tempCart.items.potion + tempCart.items.barrier + tempCart.items.doubleSword
    setTempCart(prevState => ({
      ...prevState,
      totalQuantity: newTotalQuantity
    }))
  }, [tempCart.items])

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

  const clearTempCart = () => {
    setTempCart({items: {
        potion: 0,
        barrier: 0,
        doubleSword: 0
      },
      totalQuantity: 0,
      totalPrice: 0
    })
  }

  const clearSellCart = () =>{
    setSellCart({items: {
      potion: 0,
      barrier: 0,
      doubleSword: 0
    },
    totalQuantity: 0,
    totalPrice: 0
  })
}

  const clearBuyCart = () =>{
    setBuyCart({items: {
      potion: 0,
      barrier: 0,
      doubleSword: 0
    },
    totalQuantity: 0,
    totalPrice: 0
  })
  }

  const addToCart = (action) => {
    const whichCart = action == 'buy' ? setBuyCart : setSellCart
    
    if(tempCart.totalQuantity){
      if(action == 'sell'){
        setPlayerItem(prevState => ({
          potion: prevState.potion - tempCart.items.potion,
          barrier: prevState.barrier - tempCart.items.barrier,
          doubleSword: prevState.doubleSword - tempCart.items.doubleSword
        }))
      }
      whichCart(prevState => ({
        items: {
          potion: prevState.items.potion + tempCart.items.potion,
          barrier: prevState.items.barrier + tempCart.items.barrier,
          doubleSword: prevState.items.doubleSword + tempCart.items.doubleSword,
        },
        totalQuantity: prevState.totalQuantity + tempCart.totalQuantity,
        totalPrice: prevState.totalPrice + tempCart.totalPrice,
      }))
      setAlertMessage(`Added ${tempCart.totalQuantity} item(s) to cart.`)
      clearTempCart()
    }else{
      setAlertMessage('There were no items selected.')
    }
  }

  const buySell = (action) => {
    if(action == 'buyItems'){
      if(buyCart.totalQuantity){
        setPlayerItem(prevState => ({
          potion: prevState.potion + cart.items.potion,
          barrier: prevState.barrier + cart.items.barrier,
          doubleSword: prevState.doubleSword + cart.items.doubleSword
        }))
        setAlertMessage(`Bought ${buyCart.totalQuantity} item(s) for ${buyCart.totalPrice}.`)
        setPlayerGold(prevState => prevState - buyCart.totalPrice)
      } else{
        setAlertMessage('There were no items on the cart.')
      }
      setShowCart(prevState => !prevState)
      clearTempCart()
      clearBuyCart()
    } else if(action == 'sellItems'){
      if(sellCart.totalQuantity){
        // setPlayerItem(prevState => ({
        //   potion: prevState.potion - sellCart.items.potion,                   
        //   barrier: prevState.barrier - sellCart.items.barrier,
        //   doubleSword: prevState.doubleSword - sellCart.items.doubleSword
        // }))
        setAlertMessage(`Sold ${sellCart.totalQuantity} item(s) for ${sellCart.totalPrice}.`)
        setPlayerGold(prevState => prevState + sellCart.totalPrice)
      } else{
        setAlertMessage('There were no items on the cart.')
      }
      setShowCart(prevState => !prevState)
      clearTempCart()
      clearSellCart()
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
    sellCart,
    buyCart,
    tempCart,
    showCart, 
    isAlertVisible, 
    alertMessage, 
    fadeClass, 
    setSellCart,
    setBuyCart,
    setTempCart,
    setShowCart,
    setAlertMessage,
    addToCart, 
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