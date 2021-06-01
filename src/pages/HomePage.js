import React, { useState, useRef, useCallback } from 'react'
import './HomePage.css'

import useImageSearch from "../useImageSearch";
function HomePage() {
    const [query, setQuery] = useState('cat')
    const [pageNumber, setPageNumber] = useState(1)
  
    const {
      pics,
      hasMore,
    
    } = useImageSearch(query, pageNumber)
  
    const observer = useRef()
    const lastPicElementRef = useCallback(node => {
      
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
      })
      if (node) observer.current.observe(node)
    }, [ hasMore])
  
    function handleSearch(e) {
      setQuery(e.target.value)
      setPageNumber(1)
    }
    

    return (
    <div >
      
      <div className='header'>
        <div className='header_container'>
          <div className="header_title">
               <h3>Search Photos</h3>
          </div>
           
           <div className='header_search'>
              <input type="text" value={query} onChange={handleSearch}></input>
           </div>
           
           </div>
        </div>
     
     <div className='homepage_pics'>
      {pics.map((pic, index) => {
         
        if (pics.length === index + 1) {
          return <div ref={lastPicElementRef} key={pic} >{pic}</div>
        } 
        else {
          return <div key={pic} >{pic}</div>
        }
      })}
    
     </div> 
    </div>
    )
}

export default HomePage;

