import React, { useState } from 'react'
import api from '../api/axiosConfig'

const DateRange = () => {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate ] = useState('')

    const [bookTermResults, setBookTermResults] = useState([])

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await api.post('/api/transactions2/date/history', { startDate, endDate });
            setBookTermResults(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='w-[90%] mx-auto mt-10 flex justify-between mb-10'>
        <div>
        <p className='text-gray-400'>Or</p>
            <h1 className='text-gray-500 mb-5 text-sm'>Enter start and end date to find all books issued in the range</h1>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <input 
                    type="text" 
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className='mb-1 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Min Date' 
                    required/>
                <input 
                    type="text" 
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className='mb-2 border mr-2 p-1 rounded-lg text-sm' 
                    placeholder='Max Date' 
                    required/>
                <button className='bg-green-800 p-1 text-white text-sm'>Search</button>
            </form>
        </div>

        {
            bookTermResults.books && 
            <div className='h-70 overflow-y-auto bg-green-100 w-1/2 p-3 rounded-lg'>
                <h1 className='font-semibold text-xl text-center'>Total Issued Count: {bookTermResults.totalIssuedCount}</h1>
                <table className='w-full border border-black mx-auto'>
                    <thead className='border border-black'>
                        <tr>
                            <th className='border border-black p-1'>Book Name</th>
                            <th className='border border-black p-1'>User Name</th>
                            <th className='border border-black p-1'>Issue Date</th>
                            <th className='border border-black p-1'>Return Date</th>
                            <th className='border border-black p-1'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookTermResults.books.map((book, index) => (
                                <tr key={index} className='border border-black'>
                                    <td className='border border-black p-1'>{book.bookName}</td>
                                    <td className='border border-black p-1'>{book.userName}</td>
                                    <td className='border border-black p-1'>{book.issueDate}</td>
                                    <td className='border border-black p-1'>{book.returnDate}</td>
                                    <td className='border border-black p-1'>{book.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        }
        
        
    </div>
    )
}

export default DateRange