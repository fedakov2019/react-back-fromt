import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';

const Navbar:React.FC = () => {
    return (<nav>
       <div className='nav-wrapper'>
         <ul id="nav-mobile" className="right">
      <li key='1'>
        <NavLink to="/profile" >Profile</NavLink></li>
     
            <li key='2'>
                <NavLink to="/dialogs" >Messages</NavLink>
            </li>
         <li key='3'> 
                <NavLink to="/users">Админка</NavLink>
            </li>
<li key='4'>        <NavLink to="/settings" >Settings</NavLink></li>
<li key='5'>        <NavLink to="/people" >Регист застрахованных</NavLink></li>

                </ul>
            
      </div>
</nav>
  
    )
}

export default Navbar;