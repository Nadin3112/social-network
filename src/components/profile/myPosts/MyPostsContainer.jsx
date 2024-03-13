import MyPosts from './MyPosts';
import { addPostActionCreator } from '../../../redux/profileReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostElement) => { 
            dispatch(addPostActionCreator(newPostElement)) }
    }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;