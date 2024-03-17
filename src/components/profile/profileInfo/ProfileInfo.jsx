import React from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';
//import ProfileStatus from './ProfileStatus';
import { NavLink } from 'react-router-dom';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={S.profileInfo}>
            <img src={props.profile.photos.large} alt={props.profile.fullName}></img>
            <div className={S.profileWrapper}>
                <div className={S.info}>
                    <h2>{props.profile.fullName}</h2>
                    <NavLink to={props.profile.contacts.github}>{props.profile.contacts.github}</NavLink>
                </div>
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
                {/* <p>{props.profile.aboutMe}</p>  */}
            </div>
        </div>

    );
};

export default ProfileInfo;