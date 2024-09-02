import { columns } from "./columns";
import { APIKeyTableType } from "@/types"; 
import { DataTable } from "@/components/ui/data-table"; 

const APITable = ({data}: {data: APIKeyTableType[]}) => {

  return (
      <DataTable columns={columns} data={data} />
  )
}

export default APITable; 