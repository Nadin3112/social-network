import React from 'react';
import S from './../Dialogs.module.css';

type PropsType = {
    message: string
    id: number
}

const MessageItem:React.FC<PropsType> = (props) => {
    return (
        <li className={S.messageItem}>{props.message}</li>
    );
};

export default MessageItem;