import React from 'react';
import S from './ProfileInfo.module.css';
import Preloader from '../../common/preloader/Preloader';

const ProfileInfo = (props) => {
    if(!props.profile) {
        return <Preloader/>
    }
    return (
            <div className={S.profileImg}>
                <img src='https://kartinki.pics/uploads/posts/2022-05/thumbs/1652228067_2-kartinkin-net-p-krasivie-kartinki-dusha-2.jpg' alt='' />
            <div>
                <img src={props.profile.photos.large} alt=""></img>
            </div>
            </div>
    );
};

export default ProfileInfo;