import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navig = useNavigate();

  const openAbout = () => {
    navig('/transaction');
  }

  const openHome = () => {
    navig('/');
  }

  return (
   <nav className='font-semibold flex justify-between p-5 text-green-800 text-lg'>
    <h1>San's Library</h1>
    <ul className='flex justify-between cursor-pointer'>
        <li className='mr-6' onClick={openHome}>Home</li>
        <li className='mr-6' onClick={openAbout}>Transactions</li>
    </ul>
   </nav>
  )
}

export default Header