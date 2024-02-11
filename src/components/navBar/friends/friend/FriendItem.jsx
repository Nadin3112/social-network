import React from 'react';
import { NavLink } from 'react-router-dom';
import S from './FriendItem.module.css';

const FriendItem = (props) => {
    return (
                <li className={S.friendsItem}>
                    <NavLink to={"/users/" + props.id}>
                        <img src={props.src} alt={props.alt}></img>
                    </NavLink>
                    </li>
    );
};

export default FriendItem;