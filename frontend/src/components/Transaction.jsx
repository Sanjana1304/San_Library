import React from 'react'
import Header from './Header'
import BookIssue from './BookIssue'
import BookReturn from './BookReturn'
import BookHistory from './BookHistory'
import DateRange from './DateRange'

const Transaction = () => {
  return (
    <div>
        <Header/>
        <BookIssue/>
        <BookReturn/>

        <BookHistory/>

        <DateRange/>
    </div>
  )
}

export default Transaction