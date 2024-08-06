"use client"; 
import React from "react"; 

import AppCheckbox from "@/components/common/checkbox";
import AppInput from "@/components/common/app-input";
import CellAction from "../components/cell-action";
import FormTitle from "@/components/forms/components/form-title";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/modals/confirm";
import GroupUsersSheet from "@/components/sheets/group-users";

import { GroupTableType } from "@/types";
import { useSearch } from "@/hooks";
import { deleteGroup, updateGroup } from "@/lib/api-calls/groups"; 
import { createToast } from "@/utils/toast";
import { validateEmail } from "@/utils/validation"; 
import { useGroupState } from "@/stores/groups";

const CellActionsGroup = ({group}: {group: GroupTableType}) => {
    const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
    const [type, setType] = React.useState<ModalType>(); 

    return (
        <>
            <EditGroupModal  
                isOpen={openEditModal || openDeleteModal}
                onClose={() => {
                    setOpenEditModal(false);
                    setOpenDeleteModal(false);
                    setType(undefined); 
                }}
                group={group}
                type={type}
            />

            <CellAction
                id={group.id}
            >
                <>
                    <DropdownMenuItem
                        onClick={() => {
                            setType("edit")
                            setOpenEditModal(true)
                        }}
                        className="cursor-pointer"
                    >
                        Edit Group
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem 
                        className="hover:text-destructive cursor-pointer"
                        onClick={() => {
                            setType("delete");
                            setOpenDeleteModal(true)
                        }}
                    >
                        Close Group
                    </DropdownMenuItem>
                </>
            </CellAction>
        </>
    )
}; 

export default CellActionsGroup; 

type ModalType = "edit" | "delete" | undefined; 

export const ManageUsers = ({group}: {group: GroupTableType}) => (
    <GroupUsersSheet group={group}/>
);

const EditGroupModal = (
    {isOpen, onClose, group, type}: 
    {
        isOpen: boolean; 
        onClose: () => void; 
        group: GroupTableType;
        type: ModalType; 
    }
) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [title, setTitle] = React.useState<string>(group.title);
    const [email, setEmail] = React.useState<string>(group.email);
    const [autoReply, setAutoReply] = React.useState<boolean>(group.autoReply); 
    const [autoReplyMessage, setAutoReplyMessage] = React.useState<string>(group.autoReplyMessage || ""); 

    const searchParams = useSearch();
    const d = searchParams?.get("d"); 

    const { addToEditedGroups, addToDeletedGroups } = useGroupState(); 

    React.useEffect(() => {
        if (group && isOpen) {
            setTitle(group.title);
            setEmail(group.email);
            setAutoReply(group.autoReply)
            setAutoReplyMessage(group.autoReplyMessage || "")
        } else {
            setTitle("");
            setEmail("");
            setAutoReply(false)
            setAutoReplyMessage("")
        }
    }, [group, isOpen])

    const handleDeleteGroup = async () => {
        setLoading(true); 

        let res = await deleteGroup(group.id); 

        if (res) {
            createToast("success", "Group has been deleted, reloading...!"); 
            addToDeletedGroups(group)
            onClose(); 
        };

        setLoading(false); 
    };

    const handleEditGroup = async () => {
        // validations 
        if (
            title === group.title && 
            email === group.email && 
            autoReply === group.autoReply &&
            autoReplyMessage === group.autoReplyMessage
        ) {
            createToast("error", "Nothing to update!");
            return; 
        }

        // validate email and check to see if it matches domain
        if (!validateEmail(email)) {
            createToast("error", "Invalid email provided!");
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

        let updated = {
            email, title, autoReply, autoReplyMessage
        };

        let res = await updateGroup(group.id, updated); 


        if (res) {
            createToast("success", "Group has been updated!"); 
            addToEditedGroups({...group, ...updated})
            onClose(); 
            setTitle("");
            setEmail("");
            setAutoReply(false);
            setAutoReplyMessage("")
        };

        setLoading(false); 
    }

    return (
        <Confirm
                isOpen={isOpen}
                onClose={onClose}
                title={type === "delete" ? "Delete Group": "Edit Group"}
                description={type === "delete" ? "Do you wish to delete the group. It will not be able to receive emails anymore.": ""}
            >
                {
                    type === "edit" && (
                        <>
                            <FormTitle title="Group title"/>
                            <AppInput 
                                value={title}
                                setValue={setTitle}
                                placeholder="Support"
                            />
                            <FormTitle title="Group email"/>
                            <AppInput 
                                value={email}
                                setValue={setEmail}
                                placeholder={`support@${d}`}
                                
                            />
                            <div className="my-3"/>
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
                        </>
                    )
                }
                <div className={"flex justify-end"}>
                    <Button
                        disabled={loading}
                        className="min-w-[150px]"
                        onClick={type === "delete" ? handleDeleteGroup: handleEditGroup}
                    >
                        Proceed
                    </Button>
                </div>
            </Confirm>
    )
}