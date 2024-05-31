import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionBox from '../components/ActionBox'
import GoldCoinsIcon from '/images/gold-coins.png'
import ShieldIcon from '/images/shield.png'
import StaffIcon from '/images/staff.png'
import SwordIcon from '/images/sword.png'
import PotionIcon from '/images/potion.png'
import DoubleEdgedSwordIcon from '/images/2-sword.png'
import BarrierIcon from '/images/barrier.png'
import BackgroundImage from '/images/background.jpg'

function Combat(props) {
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)
  const [gameText, setGameText] = useState('Initiating Combat.')
  const [activeTab, setActiveTab] = useState(true)
  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [isBarrierEnabled, setIsBarrierEnabled] = useState(false)
  const [isDoubleDamageEnabled, setIsDoubleDamageEnabled] = useState(false)
  
  const attack = ['Shield', 'Staff', 'Sword']
  const items = ['Potion', 'Barrier', 'Double-Edged Sword']

  const navigate = useNavigate()

  useEffect(() => {
    if (playerHealth === 0) {
      setGameText('You died after losing all your HP.')
      setTimeout(() => {
        resetGame()
      }, 2000)
      
    } else if (enemyHealth === 0) {
      setGameText('You broke apart your enemy and won. Gain an additional 100 gold for winning.')
      updatePlayerGold()
      setTimeout(() => {
        resetGame()
      }, 2000)
    }
  }, [playerHealth, enemyHealth])

  const updatePlayerGold = () => {
    props.setPlayerGold(prevPlayerGold => prevPlayerGold + 100)
  }

  const resetGame = () => {
    setGameText('The Necromancer heals the wounded and resurrects the dead.')
    setPlayerHealth('100')
    setEnemyHealth('100')
    setTimeout(() => {
      setGameText('You have been granted an opportunity to attack. Choose an item from your arsenal to use.')
    }, 2000)
  }

  const surrender = () => {
    setGameText('The Necromancer shames you for running away.')
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }

  const pickEnemyMove = () => {
    const randomNumber = Math.random()
    let enemyMove = ''
  
    if (randomNumber >= 0 && randomNumber < 1/3) {
      enemyMove = 'Shield'
    }
    else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      enemyMove = 'Staff'
    }
    else if (randomNumber >= 2/3 && randomNumber <= 1) {
      enemyMove = 'Sword'
    }
    return enemyMove
  }

  const playGame = (playerMove) => {
    const enemyMove = pickEnemyMove()
    let result = ''
    let damage

    isDoubleDamageEnabled ? damage = 40 : damage = 20

    setTimeout(() => {
      if (playerMove === enemyMove){
        result = 'Tie'
      } else if(playerMove === 'Shield'){
        if(enemyMove === 'Sword'){
          result = 'Win'
        } else if(enemyMove === 'Staff'){
          result = 'Lose'
        }
      } else if(playerMove === 'Staff'){
        if(enemyMove === 'Shield'){
          result = 'Win'
        } else if (enemyMove === 'Sword'){
          result = 'Lose'
        }
      } else if(playerMove === 'Sword'){
        if(enemyMove === 'Staff'){
          result = 'Win'
        } else if (enemyMove === 'Shield'){
          result = 'Lose'
        }
      } else{
        setGameText('Invalid move.')
      }

      (isBarrierEnabled || isDoubleDamageEnabled) ? setIsBtnDisabled(true) : setIsBtnDisabled(false)

      if (result === 'Win'){
        if(enemyHealth - damage < 0){
          damage = enemyHealth
        }
        setEnemyHealth(prevEnemyHealth => prevEnemyHealth - damage)
        setGameText(`Your attack lands and your opponent loses ${damage} health.`)
      } else if(result === 'Lose'){
        if(isBarrierEnabled){
          setGameText(`You block your opponent's attack. Receive no damage.`)
        } else{
          if(playerHealth - damage < 0){
            damage = playerHealth
          }
          setPlayerHealth(prevPlayerHealth => prevPlayerHealth - damage)
          setGameText(`Your enemy lands their attack and you lose ${damage} health.`)
        }
      } else if(result === 'Tie'){
        setGameText('Nothing happens...')
      }

      if(isBarrierEnabled){
        setIsBarrierEnabled(false)
        setTimeout(() => {
          setIsBtnDisabled(false)
          setGameText('Your barrier fades away.')
        }, 2000)
      }

      if(isDoubleDamageEnabled){
        setIsDoubleDamageEnabled(false)
        setTimeout(() => {
          setIsBtnDisabled(false)
          setGameText('You withdraw your double-edged sword.')
        }, 2000)
      }
    }, 2000)
  }

  const useItem = (playerMove) => {
    setTimeout(() => {
      if(playerMove === 'Potion'){
        if(playerHealth < 100){
          if(playerHealth + 20 > 100){
            const heal = 100 - playerHealth
            setGameText(`Potion has been consumed. ${heal} HP restored.`)
            setPlayerHealth(prevPlayerHealth => prevPlayerHealth + heal)
          } else {
            setGameText(`Potion has been consumed. 20 HP restored`)
            setPlayerHealth(prevPlayerHealth => prevPlayerHealth + 20)
          }
        } else {
          setGameText('Your HP is already Full.')
        }
      } else if(playerMove === 'Barrier'){
        if(isBarrierEnabled){
          setIsBarrierEnabled(false)
          setGameText('You uncast your barrier.')
        } else{
          setIsBarrierEnabled(true)
          setGameText('You cast a barrier around yourself. Block the next attack from your enemy. (Lasts for 1 turn)')
        } 
      } else if(playerMove === 'Double-Edged Sword'){
        if(isDoubleDamageEnabled){
          setIsDoubleDamageEnabled(false)
          setGameText('You withdraw your double-edged sword.')
        } else{
          setIsDoubleDamageEnabled(true)
          setGameText('You draw a double-edged sword. Deal and receive 2x the damage. (Lasts for 1 turn)')
        }
      } else{
        setGameText('Invalid move.')
      }
      setIsBtnDisabled(false)
    }, 2000)
  }

  const handleClick = (playerMove) => {
    setIsBtnDisabled(true)
    setGameText('...')
    if(attack.includes(playerMove)){
      playGame(playerMove)
    } else if(items.includes(playerMove)){
      useItem(playerMove)
    } else (
      setTimeout(() => {
        setGameText('Invalid move.')
      }, 2000)  
    )
  }

  const moveSet = [
    {
      icon: ShieldIcon,
      value: 'Shield',
      description: 'You hold your shield and stand your ground. Blocks swords and render them useless.',
      handleClick: handleClick,
      key: 'shield',
      isBtnDisabled: isBtnDisabled
    },
    {
      icon: StaffIcon,
      value: 'Staff',
      description: 'You raise your staff and cast a strong spell. This blast shields into smitherins.',
      handleClick: handleClick,
      key: 'staff',
      isBtnDisabled: isBtnDisabled
    },
    {
      icon: SwordIcon,
      value: 'Sword',
      description: 'You draw your Sword and strike your foe. With your speed, casters are defenseless.',
      handleClick: handleClick,
      key: 'sword',
      isBtnDisabled: isBtnDisabled
    }
  ]

  const playerItems = [
    {
      icon: PotionIcon,
      value: 'Potion',
      description: 'Consume a red potion and gain 20 HP back.',
      handleClick: handleClick,
      key: 'potion',
      isBtnDisabled: isBtnDisabled
    },
    {
      icon: BarrierIcon,
      value: 'Barrier',
      description: 'Cast a barrier on yourself and block the next attack.',
      handleClick: handleClick,
      key: 'barrier',
      isBtnDisabled: isBtnDisabled
    },
    {
      icon: DoubleEdgedSwordIcon,
      value: 'Double-Edged Sword',
      description: 'Increase damage dealt and receive by 2x for 1 turn.',
      handleClick: handleClick,
      key: 'double-edged sword',
      isBtnDisabled: isBtnDisabled
    }
  ]

  const renderMoveSet = moveSet.map(value => {
    return <ActionBox
      key={value.key}
      data={value}
    />
  })

  const renderPlayerItems = playerItems.map(value => {
    return <ActionBox
      key={value.key}
      data={value}
    />
  })

  return (
    <div className='min-h-screen w-full flex place-content-center bg-cover bg-center bg-no-repeat font-dotgothic16-regular text-white' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='max-w-[375px] m-5 p-2 border rounded-md bg-gray-800'>
        <span className='flex items-center'>
          <img src={GoldCoinsIcon} alt='Icon'/>
          {props.playerGold}
        </span>
        <div className='flex flex-col gap-4 items-center '>
          <div className='w-full flex justify-between border bg-gray-600 p-2'>
            <p>Player: {<span className='text-red-600'>{playerHealth}</span>}</p>
            <p>Enemy: {<span className='text-red-600'>{enemyHealth}</span>}</p>
          </div>
          <div className='flex w-full min-h-12 p-2 text-center items-center border bg-gray-600'>
            <h1 className='w-full'>{gameText}</h1>
          </div>
          <div className='flex flex-col gap-2'>
          {activeTab ? renderMoveSet : renderPlayerItems}
            <div className='flex justify-center gap-2 p-1'>
              <button className='border px-4 bg-gray-600' onClick={() => setActiveTab(true)}>Attack</button>
              <button className='border px-4 bg-gray-600' onClick={() => setActiveTab(false)}>Items</button>
              <button className='border px-4 bg-gray-600' onClick={surrender}>Surrender</button>
            </div>
          </div>        
        </div>
      </div>
    </div>
  )
}

export default Combat