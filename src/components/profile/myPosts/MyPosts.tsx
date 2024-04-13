import React from 'react';
import S from './MyPosts.module.css';
import Post from './post/Post';
import { Formik, Field,  Form, FormikHelpers } from 'formik';
import { PostType } from '../../../types/types';

interface MyFormValues {
    newPostElement: string 
}

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostElement: string) => void
}


const MyPosts = React.memo<PropsType>(props => {
    const onAddPost = (values: MyFormValues, {resetForm}: FormikHelpers<MyFormValues>) => {
        props.addPost(values.newPostElement);
        resetForm();
    };

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount} id={p.id} />);
    return (
        <div className={S.myPosts}>
            <h3>My posts</h3>
            <Formik
                initialValues={{ newPostElement: ''}}
                onSubmit={onAddPost}>
                {() => (
                    <Form className={S.form}>
                        <Field as="textarea" name="newPostElement" />
                        <button className={S.btn} type="submit" >
                            Add post
                        </button>
                    </Form>
                )}
            </Formik>

            <div className={S.posts}>{postsElements}</div>
        </div>
    )
});

export default MyPosts;