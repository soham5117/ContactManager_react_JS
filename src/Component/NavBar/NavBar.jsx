import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    
      <nav className='navbar navbar-dark navbar-expand-sm bg-dark'>
        <div className="container bg-dark">
            <Link to={"/"} className='navbar-brand'><i className='fa fa-mobile text-warning '> </i>  Conatact <span className='text-warning'> Managemet</span></Link>
        </div>

      </nav>
    </>
  )
}

export default NavBar
