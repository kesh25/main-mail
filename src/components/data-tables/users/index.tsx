import {  columns } from "./columns"
import { UserTableType } from "./cell-actions"; 
import { DataTable } from "@/components/ui/data-table"; 

const UserTable = ({data}: {data: UserTableType[]}) => {

    return (
        <DataTable columns={columns} data={data} />
    )
  }
  
  export default UserTable; 