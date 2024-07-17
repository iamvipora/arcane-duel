import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithubSquare }from "react-icons/fa"
import { MdEmail } from "react-icons/md"

function Index({ background }) {

  return (
    <div className='h-screen w-screen flex text-white bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${background})` }}>
      <div className='w-full flex flex-col p-8 font-press-start text-center items-center'>
        <h1 className='text-[3rem]'>Arcane Duel</h1>
        <div className='flex-grow flex flex-col items-center justify-center w-full text-2xl gap-2'>
          <Link 
            className='w-64 p-2 hover:bg-gradient-to-r from-transparent via-gray-800 to-transparent'
            to='/combat'
          >
            <h1 className=''>Play</h1>
          </Link>
          <Link 
            className='w-64 p-2 hover:bg-gradient-to-r from-transparent via-gray-800 to-transparent'
            to='/inventory'
          >
            <h1>Inventory</h1>
          </Link>
          <Link 
            className='w-64 p-2 hover:bg-gradient-to-r from-transparent via-gray-800 to-transparent'
            to='/shop'
            >
            <h1>Shop</h1>
          </Link>
        </div>
      </div> 
    </div>
  )
}

export default Index