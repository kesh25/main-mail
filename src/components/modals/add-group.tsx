// add group modal 
"use client"; 
import React from "react"; 

import {GroupTableType} from "../data-tables/groups/columns"; 
import AppInput from "../common/app-input"; 
import {Button} from "../ui/button"; 
import {Modal} from "./modal";
import FormTitle from "../forms/components/form-title";

interface AddGroupModalProps {
    setGroups: React.Dispatch<GroupTableType[]>;
    groups: GroupTableType[]; 
    isOpen: boolean; 
    onClose: () => void; 
    domain: string; 
};



const AddGroupModal: React.FC<AddGroupModal> = ({
    setGroups, groups, isOpen, onClose, domain
}) => {
    const [title, setTitle] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>(""); 
    const [autoReply, setAutoReply] = React.useState<boolean>(false); 

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

            />
            <FormTitle title={"Group email"}/>
            <AppInput 
                value={email}
                setValue={setEmail}
                placeholder="support@domain.com"
                containerClassName="my-3"
            />
            <div className="flex justify-end">
                <Button>
                    Create
                </Button>
            </div>
        </Modal>
    )
};

export default AddGroupModal; 