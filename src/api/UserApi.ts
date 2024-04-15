import { GetItemsType, instance } from "./Api"

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => res.data)
    },
    deleteFollow(userId: number) {
        return instance.delete(`follow/${userId}`) 
            .then(res => res.data) as Promise<ResponseType>
    },
    postFollow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`)
            .then(res => res.data)
    }
}