import React from 'react';
//import S from  './Profile.module.css';
import MyPosts from './myPosts/MyPosts';
import ProfileInfo from './profileInfo/ProfileInfo';

let posts = [
    {id: 1, message: 'Hi, how are you', likeCount: 25},
    {id: 2, message: 'It is my first post', likeCount: 35}
]

const Profile =  (props) => {
    return (
        <div>
            <ProfileInfo/>
            <MyPosts posts={props.posts}/>
        </div>
    )
};

export default Profile;