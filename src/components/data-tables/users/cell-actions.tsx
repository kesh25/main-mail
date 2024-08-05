// user actions 
"use client"; 
import React from "react"; 
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import CellAction from "../components/cell-action";
import Confirm from "@/components/modals/confirm";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import FormTitle from "@/components/forms/components/form-title";
import { Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { UserTableType } from "@/types";



const UserCellActions = ({user}: {user: UserTableType}) => {
    const [openResetModal, setOpenResetModal] = React.useState<boolean>(false); 
    const [openRolesModal, setOpenRolesModal] = React.useState<boolean>(false); 
    const [openSuspendModal, setOpenSuspendModal] = React.useState<boolean>(false); 
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false); 

    const [type, setType] = React.useState<ConfirmType>("reset"); 

    return (
        <>
            <ConfirmUserModal 
                isOpen={openResetModal || openSuspendModal || openDeleteModal}
                onClose={() => {
                    setOpenResetModal(false);
                    
                    setOpenSuspendModal(false);
                    setOpenDeleteModal(false)
                }}
                type={type}
                user_id={user.id}
                name={user.name}
            />
            <RolesModal 
                isOpen={openRolesModal}
                onClose={() => setOpenRolesModal(false)}
                user_id={user.id}
                name={user.name}  
                roles={user.roles}  
            />

            <CellAction
                id={user.id}
            >
                <>
                    <DropdownMenuItem
                        onClick={() => {
                            setType("reset");
                            setOpenResetModal(true)
                        }}
                        className="cursor-pointer"
                    >
                        Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            // setType("role");
                            setOpenRolesModal(true)
                        }}
                        className="cursor-pointer"
                    >
                        Edit Roles
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setType(user.suspended ? "unsuspend": "suspend");
                            setOpenSuspendModal(true)
                        }}
                        className="cursor-pointer"
                    >
                        {user.suspended ? "Unsuspend": "Suspend"}
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem
                        className="hover:text-destructive cursor-pointer"
                        onClick={() => {
                            setType("delete");
                            setOpenDeleteModal(true)
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </>
            </CellAction>
        </>
    )
}
export default UserCellActions; 

type ModalCommonProps = {
    isOpen: boolean; 
    onClose: () => void; 
}
type ConfirmType = "reset" | "suspend" | "unsuspend" | "delete"; 

// reset password || suspend || unsuspend || delete 
// confirm
interface ConfirmProps extends ModalCommonProps {
    type: ConfirmType; 
    user_id: string; 
    name: string; 
}


const ConfirmUserModal: React.FC<ConfirmProps> = ({
    isOpen, onClose, type, user_id, name
}) => {
    let title = type === "reset" ? 
        "Reset Password": 
    type === "suspend" ? 
        "Supend User": 
    type === "unsuspend" ? 
        "Unsuspend User": 
        "Delete User"; 

    let description = type === "reset" ?
        `Do you wish to reset the password for ${name}. The new password will be sent to their phone number!`:  
    type === "suspend" ? 
        `Do you wish to suspend ${name}. The user will not be able to send any mail`: 
    type === "unsuspend" ? 
        `The user ${name} will be unsuspended. They can resume sending emails!`: 
        `Do you wish to delete the user ${name}. All records, including emails and files will be deleted completely.`
    return (
        <Confirm
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
        >
            <div className="w-full flex justify-end">
                <Button>
                    Proceed
                </Button>
            </div>
        </Confirm>
    )
}


// edit roles 
interface RolesModalProps extends ModalCommonProps {
    user_id: string; 
    name: string; 
    roles: string[]; 
}
const RolesModal: React.FC<RolesModalProps> = ({
    isOpen, onClose, user_id, roles, name
}) => {
    const [currentRoles, setCurrentRoles] = React.useState<string[]>([...roles]); 


    return (
        <Confirm
            title={"Edit Roles"}
            description={`Edit the roles of ${name}. These roles will enable the user to perform certain actions within the platform as seen below.`}
            isOpen={isOpen}
            onClose={onClose}
        >
            {/* <div> */}
            <FormTitle title="Roles description"/>
            <Paragraph className="text-xs lg:text-sm">
                <span className="font-bold">User: </span>
                The basic role within the system. Anyone wanting to receive and send emails must have the user role
            </Paragraph>
            <Paragraph className="text-xs lg:text-sm">
                <span className="font-bold">Admin: </span>
                The user is able to login to the control panel, manage the domain and the user. 
            </Paragraph>
            <Separator className="my-1 mt-2"/>
            <FormTitle title="User roles"/>
            <Separator className="my-1"/>

            <div className="flex gap-2 flex-wrap my-2">
                {
                    currentRoles.map((role, index) => (
                        <span 
                            key={index} 
                            className={
                                cn("cursor-pointer capitalize border rounded-full px-3 py-1 text-xs lg:text-sm hover:text-main-color duration-700 flex items-center gap-2", 
                                    role === "admin" ? "hover:text-destructive": ""
                                )
                            }
                            onClick={() => {
                                let newRoles = ["user"]; 

                                if (!currentRoles.includes(role)) newRoles.push(role); 
                                setCurrentRoles(newRoles)
                            }}
                        >
                            {role}
                            {role === "admin" && <X size={18}/>}
                        </span>
                    ))
                }
            </div>
            <Separator className="my-1"/>
            <FormTitle title="Select by clicking."/>
            <span 
                onClick={!currentRoles.includes("admin") ? () => setCurrentRoles([...currentRoles, "admin"]): () => {}}
                className={cn(currentRoles.includes("admin") ? "text-gray-500": "", "text-xs lg:text-sm hover:text-main-color px-3 py-1 cursor-pointer duration-700 rounded-full border")}
            >Admin</span>
            <div className="flex w-full justify-end">
                <Button>Update</Button>
            </div>
            {/* </div> */}
        </Confirm>
    )
}