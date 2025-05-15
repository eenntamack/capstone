import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';

export default function PassUpdate(){   
    const navigate = useNavigate()
    const [newPass,setNewPass] = useState()
    const [previousPass, setPreviousPass] = useState()
    const updatePass = async (e) => {
    e.preventDefault();
    const key = localStorage.getItem("userKey");

    try {
      // Authenticate user
        const updateRes = await axios.put("http://localhost:3000/authenticate/update", {
          prevpass: previousPass,
          pass: newPass,
          key,
        });

        if (updateRes.status === 200) {
          alert("Password updated, navigating to project screen");
          navigate("/home");
        } else {
          alert("Password update failed");
        }
     
    } catch (err) {
        
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

    return(
        <form onSubmit={updatePass} style={{
            width:'400px',
            height:'500px', 
            display:'flex', 
            flexDirection:'column', 
            justifyContent:'center',
            alignItems:'center', 
            rowGap:'40px', 
            border:'black 10px solid', 
            borderRadius:'10px',
            backgroundColor:'#2F243A'}}>
            <label style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                current password
                <input type="password" name="previousPass" onChange={(e)=>{setPreviousPass(e.target.value)}}></input>
            </label>
            <label style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
                new password
                <input type="password" name="newPass" onChange={(e)=>{setNewPass(e.target.value)}}></input>
            </label>
            
            
            <button type="submit">Update Password</button>
            <Link to="/home">Workspace</Link>
        </form>
        
    )
    
}

/**TOADO */