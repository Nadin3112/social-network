import React from 'react';
import './App.css';
import NavBar from './components/navBar/NavBar';
import News from './components/news/News';
import Music from './components/music/Music';
import Settings from './components/settings/Settings';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/dialogs/DialogsContainer';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from './components/profile/ProfileContainer';
import HeaderContainer from './components/header/HeaderContainer';
import Login from './components/login/Login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/appReducer';
import { compose } from 'redux';
import withRouter from './components/profile/withRouter';
import Preloader from './components/common/preloader/Preloader';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/reduxStore';
import { Provider } from 'react-redux';

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
          </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

const AppContainer =  compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);

  const SocialNetworkApp = (props) => {
    return (
      <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )
  };

  export default SocialNetworkApp; 