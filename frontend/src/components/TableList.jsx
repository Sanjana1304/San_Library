import React from 'react'

const TableList = ({results,head}) => {
  return (
    <div>
         <h1 className='font-semibold text-xl text-center'>{head || "Your Results "}</h1>
            <table className='border border-black mx-auto'>
                <thead className='border border-black'>
                    <tr>
                        <th className='border border-black p-1'>Name</th>
                        <th className='border border-black p-1'>Category</th>
                        <th className='border border-black p-1'>Rent per Day</th>
                    </tr>
                </thead>
                <tbody className=''>
                    {results.map(book => (
                        <tr key={book._id} className='border border-black'>
                            <td className='border border-black p-1'>{book.bookName}</td>
                            <td className='border border-black p-1'>{book.category}</td>
                            <td className='p-1'>{book.rentPerDay}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default TableList