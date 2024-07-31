"use client"
import { ColumnDef } from "@tanstack/react-table"
import CellAction from "../components/cell-action";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { formatDateToString } from "@/utils/dates"

export type NotificationTableType = {
    id: string; 
    subject: string; 
    message: string; 
    createdAt: string; 
    status: "read" | "unread";
};

export const columns: ColumnDef<NotificationTableType>[] = [
    {
        accessorKey: "subject",
        header: () => <div className="max-w-[400px]">Subject</div>,
        cell: ({ row }) => (
            <div className="max-w-[400px] capitalize">{ row.getValue("subject") }</div>
        )
    },
    {
        accessorKey: "message",
        header: () => <div className="flex-1 min-w-[30vw] max-w-[30vw]">Message</div>,
        cell: ({ row }) => (
            <div className="flex-1 min-w-[30vw] max-w-[30vw]">{ row.getValue("message") }</div>
        )
    },
    {
        accessorKey: "createdAt",
        header: () => <div className="max-w-[250px]">Date</div>,
        cell: ({ row }) => (
            <div className="max-w-[250px] capitalize">{ formatDateToString(row.getValue("createdAt")) }</div>
        )
    },
    {
        accessorKey: "actions",
        header: () => <span />,
        cell: ({ row }) => {
            let notification = row.original; 

            return (
                <CellAction
                    id={notification.id}
                >   
                    <DropdownMenuContent align="end">
                        {
                            notification.status === "unread" && (
                                <DropdownMenuItem>
                                    Mark as read
                                </DropdownMenuItem>
                            )
                        }
                        <DropdownMenuItem>
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </CellAction>
            )
        }
    }
]