// add group modal 
"use client"; 
import React from "react"; 

import AppCheckbox from "../common/checkbox";
import AppInput from "../common/app-input"; 
import {Button} from "../ui/button"; 
import FormTitle from "../forms/components/form-title";
import {GroupTableType} from "../data-tables/groups/columns"; 
import {Modal} from "./modal";

import { createToast } from "@/utils/toast";
import { validateEmail } from "@/utils/validation";
import { createGroup } from "@/lib/api-calls/groups"; 
import { useSearch } from "@/hooks";
// import { GroupTableType } from "@/components/data-tables/groups/columns";

interface AddGroupModalProps {
    setGroups: React.Dispatch<GroupTableType[]>;
    groups: GroupTableType[]; 
    isOpen: boolean; 
    onClose: () => void; 
    domain: string; 
};



const AddGroupModal: React.FC<AddGroupModalProps> = ({
    setGroups, groups, isOpen, onClose, domain
}) => {
    const [loading, setLoading] = React.useState<boolean>(false);   
    const [title, setTitle] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>(""); 
    const [autoReply, setAutoReply] = React.useState<boolean>(false); 
    const [autoReplyMessage, setAutoReplyMessage] = React.useState<string>(""); 

    const searchParams = useSearch(); 
    const d = searchParams?.get("d"); 

    const handleAddingGroup = async () => {
        if (!title || !email) {
            createToast("error", "Email and group title are required!");
            return; 
        }

        // check to see if email is valid and has the domain
        if (!validateEmail(email)) {
            createToast("error", "Enter a valid email!"); 
            return; 
        }

        let confirm = email.split("@").pop(); 
        if (confirm?.toLowerCase() !== d?.toLowerCase()) {
            createToast("error", `The email domain should end with ${d}`);
            return; 
        };

        if (autoReply && !autoReplyMessage) {
            createToast("error", "The auto reply message is required!");
            return; 
        }

        setLoading(true); 

        let group: GroupTableType = {
            id: "1", 
            title,
            email: email.toLowerCase(),
            createdAt: new Date().toString(), 
            autoReply,
            users: 0,   
        }; 

        let res = await createGroup(domain, {
            ...group, 
            autoReplyMessage, 
            
        }); 

        if (res) {
            group.id = res; 

            createToast("success", "Group was created successfully!");

            setGroups([group, ...groups]); 
            setTitle("");
            setEmail("");
            setAutoReply(false);
            setAutoReplyMessage(""); 

            onClose(); 
        }

        setLoading(false); 

    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Group"
        >
            <FormTitle title={"Group title"}/>
            <AppInput 
                value={title}
                setValue={setTitle}
                placeholder="Support.."
                containerClassName="my-3"
                disabled={loading}

            />
            <FormTitle title={"Group email"}/>
            <AppInput 
                value={email}
                setValue={setEmail}
                placeholder={`support@${d || ""}`}
                containerClassName="my-3"
                disabled={loading}
            />
            <AppCheckbox 
                checked={autoReply}
                setChecked={setAutoReply}
                text="Enable auto reply for this group"
            />
            {
                autoReply && (
                    <>
                        <FormTitle title="Auto reply message"/>
                        <AppInput 
                            value={autoReplyMessage}
                            setValue={setAutoReplyMessage}
                            placeholder={"A short message on what the auto reply will entail."}
                            containerClassName="my-3"
                            disabled={loading}
                            textarea={true}
                        />
                    </>
                )
            }
            <div className="flex justify-end">
                <Button
                    disabled={loading}
                    onClick={handleAddingGroup}
                >
                    Create
                </Button>
            </div>
        </Modal>
    )
};

export default AddGroupModal; 