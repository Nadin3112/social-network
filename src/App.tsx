import React, { Suspense } from 'react'
import './App.css'

import News from './components/news/News'
import Music from './components/music/Music'
import Settings from './components/settings/Settings'
import { BrowserRouter, Navigate, Route, Routes, Link } from 'react-router-dom'
import { UsersPage } from './components/users/UsersContainer'
import { LoginPage } from './components/login/Login'
import { connect } from 'react-redux'
import { initializeApp } from './redux/appReducer'
import { compose } from 'redux'
import Preloader from './components/common/preloader/Preloader'
import store, { AppStateType } from './redux/reduxStore'
import { Provider } from 'react-redux'
import withRouter from './components/profile/withRouter'
import { Layout, Menu} from 'antd';
import { AppHeader } from './components/header/Header'

const { Content, Footer, Sider } = Layout;

const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'))
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeApp: () => void
}

class App extends React.Component<MapPropsType & DispatchPropsType> {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }



    return (
      <Layout>
        <AppHeader/>
        <Content style={{ padding: '0 48px' }}>

          <Layout
            style={{ padding: '12px 0' }}
          >
            <Sider width={200}>
              <Menu style={{ margin: '16px 0' }}>
                <Menu.Item><Link to="/profile">Profile</Link></Menu.Item>
                <Menu.Item><Link to="/dialogs">Messages</Link></Menu.Item>
                <Menu.Item><Link to="/developers">Developers</Link></Menu.Item>
                <Menu.Item><Link to="/news">News</Link></Menu.Item>
                <Menu.Item><Link to="/music">Music</Link></Menu.Item>
                <Menu.Item><Link to="/settings">Settings</Link></Menu.Item>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Suspense fallback={<div>Loading...</div>}>
                <div className='app-wrapper-content'>
                  <Routes>
                    <Route path='/' element={<Navigate to={'/profile'} />} />
                    <Route>
                      <Route path='/profile/:userId?' element={<ProfileContainer />} />
                    </Route>
                    <Route path='/dialogs/*' element={<DialogsContainer />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/music' element={<Music />} />
                    <Route path='/developers' element={<UsersPage pageTitle={"Developers"} />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<div>404 NOT FOUND</div>} />
                  </Routes>
                </div>
              </Suspense>
            </Content>
          </Layout>
        </Content >
        <Footer style={{ textAlign: 'center' }}>
          Samurai Social Network @ 2024
        </Footer>
      </Layout >
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

const AppContainer = compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App)

const SocialNetworkApp: React.FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </BrowserRouter>
  )
}

export default SocialNetworkApp;