import React from 'react'

const Footer = () => {
  return (
    <div className='fixed-bottom w-100'>
        <nav className="navbar navbar-light bg-secondary bg-opacity-10">
            <small className=" m-auto text-secondary">
            Copyrights &copy; {new Date().getFullYear()}</small>
        </nav>
    </div>
  )
}

export default Footer