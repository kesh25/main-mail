// Settings
import Protected from "../components/protected"; 
import Notifications from "./components/notifications";
import Security from "./components/security"; 

const Settings = () => {

    return (
        <Protected
            title="Settings"
        >
            <Security />
            <Notifications />
        </Protected>
    )
};

export default Settings; 

