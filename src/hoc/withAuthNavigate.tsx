import React from 'react'
import { Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { AppStateType } from '../redux/reduxStore'

type MapPropsType = {
    isAuth: boolean
}
type DispatchPropsType = {}

const mapStateToPropsForNavigate = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
} as MapPropsType)

export function withAuthNavigate<WCP extends MapPropsType>(Component: React.ComponentType<WCP>) {

    const NavigateComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let { isAuth, ...restProps } = props
        if (!isAuth) { 
            return <Navigate to={"/login"} /> }

        return <Component {...restProps as WCP} />
    }

    let ConnectedAuthNavigateComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
        mapStateToPropsForNavigate, {})(NavigateComponent)

    return ConnectedAuthNavigateComponent
};




