import {create} from 'zustand'; 
import { GroupTableType } from "@/types"; 

type GroupStateType = {
    deletedGroups: GroupTableType[]; 
    editedGroups: GroupTableType[]; 
    addToDeletedGroups: (group: GroupTableType) => void; 
    addToEditedGroups: (group: GroupTableType) => void; 
}; 


export const useGroupState = create<GroupStateType>((set, get) => ({
    deletedGroups: [],
    editedGroups: [],
    addToDeletedGroups: (group: GroupTableType) => {
        const { deletedGroups } = get(); 
        let updated = [...deletedGroups.filter(grp => grp.id !== group.id), group]
        set({deletedGroups: updated}); 

        setTimeout(() => set({deletedGroups}), 1500)
    },
    addToEditedGroups: (group: GroupTableType) => {
        const { editedGroups } = get(); 
        let updated = [...editedGroups.filter(grp => grp.id !== group.id), group]; 
        set({editedGroups: updated});
        setTimeout(() => set({editedGroups}), 1500)

    }
}))