import { NotificationTableType, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 

const NotificationTable = ({data}: {data: NotificationTableType[]}) => {

  return (
      <DataTable columns={columns} data={data} />
  )
}

export default NotificationTable; 