import Notes from "./components_to_database/Notes"
import { useLocation } from "react-router-dom"
export default function Project(props){
    const location = useLocation();
    const userKey = location.state?.userKey || localStorage.getItem("userKey");
    return( 
        
        <div style={{position:'relative'}}>
            <Notes userKey={userKey}/>
        </div>
    )
}
