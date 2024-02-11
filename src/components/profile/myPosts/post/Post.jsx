import React from 'react';
import S from './Post.module.css';

const Post = (props) => {
    return (
        <div className={S.item}>
            <img src="https://img.freepik.com/premium-vector/brunette-girl-with-hairbun-icon_24877-18744.jpg?size=626&ext=jpg" alt="" />
            {props.message}
            <div>
                <span>like</span>{props.likeCount}
            </div>
        </div>
    );
};

export default Post;