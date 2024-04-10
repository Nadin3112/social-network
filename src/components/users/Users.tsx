import React from 'react';
import S from './Users.module.css';
import Paginator from '../common/paginator/Paginator';
import User from './User';
import { UsersType } from '../../types/types';

type PropsType = {
    totalUsersCount: number,
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UsersType>
    followingInProgress: Array<number>
    unfollow: (userId: number) => void
    follow: (userId: number) => void
}

const Users: React.FC<PropsType> = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {
    return (
        <div className={S.users}>
            <Paginator currentPage={currentPage}
                onPageChanged={onPageChanged}
                totalItemsCount={totalUsersCount}
                pageSize={pageSize} />

            <h2 className={S.title}>Users</h2>

            <ul className={S.list}>
                {
                    users.map(u => <User
                        user={u}
                        key={u.id}
                        followingInProgress={props.followingInProgress}
                        follow={props.follow}
                        unfollow={props.unfollow} />)}
            </ul>
        </div>
    );
};

export default Users;