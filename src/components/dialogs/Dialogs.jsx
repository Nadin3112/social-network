import React from 'react';
import S from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import MessageItem from './message/MessageItem';

const Dialogs = (props) => {
    let dialogs = [
        { id: 1, name: 'Nadia' },
        { id: 2, name: 'Roma' },
        { id: 3, name: 'Anna' },
        { id: 3, name: 'Sofia' },
        { id: 5, name: 'Maksim' },
        { id: 5, name: 'Sveta' }
    ]

    let messages = [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'Hello' },
        { id: 3, message: 'How are you?' },
        { id: 3, message: 'Well. And you?' },
        { id: 5, message: 'I am ok' }
    ]
    
    let dialogsElements = dialogs.map(d => <DialogItem id={d.id} name={d.name} />);
    let messagesElements =  messages.map(m => <MessageItem message={m.message} id={m.id} />) 

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