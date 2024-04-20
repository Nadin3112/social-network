import React from 'react'
//import S from './Header.module.css'
import { UserOutlined } from '@ant-design/icons'
import { Avatar, Layout, Menu, Row, Col, Button } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectCurrentUserLogin } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'
import { AppDispatch } from '../../redux/reduxStore'
const { Header } = Layout;


export const AppHeader: React.FC = (props) => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectCurrentUserLogin)

    const dispatch: AppDispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <Header style={{ display: 'grid', alignItems: 'center' }}>
            <Row >
                <Col span={20}>
                    <Menu style={{ backgroundColor: '#001529' }}>
                        <Menu.Item >
                            <Link style={{ color: '#ffffff', fontSize: '24px' }} to="/developers">Developers</Link>
                        </Menu.Item>
                    </Menu>
                </Col>
                <Col span={4}>
                    {isAuth ?
                        <div style={{color: '#ffffff'}}>
                            <Avatar style={{ backgroundColor: '#2abfe4', marginRight: '10px' }} icon={<UserOutlined />} />
                            {login } <Button onClick={logoutCallback} style={{ marginLeft: '10px' }}>Log out</Button></div> :
                        <Link to={'/login'}>Login</Link>}
                </Col>
            </Row>
        </Header>
    )
}
