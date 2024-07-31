"use client";

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../components/cell-action";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { formatDateToString } from "@/utils/dates";
import { numberWithCommas } from "@/utils/format-numbers";
import { Users } from "lucide-react";
import Badge from "@/components/utils/badge";


export type GroupTableType = {
    id: string; 
    title: string; 
    email: string; 
    autoReply: boolean; 
    users: number; 
    createdAt: string; 
}; 

export const columns: ColumnDef<GroupTableType>[] = [
    {
        accessorKey: "title",
        header: "Title"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "users",
        header: () => <div className="flex gap-2 items-center"><Users size={18}/> <span className="">Users</span></div>,
        cell: ({ row }) => (
            <div>{numberWithCommas(row.getValue("users"))}</div>
        )
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="flex gap-2 items-center">Created</div>,
        cell: ({ row }) => (
            <div>{formatDateToString(row.getValue("createdAt"))}</div>
        )
    },
    {
        accessorKey: "autoReply",
        header: () => <div className="flex gap-2 items-center">AutoReply</div>,
        cell: ({ row }) => (
            <Badge 
                type={row.getValue("autoReply") ? "primary": "other"}
                text={row.getValue("autoReply") ? "Yes": "No"}
            />
        )
    },
    {
        accessorKey: "actions", 
        header: () => <span />,
        cell: ({ row }) => {
            let user = row.original; 

            return (
                <CellAction
                    id={user.id}
                >
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            Edit Group
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Manage Users
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Close Group
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </CellAction>
            )
        }
    }
]