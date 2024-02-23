import React from 'react';
import S from './Users.module.css'

const Users = (props) => {
    if (props.users.length === 0) {
        props.setUsers([
            { id: 1, followed: true, src: "https://img.freepik.com/premium-vector/vector-illustration-winter-girl-concept-brunette-girl-winter_469123-531.jpg", alt: 'Nadia', city: 'Brest, Belarus', lead: 'I am happy' },
            { id: 2, followed: true, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-525.jpg?w=2000', alt: 'Roma', city: 'Brest, Belarus', lead: 'I like soccer' },
            { id: 3, followed: false, src: 'https://img.freepik.com/premium-vector/vector-illustration-winter-boy-concept-hello-winter-avataka-social-networks_469123-519.jpg', alt: 'Maksim', city: 'Minsk, Belarus', lead: 'I like hockey' },
            { id: 4, followed: false, src: 'https://img.freepik.com/premium-vector/female-user-profile-avatar-is-a-woman-a-character-for-a-screen-saver-with-emotions_505620-617.jpg', alt: 'Sofia', city: 'Minsk, Belarus', lead: 'I am so pretty' }
        ])
    }
    return (
        <div className={S.users}>
            <h2 className={S.title}> Users</h2>
            <ul className={S.list}>
                {
                    props.users.map(u =>
                        <li key={u.id} className={S.item}>
                            <div className={S.wrapper}>
                                <img className={S.avatar} src={u.src} alt={u.alt} />
                                {u.followed ? <button className={S.btn} onClick={() => { props.unfollow(u.id) }}>Unfollow</button> : <button className={S.btn} onClick={() => { props.follow(u.id) }}>Follow</button>}
                            </div>
                            <div className={S.text}>
                                <div className={S.data}>
                                    <h3 className={S.name}>{u.alt}</h3>
                                    <p className={S.city}>{u.city}</p>
                                </div>
                                <p className={S.lead}>{u.lead}</p>
                            </div>
                        </li>)}
            </ul>
        </div>
    );
};

export default Users;