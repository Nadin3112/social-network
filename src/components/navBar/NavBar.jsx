import React from 'react';
import S from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import Friends from './friends/Friends';
import StoreContext from '../../StoreContext';

const NavBar = () => {

    return (
        <div className={S.navBar}>
            <nav className={S.nav}>
                <ul className={S.list}>
                    <li className={S.item}>
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/profile">Profile</NavLink>
                    </li>
                    <li className={S.item}>
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/dialogs">Messages</NavLink>
                    </li>
                    <li className={S.item}>
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/news">News</NavLink>
                    </li>
                    <li className={S.item}>
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/music">Music</NavLink>
                    </li>
                    <li className={S.item}>
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/settings">Settings</NavLink>
                    </li>
                </ul>
            </nav>
            <StoreContext.Consumer>
                { (store) => {
                    let state = store.getState();
                    return <Friends friends={state.sideBar.friends} /> }
                }
            </StoreContext.Consumer>;
        </div>
    );
};

export default NavBar;