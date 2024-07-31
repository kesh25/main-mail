import { StorageUserTableType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 

const StorageUserTable = ({data}: {data: StorageUserTableType[]}) => {

  return (
      <DataTable columns={columns} data={data} />
  )
}

export default StorageUserTable; 