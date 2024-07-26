import React, { useState, useEffect } from 'react'
import { Typewriter } from 'react-simple-typewriter'
import { useNavigate } from 'react-router-dom'
import ActionBox from '../components/ActionBox'
import EntityUI from '../components/EntityUI'
import ShieldIcon from '/images/shield.png'
import StaffIcon from '/images/staff.png'
import SwordIcon from '/images/sword.png'
import PlayerIdle from '/images/wizard-idle.gif'
import EnemyIdle from '/images/demon-idle.gif'

function Combat({ background, items, playerItem, setPlayerGold, setPlayerItem }) {
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)

  const [gameText, setGameText] = useState('Initiating Combat.')
  const [showTypewriter, setShowTypewriter] = useState(true)

  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [isBarrierEnabled, setIsBarrierEnabled] = useState(false)
  const [isDoubleDamageEnabled, setIsDoubleDamageEnabled] = useState(false)

  const [activeTab, setActiveTab] = useState('Attack')
  
  const attack = ['Shield', 'Staff', 'Sword']
  const itemName = [items[0].key, items[1].key, items[2].key]

  const navigate = useNavigate()

  useEffect(() => {
    if(playerHealth === 0){
      setGameText('You died after losing all your HP.')
      setTimeout(() => {
        resetGame()
      }, 1500)
      
    } else if(enemyHealth === 0){
      setGameText('You broke apart your enemy and won. Gain an additional 100 gold for winning.')
      setPlayerGold(prevPlayerGold => prevPlayerGold + 100)
      setTimeout(() => {
        resetGame()
      }, 1500)
    }
  }, [playerHealth, enemyHealth])

  useEffect(() => {
    setShowTypewriter(false);
    const timer = setTimeout(() => {
      setShowTypewriter(true)
    }, 50)

    return () => clearTimeout(timer)
  }, [gameText])

  const handleClick = (playerMove) => {
    setIsBtnDisabled(true)
    setGameText('...')
    if(attack.includes(playerMove)){
      playGame(playerMove)
    } else if(itemName.includes(playerMove)){
      useItem(playerMove)
    } else (
      setTimeout(() => {
        setGameText('Invalid move.')
        setIsBtnDisabled(false)
      }, 1500)  
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

  const playerItems = items.map(data => ({
    ...data,
    handleClick: handleClick,
    isBtnDisabled: isBtnDisabled
  }))
    
  const renderMoveSet = moveSet.map(data => {
    return <ActionBox   
      key={data.key}
      data={data}
      itemName={itemName}
      items={items}
    />
  })

  const renderPlayerItems = playerItems.map(data => {
    return <ActionBox
      key={data.key}
      data={data}
      itemName={itemName}
      items={items}
    />
  })

  const resetGame = () => {
    setGameText('The Necromancer heals the wounded and resurrects the dead.')
    setPlayerHealth('100')
    setEnemyHealth('100')
    setTimeout(() => {
      setGameText('You have been granted an opportunity to attack. Choose an item from your arsenal to use.')
    }, 1500)
  }

  const flee = () => {
    setIsBtnDisabled(true)
    setGameText('...')
    const fleeSuccessRate = Math.random()
    setTimeout(() => {
      if(fleeSuccessRate <= 2/5){
        setGameText('The Necromancer shames you for running away.')
        setTimeout(() => {
          navigate('/')
        }, 1500)
      } else if(fleeSuccessRate > 2/5){
        setGameText('You failed to run away.')
        setTimeout(() => {
          playGame('failedToFlee')
        }, 1500)
      }
    }, 1500)
  }

  const tabChange = (tab) => {
    setActiveTab(tab)
  }

  const pickEnemyMove = () => {
    const randomNumber = Math.random()
    let enemyMove = ''
  
    if(randomNumber >= 0 && randomNumber < 1/3){
      enemyMove = 'Shield'
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
      enemyMove = 'Staff'
    }
    else if(randomNumber >= 2/3 && randomNumber <= 1){
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
      if(playerMove === enemyMove){
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
        } else if(enemyMove === 'Sword'){
          result = 'Lose'
        }
      } else if(playerMove === 'Sword'){
        if(enemyMove === 'Staff'){
          result = 'Win'
        } else if(enemyMove === 'Shield'){
          result = 'Lose'
        }
      } else if(playerMove === 'failedToFlee'){
        result = 'Lose'
      } else{
        setGameText('Invalid move.')
        setIsBtnDisabled(false)
      }

      (isBarrierEnabled || isDoubleDamageEnabled) ? setIsBtnDisabled(true) : setIsBtnDisabled(false)

      if(result === 'Win'){
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
        }, 1500)
      }

      if(isDoubleDamageEnabled){
        setIsDoubleDamageEnabled(false)
        setTimeout(() => {
          setIsBtnDisabled(false)
          setGameText('You withdraw your double-edged sword.')
        }, 1500)
      }
    }, 1500)
  }

  const useItem = (playerMove) => {
    setTimeout(() => {
      if(playerMove === 'potion'){
        if(playerHealth < 100 && playerItem[playerMove] > 0){
          if(playerHealth + 20 > 100){
            const heal = 100 - playerHealth
            setPlayerItem(prevState => ({
              ...prevState,
              [playerMove]: prevState[playerMove] - 1
            }))
            setGameText(`Potion has been consumed. ${heal} HP restored.`)
            setPlayerHealth(prevPlayerHealth => prevPlayerHealth + heal)
          } else {
            setPlayerItem(prevState => ({
              ...prevState,
              [playerMove]: prevState[playerMove] - 1
            }))
            setGameText(`Potion has been consumed. 20 HP restored`)
            setPlayerHealth(prevPlayerHealth => prevPlayerHealth + 20)
          }
        } else if(playerItem[playerMove] <= 0){
          setGameText('You are out of potions.')
        } else {
          setGameText('Your HP is already Full.')
        }
      } else if(playerMove === 'barrier'){
        if(isBarrierEnabled){
          setIsBarrierEnabled(false)
          setPlayerItem(prevState => ({
            ...prevState,
            [playerMove]: prevState[playerMove] + 1
          }))
          setGameText('You uncast your barrier.')
        } else if(!isBarrierEnabled && playerItem[playerMove] > 0){
          setIsBarrierEnabled(true)
          setPlayerItem(prevState => ({
            ...prevState,
            [playerMove]: prevState[playerMove] - 1
          }))
          setGameText('You cast a barrier around yourself. Block the next attack from your enemy. (Lasts for 1 turn)')
        } else{
          setGameText('You are out of barriers.')
        }
      } else if(playerMove === 'doubleSword'){
        if(isDoubleDamageEnabled){
          setIsDoubleDamageEnabled(false)
          setPlayerItem(prevState => ({
            ...prevState,
            [playerMove]: prevState[playerMove] + 1
          }))
          setGameText('You withdraw your double-edged sword.')
        } else if(!isDoubleDamageEnabled && playerItem[playerMove] > 0){
          setIsDoubleDamageEnabled(true)
          setPlayerItem(prevState => ({
            ...prevState,
            [playerMove]: prevState[playerMove] - 1
          }))
          setGameText('You draw a double-edged sword. Deal and receive 2x the damage. (Lasts for 1 turn)')
        } else{
          setGameText('You are out of Double-Edged Swords.')
        }
      } else{
        setGameText('Invalid move.')
        setIsBtnDisabled(false)
      }
      setIsBtnDisabled(false)
    }, 1500)
  }

  return (
    <div className='min-h-screen h-full w-screen min-w-[375px] flex place-content-center text-white text-lg font-dotgothic16-regular bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${background})` }}>
      <div className='min-w-[320px] max-w-[625px] flex flex-col my-5 text-center'>
        <h1 className='text-3xl font-press-start'>Combat</h1>
        <div className='h-full min-w-[320px] max-w-[800px] m-5 p-2 bg-[#2d282b] border-2 border-[#FEBF4C] rounded-md'>
          <div className='flex flex-col gap-4 items-center h-full'>
            <div className='h-full w-full flex-grow'>
              <div className='flex items-start w-full h-1/3'>
                <EntityUI 
                  entity='player' 
                  health={playerHealth} 
                  maxHealth={100} 
                />
              </div>
              <div className='flex w-full justify-between h-1/3 items-baseline'>
                <img src={PlayerIdle} alt="" className='h-2/3'/>
                <img src={EnemyIdle} alt="" className='h-full'/> 
              </div>
              <div className='flex items-end justify-end w-full h-1/3'>
                <EntityUI
                  entity='enemy'
                  health={enemyHealth} 
                  maxHealth={100} 
                />
              </div>
            </div>
            <div className='flex h-full w-full p-2 bg-[#5e575b] border-2 border-[#FEBF4C] rounded-md'>
            {showTypewriter &&
              <div style={{ display: 'inline-block' }}>
                <Typewriter
                  words={[gameText]}
                  typeSpeed={10}
                  deleteSpeed={1}
                  cursor
                />
              </div>} 
            </div>
            <div className='flex flex-col gap-2'>
              {activeTab == 'Attack' ? renderMoveSet : renderPlayerItems}
            </div>   
            <div className={`justify-center gap-2 w-full grid grid-cols-3`}>
              <button 
                className={`border-2 border-[#FEBF4C] rounded-md py-1 ${!isBtnDisabled ? 'bg-[#5e575b]' : 'bg-[#4C4449]'}`}
                onClick={() => tabChange('Attack')}
                disabled={isBtnDisabled}
              >
                Attack
              </button>
              <button 
                className={`border-2 border-[#FEBF4C] rounded-md py-1 ${!isBtnDisabled ? 'bg-[#5e575b]' : 'bg-[#4C4449]'}`}
                onClick={() => tabChange('Items')}
                disabled={isBtnDisabled}
                >
                  Items
                </button>
              <button 
                className={`border-2 border-[#FEBF4C] rounded-md py-1 ${!isBtnDisabled ? 'bg-[#5e575b]' : 'bg-[#4C4449]'}`} 
                onClick={flee}
                disabled={isBtnDisabled}
              >
                Flee
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Combat