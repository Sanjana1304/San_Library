import React, { useState } from 'react'
import api from '../api/axiosConfig';

const BookReturn = () => {
    const [bookName, setBookName] = useState('');
    const [email, setEmail] = useState('');

    const [responseMsg, setResponseMsg] = useState('');

    const returnBook = async(e) => {
        e.preventDefault()
        try {
            const response = await api.put('/api/transactions/return', { bookName, email });
            setResponseMsg(response.data.message)
            setBookName('')
            setEmail('')
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-[90%] mx-auto border shadow p-3 mt-5'>
    <h1 className='font-semibold text-xl text-green-800 '>Return a Book</h1>
    <p className='text-gray-500 text-sm'>Return a Book back to the Library and get the total amount to be paid by the user</p>
    <form onSubmit={returnBook} className='mt-3 w-[50%] p-4'>
        <div className='flex justify-between mb-2'>
            <label>Book Name: </label>
            <input type="text" value={bookName} onChange={(e) => setBookName(e.target.value)} className='border' required />
        </div>
        
        <div className='flex justify-between'>
        <label>Email: </label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='border' required />
       
        </div>
        <button type="submit" className='text-white bg-green-800 p-1 text-sm mt-3'>Return Book</button>
        <p className='mt-2 text-red-500'>{responseMsg}</p>
    </form>
</div>
  )
}

export default BookReturn