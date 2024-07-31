import {cn} from "@/lib/utils";


const FormTitle = ({title, className}: {title: string, className?: string}) => (
    <span className={cn("block text-xs lg:text-sm my-2 font-bold", className)}>{title}</span>

);

export default FormTitle; 