import React from 'react';
import axios from 'axios';
import S from './Users.module.css';
import userPhoto from '../../assets/images/user1.avif';

class Users extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
        });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount);
        });
    }

    render() {
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i);
        }
        return (
            <div className={S.users}>
                {pages.map(p => {
                    return <button className={this.props.currentPage === p && S.selectedPage} type='button' onClick={(e)=>{this.onPageChanged(p)}}>{p}</button>
                })}
                <h2 className={S.title}>Users</h2>
                <ul className={S.list}>
                    {
                        this.props.users.map(u =>
                            <li key={u.id} className={S.item}>
                                <div className={S.wrapper}>
                                    <img className={S.avatar} src={u.photos.small != null ? u.photos.small : userPhoto} alt={u.alt} />
                                    {u.followed ? <button className={S.btn} onClick={() => { this.props.unfollow(u.id) }}>Unfollow</button> : <button className={S.btn} onClick={() => { this.props.follow(u.id) }}>Follow</button>}
                                </div>
                                <div className={S.text}>
                                    <div className={S.data}>
                                        <h3 className={S.name}>{u.name}</h3>
                                        <p className={S.city}>{/*u.city*/}</p>
                                    </div>
                                    <p className={S.status}>{u.status}</p>
                                </div>
                            </li>)}
                </ul>
            </div>)
    }
}
export default Users;