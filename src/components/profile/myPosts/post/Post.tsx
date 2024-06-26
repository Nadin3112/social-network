import React from 'react';
import S from './Post.module.css';
import myPhoto from '../../../../assets/images/my-photo.avif';

type PropsType = {
    id: number
    message: string
    likeCount: number
}

const Post:React.FC<PropsType> = (props) => {
    return (
        <div className={S.item}>
            <img src={myPhoto} alt="" />
            {props.message}
            <div>
                <span>like</span>
                {props.likeCount}
            </div>
        </div>
    );
};

export default Post;