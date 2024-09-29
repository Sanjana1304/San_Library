import React, { useEffect, useState } from 'react'
import api from '../api/axiosConfig'

const Hero = () => {
    const [allUsers, setAllUsers] = useState([])
    const [allBooks, setAllBooks] = useState([])

    useEffect(() => {
        //fetch all users from backend and store in allUsers
        const fetchUsers = async () => {
            const response = await api.get('/api/transactions2/users')
            const data = await response.data
            console.log(data);
            setAllUsers(data)
        }

        //fetch all books from backend and store in allBooks
        const fetchBooks = async () => {
            const response = await api.get('/api/transactions2/books')
            const data = await response.data
            console.log(data);
            setAllBooks(data)
        }

        fetchUsers()
        fetchBooks()

    }
    , [])

    return (
    <div className="flex w-[90%] mx-auto mt-5">
        <div className="h-60 overflow-y-auto bg-green-100 w-1/2 p-3 rounded-lg"> 
            <h1 className='font-semibold text-xl text-center'>All Users</h1>
            <table className='border border-black mx-auto'>
                <thead className='border border-black'>
                    <tr>
                        <th className='border border-black p-1'>Name</th>
                        <th className='border border-black p-1'>Email</th>
                        <th className='border border-black p-1'>Age</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {allUsers.map(user => (
                        <tr key={user._id} className='border border-black'>
                            <td className='border border-black p-1'>{user.name}</td>
                            <td className='border border-black p-1'>{user.email}</td>
                            <td className='p-1'>{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="h-60 overflow-y-auto w-1/2 bg-green-200 p-3 rounded-lg">
            <h1 className='font-semibold text-xl text-center'>All Books</h1>
            <table className='border border-black mx-auto'>
                <thead className='border border-black'>
                    <tr>
                        <th className='border border-black p-1'>Name</th>
                        <th className='border border-black p-1'>Category</th>
                        <th className='border border-black p-1'>Rent per Day</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {allBooks.map(book => (
                        <tr key={book._id} className='border border-black'>
                            <td className='border border-black p-1'>{book.bookName}</td>
                            <td className='border border-black p-1'>{book.category}</td>
                            <td className='p-1'>{book.rentPerDay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>

    )
}

export default Hero