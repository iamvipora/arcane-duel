import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Index from './pages/Index'
import Combat from './pages/Combat'
import Inventory from './pages/Inventory'
import Shop from './pages/Shop'

function App() {
  const [playerGold, setPlayerGold] = useState(JSON.parse(localStorage.getItem('playerGold')) || 1000)
  const [itemQuantity, setItemQuantity] = useState(JSON.parse(localStorage.getItem('playerItem')) || {potion: 0, barrier: 0, doubleSword: 0})

  useEffect(() => {
    JSON.stringify(localStorage.setItem('playerGold', playerGold))
  }, [playerGold])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path='/combat' 
          element={
          <Combat 
            playerGold={playerGold} 
            setPlayerGold={setPlayerGold}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
           />} 
          />
        <Route path='/inventory' 
          element={
          <Inventory 
            playerGold={playerGold}
            itemQuantity={itemQuantity}
          />} />
        <Route path='/shop' 
          element={
          <Shop 
            playerGold={playerGold}
            itemQuantity={itemQuantity}
            setItemQuantity={setItemQuantity}
          />} />
        <Route path='*' element={<Error />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App