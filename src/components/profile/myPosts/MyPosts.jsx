import React from 'react';
import S from './MyPosts.module.css';
import Post from './post/Post';

const MyPosts = () => {

    let posts = [
        {id: 1, message: 'Hi, how are you', likeCount: 25},
        {id: 2, message: 'It is my first post', likeCount: 35}
    ]

    let postsElements = posts.map(p => <Post message = {p.message} likeCount={p.likeCount} id={p.id}/>)

    return (
        <div className={S.myPosts}>
            <h3>My posts</h3>
            <form className={S.form}>
                <textarea></textarea>
                <button className={S.btn}>Add post</button>
            </form>
            <div className={S.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;