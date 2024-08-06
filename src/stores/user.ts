import {create} from 'zustand'; 
import { UserTableType } from "@/types"; 

type UserStateType = {
    deletedUsers: string[]; 
    editedUsers: UserTableType[]; 
    addToDeletedUsers: (user: string) => void; 
    addToEditedUsers: (user: UserTableType) => void; 
}; 

export const userState = create<UserStateType>((set, get) => ({
    deletedUsers: [],
    editedUsers: [],
    addToDeletedUsers: (user: string) => {
        const { deletedUsers } = get(); 
        let updated = [...deletedUsers.filter(usr => usr !== user), user]
        set({deletedUsers: updated}); 

        setTimeout(() => set({deletedUsers}), 1500)
    },
    addToEditedUsers: (user: UserTableType) => {
        const { editedUsers } = get(); 
        let updated: UserTableType[] = [...editedUsers.filter(usr => usr.id !== user.id), user]; 
        set({editedUsers: updated});
        setTimeout(() => set({editedUsers}), 1500)

    }
}))