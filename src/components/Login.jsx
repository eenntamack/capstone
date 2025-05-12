import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Register from './Register';

export default function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userkey, setUserkey] = useState('');
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
                setUserkey(userKey);
                navigate("/home",{state:{userKey}});
            }
        } catch (err) {
            console.error("Login error:", err);
            alert("Something went wrong. Please try again.");
        }
    };

    return (
        <div>
            {canLogin ? (
                <>
                    <form
                        onSubmit={logUser}
                        id="login"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            border: '5px solid black',
                            margin: '10px'
                        }}
                    >
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                            Username
                            <input
                                id="lUsername"
                                name="lUsername"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </label>
                        <label style={{ display: 'flex', flexDirection: 'column' }}>
                            Password
                            <input
                                id="lPassword"
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                    <button onClick={toggleForm}>Create an account</button>
                </>
            ) : (
                <>
                    <Register />
                    <button onClick={toggleForm}>Back to Login</button>
                </>
            )}
        </div>
    );
}