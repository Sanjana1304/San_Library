import React from 'react'
import Header from './Header'
import Hero from './Hero'
import BooksOnTerm from './BooksOnTerm'
import BooksOnRentRange from './BooksOnRentRange'
import BooksOnMatching from './BooksOnMatching'

const Home = () => {
  return (
    <div>
        <Header/>
        <Hero/>
        <BooksOnTerm/>
        <BooksOnRentRange/>
        <BooksOnMatching/>
    </div>
  )
}

export default Home