import React from 'react';
import S from './../Dialogs.module.css';

const MessageItem = (props) => {
    return (
        <li className={S.messageItem}>{props.message}</li>
    );
};

export default MessageItem;