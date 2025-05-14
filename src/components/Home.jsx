import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import Quotes from "./dynamic_components/Quotes";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import PassUpdate from "./dynamic_components/PassUpdate";
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
  const homePage = useRef();
  const [showHome, setShowHome] = useState(true);
  const navigate = useNavigate()



  const userKey = localStorage.getItem("userKey");


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
    labels: Array.isArray(users) ? users.map((user,index) => index) : [],
    datasets: [
      {
        label: 'Notes',
        data: Array.isArray(users) ? users.map(user => user.books.length) : [],
        fill: false,
        borderColor: 'rgb(14, 49, 49)',
        tension: 0.2,
        color:'black'
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels:{
          color:'black'
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'black' // X-axis label color
        },
        grid: {
          color: 'black' // X-axis grid line color
        },
        title:{
          text: 'Iterations',
          display:true,
          color:'black',
          font:{




            size:'20px',
            weight:'bold'
          }
        }

      },
      y: {
        ticks: {
          color: 'black' // Y-axis label color
        },
        grid: {
          color: 'black' // Y-axis grid line color
        }
      }
    }
  };

  const removeAccount = ()=>{
    axios.delete("http://localhost:3000/authenticate/login",{
      data:{
        userKey:userKey
      }
    }).then(res=>{
      if(res){
        alert("deletion successful, redirecting home")
        navigate("/")
      }else{
        alert("deletion failed")
      }
    }).catch(e=>{
        console.error("error processing deletion")
        alert("error processing deletion")
    })
  }


  const updatePassword = ()=>{
    navigate("/update")
  }


  return (
<div style={{
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start', 
  alignItems: 'center',
  position: 'relative',
  minHeight: '100%',            
  padding: '20px',              
  boxSizing: 'border-box',
  rowGap:'30px'        
}}>      <div>
            <button onClick={removeAccount} >Delete Account</button>
            <button onClick={updatePassword} >updatePassword</button>
          </div>
      <div style={{backgroundColor:'yellow'}}>
        <Quotes/>
      </div>
      <div style={{backgroundColor:'green'}}>
        <Link to="project" state={{ userKey: userKey }}>
          <div style={{ width: '100px', height: '100px', backgroundColor: 'violet' }}>
          Create a new Project
          </div>
        </Link> 
      </div>
   

      {/* <div>Content is stored here{JSON.stringify(users)}</div> */}
      <div style={{ backgroundColor:'blue', display:'flex', justifyContent:'center', alignItems:'center', width:'800px'}} >
        <Line data={data} options={options} />
      </div>

      {/* Unused date data , will implement in the future */}
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
    </div>
  );
}