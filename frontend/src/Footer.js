import React from 'react'

const Footer = () => {
  return (
    <div className='footer w-100'>
        <nav className="navbar navbar-light bg-info">
            <p className="navbar-brand m-auto">
            Copyrights &copy; {new Date().getFullYear()}</p>
        </nav>
    </div>
  )
}

export default Footer