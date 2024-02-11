import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';

const Dialogs = (props) => {
    
    let dialogsElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} />);
    let messagesElements =  props.state.messages.map(m => <MessageItem message={m.message} id={m.id} />) 

    return (
        <div className={S.dialogs}>
            <ul className={S.dialogList}> 
                {dialogsElements}
            </ul>
            <ul className={S.messageList}> 
                {messagesElements}
            </ul>
        </div>
    );
};

export default Dialogs;