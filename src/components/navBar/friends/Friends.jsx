import React from 'react';
import S from './Friends.module.css';
import FriendItem from './friend/FriendItem';

const Friends = (props) => {

    let friendsElements = props.friends.map(f => <FriendItem id={f.id} src={f.src} alt={f.alt} />)

    return (
        <div className={S.friends}>
            <h3>My friends</h3>
            <ul className={S.friendsList}>
                {friendsElements}
            </ul>
        </div>
    );
};

export default Friends;