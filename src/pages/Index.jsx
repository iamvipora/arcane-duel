import React from 'react'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGithubSquare }from "react-icons/fa"
import { MdEmail } from "react-icons/md"

function Index({ background }) {

  return (
    <div className='h-screen w-screen flex text-white bg-cover bg-center bg-no-repeat' style={{ backgroundImage: `url(${background})` }}>
      <div className='w-full flex flex-col p-8 font-press-start text-center justify-between'>
        <h1 className='text-3xl'>Arcane Duel</h1>
        <div className='w-full flex flex-col items-center text-xl gap-4'>
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
          <a href="https://www.linkedin.com/in/john-henry-dizon/">
            <FaLinkedin />
          </a>
          <a href="https://github.com/iamvipora">
            <FaGithubSquare />
          </a>
          <a href="mailto:henrydizon99@gmail.com">
            <MdEmail />
          </a>      
        </footer>
      </div> 
    </div>
  )
}

export default Index