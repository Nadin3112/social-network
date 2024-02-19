import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';
import { sendMessageActionCreator, updateNewMessageTextActionCreator } from '../../redux/dialogsReducer';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem id={d.id} name={d.name} />);
    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem message={m.message} id={m.id} />)

    let newMessageElement = props.dialogsPage.newMessageText;

    let onSendMessageClick = () => {
        props.dispatch(sendMessageActionCreator())
    }

    let onNewMessageChange = (e) => {
        let message = e.target.value;
        props.dispatch(updateNewMessageTextActionCreator(message));
    }

    return (
        <div className={S.dialogs}>
            <ul className={S.dialogList}>
                {dialogsElements}
            </ul>
            <div>
                <ul className={S.messageList}>
                    {messagesElements}
                </ul>
                <form className={S.form}>
                    <textarea value={newMessageElement} onChange={onNewMessageChange} placeholder='Enter your message'/> 
                    <button type='button' className={S.btn} onClick={onSendMessageClick}>Send message</button>
                </form>
            </div>
        </div>
    );
};

export default Dialogs;