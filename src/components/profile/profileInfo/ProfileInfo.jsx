import React from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={S.profileImg}>
            <img src={props.profile.photos.large} alt={props.profile.fullName}></img>
            <p>{props.profile.fullName}</p>
            <p>{props.profile.aboutMe}</p>
            <p>{props.profile.contacts.github}</p>
        </div>

    );
};

export default ProfileInfo;