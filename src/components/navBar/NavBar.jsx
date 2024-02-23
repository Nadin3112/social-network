import React from 'react';
import S from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import FriendsContainer from './friends/FriendsContainer';

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
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/users">Find users</NavLink>
                    </li>
                    <li className={S.item}>
                        <NavLink className={({ isActive }) => isActive ? S.active : S.item} to="/settings">Settings</NavLink>
                    </li>
                </ul>
            </nav>
            <FriendsContainer />
        </div>
    );
};

export default NavBar;