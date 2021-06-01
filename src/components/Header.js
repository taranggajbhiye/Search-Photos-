import './Header.css'


function Header() {
    return (
        <div className='header'>
        <div className='header_container'>
          <div className="header_title">
               <h3>Search Photos</h3>
          </div>
           
           <div className='header_search'>
                 <input type='text' ></input>
           </div>
           
           </div>
        </div>
    )
}

export default Header
