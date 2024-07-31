"use client";

import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../components/cell-action";
import Badge from "@/components/utils/badge";

import { formatDateToString } from "@/utils/dates";
import { numberWithCommas } from "@/utils/format-numbers";

export type DomainTableType = {
    id: string; 
    // title: string; 
    domain: string; 
    plan: "individual" | "premium" | "startup" | "custom",
    users: number;
    sent: number; 
    received: number; 
    status: "pending" | "active" | "suspended"; 
    verified: boolean; 
    createdAt: Date; 
    storage: number; 
}; 


export const columns: ColumnDef<DomainTableType>[] = [
    {
        accessorKey: "domain",
        header: "Domain",
        cell: ({ row }) => (
            <span className="text-sm block max-w-[100px]">www.{row.getValue("domain")}</span>
        )
    },
    {
        accessorKey: "plan",
        header: () => <div>Plan</div>,
        cell: ({ row }) => (
            <span className="text-xs capitalize">{row.getValue("plan") || "Basic"}</span>
        )
    },
    {
        accessorKey: "users",
        header: () => <div>Users</div>,
        cell: ({ row }) => (
            <span className="text-xs">{row.getValue("users")}</span>
        )
    },
    {
        accessorKey: "sent",
        header: () => <div>Sent</div>,
        cell: ({ row }) => (
            <span className="text-xs">{numberWithCommas(row.getValue("sent"))}</span>
        )
    },
    {
        accessorKey: "received",
        header: () => <div>Received</div>,
        cell: ({ row }) => (
            <span className="text-xs">{numberWithCommas(row.getValue("received"))}</span>
        )
    },
    {
        accessorKey: "storage",
        header: () => <div>Storage</div>,
        cell: ({ row }) => (
            <span className="text-xs">{row.getValue("storage")}</span>
        )
    },
    {
        accessorKey: "createdAt",
        header: () => <div>Added</div>,
        cell: ({ row }) => (
            <span className="text-xs">{formatDateToString(row.getValue("createdAt"))}</span>
        )
    },
    {
        accessorKey: "status",
        header: () => <div>Status</div>,
        cell: ({ row }) => (
            <Badge 
                text={row.getValue("status")}
                type={
                    row.getValue("status") === "pending" ? 
                    "secondary":
                    row.getValue("status") === "suspended" ? 
                    "danger": "primary"
                    }
            />
             
        )
    },
    {
        accessorKey: "verified",
        header: () => <div>Verified</div>,
        cell: ({ row }) => (
            <span className="uppercase text-xs">{row.getValue("verified") ? "yes": "no"}</span>
        )
    },
    {
        accessorKey: "actions",
        header: () => <span />,
        cell: ({ row }) => {
            let domain = row.original; 

            return (
                <CellAction
                    id={domain.id}
                    href={`/domains/${domain.id}?d=${domain.domain}`}
                />   
            )
        }
    }
]