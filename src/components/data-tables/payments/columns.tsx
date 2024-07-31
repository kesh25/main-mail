"use client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../components/cell-action";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatDateToString } from "@/utils/dates"
import { numberWithCommas } from "@/utils/format-numbers";
import Badge from "@/components/utils/badge";

export type PaymentTableType = {
    id: string; 
    amount: number; 
    createdAt: string; 
    status: "pending" | "paid" | "disputed"; 
    service: "subscription" | "API" | "storage"; 
    paid: string; 
    mode: "MPESA"; 
}; 


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
        header: () => <div className="max-w-[70px]">Amount</div>,
        cell: ({ row }) => (
            <div className="max-w-[70px]">KES: {numberWithCommas(row.getValue("amount"))}</div>
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
        accessorKey: "paid",
        header: () => <div className="max-w-[70px]">Paid</div>,
        cell: ({ row }) => (
            <div className="max-w-[70px]">{row.getValue("paid") ? formatDateToString(row.getValue("paid")): "Not Yet"}</div>
        )
    },
    {
        accessorKey: "mode",
        header: "Mode",
    },
    
    {
        accessorKey: "actions",
        header: () => <span />,
        cell: ({ row }) => {
            let payment = row.original; 

            return (
                <CellAction
                    id={payment.id}
                >   
                    <DropdownMenuContent align="end">
                        {
                            payment.status === "pending" && (
                                <DropdownMenuItem>
                                    Mark payment
                                </DropdownMenuItem>
                            )
                        }
                        <DropdownMenuItem>
                            Generate Invoice
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </CellAction>
            )
        }
    }
]