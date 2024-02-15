import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';

const Dialogs = (props) => {
    
    let dialogsElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} />);
    let messagesElements =  props.state.messages.map(m => <MessageItem message={m.message} id={m.id} />)
    
    let newMessageElement = React.createRef();

    let appMessage = () => {
        let message = newMessageElement.current.value;
        alert(message);
    }

    return (
        <div className={S.dialogs}>
            <ul className={S.dialogList}> 
                {dialogsElements}
            </ul>
            <ul className={S.messageList}> 
                {messagesElements}
            </ul>
            <form className={S.form}>
                <textarea ref={newMessageElement}></textarea>
                <button type='button' className={S.btn} onClick={appMessage}>Add message</button>
            </form>
        </div>
    );
};

export default Dialogs;