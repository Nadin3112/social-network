import React from 'react';
import S from  './Profile.module.css';
import ProfileInfo from './profileInfo/ProfileInfo';
import MyPostsContainer from './myPosts/MyPostsContainer';

const Profile = (props) => {

    return (
        <div className={S.profile}>
            <ProfileInfo profile={props.profile}
            status={props.status}
            updateStatus={props.updateStatus}
            isOwner={props.isOwner}
            savePhoto={props.savePhoto}
            saveProfile={props.saveProfile}/>
            <MyPostsContainer />
        </div>
    )
};

export default Profile;