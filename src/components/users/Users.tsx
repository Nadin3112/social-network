import React, { useEffect } from 'react'
import S from './Users.module.css'
import Paginator from '../common/paginator/Paginator'
import User from './User'
import UsersSearchForm from './UsersSearchForm'
import { FilterType, requestUsers, follow, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalUsersCount, getCurrentPage, getPageSize, getUsersFilter, getUsers, getFollowingInProgress } from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/reduxStore'
import { useNavigate, useSearchParams } from 'react-router-dom'

type QueryParamsType = { term?: string; page?: string; friend?: string }

export const Users: React.FC = (props) => {

  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getFollowingInProgress)
  const dispatch: AppDispatch = useDispatch()

  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const parsedTerm = urlParams.get('term')
    const parsedPage = urlParams.get('page')
    const parsedFriend = urlParams.get('friend')
    let actualPage = currentPage
    let actualFilter = filter

    if (parsedPage !== null) {
      actualPage = Number(parsedPage)
    }
    if (parsedTerm !== null) {
      actualFilter = { ...actualFilter, term: parsedTerm }
    }
    switch (parsedFriend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null }
        break
      case 'true':
        actualFilter = { ...actualFilter, friend: true }
        break
      case 'false':
        actualFilter = { ...actualFilter, friend: false }
        break
    }
    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)
      
    const queryToString = new URLSearchParams(query)

    navigate('/users')
    setSearchParams(queryToString.toString())
  }, [filter, currentPage])

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
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize} />

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
