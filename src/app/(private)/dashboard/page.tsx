// dashboard
import Protected from "../components/protected"; 
import ChartContainer from "./components/chart-container"; 
import DashboardCard from "./components/card"; 
import Domains from "../components/domains"; 

const Dashboard = () => {

    return (
        <Protected
            title="Dashboard"
        >
            <DashboardCard />
            <ChartContainer />
            <Domains 
                limit={5}
                search={false}
            />
        </Protected>
    )
};

export default Dashboard; 

