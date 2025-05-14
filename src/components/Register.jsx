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
            const res = await axios.post("http://localhost:3000/authenticate/register", {
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
                boxShadow:'5px 5px '
            }}
        >
            <label style={{ display: 'flex', flexDirection: 'column' }}>
                Username:
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', marginTop: '10px' }}>
                Confirm Password:
                <input
                    type="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                    required
                />
            </label>

            <button type="submit" style={{ marginTop: '15px' }}>Register</button>
        </form>
    );
}