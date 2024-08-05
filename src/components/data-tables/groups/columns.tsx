"use client";
import { Users } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table"

import Badge from "@/components/utils/badge";
import CellActionsGroup, { ManageUsers } from "./cell-actions";

import { numberWithCommas } from "@/utils/format-numbers";
import { formatDateToString } from "@/utils/dates";
import { GroupTableType } from "@/types";

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
        accessorKey: "id",
        header: '', 
        cell: ({ row }) => (
            <ManageUsers groupId={row.getValue("id")}/>
        )
    },
    {
        accessorKey: "actions", 
        header: () => <span />,
        cell: ({ row }) => {
            let group: GroupTableType = row.original; 

            return (
                <CellActionsGroup 
                    group={group}
                />
            )
        }
    }
]