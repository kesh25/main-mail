// user actions 
"use client";
import React from "react";
import { ChevronUp, ChevronDown, Info, X } from "lucide-react";

import AppInput from "@/components/common/app-input";
import { Button } from "@/components/ui/button";
import CellAction from "../components/cell-action";
import Confirm from "@/components/modals/confirm";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import FormTitle from "@/components/forms/components/form-title";
import { Paragraph } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { UserTableType } from "@/types";
import { resetPassword, deleteUser, updateUser } from "@/lib/api-calls/user";
import { createToast } from "@/utils/toast";
import {userState } from "@/stores/user";
import {useSearch } from "@/hooks";
import { validateEmail } from "@/utils/validation";


const UserCellActions = ({ user }: { user: UserTableType }) => {
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
                user={user}
            />
            <RolesModal
                isOpen={openRolesModal}
                onClose={() => setOpenRolesModal(false)}
                user={user}
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
                        Reset password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            // setType("role");
                            setOpenRolesModal(true)
                        }}
                        className="cursor-pointer"
                    >
                        Edit user
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => {
                            setType(user.suspended ? "unsuspend" : "suspend");
                            setOpenSuspendModal(true)
                        }}
                        className="cursor-pointer"
                    >
                        {user.suspended ? "Unsuspend" : "Suspend"}
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
    user: UserTableType;
}


const ConfirmUserModal: React.FC<ConfirmProps> = ({
    isOpen, onClose, type, user
}) => {
    let title = type === "reset" ?
        "Reset password" :
        type === "suspend" ?
            "Supend user" :
            type === "unsuspend" ?
                "Unsuspend user" :
                "Delete user";

    let description = type === "reset" ?
        `Do you wish to reset the password for ${user.name}. The new password will be sent to their phone number!` :
        type === "suspend" ?
            `Do you wish to suspend ${user.name}. The user will not be able to send any mail` :
            type === "unsuspend" ?
                `The user ${user.name} will be unsuspended. They can resume sending emails!` :
                `Do you wish to delete the user ${user.name}. All records, including emails and files will be deleted completely.`

    const [loading, setLoading] = React.useState<boolean>(false);

    const { addToDeletedUsers, addToEditedUsers } = userState();

    const handleResetPassword = async () => {
        setLoading(true);

        let res = await resetPassword(user.id);

        if (res) {
            createToast("success", "Passowrd reset!");
            onClose();
        };

        setLoading(false)
    }
    const handleDelete = async () => {
        setLoading(true);

        let res = await deleteUser(user.id);

        if (res) {
            createToast("success", "User deleted!");
            addToDeletedUsers(user.id); 
            onClose() 
        };

        setLoading(false);
    };

    const handleSuspend = async () => {
        let data = {
            suspended: !user.suspended
        }; 
        await handleUpdate(
            setLoading,
            user, 
            data, 
            addToEditedUsers,
            onClose
        )
    }
    return (
        <Confirm
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            description={description}
        >
            <div className="w-full flex justify-end">
                <Button
                    variant={type === "suspend" || type === "delete" ? "destructive" : "default"}
                    className="min-w-[150px]"
                    onClick={
                        type === "reset" ? 
                            handleResetPassword: 
                        type === "delete" ? 
                            handleDelete:
                            handleSuspend
                    }
                    disabled={loading}
                >
                    Proceed
                </Button>
            </div>
        </Confirm>
    )
}

const handleUpdate = async (
    setLoading: React.Dispatch<boolean>,
    user: UserTableType,
    data: any, 
    addToEditedUsers: (user: UserTableType) => void, 
    onClose: () => void
) => {

    setLoading(true); 

    let res = await updateUser(user.id, data); 

    if (res) {
        createToast("success", "User has been updated!"); 
        addToEditedUsers({...user, ...data}); 
        onClose(); 
    };
    setLoading(false)
}; 

