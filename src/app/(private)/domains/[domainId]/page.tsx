// Domain
import Protected from "../../components/protected"; 
import Navs from "./components/tabs"; 
import ChartContainer from "./components/graph"; 
import Users from "./components/users"; 
import Info from "./components/info"; 

import UsersContainer from "./components/user-container";
import PaymentContainer from "./components/payment";
import SettingsContainer from "./components/settings"; 

const Domain = ({params, searchParams}: {params: {domainId: string}, searchParams: {d: string, tab: string}}) => {

    return (
        <Protected
            title={searchParams.d}
            backPage={true}
        >   
            <Navs tab={searchParams.tab || "home"}/>
            <Info domainId={params.domainId}/>
            <ChartContainer />
            <Users domainId={params.domainId}/>
            <>
                {searchParams.tab === "users" && params.domainId && <UsersContainer domain={params.domainId}/>}
                {searchParams.tab === "payment" && params.domainId && <PaymentContainer domain={params.domainId}/>}
                {searchParams.tab === "settings" && params.domainId && <SettingsContainer domain={params.domainId}/>}
            </>
        </Protected>
    )
};

export default Domain; 

