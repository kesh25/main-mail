"use client"; 

import React from "react"; 


import {userState } from "@/stores/user";
import { UserTableType } from "@/types";

interface UserUpdateProps {
    users: UserTableType[];
    count: number; 
    setUsers: React.Dispatch<UserTableType[]>;
    setCount: React.Dispatch<number>; 
}

const UserUpdate: React.FC<UserUpdateProps> = ({users, count, setUsers, setCount}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 
    const { deletedUsers, editedUsers } = userState(); 

    React.useEffect(() => setMounted(true), [])
    // listen for user cell action events and update users

    // user edit 
    React.useEffect(() => {
        if (!mounted) return; 
        let update: UserTableType[] = []; 

        for (let i = 0; i < users.length; i++) {
            let curr = users[i]; 

            // confirm if user is present in edited 
            let confirm: UserTableType[] = editedUsers.filter(usr => usr.id === curr.id); 

            if (confirm.length > 0) update.push(confirm[0]);
            else update.push(curr)
        };

        setUsers([]);
        setUsers(update); 
    }, [mounted, editedUsers])

    // delete user 
    React.useEffect(() => {
        if (!mounted) return; 
        let update: UserTableType[] = []; 
        let updatedCount: number = count; 
        for (let i = 0; i < users.length; i++) {
            let curr = users[i]; 

            // confirm if user is present in edited 
            if (!deletedUsers.includes(curr.id)) {
                update.push(curr);
            } else updatedCount = updatedCount - 1; 
        };

        setUsers([]);
        setCount(updatedCount); 
        setUsers(update); 
    }, [mounted, deletedUsers])
    return (
        <></>
    )
};


export default UserUpdate; 