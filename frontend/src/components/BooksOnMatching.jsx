import React, { useState } from 'react'
import api from '../api/axiosConfig'
import TableList from './TableList'

const BooksOnMatching = () => {
    const [bookTerm, setBookTerm] = useState('')
    const [minPrice, setminPrice] = useState('')
    const [maxPrice, setmaxPrice] = useState('')
    const [Category, setCategory] = useState('')
    const [bookTermResults, setBookTermResults] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await api.get(`/api/books/?category=${Category}&term=${bookTerm}&min=${minPrice}&max=${maxPrice}`);
            setBookTermResults(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='w-[90%] mx-auto mt-10 flex justify-between mb-10'>
        <div>
            <p className='text-gray-400'>Or</p>
        <h1 className='text-gray-500 mb-5 text-sm'>Enter the following details to find matching books</h1>
        <form onSubmit={handleSubmit} className='flex flex-col'>
                <input 
                    type="text" 
                    value={bookTerm}
                    onChange={(e) => setBookTerm(e.target.value)}
                    className='mb-1 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Book Name/Term' 
                    required/>
                <input 
                    type="text" 
                    value={minPrice}
                    onChange={(e) => setminPrice(e.target.value)}
                    className='mb-2 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Min Price' 
                    required/>
                 <input 
                    type="text" 
                    value={maxPrice}
                    onChange={(e) => setmaxPrice(e.target.value)}
                    className='mb-2 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Max Price' 
                    required/>
                <input 
                    type="text" 
                    value={Category}
                    onChange={(e) => setCategory(e.target.value)}
                    className='mb-2 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Category' 
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

export default BooksOnMatching