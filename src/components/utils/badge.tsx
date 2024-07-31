// badge component 

import { cn } from "@/lib/utils";

interface BadgeProps {
    text: string; 
    type: "primary" | "secondary" | "danger" | "other"; 
}; 

const Badge: React.FC<BadgeProps> = ({text, type}) => (
    <span className={cn(type === "primary" ? "border-green-500": type === "secondary" ? "border-yellow-500": type === "danger" ? "border-danger-color": "border-gray-500", 
        "block bg-secondary border rounded-full px-3  text-xs font-bold w-fit h-fit uppercase"
    )}>
        {text}
    </span>
); 

export default Badge; 