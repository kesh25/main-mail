"use client"; 

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../components/cell-action";

import { formatBytes } from "@/utils/size"; 

export type StorageUserTableType = {
    id: string; 
    name: string; 
    email: string; 
    storage: number; 
}; 

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