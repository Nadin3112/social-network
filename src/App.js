import React from 'react';
import './App.css';
import Header from './components/header/Header';
import NavBar from './components/navBar/NavBar';
import Profile from './components/profile/Profile';
import News from './components/news/News';
import Music from './components/music/Music';
import Settings from './components/settings/Settings';
import { Route, Routes } from 'react-router-dom';
import DialogsContainer from './components/dialogs/DialogsContainer';
import UsersContainer from './components/users/UsersContainer';


const App = (props) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <NavBar />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile/*' element={<Profile />} />
          <Route path='/dialogs/*' element={<DialogsContainer />} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/users' element={<UsersContainer />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
