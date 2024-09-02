import { PaymentTableType } from "@/types";
import { columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"; 

const PaymentTable = ({data}: {data: PaymentTableType[]}) => {

  return (
      <DataTable columns={columns} data={data} />
  )
}

export default PaymentTable; 