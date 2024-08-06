"use client"; 

import { ColumnDef } from "@tanstack/react-table";

import AppAvatar from "@/components/common/app-avatar"; 
import { Checkbox } from "@/components/ui/checkbox"

import { GroupUsersTableType } from "@/types";

export const columns: ColumnDef<GroupUsersTableType>[] = [
    {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "avatar",
        header: () => <span className="block w-7 -mr-[3rem]"/>,
        cell: ({ row }) => (
            <span className="block w-7 -mr-[3rem]">
                <AppAvatar src={row.getValue("avatar")} name={row.getValue("name")}/>
            </span>
        )
    },
    {
        accessorKey: "name",
        header: "Name"
    },
    {
        accessorKey: "email",
        header: "Email"
    },
    
]