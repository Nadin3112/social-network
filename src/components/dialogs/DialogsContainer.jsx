import React from 'react';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import StoreContext from '../../StoreContext';

const DialogsContainer = (props) => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    let state = store.getState().dialogsPage;

                    let onSendMessageClick = () => {
                        store.dispatch(sendMessageActionCreator())
                    }

                    let onNewMessageChange = (message) => {
                        store.dispatch(updateNewMessageTextActionCreator(message));
                    }
                    return <Dialogs
                        updateNewMessageText={onNewMessageChange}
                        sendMessage={onSendMessageClick}
                        dialogsPage={state} />
                }
            }
        </StoreContext.Consumer>
    );
};

export default DialogsContainer;