import { instance, APIResponseType } from "./Api"
import { PhotosType, ProfileType } from '../types/types'

type SavePhotoDataResponseType = {
    photos: PhotosType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<ProfileType>(`profile/` + userId)
            .then(res => res.data)
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId)
            .then(res => res.data)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType>(`profile/status`, { status })
            .then(res => res.data)
    },
    savePhoto(profilePhoto: any) {
        const formData = new FormData();
        formData.append("image", profilePhoto)
        return instance.put<APIResponseType<SavePhotoDataResponseType>>(`profile/photo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType>(`profile`, profile)
        .then(res => res.data)
    }
}