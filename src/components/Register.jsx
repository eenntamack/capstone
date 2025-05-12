import { useState } from "react";
import axios from 'axios';

export default function Register(){
    const [ username, setUsername ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ confirmPass, setConfirmPass ] = useState("")

    const registration = async (e) =>{
        e.preventDefault();
        if(password === confirmPass){
            const res = await axios.post("http://localhost:3000/authenticate/register",{
            username,
            password
            })
            const {message} = res.data
            if(res.data.message){
                alert(res.data.message);
            }else{
                alert("Error registering")
            }
        }else{
            alert("please match your password and reconfirm with the same matching password")
        }
        
        
    }
    return(
        <form onSubmit={registration} action="" method="POST" style={{display:'flex', flexDirection:'column', borderColor:"black", borderStyle:"solid", borderWidth:"5px"}}>
            <label style={{display:'flex', flexDirection:'column'}}>
                Username:
                <input name="username" onChange={(e)=>{setUsername(e.target.value)}} required/>
            </label>
            <br/>
            <label style={{display:'flex', flexDirection:'column'}}>
                Password:
                <input type="password" required onChange={(e)=>{setPassword(e.target.value)}} />
            </label>
            <br/>
            <label style={{display:'flex', flexDirection:'column'}}>
                Confirm Password:
                <input type="password" onChange={(e)=>{setConfirmPass(e.target.value)}} required/>
            </label>
            <br/>
            <button type="submit">Register</button>
        </form>
    )
}