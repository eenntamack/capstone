import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/user")
      .then(res => {
        console.log("API Response:", res.data); // Debug this
        setUsers(res.data);
      })
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  return (
    <>
      <div>Content is stored here</div>
      {Array.isArray(users) && users.map((u, index) => (
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
      ))}
      <Link to="project">Project</Link>
      <Outlet />
    </>
  );
}