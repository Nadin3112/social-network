import React, { useState } from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/images/user1.avif';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        saveProfile(formData);
        setEditMode(false);
    }

    return (
        <div className={S.profileInfo}>
            <div className={S.photoWrapper}>
                <img className={S.mainPhoto} src={profile.photos.large || userPhoto} alt={profile.fullName}></img>
                {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
            </div>

            {editMode ?
                <ProfileDataForm profile={profile} onSubmit={onSubmit}/>
                : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {

    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>edit</button>}
            <div className={S.info}>
                <div>
                    <b>Full name:</b>  {profile.fullName}
                </div>
            </div>
            <div>
                <b>Looking for a job: </b> {profile.lookingForAJob ? "Yes" : "No"}
            </div>
            {
                profile.lookingForAJob &&
                <div>
                    <b>My skills: </b> {profile.lookingForAJobDescription}
                </div>
            }
            <div>
                <b>About me: </b> {profile.aboutMe}
            </div>
            <div>
                <b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
                })}
            </div>
        </div>
    );
};

const Contacts = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b className={S.contacts}>{contactTitle}</b>: {contactValue}
        </div>
    )
}
export default ProfileInfo;