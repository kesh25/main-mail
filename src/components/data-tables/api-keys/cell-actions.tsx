"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import CellAction from "../components/cell-action";
import Confirm from "@/components/modals/confirm";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { APIKeyTableType } from "@/types";

type ModalType = "disable" | "enable" | "delete" | undefined; 
const APICellActions = ({ api_key }: { api_key: APIKeyTableType }) => {
    const [openModal, setOpenModal] = React.useState<boolean>(false); 
    const [type, setType] = React.useState<ModalType>(); 

    return (
        <>
            <APIModal 
                isOpen={openModal}
                onClose={() => {
                    setOpenModal(false)
                    setType(undefined)
                }}
                api_key={api_key}
                type={type}
            />
            <CellAction
                id={api_key.id}
            >
                <>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            setType(api_key.active ? "disable": "enable");
                            setOpenModal(true)
                        }}
                    >
                        {
                            api_key.active ? "Disable": "Enable"
                        }
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                            setType("delete");
                            setOpenModal(true)
                        }}
                    >
                        Delete
                    </DropdownMenuItem>
                </>
            </CellAction>
        </>
    )
};

export default APICellActions; 

const APIModal = (
    {api_key, isOpen, onClose, type}:
    {
        api_key: APIKeyTableType;
        isOpen: boolean; 
        onClose: () => void; 
        type: ModalType
    }
) => {

    return (
        <Confirm
            isOpen={isOpen}
            onClose={onClose}
            title={
                type === "disable" ?
                    "Disable API Key":
                type === "enable" ?
                    "Enable API Key": 
                    "Delete API Key"
            }
            description={
                type === "disable" ?
                    "Do you wish to disable the API Key? It will not be able to send any emails.": 
                type === "enable" ?
                    "Do you wish to enable the API Key? It will be be able to send emails": 
                    "Do you wish to delete the API Key? This action is irreversible."
            }
        >
            <div className="flex justify-end w-full my-2">
                <Button className="min-w-[150px]">
                    Proceed
                </Button>
            </div>
        </Confirm>
    )
}