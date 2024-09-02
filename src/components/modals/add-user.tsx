// add user modal 
"use client"; 
import React from "react"; 

import AppInput from "../common/app-input"; 
import {Button} from "../ui/button"; 
import {Modal} from "./modal";
import FormTitle from "../forms/components/form-title";
import { createToast } from "@/utils/toast";
import { createUser } from "@/lib/api-calls/user";
import { validateEmail } from "@/utils/validation";
import { useSearch } from "@/hooks";
import { UserTableType } from "@/types";

interface AddUserModalProps {
    setUsers: React.Dispatch<UserTableType[]>;
    users: UserTableType[]; 
    isOpen: boolean; 
    onClose: () => void; 
    domain: string; 
    count: number; 
    setCount: React.Dispatch<number>; 
};

let avatar = "https://res.cloudinary.com/dyo0ezwgs/image/upload/v1701015303/defaults/user-avatar_fjqn4g.png"; 

const AddUserModal: React.FC<AddUserModalProps> = ({
    setUsers, users, isOpen, onClose, domain, count, setCount
}) => {
    const [name, setName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>(""); 
    const [phone, setPhone] = React.useState<string>(""); 
    const [loading, setLoading] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const d = searchParams?.get("d"); 
     
    const handleAddingUser = async () => {
        if (!name || !phone || !email) {
            createToast("error", "User must have a name, phone, and email!");
            return; 
        }

        // validate email 
        if (!validateEmail(email)) {
            createToast("error", "Invalid email!");
            return; 
        }
        let split_email = email.split("@"); 

        if (split_email[1]?.toLowerCase() !== d?.toLowerCase()) {
            createToast("error", `User email must end with ${d}.`);
            return; 
        }

        setLoading(true); 

        let res = await createUser(domain, {name, phone, email: email.toLowerCase()}); 

        if (res) {
            let user: UserTableType = {
                id: res, avatar, name, phone, email, sent: 0, received: 0, storage: 0, createdAt: new Date(), suspended: false, roles: ["user"]
            }; 

            setUsers([user, ...users]); 
            setCount(count + 1); 
            
            createToast("success", "User has been added!");

            setName("");
            setEmail("");
            setPhone("");
            onClose(); 
        }
        setLoading(false); 
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Add User"
        >
            <FormTitle title={"Full Name"}/>
            <AppInput 
                value={name}
                setValue={setName}
                placeholder="John wakazi"
                containerClassName="my-3"
                disabled={loading}
            />
            <FormTitle title={"Email"}/>
            <AppInput 
                value={email}
                setValue={setEmail}
                placeholder="john@domain.com"
                containerClassName="my-3"
                disabled={loading}
            />
            <FormTitle title={"Phone number"}/>
            <AppInput 
                value={phone}
                setValue={setPhone}
                placeholder="+254718 110 222"
                containerClassName="my-3"
                disabled={loading}
            />
            <div className="flex justify-end">
                <Button
                    disabled={loading}
                    onClick={handleAddingUser}
                >
                    Add{loading ? "ing...": ""} User
                </Button>
            </div>
        </Modal>
    )
};

export default AddUserModal; 