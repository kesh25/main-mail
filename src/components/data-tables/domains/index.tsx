import { DomainTableType } from "@/types";
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 

 

const DomainTable = ({data}: {data: DomainTableType[]}) => {

  return (
      <DataTable columns={columns} data={data} />
  )
}

export default DomainTable; 