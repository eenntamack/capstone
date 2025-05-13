import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  PointElement,
  ArcElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(
    LineElement,
    BarElement,
    PointElement,
    ArcElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend
);
import { Line } from 'react-chartjs-2';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [len, setLen] = useState([]);
  const location = useLocation();
  const userKey = location.state?.userKey;
  
  

  

  useEffect(() => {
    
    if (userKey) {
      axios.get(`http://localhost:3000/userData?userKey=${localStorage.getItem("userKey")}`)
        .then(res => {
          console.log("API Response:", res.data);
          setUsers(res.data.data);
         
        })
        .catch(err => console.error("Failed to fetch users", err));
    }
  }, [userKey]);  // Trigger fetch if userKey changes


  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Users',
        data: Array.isArray(users) ? users.map(user => user.books.length) : [],
        fill: false,
        borderColor: 'rgb(14, 49, 49)',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  return (
    <>
      <Link to="project" state={{ userKey: userKey }}>
        <div style={{ width: '300px', height: '400px', backgroundColor: 'violet' }}>
          Create a new Project
        </div>
      </Link>

      <div>Content is stored here{JSON.stringify(users)}</div>
      <Line data={data} options={options} />

      {/* Uncomment this section if you want to display user data */}
      {/* 
      {Array.isArray(users) && users.map((u, index) => (
        <div key={index}>
          <h1>{u.username}</h1>
          <p>{u.password}</p>
          <p>{new Date(u.logHistory).toLocaleString('en-US', {
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
      */}

      <Outlet />
    </>
  );
}