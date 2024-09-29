import React, { useState } from 'react'
import api from '../api/axiosConfig'

const BookHistory = () => {

    const [bookTerm, setBookTerm] = useState('')
    const [bookTermResults, setBookTermResults] = useState([])

    const [currentUser, setCurrentUser] = useState([]);
    const [isCurrUser, setIsCurrUser] = useState(false);
    const [issueMsg, setIssueMsg] = useState('');

    const [totalRentGenerated, setTotalRentGenerated] = useState(0);

    const [issueCount, setIssueCount] = useState(0);

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await api.get(`/api/transactions2/book/history/${bookTerm}`);
            console.log(response.data);
            setBookTermResults(response.data.users);
            setIssueCount(response.data.totalIssuedCount);

            const response2 = await api.get(`/api/transactions2/book/current/${bookTerm}`);
            if(response2.data.message === "The book is currently issued"){
                setCurrentUser(response2.data);
                console.log(response2.data);
                setIsCurrUser(true);
            }
            else if(response2.data.message === "The book is not issued at the moment"){
                setIssueMsg(response2.data.message + " to any user !");
            }

            const response3 = await api.get(`/api/transactions2/book/rent/${bookTerm}`);
            console.log(response3.data);
            setTotalRentGenerated(response3.data.totalRent);

        } catch (error) {
            console.log(error);
            
        }
    }

  return (
    <div>
        <div className='w-[90%] mx-auto mt-10 flex justify-between mb-10'>
            <div className='w-[30%]'>
                <h1 className='text-xl font-bold text-green-800 '>Search to get Book History</h1>
                <h1 className='text-gray-500 mb-5 text-sm'>Enter a book name to  get the list of people who was issued that book in the past and the person who currently has that book issued </h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={bookTerm}
                        onChange={(e) => setBookTerm(e.target.value)}
                        className='border mr-2 p-1 rounded-lg text-sm' 
                        placeholder='E.g: Harry Potter' 
                        required/>
                    <button className='bg-green-800 p-1 text-white text-sm'>Search</button>

                    {issueMsg && <h1 className='mt-4 text-red-600'>{issueMsg}</h1>}
                </form>
            </div>

            {
                bookTermResults.length>0 && 
                    <div className="h-60 overflow-y-auto bg-green-100 w-1/2 p-3 rounded-lg"> 
                        <h1 className='font-semibold text-xl text-center'>Issued Count: {issueCount}</h1>
                        <table className='border border-black mx-auto'>
                            <thead className='border border-black'>
                                <tr>
                                    <th className='border border-black p-1'>User Name</th>
                                    <th className='border border-black p-1'>Issue Date</th>
                                    <th className='border border-black p-1'>Return Date</th>
                                    <th className='border border-black p-1'>Status</th>
                                </tr>
                            </thead>
                            <tbody className=''>
                                {bookTermResults.map((book,index) => (
                                    <tr key={index} className='border border-black'>
                                        <td className='border border-black p-1'>{book.userName}</td>
                                        <td className='border border-black p-1'>{book.issueDate}</td>
                                        <td className='border border-black p-1'>{book.returnDate}</td>
                                        <td className='border border-black p-1'>{book.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            }
        </div>

        <div>
            
            {isCurrUser && 
                <div className='w-[90%] mx-auto mt-10 mb-10'>
                    <h1 className='text-2xl font-bold text-green-800'>Currently Issued To</h1>
                    <div className='border border-black p-5 mt-5'>
                        <h1 className='text-lg font-semibold'>User Name: {currentUser.userName}</h1>
                        <h1 className='text-lg font-semibold'>User Mail: {currentUser.email}</h1>
                        <h1 className='text-lg font-semibold'>Issue Date: {currentUser.issueDate}</h1>
                    </div>
                </div>
            }
        </div>

        <div>
            {totalRentGenerated > 0 && 
                <div className='w-[90%] mx-auto mt-10 mb-10'>
                    <h1 className='text-2xl font-bold text-green-800'>Total Rent Generated By This Book</h1>
                    <div className='border border-black p-5 mt-5'>
                        <h1 className='text-lg font-semibold'>Total Rent: {totalRentGenerated}</h1>
                    </div>
                </div>
            }
        </div>
    </div>
  )
}

export default BookHistory