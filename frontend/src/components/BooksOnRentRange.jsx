import React, { useState } from 'react'
import TableList from './TableList'
import api from '../api/axiosConfig'

const BooksOnRentRange = () => {
    const [minPrice, setminPrice] = useState('')
    const [maxPrice, setmaxPrice] = useState('')
    const [bookTermResults, setBookTermResults] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await api.get(`/api/books/rent?min=${minPrice}&max=${maxPrice}`);
            setBookTermResults(response.data);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-[90%] mx-auto mt-10 flex justify-between mb-10'>
        <div>
        <p className='text-gray-400'>Or</p>
            <h1 className='text-gray-500 mb-5 text-sm'>Enter a price range to find all relevant books</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <input 
                    type="text" 
                    value={minPrice}
                    onChange={(e) => setminPrice(e.target.value)}
                    className='mb-1 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Min Price' 
                    required/>
                <input 
                    type="text" 
                    value={maxPrice}
                    onChange={(e) => setmaxPrice(e.target.value)}
                    className='mb-2 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Max Price' 
                    required/>
                <button className='bg-green-800 p-1 text-white text-sm'>Search</button>
            </form>
        </div>

        {
            bookTermResults.length>0 && 
                <div className="h-60 overflow-y-auto bg-green-100 w-1/2 p-3 rounded-lg"> 
                    <TableList results={bookTermResults} />
                </div>
        }
        
        
    </div>
  )
}

export default BooksOnRentRange