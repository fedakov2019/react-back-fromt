import React from 'react';
import { NavLink } from 'react-router-dom';
import img from './free-logo-maker.gif';
import s from './Header.module.css';

import { MapDispatchProps, MapStatePropsType } from '../Header/HeaderContainer';


const Header:React.FC<MapStatePropsType&MapDispatchProps> = (props) => {
    return <header className={s.header}>
        <img src={img} /> <a >ТФОМС Воронежской области</a>
    <div className={s.loginBlock}>
    {props.isAuth ? <div>{props.login}-<button onClick={props.Logout}>Log out</button> </div>:
        <NavLink to={'/login'}>Login</NavLink>}
    </div>
    </header>
}

export default Header;