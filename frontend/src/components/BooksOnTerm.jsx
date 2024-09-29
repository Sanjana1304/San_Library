import React, { useState } from 'react'
import api from '../api/axiosConfig'
import TableList from './TableList'

const BooksOnTerm = () => {
    const [bookTerm, setBookTerm] = useState('')
    const [bookTermResults, setBookTermResults] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await api.get(`/api/books/term?term=${bookTerm}`);
            setBookTermResults(response.data);


        } catch (error) {
            console.log(error);
        }
        
    }
  return (
    <div className='w-[90%] mx-auto mt-10 flex justify-between'>
        <div>
            <h1 className='text-2xl font-bold text-green-800 '>Search for books</h1>
            <h1 className='text-gray-500 mb-5 text-sm'>Enter a name or a term in the book name to find all relevant books</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={bookTerm}
                    onChange={(e) => setBookTerm(e.target.value)}
                    className='border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='E.g: Harry Potter' 
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

export default BooksOnTerm