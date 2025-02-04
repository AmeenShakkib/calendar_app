import React from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return (
        <div className="topnav">
            <ul>
                <li>
                    <div className="link"> 
                    <NavLink to='/' className={({isActive})=>(isActive ? "active" : "")}>Home</NavLink>
                    </div> 
                </li>
                <li>
                    <div className="link">
                    <NavLink to='/addBirthday' className={({isActive})=>(isActive ? "active" : "")}>Add Bday</NavLink>
                    </div>
                </li>
                <li>
                    <div className="link">
                    <NavLink to="/CelebritysBirthday" className={({isActive})=>(isActive ? "active" : "")}>Celebrity's Bday</NavLink>
                    </div>
                </li>
            </ul>
        </div>
    )
}
export default Navbar;