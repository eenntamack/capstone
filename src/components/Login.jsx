import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [canLogin, setCanLogin] = useState(true);

    const toggleForm = () => setCanLogin(prev => !prev);

    const logUser = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3000/authenticate/login", {
                username,
                password,
            });

            const { userExist, passwordCorrect, userKey } = res.data;

            if (!userExist) {
                alert("User does not exist");
            } else if (!passwordCorrect) {
                alert("Password incorrect");
            } else {
                alert("Processing login...");
                localStorage.setItem("userKey", userKey);
                navigate("/home",{state:{userKey:userKey}});
            }
        } catch (err) {
            console.error("Login error:", err); 
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div style={{backgroundColor:'transparent'}}>
            {canLogin ? (
                <>
                    <form
                        onSubmit={logUser}
                        id="login"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '5px solid black',
                            margin: '10px',
                            height: '550px',
                            width: '400px',
                            maxHeight:'550px',
                            minHeight:'550px',
                      

                            justifyContent:'center',
                            alignItems:'center',
                            rowGap:'50px',
                            borderRadius:'20px',
                            boxShadow:'5px 5px '
                        }}
                    >
                        <label style={{ display: 'flex', flexDirection: 'column', fontSize:'30px', rowGap:'20px' }}>
                            Username
                            <input
                                id="lUsername"
                                name="lUsername"
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
                        <label style={{ display: 'flex', flexDirection: 'column', fontSize:'30px', rowGap:'20px' }}>
                            Password
                            <input
                                id="lPassword"
                                type="password"
                                name="password"
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
                            />
                        </label>
                        <button type="submit"
                            style={{
                                width:'120px', 
                                height:'30px', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center',
                                fontSize:'15px',
                                borderRadius:'3px',
                                boxShadow:'3px 3px '
                        }}>Login</button>
                    </form>
                    <button onClick={toggleForm}><div style={{
                        width:'190px', 
                        height:'50px', 
                        display:'flex', 
                        justifyContent:'center', 
                        alignItems:'center',
                        fontSize:'15px',
                        borderRadius:'10px',
                        boxShadow:'5px 5px black'
                       
                    
                    }}>Create an account</div></button>
                </>
            ) : (
                <>
            <Register onLogged={({ username, password }) => {
                setUsername(username);
                setPassword(password);
                setCanLogin(true); // Return to login form after successful registration
            }} />
                    <button onClick={toggleForm}>Back to Login</button>
                </>
            )}
        </div>
    );
}