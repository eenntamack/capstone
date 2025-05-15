import { useState, useEffect } from "react";
import axios from 'axios';

export default function Register({onLogged}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    const registration = async (e) => {
        e.preventDefault();
        if (password !== confirmPass) {
            return alert("Passwords do not match");
        }

        try {
            const res = await axios.post("https://capstone-controllers.onrender.com/authenticate/register", {
                username: username.trim(),
                password: password.trim()
            });

            const { message } = res.data;
            alert(message || "Registration successful");

            onLogged({ username, password });
            // Clear form
            setUsername("");
            setPassword("");
            setConfirmPass("");

        } catch (err) {
            console.error(err);
            alert("Registration failed. Please try again.");
        }
    };

    return (
        <form
            onSubmit={registration}
            
            method="POST"
            style={{
                display: 'flex',
                flexDirection: 'column',
                border: '5px solid black',
                padding: '10px',
                maxWidth: '400px',
                margin: '10px auto',
                height: '550px',
                width: '400px',
                maxHeight:'550px',
                minHeight:'550px',
                justifyContent:'center',
                alignItems:'center',
                rowGap:'50px',
                borderRadius:'20px',
                boxShadow:'5px 5px ',
                backgroundColor:'#2F243A'
            }}
        >
            <label style={{ display: 'flex', flexDirection: 'column',fontSize:'30px', rowGap:'20px', justifyContent:'center', alignItems:'center', color:"#BEBBBB" }}>
                Username:
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{
                                    width:'180px',
                                    height:'30px',
                                    fontSize:'20px',
                                    backgroundColor:'#2F243A',
                                    color:'white'
                                }}
                    required
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column',fontSize:'30px', rowGap:'20px',justifyContent:'center', alignItems:'center', color:"#BEBBBB" }}>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                                    width:'180px',
                                    height:'30px',
                                    fontSize:'20px',
                                    backgroundColor:'#2F243A',
                                    color:'white'
                                }}
                    required
                    minLength={5}
                    autoComplete="new-password"
                    
                    
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', fontSize:'30px', rowGap:'20px', justifyContent:'center', alignItems:'center', color:"#BEBBBB" }}>
                Confirm Password:
                <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    style={{
                                    width:'180px',
                                    height:'30px',
                                    fontSize:'20px',
                                    backgroundColor:'#2F243A',
                                    color:'white'
                                }}
                    required
                    minLength={5}
                    autoComplete="new-password"
                    
                />
            </label>

            <button type="submit" style={{
                                width:'120px', 
                                height:'30px', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center',
                                fontSize:'15px',
                                borderRadius:'3px',
                            
                        }}>Register</button>
        </form>
    );
}