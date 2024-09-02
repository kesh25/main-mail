"use client"
import React from "react"; 

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[], 
  setSelected?: React.Dispatch<any>
}

export function DataTable<TData, TValue>({
  columns,
  data,
  setSelected
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  
  const table = useReactTable(
    {
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        rowSelection
      }
    }
  )

  React.useEffect(() => {
    if (!setSelected) return; 
    let selectedRows: any = table.getFilteredSelectedRowModel().rows; 

    if (selectedRows.length > 0) {
      selectedRows = selectedRows.map((row: any) => (
        row.original
      ));

      setSelected(selectedRows); 
    } else setSelected([])
  }, [table.getFilteredSelectedRowModel().rows.length]); 

  return (
    <div className="">
      <Table className="p-0 border-l border-r border-b">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="border-t border-b">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-[10vh] text-center">
                No data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
