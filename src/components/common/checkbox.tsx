// checkbox component 
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils";


interface AppCheckboxProps {
    checked: boolean; 
    setChecked?: React.Dispatch<boolean>;
    text: string;  
    onClick?: () => void; 
    className?: string; 
}; 

const AppCheckbox: React.FC<AppCheckboxProps> = ({checked, setChecked, text, onClick, className}) => {

    return (
        <span className={cn("cursor-pointer flex items-center gap-2 hover:text-prim-color", className)} onClick={onClick ? onClick: setChecked ? () => setChecked(!checked): () => {}}>
            <Checkbox
                checked={checked}
                onCheckedChange={onClick? () => {}: setChecked}
            />
            <span className="text-xs lg:text-sm">{text}</span>
        </span>
    )
}; 

export default AppCheckbox; 