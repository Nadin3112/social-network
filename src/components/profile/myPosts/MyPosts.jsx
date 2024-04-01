import React from 'react';
import S from './MyPosts.module.css';
import Post from './post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import { Textarea } from '../../common/formsControls/FormControls';

const maxLengthCreator10 = maxLengthCreator(10);

const MyPosts = React.memo(props => {

    const onAddPost = (values) => {
        props.addPost(values.newPostElement)
    };

    let postsElements = props.posts.map(p => <Post key={p.id} message={p.message} likeCount={p.likeCount} id={p.id} />);
    return (
        <div className={S.myPosts}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onAddPost} />
            <div className={S.posts}>{postsElements}</div>
        </div>
    )
});


const AddNewPostForm = (props) => {
    return (
        <form className={S.form} onSubmit={props.handleSubmit}>
            <Field
                component={Textarea}
                name="newPostElement"
                validate={[required, maxLengthCreator10]} />
            <button className={S.btn}>Add post</button>
        </form>
    );
};

const AddNewPostReduxForm = reduxForm({ form: "ProfileAddNewPostForm" })(AddNewPostForm)

export default MyPosts;