export type PaymentTableType = {
    id: string; 
    amount: number; 
    createdAt: string; 
    status: "pending" | "paid" | "disputed"; 
    service: "subscription" | "API" | "storage"; 
    paid: string; 
    mode: "MPESA"; 
}; 

export type UserTableType = {
    id: string; 
    avatar: string; 
    name: string; 
    email: string; 
    phone: string; 
    roles: string[];
    storage: number; 
    sent: number; 
    received: number; 
    createdAt: Date | string; 
    suspended: boolean; 
}; 

export type StorageUserTableType = {
    id: string; 
    name: string; 
    email: string; 
    storage: number; 
}; 

export type NotificationTableType = {
    id: string; 
    subject: string; 
    message: string; 
    createdAt: string; 
    status: "read" | "unread";
};

export type GroupTableType = {
    id: string; 
    title: string; 
    email: string; 
    autoReply: boolean; 
    autoReplyMessage?: string; 
    users: number; 
    createdAt: string; 
}; 

export type GroupUsersTableType = {
    id: string;
    avatar: string; 
    name: string; 
    email: string; 
}

export type DomainTableType = {
    id: string; 
    domain: string; 
    sending_domain: string; 
    plan: "individual" | "premium" | "startup" | "custom",
    users: number;
    sent: number; 
    received: number; 
    status: "pending" | "active" | "suspended"; 
    verified: boolean; 
    createdAt: Date; 
    storage: number; 
}; 

export type APIKeyTableType = {
    id: string; 
    app_id: string; 
    key: string; 
    active: boolean; 
    createdAt: Date;
    lastUsed: Date; 
};