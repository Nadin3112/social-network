import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "77555e78-0f49-4f17-93a4-1c44504b060b"
    }
});

export const usersAPI = {
    getUsers(currentPage, pageSize) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data);
    },
    deleteFollow(userId) {
        return instance.delete(`follow/${userId}`)
            .then(response => response.data);
    },
    postFollow(userId) {
        return instance.post(`follow/${userId}`)
            .then(response => response.data);
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data);
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me/`)
            .then(response => response.data);
    }
}
