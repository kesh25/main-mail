import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 
import { GroupUsersTableType } from "@/types";

const GroupUsersTable = ({data, setSelected}: {data: GroupUsersTableType[], setSelected: React.Dispatch<any>}) => {

    return (
        <DataTable columns={columns} data={data} setSelected={setSelected}/>
    )
  }
  
  export default GroupUsersTable; 