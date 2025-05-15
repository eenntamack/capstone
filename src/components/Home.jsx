import { Link, Outlet, useLocation,useNavigate } from "react-router-dom";
import Quotes from "./dynamic_components/Quotes";
import { useEffect, useState, useRef } from "react";
import axios from 'axios';
import PassUpdate from "./dynamic_components/PassUpdate";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Project from "./dynamic_components/Project";
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
  const homePage = useRef(null);
  const [showHome, setShowHome] = useState(true);
  const navigate = useNavigate()
  gsap.registerPlugin(useGSAP);
  gsap.registerPlugin(ScrollToPlugin);



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
        borderColor: '#34E4EA',
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
          color:'#34E4EA'
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#34E4EA' // X-axis label color
        },
        grid: {
          color: '#34E4EA' // X-axis grid line color
        },
        title:{
          text: 'Iterations',
          display:true,
          color:'#34E4EA',
          font:{
            size:'20px',
            weight:'bold',
            color:'#34E4EA'
          }
        }
      },
      y: {
        ticks: {
          color: '#34E4EA', // Y-axis label color
          stepSize:1
        },
        grid: {
          color: '#34E4EA' // Y-axis grid line color
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


  const logOut = ()=>{
    localStorage.setItem("userKey", "")
    navigate("/login")
  }



  const scrollBottom =()=>{

      gsap.to(homePage.current,{
        scrollTo:{y: homePage.current.scrollHeight},
        duration:1,
        ease:'power2.inOut'
      })
    
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
  rowGap:'30px',
  margin:'30px'  
}}
    ref={homePage}
    className="homepage"
>     
    <div style={{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    }}>
            <button onClick={removeAccount} 
              style={{
                        width:'140px', 
                        height:'40px', 
                        display:'flex', 
                        justifyContent:'center', 
                        alignItems:'center',
                        fontSize:'15px',
                        borderRadius:'3px',
                    }}
                    >Delete Account</button>
            <button onClick={updatePassword} 
            style={{
                        width:'140px', 
                        height:'40px', 
                        display:'flex', 
                        justifyContent:'center', 
                        alignItems:'center',
                        fontSize:'15px',
                        borderRadius:'3px',
                  }}>Update Password</button>
            <button onClick={logOut} 
            style={{
                        width:'140px', 
                        height:'40px', 
                        display:'flex', 
                        justifyContent:'center', 
                        alignItems:'center',
                        fontSize:'15px',
                        borderRadius:'3px',
                  }}>Logout</button>
          </div>
      <div>
        <Quotes/>
      </div>
      <div style={{ 
        backgroundColor:'#2F243A', 
        display:'flex', 
        justifyContent:'center', 
        alignItems:'center', 
        width:'800px', 
        margin:'20px', 
        borderRadius:'20px', 
        padding:'10px', 
        borderStyle:'dashed', 
        borderWidth:'3px', 
        borderColor:'#34E4EA'}} >
        <Line data={data} options={options} />
      </div>
      <div>
        {/* <Link to="project" state={{ userKey: userKey }} onClick={scrollBottom}>
          <div style={{ width: '100px', height: '50px', backgroundColor: 'violet' }}>
          Create a new Project
          </div>
        </Link>  */}
        <Project/>
      </div>
   

      {/* <div>Content is stored here{JSON.stringify(users)}</div> */}
      

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

      {/* <Outlet /> */}
    </div>
  );
}