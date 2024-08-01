"use client";

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../components/cell-action";
import Badge from "@/components/utils/badge";

// import { numberWithCommas } from "@/utils/format-numbers";
import AppLinkButton from "@/components/common/app-link-button";
import { Copy } from "lucide-react";
import ShowAPI from "./show-api";
import { formatDateToString } from "@/utils/dates";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";


export type APIKeyTableType = {
    id: string; 
    app_id: string; 
    key: string; 
    active: boolean; 
    createdAt: Date;
    lastUsed: Date; 
}; 

export const columns: ColumnDef<APIKeyTableType>[] = [
    {
        accessorKey: "app_id",
        header: () => <span className="">App ID</span>,
        cell: ({ row }) => (
            <span className="flex items-center gap-4 text-xs">
                {row.getValue("app_id")}
                <AppLinkButton
                    size={"sm"}
                    type="secondary"
                >
                    <Copy size={18}/>
                </AppLinkButton>
            </span>
        )
    },
    {
        accessorKey: "key",
        header: "App Key",
        cell: ({ row }) => (
            <ShowAPI 
                api_key={row.getValue("key")}
                appId={row.getValue("app_id")}
            />
        )
    },
    {
        accessorKey: "active",
        header: "Active", 
        cell: ({ row }) => (
            <Badge 
                type={row.getValue("active") ? "primary": "other"}
                text={row.getValue("active") ? "Yes": "No"}
            />
        )
    },
    {
        accessorKey: "createdAt",
        header: () => <span>Created</span>,
        cell: ({ row }) => (
            <span className="text-xs">{formatDateToString(row.getValue("createdAt"))}</span>
        )
    },
    {
        accessorKey: "lastUsed",
        header: () => <span>Last used</span>,
        cell: ({ row }) => (
            <span className="text-xs">{formatDateToString(row.getValue("lastUsed") || row.getValue("createdAt"))}</span>
        )
    },
    {
        accessorKey: "actions",
        header: () => <span />,
        cell: ({ row }) => {
            let key = row.original; 

            return (
                <CellAction
                    id={key.id}
                >
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            Disable
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </CellAction>  
            )
        }
    }
]