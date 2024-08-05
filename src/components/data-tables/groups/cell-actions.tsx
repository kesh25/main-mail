"use client"; 
import React from "react"; 

import CellAction from "../components/cell-action";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Confirm from "@/components/modals/confirm";

import GroupUsersSheet from "@/components/sheets/group-users";
import { GroupTableType } from "@/types";

const CellActionsGroup = ({group}: {group: GroupTableType}) => {
    const [openEditModal, setOpenEditModal] = React.useState<boolean>(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState<boolean>(false);
    return (
        <>
            <Confirm
                isOpen={openEditModal || openDeleteModal}
                onClose={() => {
                    setOpenEditModal(false);
                    setOpenDeleteModal(false); 
                }}
                title={openDeleteModal ? "Delete Group": "Edit Group"}
                description={openDeleteModal ? "Do you wish to delete the group. It will not be able to receive emails anymore.": ""}
            >
                {/* // handle form inputs for edit group */}
                <div className={"flex justify-end"}>
                    <Button>Proceed</Button>
                </div>
            </Confirm>

            <CellAction
                id={group.id}
            >
                <>
                    <DropdownMenuItem
                        onClick={() => setOpenEditModal(true)}
                        className="cursor-pointer"
                    >
                        Edit Group
                    </DropdownMenuItem>
                    <Separator />
                    <DropdownMenuItem 
                        className="hover:text-destructive cursor-pointer"
                        onClick={() => setOpenDeleteModal(true)}
                    >
                        Close Group
                    </DropdownMenuItem>
                </>
            </CellAction>
        </>
    )
}; 

export default CellActionsGroup; 


export const ManageUsers = ({groupId}: {groupId: string}) => (
    <GroupUsersSheet group={groupId}/>
)