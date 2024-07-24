import React from 'react'
import { FaNoteSticky } from "react-icons/fa6";

const Nav = () => {
  return (
    <div>
<       nav className="navbar navbar-light bg-info">
            <i className="navbar-brand ms-4">
            <FaNoteSticky className='fs-2 mb-2'/>
            <strong className='ms-2 fs-2'>Keeper</strong>
            </i>
        </nav>
    </div>
  )
}

export default Nav