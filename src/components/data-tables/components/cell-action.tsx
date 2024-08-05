// cell actions 
"use client"; 
import {useRouter} from "next/navigation"; 
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuLabel, 
  DropdownMenuTrigger,
  DropdownMenuContent, DropdownMenuItem
} from "@/components/ui/dropdown-menu"; 



const CellAction = ({id, children, href}: {id: string, children?: React.ReactNode, href?: string}) => {
    const {push} = useRouter();

    return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            {
              href && (
                <DropdownMenuItem onClick={() => push(href)} className="cursor-pointer hover:text-main-color">
                    View
                </DropdownMenuItem>
              )
            }
            {children && children}
          </DropdownMenuContent>
        </DropdownMenu>
    )
};

export default CellAction; 
        // <DropdownMenuContent align="end">
        //   <DropdownMenuLabel>Actions</DropdownMenuLabel>
        //   <DropdownMenuItem
        //     onClick={() => navigator.clipboard.writeText(payment.id)}
        //   >
        //     Copy payment ID
        //   </DropdownMenuItem>
        //   <DropdownMenuSeparator />
        //   <DropdownMenuItem>View customer</DropdownMenuItem>
        //   <DropdownMenuItem>View payment details</DropdownMenuItem>
        // </DropdownMenuContent>