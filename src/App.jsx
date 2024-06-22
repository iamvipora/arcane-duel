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

function App() {
  const [playerGold, setPlayerGold] = useState(JSON.parse(localStorage.getItem('playerGold')) || 1000)
  const [playerItem, setPlayerItem] = useState(JSON.parse(localStorage.getItem('playerItem')) || {potion: 0, barrier: 0, doubleSword: 0})

  useEffect(() => {
    localStorage.setItem('playerGold', JSON.stringify(playerGold))
  }, [playerGold])

  useEffect(() => {
    localStorage.setItem('playerItem', JSON.stringify(playerItem))
  }, [playerItem])

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
    playerGold,
    playerItem,
    setPlayerGold,
    setPlayerItem,
  }

  return (
    <BrowserRouter>
      <Routes>
      <Route index element={<Index />} />
        <Route path='/combat' element={<Combat items={items} {...commonProps} />} />
        <Route path='/inventory' element={<Inventory {...commonProps} />} />
        <Route path='/shop' element={<Shop items={items} {...commonProps} />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App