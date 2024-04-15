import React from 'react';
import S from  './Profile.module.css';
import ProfileInfo from './profileInfo/ProfileInfo';
import MyPostsContainer from './myPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsType = {
    profile: ProfileType | null
    status: string 
    updateStatus: () => void 
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

const Profile: React.FC<PropsType > = (props) => {
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