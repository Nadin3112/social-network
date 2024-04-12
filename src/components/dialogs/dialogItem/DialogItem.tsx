import React from 'react';
import S from './../Dialogs.module.css';
import { NavLink } from 'react-router-dom';

type PropsType = {
    id: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <li className={S.dialogItem + ' ' + S.active} >
            <NavLink to={"/dialogs/" + props.id}>{props.name}</NavLink>
        </li>
    );
};

export default DialogItem;