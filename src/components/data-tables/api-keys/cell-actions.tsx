"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import CellAction from "../components/cell-action";
import Confirm from "@/components/modals/confirm";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { APIKeyTableType } from "@/types";
import { toggleActive, deletingApiKey } from "@/lib/api-calls/keys";
import { createToast } from "@/utils/toast";
import { useApiKeyState } from "@/stores/api-keys";

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
    const [loading, setLoading] = React.useState<boolean>(false); 
    const {editApiKey, deleteApiKey} = useApiKeyState();

    const handleToggleActive = async () => {
        setLoading(true); 
        let res = await toggleActive(api_key.id, {active: !api_key.active});

        if (res) {
            createToast("success", "API Key updated!");
            editApiKey({...api_key, active: !api_key.active});
            onClose() 
        };

        setLoading(false);
    }

    const handleDelete = async () => {
        setLoading(true); 
        let res = await deletingApiKey(api_key.id); 

        if (res) {
            createToast("success", "API Key was deleted!");
            deleteApiKey(api_key);
            onClose(); 
        };

        setLoading(false); 
    }
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
                <Button 
                    className="min-w-[150px]"
                    variant={
                        type === "enable" ? 
                            "default": "destructive"
                    }   
                    disabled={loading}
                    onClick={type === "delete" ? handleDelete: handleToggleActive}
                >
                    Proceed
                </Button>
            </div>
        </Confirm>
    )
}