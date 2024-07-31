import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionButtons from '../components/ActionButtons'
import EntityUI from '../components/EntityUI'
import PlayerIdle from '/images/animations/wizard-idle.gif'
import DarkBolt from '/images/animations/dark-bolt.gif'
import FireBomb from '/images/animations/fire-bomb.gif'
import Lightning from '/images/animations/lightning.gif'
import EnemyIdle from '/images/animations/demon-idle.gif'
import EnemyAttack from '/images/animations/enemy-attack.gif'

function Combat({ background, items, playerItem, setPlayerGold, setPlayerItem }) {
  const [playerHealth, setPlayerHealth] = useState(100)
  const [enemyHealth, setEnemyHealth] = useState(100)

  const [gameText, setGameText] = useState('Initiating Combat.')

  const [isBtnDisabled, setIsBtnDisabled] = useState(false)
  const [isBarrierEnabled, setIsBarrierEnabled] = useState(false)
  const [isDoubleDamageEnabled, setIsDoubleDamageEnabled] = useState(false)

  const [skillAnimation, setSkillAnimation] = useState()

  const [remountPlayerAttack, setRemountPlayerAttack] = useState(false)
  const [remountEnemyAttack, setRemountEnemyAttack] = useState(false)

  const [activeTab, setActiveTab] = useState('menu')
  
  const attack = ['darkBolt', 'fireBomb', 'lightning']
  const itemName = [items[0].key, items[1].key, items[2].key]

  const navigate = useNavigate()

  useEffect(() => {
    if(remountPlayerAttack == true){
      setTimeout(() => {
        setRemountPlayerAttack(false)
      }, 850)
    }
  }, [remountPlayerAttack])

  useEffect(() => {
    if(remountEnemyAttack == true){
      setTimeout(() => {
        setRemountEnemyAttack(false)
      }, 850)
    }
  }, [remountEnemyAttack])

  useEffect(() => {
    if(playerHealth === 0){
      setGameText('You died after losing all your HP.')
      setTimeout(() => {
        navigate('/')
      }, 3000)
      
    } else if(enemyHealth === 0){
      setGameText('You broke apart your enemy and won. Gain an additional 100 gold for winning.')
      setPlayerGold(prevPlayerGold => prevPlayerGold + 100)
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [playerHealth, enemyHealth])

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

  const pickEnemyMove = () => {
    const randomNumber = Math.random()
    let enemyMove = ''
  
    if(randomNumber >= 0 && randomNumber < 1/3){
      enemyMove = 'darkBolt'
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
      enemyMove = 'fireBomb'
    }
    else if(randomNumber >= 2/3 && randomNumber <= 1){
      enemyMove = 'lightning'
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
        result = 'tie'
      } else if(playerMove === 'darkBolt'){
        if(enemyMove === 'lightning'){
          result = 'win'
          setRemountPlayerAttack(true)
          setSkillAnimation(<img src={DarkBolt} className="h-full absolute bottom-0 left-6"/>)
        } else if(enemyMove === 'fireBomb'){
          result = 'lose'
          setRemountEnemyAttack(true)
        }
      } else if(playerMove === 'fireBomb'){
        if(enemyMove === 'darkBolt'){
          result = 'win'
          setRemountPlayerAttack(true)
          setSkillAnimation(<img src={FireBomb} className="h-full absolute bottom-0"/>)
        } else if(enemyMove === 'lightning'){
          result = 'lose'
          setRemountEnemyAttack(true)
        }
      } else if(playerMove === 'lightning'){
        if(enemyMove === 'fireBomb'){
          result = 'win'
          setRemountPlayerAttack(true)
          setSkillAnimation(<img src={Lightning} className="h-full absolute bottom-0 left-8"/>)
        } else if(enemyMove === 'darkBolt'){
          result = 'lose'
          setRemountEnemyAttack(true)
        }
      } else if(playerMove === 'failedToFlee'){
        result = 'lose'
        setRemountEnemyAttack(true)
      } else{
        setGameText('Invalid move.')
        setIsBtnDisabled(false)
      }

      (isBarrierEnabled || isDoubleDamageEnabled) ? setIsBtnDisabled(true) : setIsBtnDisabled(false)

      if(result === 'win'){
        if(enemyHealth - damage < 0){
          damage = enemyHealth
        }
        setEnemyHealth(prevEnemyHealth => prevEnemyHealth - damage)
        setGameText(`Your attack lands and your opponent loses ${damage} health.`)
      } else if(result === 'lose'){
        if(isBarrierEnabled){
          setGameText(`You block your opponent's attack. Receive no damage.`)
        } else{
          if(playerHealth - damage < 0){
            damage = playerHealth
          }
          setPlayerHealth(prevPlayerHealth => prevPlayerHealth - damage)
          setGameText(`Your enemy lands their attack and you lose ${damage} health.`)
        }
      } else if(result === 'tie'){
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
          setGameText('You draw a double-edged sword. Deal and received 2x the damage. (Lasts for 1 turn)')
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
      <div className='flex flex-col my-5'>
        <h1 className='text-3xl font-press-start text-center'>Combat</h1>
        <div className='h-full min-w-[320px] max-w-[800px] m-5 p-2 bg-[#2d282b] border-2 border-[#FEBF4C] rounded-md'>
          <div className='flex flex-col gap-4 items-center h-full'>
            <div className='h-full w-full flex-grow flex flex-col border-2 border-[#FEBF4C] rounded-md p-2'>
              <div className='flex items-start w-full h-22'>
                <EntityUI 
                  entity='player' 
                  health={playerHealth}
                />
              </div>
              <div className='flex flex-grow w-full justify-between gap-2 my-2'>
                <div className='h-full w-1/2 flex items-end'>
                <div className='relative w-1/2 flex items-end'>
                    <img src={PlayerIdle} alt="" className=''/>
                    {remountEnemyAttack && <img src={EnemyAttack} className='absolute bottom-0'/>}
                  </div>
                </div>
                <div className='h-full w-1/2 flex items-start justify-end'>
                  <div className='relative flex'>
                    <img src={EnemyIdle} alt="" className=""/>
                    {remountPlayerAttack && skillAnimation}
                  </div> 
                </div>  
              </div>
              <div className='flex items-end justify-end w-full h-22'>
                <EntityUI
                  entity='enemy'
                  health={enemyHealth}
                />
              </div>
            </div>
            <div className='w-full flex flex-col sm:flex-row gap-2'>
              <div className='flex p-2 bg-[#5e575b] border-2 border-[#FEBF4C] rounded-md h-32 sm:h-28 md:w-[28rem]'>
                {gameText}
              </div>
              <div>
                <ActionButtons
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  isBtnDisabled={isBtnDisabled}
                  handleClick={handleClick}
                  flee={flee}
                  items={items}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Combat