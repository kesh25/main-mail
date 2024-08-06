import {create} from 'zustand'; 
import { APIKeyTableType } from "@/types"; 

type APIKeyState = {
    apiKeys: APIKeyTableType[];
    deletedKeys: APIKeyTableType[];
    editApiKey: (api: APIKeyTableType) => void; 
    deleteApiKey: (api: APIKeyTableType) => void; 
};

export const useApiKeyState = create<APIKeyState>((set, get) => ({
    apiKeys: [],
    deletedKeys: [], 
    editApiKey: (api: APIKeyTableType) => {
        let { apiKeys } = get(); 

        let updated = [...apiKeys.filter(api_k => api_k.id !== api.id), api];
        set({apiKeys: updated});
        setTimeout(() => set({apiKeys}), 1500)
    },
    deleteApiKey: (api: APIKeyTableType) => {
        let { deletedKeys } = get(); 

        let updated = [...deletedKeys.filter(api_k => api_k.id !== api.id), api];
        set({deletedKeys: updated});
        setTimeout(() => set({deletedKeys}), 1500)
    }
}))