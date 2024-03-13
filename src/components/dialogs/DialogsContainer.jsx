import { compose } from 'redux';
import { withAuthNavigate } from '../../hoc/withAuthNavigate';
import { sendMessageActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageElement) => {
            dispatch(sendMessageActionCreator(newMessageElement));
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthNavigate)
    (Dialogs);