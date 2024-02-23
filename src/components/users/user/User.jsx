import React from 'react';
import { NavLink } from 'react-router-dom';
import S from '../Users.module.css'

const User = (props) => {
    return (
        <li className={S.item}>
            <NavLink className={S.link} to={"/users/" + props.id}>
                <div className={S.wrapper}>
                    <img className={S.avatar} src={props.src} alt={props.alt} />
                    {<button className={S.btn} type='button'>{props.btn}</button> }
                </div>
                <div className={S.text}>
                    <div className={S.data}>
                        <h3 className={S.name}>{props.alt}</h3>
                        <p className={S.city}>{props.city}</p>
                    </div>
                    <p className={S.lead}>{props.lead}</p>
                </div>
            </NavLink>
        </li>
    );
};

export default User;