import React from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import { NavLink } from 'react-router-dom';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {
    if (!profile) {
        return <Preloader />
    }
    return (
        <div className={S.profileInfo}>
            <img src={profile.photos.large} alt={profile.fullName}></img>
            <div className={S.profileWrapper}>
                <div className={S.info}>
                    <h2>{profile.fullName}</h2>
                    <NavLink to={profile.contacts.github}>{profile.contacts.github}</NavLink>
                </div>
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
        </div>

    );
};

export default ProfileInfo;