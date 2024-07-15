import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { TbMusic, TbMusicOff } from 'react-icons/tb'
import { FaToggleOn, FaToggleOff } from 'react-icons/fa6'
import BgMusic from '/audio/bgmusic.mp3'                

function BgAndAudio({ isBgAnimationOn, setIsBgAnimationOn }) {
  const audioRef = useRef(null)
  const location = useLocation()

  const [isMusicOn, setIsMusicOn] = useState(false)

  const musicIcon = isMusicOn ? <TbMusic className='h-8 w-8'/> : <TbMusicOff className='h-8 w-8'/>
  const bgAnimationIcon = isBgAnimationOn ? <FaToggleOn className='h-8 w-8'/> : <FaToggleOff className='h-8 w-8'/>

  const isInIndex = location.pathname == '/' ? true : false
  const showInIndex = isInIndex ? 'block' : 'hidden'

  useEffect(() => {
    if(audioRef.current){
      audioRef.current.volume = 0.1
    }
    const handleAutoPlay = () => {
      setIsMusicOn(true)
      if(audioRef.current){
        audioRef.current.play().catch(error => {
          console.log('Autoplay was prevented:', error)
        })
      }
    }
    
    document.addEventListener('click', handleAutoPlay, { once: true})

    return () => {
      document.removeEventListener('click', handleAutoPlay)
    }
  }, [])

  useEffect(() => {
    if(audioRef.current){
      if(isMusicOn){
        audioRef.current.play().catch(error => {
          console.log('Autoplay was prevented:', error)
        }) 
      } else {
        audioRef.current.pause()
      }
    }
  }, [isMusicOn])

  return (
      <div className={`absolute bottom-4 right-4 flex gap-2 ${showInIndex}`}>
        <audio autoPlay loop src={BgMusic} ref={audioRef} />
        <button 
          className='text-white'                    
          onClick={() => setIsBgAnimationOn(prevState => !prevState)}
        >
          {bgAnimationIcon}
        </button>
        <button 
          className='text-white'                    
          onClick={() => setIsMusicOn(prevState => !prevState)}
        >
          {musicIcon}
        </button>
      </div>
  )
}

export default BgAndAudio