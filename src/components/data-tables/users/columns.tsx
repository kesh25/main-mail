"use client"
import { ColumnDef } from "@tanstack/react-table"

import AppAvatar from "@/components/common/app-avatar"; 
import UserCellActions from "./cell-actions";

import { formatDateToString } from "@/utils/dates";
import { UserTableType } from "@/types";

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
                <div className="flex flex-wrap max-w-[250px] gap-1">
                    {
                        roles.map((role: string, index: number) => (
                            <span key={index} className="border px-3 rounded-full capitalize w-fit text-xs">{role}</span>
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
        accessorKey: "suspended",
        header: "Suspended",
        cell: ({ row }) => <span>{row.getValue("suspended") ? "Yes": "No"}</span>
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
            let user: UserTableType = row.original; 

            return (
                <UserCellActions user={user}/>
            )
        }
    }
]