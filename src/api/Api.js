import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "3d3ce0b6-0f27-46e2-a861-60f36b715a2d"
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
    }
}

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
            .then(response => response.data);
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
            .then(response => response.data);
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status })
            .then(response => response.data);
    },
    savePhoto(profilePhoto) {
        const formData = new FormData();
        formData.append("image", profilePhoto);
        return instance.put(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(response => response.data);
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile )
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, { email, password, rememberMe });
    },
    logout() {
        return instance.delete(`auth/login`);
    }
}
