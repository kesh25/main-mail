// group users 
import AppLinkButton from "../common/app-link-button";

import SheetContainer from "./container";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

const GroupUsersSheet = ({group}: {group: string}) => {


    return (
        <SheetContainer
            trigger={
                <AppLinkButton
                    size="sm"
                    type="outline"
                    className="text-xs lg:text-xs gap-2 items-center rounded-lg"
                >
                    Manage Users
                </AppLinkButton>
            }
        >
                users
        </SheetContainer>
    )
};

export default GroupUsersSheet; 