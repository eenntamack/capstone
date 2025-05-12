import axios from 'axios'
import { useState } from 'react';

export default function Login(){
    const [username , setUsername] = useState("")
    const [password, setPassword] = useState("")
    const logUser = async (e)=>{
        e.preventDefault();

        const res = await axios.post("http://localhost:3000/authenticate/login",{
            username,
            password,
        })
        const {userExist,passwordCorrect} = res.data
        if(!res.data.userExist){
            alert("user does not exist")
        }else{
            if(res.data.passwordCorrect){
                alert("procesing login")
            }else{
                alert("password incorrect")
            }
        }
    }

    return(
        <form onSubmit={logUser} id="login" method="POST" style={{display:'flex', flexDirection:'column', borderColor:"black", borderStyle:"solid", borderWidth:"5px", margin:'10px'}}>
            <label style={{display:'flex', flexDirection:'column'}}>
                Username
                <input id="lUsername" name="lUsername" onChange={(e)=>{setUsername(e.target.value)}} value={username} required/>
            </label >
            <label style={{display:'flex', flexDirection:'column'}}>
                Password
                <input id="lPassword" type="password" name="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
            </label>
            <button type="submit" >Login</button>
        </form>
    )
}