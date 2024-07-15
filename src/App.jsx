import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Index from './pages/Index'
import Combat from './pages/Combat'
import Inventory from './pages/Inventory'
import Shop from './pages/Shop'
import AudioPlayer from './components/BgAndAudio'
import PotionIcon from '/images/potion.png'
import BarrierIcon from '/images/barrier.png'
import DoubleEdgedSwordIcon from '/images/2-sword.png'
import BgAnimated from '/images/bg-animated.gif'
import BgStatic from '/images/bg-static.png'
import { FaShoppingCart } from "react-icons/fa"

function App() {
  const [playerGold, setPlayerGold] = useState(JSON.parse(localStorage.getItem('playerGold')) || 1000)
  const [playerItem, setPlayerItem] = useState(JSON.parse(localStorage.getItem('playerItem')) || {potion: 0, barrier: 0, doubleSword: 0})
  
  const [tempCart, setTempCart] = useState([])
  const [sellCart, setSellCart] = useState(JSON.parse(localStorage.getItem('sellCart')) || [])
  const [buyCart, setBuyCart] = useState(JSON.parse(localStorage.getItem('buyCart')) || [])

  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [fadeClass, setFadeClass] = useState('animate-fadeIn')

  const [showCart, setShowCart] = useState(false)
  
  const [isBgAnimationOn, setIsBgAnimationOn] = useState(true)
  const background = isBgAnimationOn ? BgAnimated : BgStatic

  useEffect(() => {
    localStorage.setItem('playerGold', JSON.stringify(playerGold))
  }, [playerGold])

  useEffect(() => {
    localStorage.setItem('playerItem', JSON.stringify(playerItem))
  }, [playerItem])

  useEffect(() => {
    localStorage.setItem('sellCart', JSON.stringify(sellCart))
  }, [sellCart])

  useEffect(() => {
    localStorage.setItem('buyCart', JSON.stringify(buyCart))
  }, [buyCart])


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

    return () => clearTimeout(timer)
  }, [alertMessage])

  const addToCart = (action) => {
    const tempCartQuantity = tempCart.reduce((quantity, item) => {
      return quantity + item.quantity
    }, 0)

    if(action === 'buy'){
      if(tempCart.length !== 0){
        tempCart.forEach(item => {
          const existingItemIndex = buyCart.findIndex(cartItem => cartItem.key === item.key)
          if(existingItemIndex !== -1){
            const updatedBuyCart = [...buyCart]
            updatedBuyCart[existingItemIndex] = {
              ...updatedBuyCart[existingItemIndex],
              quantity: updatedBuyCart[existingItemIndex].quantity + item.quantity,
              price: updatedBuyCart[existingItemIndex].price + (item.quantity * item.price)
            }
            setBuyCart(updatedBuyCart)
          } else{
            setBuyCart(prevBuyCart => [...prevBuyCart, { ...item }])
          }
        })
        setAlertMessage(`Added ${tempCartQuantity} item(s) to the cart.`)
      } else{
        setAlertMessage('No items were selected.')
      }
    } else if(action === 'sell'){
      if(tempCart.length !== 0){
        tempCart.forEach(item => {
          const existingItemIndex = sellCart.findIndex(cartItem => cartItem.key === item.key)
          if (existingItemIndex !== -1){
            const updatedSellCart = [...sellCart]
            updatedSellCart[existingItemIndex] = {
              ...updatedSellCart[existingItemIndex],
              quantity: updatedSellCart[existingItemIndex].quantity + item.quantity,
              price: updatedSellCart[existingItemIndex].price + (item.quantity * item.price)
            }
            setSellCart(updatedSellCart)
          } else{
            setSellCart(prevSellCart => [...prevSellCart, { ...item }])
          }
        })
        tempCart.forEach(item => {
          const itemIndex = tempCart.findIndex(cartItem => cartItem.key === item.key)
          setPlayerItem(prevPlayerItem => ({
            ...prevPlayerItem,
            [item.key]: prevPlayerItem[item.key] - (tempCart[itemIndex].quantity || 0)
          }))
        })
        setAlertMessage(`Added ${tempCartQuantity} item(s) to the sell cart.`)
      } else {
        setAlertMessage('No items were selected.')
      }
    }
    setTempCart([])
  }

  const checkOut = (action) => {
    if(action === 'buyItems'){
      if(buyCart.length !== 0){
        const buyCartTotalPrice = buyCart.reduce((total, item) => total + (item.quantity * item.price), 0)
        const buyCartTotalQuantity = buyCart.reduce((quantity, item) => {
          return quantity + item.quantity
        }, 0)
  
        if(playerGold - buyCartTotalPrice >= 0){
          setPlayerGold(prevGold => prevGold - buyCartTotalPrice)

          buyCart.forEach(item => {
            setPlayerItem(prevPlayerItem => ({
              ...prevPlayerItem,
              [item.key]: prevPlayerItem[item.key] + item.quantity
            }))
          })
  
          setAlertMessage(`${buyCartTotalQuantity} items bought for ${buyCartTotalPrice} gold.`)
          setBuyCart([])
        } else{
          setAlertMessage('Insufficient gold.')
        }
      } else{
        setAlertMessage('Cart is empty.')
      }
    } else if(action === 'sellItems'){
      if(sellCart.length !== 0){
        const sellCartTotalPrice = sellCart.reduce((total, item) => total + (item.quantity * item.price), 0)
        const sellCartTotalQuantity = sellCart.reduce((quantity, item) => {
          return quantity + item.quantity
        }, 0)

        setPlayerGold(prevGold => prevGold + sellCartTotalPrice)
        setAlertMessage(`${sellCartTotalQuantity} item(s) sold for ${sellCartTotalPrice} gold.`)
        setSellCart([])
      } else{
        setAlertMessage('Sell cart is empty.')
      }
    }
  }

  const removeFromCart = (target, cart, location) => {
    const updateCart = location ? setSellCart : setBuyCart

    const itemIndex = cart.findIndex(item => item.key === target)
    const newCart = cart.filter((_, index) => index !== itemIndex)

    updateCart(newCart)
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
    background,
    items,
    playerGold,
    playerItem,
    setPlayerGold,
    setPlayerItem
  }

  const buyAndSellProps = {
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
    checkOut,
    removeFromCart,
    FaShoppingCart
  }

  return (
    <BrowserRouter>
      <AudioPlayer 
        isBgAnimationOn={isBgAnimationOn}
        setIsBgAnimationOn={setIsBgAnimationOn}
      />
      <Routes>
      <Route index element={<Index background={background}/>} />
        <Route path='/combat' element={<Combat {...commonProps} />} />
        <Route path='/inventory' element={<Inventory {...commonProps} {...buyAndSellProps} />} />
        <Route path='/shop' element={<Shop {...commonProps} {...buyAndSellProps} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App