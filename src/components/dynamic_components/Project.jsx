import Notes from "./components_to_database/Notes"
import { useLocation } from "react-router-dom"
export default function Project(props){
    const location = useLocation();
    const userKey = location.state?.userKey;
    return( 
        
        <div>
            <Notes userKey={userKey}/>
            projects worked on
        </div>
    )
}
