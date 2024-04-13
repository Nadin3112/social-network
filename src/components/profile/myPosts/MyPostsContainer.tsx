import MyPosts from './MyPosts';
import { actions } from '../../../redux/profileReducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';

const mapStateToProps = (state: AppStateType) => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}

const MyPostsContainer = connect(mapStateToProps, {...actions})(MyPosts);

export default MyPostsContainer;