import React from 'react';
import S from './Users.module.css';
import userPhoto from '../../assets/images/user1.avif';
import { NavLink } from 'react-router-dom';

const User = ({ user, followingInProgress, unfollow, follow }) => {
    return (
        <li className={S.item}>
            <div className={S.wrapper}>
                <NavLink to={'/profile/' + user.id}>
                    <img className={S.avatar} src={user.photos.small != null ? user.photos.small : userPhoto} alt={user.alt} />
                </NavLink>
                {user.followed ?
                    <button disabled={followingInProgress.some(id => id === user.id)} className={S.btn}
                        onClick={() => { unfollow(user.id) }}>Unfollow</button> :
                    <button disabled={followingInProgress.some(id => id === user.id)} className={S.btn}
                        onClick={() => { follow(user.id); }}>Follow</button>}
            </div>
            <div className={S.text}>
                <div className={S.data}>
                    <h3 className={S.name}>{user.name}</h3>
                </div>
                <p className={S.status}>{user.status}</p>
            </div>
        </li>
    );
};

export default User;