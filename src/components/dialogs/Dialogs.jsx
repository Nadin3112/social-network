import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />);
    let messagesElements = props.dialogsPage.messages.map(m => <MessageItem key={m.id} message={m.message} id={m.id} />)

    let newMessageElement = props.dialogsPage.newMessageText;

    let onSendMessageClick = () => {
        props.sendMessage();
    }

    let onNewMessageChange = (e) => {
        let message = e.target.value;
        props.updateNewMessageText(message);
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