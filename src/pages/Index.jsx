import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithubSquare }from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import BackgroundImage from '/images/background.jpg'

function Index() {

  return (
    <div className='h-screen w-screen flex text-white bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className='h-full w-full flex flex-col p-8 font-press-start text-center justify-between'>
        <h1 className='text-3xl'>Arcane Duel</h1>
        <div className='flex flex-col text-xl gap-4'>
          <Link to='/combat'>
            <h1 className='hover:text-[#D7D7D7]'>Play</h1>
          </Link>
          <Link to='/inventory'>
            <h1 className='hover:text-[#D7D7D7]'>Inventory</h1>
          </Link>
          <Link to='/shop'>
              <h1 className='hover:text-[#D7D7D7]'>Shop</h1>
          </Link>
        </div>
        <footer className='flex items-center place-content-center gap-4 text-3xl  '>
          <FaLinkedin />
          <FaGithubSquare />
          <MdEmail />
        </footer>
      </div>  
    </div>
  )
}

export default Index