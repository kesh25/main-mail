"use client"; 

import { ColumnDef } from "@tanstack/react-table"

import { formatBytes } from "@/utils/size"; 
import { StorageUserTableType } from "@/types";

export const columns: ColumnDef<StorageUserTableType>[] = [
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    {
        accessorKey: "storage", 
        header: "Storage",
        cell: ({ row }) => (
            <span>{formatBytes(row.getValue("storage"))}</span>
        )
    }
]