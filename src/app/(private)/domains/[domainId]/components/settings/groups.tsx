// domain groups
import React from "react";
import { Plus, X } from "lucide-react";

import AppInput from "@/components/common/app-input";
 
import { GroupTableType } from "@/components/data-tables/groups/columns";
import { Button } from "@/components/ui/button";
import { Paragraph } from "@/components/ui/typography";
import GroupTable from "@/components/data-tables/groups"; 
import AddGroupModal from "@/components/modals/add-group";
import GroupSearch from "./group-search"; 

import Info from "./message"; 
import SettingsContainer from "./settings-container"; 

import { useCustomEffect, useSearch } from "@/hooks";
import { getGroups } from "@/lib/api-calls/groups";

interface GroupsProps {
    domain: string; 
};


const Groups: React.FC<GroupsProps> = ({domain}) => {
    const [mounted, setMounted] = React.useState<boolean>(false); 

    const [groups, setGroups] = React.useState<GroupTableType[]>([]);
    const [count, setCount] = React.useState<number>(0); 

    const [search, setSearch] = React.useState<string>(""); 
    const [loading, setLoading] = React.useState<boolean>(true);
    
    const [openAddModal, setOpenAddModal] = React.useState<boolean>(false); 
    const [showGroup, setShowGroup] = React.useState<boolean>(false); 

    const searchParams = useSearch(); 
    const page = searchParams?.get("page") || ""; 
    const d = searchParams?.get("d"); 
    const q = searchParams?.get("q") || ""; 

    React.useEffect(() => setMounted(true), [])
    

    const fetchGroups = async () => {
        if (!mounted) return; 
        setLoading(true); 

        let res = await getGroups(domain, page, q);
        
        if (res) {
            setGroups(res.docs);
            setCount(res.count); 
        };

        setLoading(false); 
    }; 

    useCustomEffect(fetchGroups, [mounted, page, q]);

   

    return (
        <SettingsContainer
            title="Groups"
            subtitle={`Total: ${loading ? "...": count + " group" + (count === 1 ? "": "s")}`}
            headerComponent={
                <div className="flex gap-2">
                        <GroupSearch />
                        <Button 
                            className=" rounded-full" size="sm"
                            onClick={() => setOpenAddModal(true)}

                        >
                            <Plus size={18}/> 
                        </Button>
                </div>
            }
        >
           
                <AddGroupModal 
                    isOpen={openAddModal}
                    onClose={() => setOpenAddModal(false)}
                    setGroups={setGroups}
                    groups={groups}
                    domain={domain}
                />
                <Info
                    localStorageString="show_group"
                >
                    <Paragraph>
                        Consider groups as an email that represents a certain department or group of individuals. A good example is the accounts department or sales department. 
                        You can add any number of users to the group and each email sent to the group email will go to each one users in the group. 
                        <span className="font-extrabold"> NB: </span>Additionally, we also create a default unknown@{d} group that receives emails from unassigned emails or users. Make sure you add at least one user to the group to 
                        view those emails. 
                    </Paragraph>
                </Info>
                
                <GroupTable data={groups}/>
        </SettingsContainer>
    )
};

export default Groups; 