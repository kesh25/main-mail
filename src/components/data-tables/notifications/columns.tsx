"use client"
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox"
import  NotificationCellActions from "./cell-actions"; 

import { formatDateToString } from "@/utils/dates"
import { cn } from "@/lib/utils";
import { NotificationTableType } from "@/types";

export const columns: ColumnDef<NotificationTableType>[] = [
    {
        accessorKey: "status",
        header: ({}) => <span className="-mr-[8rem]"/>,
        cell: ({ row }) => (
            <span className={cn("block w-2 h-2 rounded-sm -mr-[8rem]", row.getValue("status") === "unread" ? "bg-main-color": "bg-transparent")} />
        ),
         
    }, 
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
            let notification: NotificationTableType = row.original; 

            return (
                <NotificationCellActions notification={notification}/>
            )
        }
    }
]