import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 
import {NotificationTableType} from "@/types"; 

const NotificationTable = (
  {data, setSelected}: 
  {
    data: NotificationTableType[];
    setSelected: React.Dispatch<any>; 
  }) => {

  return (
      <DataTable 
        columns={columns} 
        data={data} 
        setSelected={setSelected}
      />
  )
}

export default NotificationTable; 