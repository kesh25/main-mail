"use client"
import { ColumnDef } from "@tanstack/react-table";

import Badge from "@/components/utils/badge";
import PaymentCellActions from "./cell-actions";

import { formatDateToString } from "@/utils/dates"
import { numberWithCommas } from "@/utils/format-numbers";
import { PaymentTableType } from "@/types";

export const columns: ColumnDef<PaymentTableType>[] = [
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => (
            <span className="capitalize font-extrabold block max-w-[40px]">{row.getValue("service")}</span>
        )
    },
    {
        accessorKey: "amount",
        header: () => <div className="">Amount</div>,
        cell: ({ row }) => (
            <div className="">KES: {numberWithCommas(row.getValue("amount"))}</div>
        )
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="max-w-100px]">Dated</div>,
        cell: ({ row }) => (
            <div className="max-w-100px]">{formatDateToString(row.getValue("createdAt"))}</div>
        )
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            let status: any = row.getValue("status")
            return (
            <Badge 
                type={status === "pending" ? "secondary": status === "paid" ? "primary": "other"}
                text={status}
            />
        )}
    },
    {
        accessorKey: "mode",
        header: "Mode",
    },
    {
        accessorKey: "paid",
        header: () => <div className="max-w-[70px]">Paid</div>,
        cell: ({ row }) => (
            <div className="max-w-[70px]">{row.getValue("paid") ? formatDateToString(row.getValue("paid")): "Not Yet"}</div>
        )
    },
   
    
    {
        accessorKey: "actions",
        header: () => <span />,
        cell: ({ row }) => {
            let payment = row.original; 

            return (
                <PaymentCellActions 
                    payment={payment}
                />
            )
        }
    }
]