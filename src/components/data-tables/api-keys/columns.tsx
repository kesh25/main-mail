"use client";
import { Copy } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import {CopyToClipboard} from 'react-copy-to-clipboard';

import APICellActions from "./cell-actions"; 
import AppLinkButton from "@/components/common/app-link-button";
import Badge from "@/components/utils/badge";
import ShowAPI from "./show-api";

// import { numberWithCommas } from "@/utils/format-numbers";
import { formatDateToString } from "@/utils/dates";
import { APIKeyTableType } from "@/types"; 
import { createToast } from "@/utils/toast"; 

export const columns: ColumnDef<APIKeyTableType>[] = [
    {
        accessorKey: "app_id",
        header: () => <span className="">App ID</span>,
        cell: ({ row }) => (
            <span className="flex items-center gap-4 text-xs">
                {row.getValue("app_id")}
                <CopyToClipboard 
                    text={row.getValue("app_id")}
                    onCopy={() => {
                        createToast("success", "Copied App ID to clipboard")
                    }}
                >
                    <AppLinkButton
                        size={"sm"}
                        type="secondary"
                    >
                        <Copy size={18}/>
                    </AppLinkButton>
                </CopyToClipboard>
            </span>
        )
    },
    {
        accessorKey: "key",
        header: "App Key",
        cell: ({ row }) => (
            <ShowAPI 
                api_key={row.original}
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
                <APICellActions 
                    api_key={key}
                />
            )
        }
    }
]