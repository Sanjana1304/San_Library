import React from 'react'
import Header from './Header'
import BookIssue from './BookIssue'
import BookReturn from './BookReturn'
import BookHistory from './BookHistory'

const Transaction = () => {
  return (
    <div>
        <Header/>
        <BookIssue/>
        <BookReturn/>

        <BookHistory/>
    </div>
  )
}

export default Transaction