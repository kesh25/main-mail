import { GroupTableType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 

const GroupTable = ({data}: {data: GroupTableType[]}) => {

    return (
        <DataTable columns={columns} data={data} />
    )
  }
  
  export default GroupTable; 