// edit roles 
interface RolesModalProps extends ModalCommonProps {
    user: UserTableType;
    roles: string[];
}
const RolesModal: React.FC<RolesModalProps> = ({
    isOpen, onClose, user, roles
}) => {
    const [loading, setLoading] = React.useState<boolean>(false); 
    const [currentRoles, setCurrentRoles] = React.useState<string[]>([...roles]);
    const [name, setName] = React.useState<string>(user.name);
    const [email, setEmail] = React.useState<string>(user.email);
    const [phone, setPhone] = React.useState<string>(user.phone);

    const [showRoleDescription, setShowRoleDescription] = React.useState<boolean>(false); 

    const { addToEditedUsers } = userState(); 
    const searchParams = useSearch(); 
    const d = searchParams?.get("d"); 

    const handleValidation = async () => {
        if (
            name === user.name &&
            email === user.email &&
            phone === user.phone &&
            currentRoles.length === user.roles.length
        ) {
            createToast("error", "Nothing to update!");
            return; 
        }
        if (email !== user.email) {
            if (!validateEmail(email)) {
                createToast("error", "Invalid email");
                return
            }

            let domain: any = email.split("@").pop(); 

            if (domain.toLowerCase() !== d?.toLowerCase()) {
                createToast("error", "Email does not match domain!");
                return; 
            }
        }

        if (phone !== user.phone) {
            if (!validatePhone) {
                createToast("error", "Invalid phone number!"); 
                return; 
            }
        }
        let data: any = {}; 

        if (name !== user.name) data.name = name; 
        if (email !== user.email) data.email = email.toLowerCase(); 
        if (phone !== user.phone) data.phone = phone; 
        if (currentRoles.length !== user.roles.length) data.roles = currentRoles; 

        await handleUpdate(
            setLoading,
            user, 
            data, 
            addToEditedUsers,
            onClose
        )
    }

    return (
        <Confirm
            title={"Edit User"}
            description={`Edit the user ${user.name} details.`}
            isOpen={isOpen}
            onClose={onClose}
        >
            {/* <div> */}
            <EditInput 
                value={email}
                setValue={setEmail}
                title="Email"
            />
            <EditInput 
                value={name}
                setValue={setName}
                title="Name"
            />
            <EditInput 
                value={phone}
                setValue={setPhone}
                title="Phone"
            />
            <div className="flex items-center justify-between my-2">
                <FormTitle title="Roles description" />
                <Button
                    className="gap-2 items-center"
                    onClick={() => setShowRoleDescription(!showRoleDescription)}
                    size="sm"
                    variant="secondary"
                >
                    <Info size={18}/>
                    <span>{!showRoleDescription ? "Show": "Hide"} info</span>
                    {
                        showRoleDescription ? <ChevronUp size={18}/>: <ChevronDown size={18}/>
                    }
                </Button>
            </div>
            {
                showRoleDescription && (
                    <>
                        <Paragraph className="text-xs lg:text-sm">
                            <span className="font-bold">User: </span>
                            The basic role within the system. Anyone wanting to receive and send emails must have the user role
                        </Paragraph>
                        <Paragraph className="text-xs lg:text-sm">
                            <span className="font-bold">Admin: </span>
                            The user is able to login to the control panel, manage the domain and the user.
                        </Paragraph>
                    </>
                )
            }
            <Separator className="my-1 mt-2" />
            <FormTitle title="User roles" />
            <Separator className="my-1" />

            <div className="flex gap-2 flex-wrap my-2">
                {
                    currentRoles.map((role, index) => (
                        <span
                            key={index}
                            className={
                                cn("cursor-pointer capitalize border rounded-full px-3 py-1 text-xs lg:text-sm hover:text-main-color duration-700 flex items-center gap-2",
                                    role === "admin" ? "hover:text-destructive" : ""
                                )
                            }
                            onClick={() => {
                                let newRoles = ["user"];

                                if (!currentRoles.includes(role)) newRoles.push(role);
                                setCurrentRoles(newRoles)
                            }}
                        >
                            {role}
                            {role === "admin" && <X size={18} />}
                        </span>
                    ))
                }
            </div>
            <Separator className="my-1" />
            <FormTitle title="Select by clicking." />
            <span
                onClick={!currentRoles.includes("admin") ? () => setCurrentRoles([...currentRoles, "admin"]) : () => { }}
                className={cn(currentRoles.includes("admin") ? "text-gray-500" : "", "text-xs lg:text-sm hover:text-main-color px-3 py-1 cursor-pointer duration-700 rounded-full border")}
            >Admin</span>
            <div className="flex w-full justify-end">
                <Button
                    className="min-w-[150px]"
                    onClick={handleValidation}
                    disabled={loading}
                >
                    Update
                </Button>
            </div>
            {/* </div> */}
        </Confirm>
    )
};

const EditInput = (
    {value, setValue, title}:
    {value: string, setValue: React.Dispatch<string>, title: string}
) => {

    return (
        <>
            <FormTitle title={title} />
            <AppInput 
                value={value}
                setValue={setValue}
            />
        </>
    )
}
