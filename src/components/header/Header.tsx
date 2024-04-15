import React from 'react';
import S from './Header.module.css';
import { NavLink } from 'react-router-dom';

export type MapPropsType = {
    isAuth: boolean
    login: string | null
    logout: () => void
}

export type DispatchPropsType = {
    logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {
    return (
        <header className={S.header}>
            <img src='https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?size=338&ext=jpg&ga=GA1.1.1788068356.1707177600&semt=ais' alt='' />
            <div className={S.loginBlock}>
                {props.isAuth ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div> :
                    <NavLink to={'/login'}>Login</NavLink>}
            </div>
        </header>
    );
};

export default Header;