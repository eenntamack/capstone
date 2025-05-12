import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./Login";
import Register from "./Register";
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleLogged = (userData) => {
    console.log("Logged in user:", userData);
    setRefresh(prev => !prev); // triggers useEffect
  };
  

  useEffect(() => {
  axios.get("http://localhost:3000/user")
    .then(res => {
      console.log("API Response:", res.data);
      setUsers(res.data);
    })
    .catch(err => console.error("Failed to fetch users", err));
}, [refresh]);

  return (
    <>
      <div>Content is stored here</div>
      {/* {Array.isArray(users) && users.map((u, index) => (
        <div key={index}>
          <h1>{u.username}</h1>
          <p>{u.password}</p>
          <p>{u.logHistory.toLocaleString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })}</p>
        </div>
      ))} */}
      <Link to="project">Project</Link>
      <Outlet />
    </>
  );
}