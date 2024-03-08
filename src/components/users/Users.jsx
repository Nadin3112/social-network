import React from 'react';
import S from './Users.module.css';
import userPhoto from '../../assets/images/user1.avif';
import { NavLink } from 'react-router-dom';

const Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className={S.users}>
            {pages.map(p => <button className={props.currentPage === p && S.selectedPage} onClick={(e) => { props.onPageChanged(p) }}>{p}</button>
            )}
            <h2 className={S.title}>Users</h2>
            <ul className={S.list}>
                {
                    props.users.map(u =>
                        <li key={u.id} className={S.item}>
                            <div className={S.wrapper}>
                                <NavLink to={'/profile/' + u.id}>
                                    <img className={S.avatar} src={u.photos.small != null ? u.photos.small : userPhoto} alt={u.alt} />
                                </NavLink>
                                {u.followed ?
                                    <button disabled={props.followingInProgress.some(id => id === u.id)} className={S.btn} 
                                    onClick={() => {props.unfollow(u.id) }}>Unfollow</button> :
                                    <button disabled={props.followingInProgress.some(id => id === u.id)} className={S.btn} 
                                    onClick={() => {props.follow(u.id);}}>Follow</button>}
                            </div>
                            <div className={S.text}>
                                <div className={S.data}>
                                    <h3 className={S.name}>{u.name}</h3>
                                    <p className={S.city}>{/*u.city*/}</p>
                                </div>
                                <p className={S.status}>{u.status}</p>
                            </div>
                        </li>)}
            </ul>
        </div>
    );
};

export default Users;