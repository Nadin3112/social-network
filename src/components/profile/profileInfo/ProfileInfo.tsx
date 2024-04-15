import React, { ChangeEvent, useState } from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
import userPhoto from '../../../assets/images/user1.avif';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataForm from './ProfileDataForm';
import { ContactsType, ProfileType } from '../../../types/types';

type Propstype = {
    profile: ProfileType | null
    status: string 
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => void
}

const ProfileInfo: React.FC<Propstype> = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {
    const [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const handleSubmit = (formData: ProfileType) => {
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
                <ProfileDataForm profile={profile} handleSubmit={handleSubmit}/>
                : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={profile} isOwner={isOwner} />}

            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
        </div>
    );
};

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}

const ProfileData:React.FC<ProfileDataPropsType> = ({ profile, isOwner, goToEditMode }) => {

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
                <b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
                    return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
                })}
            </div>
        </div>
    );
};

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}

const Contacts:React.FC<ContactsPropsType> = ({ contactTitle, contactValue }) => {
    return (
        <div>
            <b className={S.contacts}>{contactTitle}</b>: {contactValue}
        </div>
    )
}
export default ProfileInfo;