import React, { Suspense } from 'react';
import './App.css';
import NavBar from './components/navBar/NavBar';
import News from './components/news/News';
import Music from './components/music/Music';
import Settings from './components/settings/Settings';
import { HashRouter, Route, Routes } from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import withRouter from './components/profile/withRouter';
import Preloader from './components/common/preloader/Preloader';
import { HashRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

const ProfileContainer = React.lazy(() => import('./components/profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'));
class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }

    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <NavBar />
        <Suspense fallback={<div>Загрузка...</div>}>
          <div className='app-wrapper-content'>
            <Routes>
              <Route>
                <Route path='/profile/:userId?' element={<ProfileContainer />} />
              </Route>
              <Route path='/dialogs/*' element={<DialogsContainer />} />
              <Route path='/news' element={<News />} />
              <Route path='/music' element={<Music />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

const SocialNetworkApp = (props) => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store} >
        <AppContainer />
      </Provider>
    </HashRouter>
  )
};

export default SocialNetworkApp; 