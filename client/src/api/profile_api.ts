import { PhotosType, ProfileType } from "../types/types";
import { instance, ResponseT } from "./api";
type SaveT={
    photos:PhotosType 
} 
export const profileAPI ={
    getProfile(userId:number) {
        return instance.get<ProfileType>(`profile/`+userId)
        .then(response=>response.data)
    },
 getStatus(userId:number) {
    return instance.get<string>(`profile/status/`+userId)
        .then(response=>response.data)
 }   ,

 savePhote(photoFile:File) {
    const formData= new FormData();
    formData.append("image",photoFile);
    return instance.put<ResponseT<SaveT>>('profile/photo',formData,{
        headers:{'Content-Type':'multipart/form-data'}
    }).then(response=>response.data);

 },
 saveData(proFile:ProfileType) {
    
    return instance.put<ResponseT>('profile',proFile).then(response=>response.data);

 },
 updateStatus(status:string) {
    return instance.put<ResponseT>(`profile/status/`,{status:status})
        .then(response=>response.data)
 } 

}