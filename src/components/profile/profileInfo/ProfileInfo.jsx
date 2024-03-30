import React from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/images/user1.avif';
import { NavLink } from 'react-router-dom';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }
    return (

        <div className={S.profileInfo}>
            <img className={S.mainPhoto} src={profile.photos.large || userPhoto} alt={profile.fullName}></img>
            {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}

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