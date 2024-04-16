import React from 'react'
import { useSelector } from 'react-redux'
import {Users} from './Users'
import Preloader from '../common/preloader/Preloader'
import {  getIsFetching,  } from '../../redux/usersSelectors'

type UsersPagePropsType = {
    pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getIsFetching)
    
    return <>
    <h2>{props.pageTitle}</h2>
        {isFetching ? <Preloader /> : null}
        <Users/>
    </>
}
