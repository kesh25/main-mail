"use client"
import { ColumnDef } from "@tanstack/react-table"

import AppAvatar from "@/components/common/app-avatar"; 
import CellAction from "../components/cell-action";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatDateToString } from "@/utils/dates";


export type UserTableType = {
    id: string; 
    avatar: string; 
    name: string; 
    email: string; 
    phone: string; 
    role: string[];
    storage: number; 
    sent: number; 
    received: number; 
    createdAt: Date | string; 
    suspended: boolean; 
}; 

export const columns: ColumnDef<UserTableType>[] = [
    {
        accessorKey: "avatar",
        header: () => <div className="w-[10px] bg-black"/>,
        cell: ({ row }) => (
            <div className="w-[10px]">
                <AppAvatar 
                    src={row.getValue("avatar")}
                    name={row.getValue("name")}
                    dimension="w-8 h-8"
                />
            </div>
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
    {
        accessorKey: "phone",
        header: "Phone"
    },
    {
        accessorKey: "roles",
        header: "User roles",
        cell: ({ row }) => {
            let roles: string[] = row.getValue("roles"); 
            return (
                <div className="flex flex-wrap max-w-[250px]">
                    {
                        roles.map((role: string, index: number) => (
                            <span key={index} className="border px-2 rounded-sm capitalize w-fit">{role}</span>
                        ))
                    }
                </div>
        )}
    },
    {
        accessorKey: "sent",
        header: () => <span className="">Sent</span>,
        cell: ({ row }) => <span className="">{row.getValue("sent")}</span>
    },
    {
        accessorKey: "received",
        header: () => <span className="">Received</span>,
        cell: ({ row }) => <span className="">{row.getValue("received")}</span>
    },
    {
        accessorKey: "storage",
        header: () => <span className="">Storage</span>,
        cell: ({ row }) => <span className="">{row.getValue("storage")}</span>
    },
    {
        accessorKey: "createdAt",
        header: "Added",
        cell: ({ row }) => <span className="">{formatDateToString(row.getValue("createdAt"))}</span>
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
                            Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Edit Roles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            {user.suspended ? "Suspend": "Unsuspend"}
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