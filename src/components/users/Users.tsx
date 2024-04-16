import React, { useEffect } from 'react'
import S from './Users.module.css'
import Paginator from '../common/paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/reduxStore'

export const Users: React.FC = (props) => {

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }, [])

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)
    const followingInProgress =  useSelector(getFollowingInProgress)

    const dispatch: AppDispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const followed = (userId: number) => {
        dispatch(follow(userId))
    }
    
    const unfollowed = (userId: number) => {
        dispatch(unfollow(userId))
    }
    
    return (
        <div className={S.users}>
            <UsersSearchForm onFilterChanged={onFilterChanged}/>
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
                        followingInProgress={followingInProgress}
                        follow={followed}
                        unfollow={unfollowed} />)}
            </ul>
        </div>
    )
}
