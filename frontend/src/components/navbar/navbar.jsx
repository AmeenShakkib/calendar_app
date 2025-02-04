import React from 'react'
import {NavLink} from 'react-router-dom'
import './navbar.css'

const Navbar = () => {
    return (
        <div className="topnav">
            <ul>
                <li>
                    <NavLink to='/' className={({isActive})=>(isActive ? "active" : "")}>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/addBirthday' className={({isActive})=>(isActive ? "active" : "")}>Add Birthday</NavLink>
                </li>
                <li>
                    <NavLink to="/CelebritysBirthday" className={({isActive})=>(isActive ? "active" : "")}>Get a Celebrity's Birthday</NavLink>
                </li>
            </ul>
        </div>
    )
}
export default Navbar;