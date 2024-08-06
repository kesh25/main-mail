// group users 
"use client"; 
import React from "react"; 

import AppInput from "../common/app-input"; 
import AppLinkButton from "../common/app-link-button";
import { Button } from "../ui/button"; 
import { Heading2, Paragraph } from "@/components/ui/typography"; 
import { Separator } from "@/components/ui/separator"; 
import SheetContainer from "./container";
import GroupUsersTable from "@/components/data-tables/group-users"; 

import { GroupTableType, GroupUsersTableType } from "@/types"; 
import { numberWithCommas } from "@/utils/format-numbers"; 
import { getGroupUsers, toggleUsers } from "@/lib/api-calls/groups"; 
import { useCustomEffect } from "@/hooks"; 
import { createToast } from "@/utils/toast"; 
import { cn } from "@/lib/utils"; 
import { useGroupState } from "@/stores/groups";

const GroupUsersSheet = ({group}: {group: GroupTableType}) => {
    const [users, setUsers] = React.useState<GroupUsersTableType[]>([]); 
    const [count, setCount] = React.useState<number>(0); 
    const [search, setSearch] = React.useState<string>(""); 

    const [loading, setLoading] = React.useState<boolean>(false); 
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const [page, setPage] = React.useState<number>(0); 

    const [selected, setSelected] = React.useState<any>([]); 

    // for toggling between adding members in group and those in domain to add; 
    type TabType = "group" | "other"; 
    const [tab, setTab] = React.useState<TabType>("group"); 

    const { addToEditedGroups } = useGroupState(); 

    React.useEffect(() => setMounted(true), [])

    // fetch group users
    const fetchUsers = async () => {
        if(!mounted) return; 
        if (search.length > 0) setLoading(true); 
        let res = await getGroupUsers(group.id, tab, page, search);
        
        if (res) {
            setUsers([])
            setUsers(res.docs);
            setCount(res.count); 
        };

        setLoading(false); 
    }

    useCustomEffect(fetchUsers, [mounted, tab, search]);

     // add users to group and remove
     const handleToggleUsersInGroup = async () => {
         if (selected.length === 0) return; 
        setLoading(true); 
        let users: string[] = selected.map((user: GroupUsersTableType) => user.id); 
        let res = await toggleUsers(group.id, users); 
        if (res) {
            createToast("success", tab !== "group" ? "Users added!": "Users removed!")
            // await fetchUsers();
            addToEditedGroups({...group, users: res.count}); 
            setSelected([]); 
            setTab(tab === "group" ? "other":"group")
        }
        setLoading(false); 
     }
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
            width="w-full lg:max-w-[30vw]"
        >   
            <div className="flex flex-col gap-2 h-full mt-3">
                <Heading2 className="text-xs lg:text-lg text-center">{group.title} group users</Heading2>
                <Separator className="my-1"/>
                <Paragraph className="text-gray-500 my-2">You can manage the users of the group from here. All the users that are added here will receive all mails that are sent to the group.</Paragraph>
                <AppInput 
                    value={search}
                    setValue={setSearch}
                    placeholder="Search for user..."
                />
                <div className="flex justify-between items-end my-2">
                    <Paragraph 
                        className="text-xs lg:text-xs  flex flex-col justify-end gap-1" 

                    >
                        <span>Users in {tab === "group" ? "group": "domain"}: {numberWithCommas(count)}</span>
                        {selected.length > 0 && <span>Selected: {`${selected.length}`}</span>}
                    </Paragraph>
                    <div className="flex items-center border rounded-sm">
                        <span 
                            className={cn(
                                tab === "group" ? "bg-secondary text-main-color": "", 
                                "duration-700 block cursor-pointer px-2 py-1 text-xs"
                            )}
                            onClick={() => setTab("group")}
                        >Group</span>
                        <span 
                            className={cn(
                                tab === "other" ? "bg-secondary text-main-color": "", 
                                "duration-700 block cursor-pointer px-2 py-1 text-xs"
                            )}
                            onClick={() => setTab("other")}
                        >Others</span>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-auto">
                        <GroupUsersTable data={users} setSelected={setSelected}/>
                    </div>
                    {
                        selected.length > 0 && (
                            <Button
                                variant={tab === "other" ? "default": "destructive"}
                                size="sm"
                                disabled={loading}
                                onClick={handleToggleUsersInGroup}
                            >
                                {tab === "group" ? "Remove users": "Add users"}
                            </Button>
                        )
                    }
                </div>
            </div>

        </SheetContainer>
    )
};

export default GroupUsersSheet; 