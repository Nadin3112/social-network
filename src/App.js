import React from 'react';
import './App.css';
import Header from './components/header/Header';
import NavBar from './components/navBar/NavBar';
import Profile from './components/profile/Profile';
import Dialogs from './components/dialogs/Dialogs';
import News from './components/news/News';
import Music from './components/music/Music';
import Settings from './components/settings/Settings';
import { Route, Routes } from 'react-router-dom';


const App = (props) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <NavBar state={props.state.siteBar} />
      <div className='app-wrapper-content'>
        <Routes>
          <Route path='/profile' element={<Profile
            profilePage={props.state.profilePage}
            addPost={props.addPost}
            updateNewPostText={props.updateNewPostText}/>} />
          <Route path='/dialogs/*' element={<Dialogs state={props.state.dialogsPage} />} />
          <Route path='/news' element={<News />} />
          <Route path='/music' element={<Music />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
