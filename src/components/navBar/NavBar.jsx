import React from 'react';
import S from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import Friends from './friends/Friends';

const NavBar = (props) => {
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
            <Friends friends={props.sideBar.friends}/>
        </div>
    );
};

export default NavBar;