import React from 'react';
import S from './MyPosts.module.css';
import Post from './post/Post';

const MyPosts = (props) => {

    let postsElements = props.posts.map(p => <Post message = {p.message} likeCount={p.likeCount} id={p.id}/>);

    let newPostElement = React.createRef();

    let onAddPost = () => {
        props.addPost();
    }

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.updateNewPostText(text);
    }

    return (
        <div className={S.myPosts}>
            <h3>My posts</h3>
            <form className={S.form}>
                <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                <button type='button' className={S.btn} onClick={onAddPost}>Add post</button>
            </form>
            <div className={S.posts}>
                {postsElements}
            </div>
        </div>
    );
};

export default MyPosts;