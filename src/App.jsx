import { useState, useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';

import Seed from './components/Seed';
import Hero from './components/Hero'
import './App.css';

function App() {
  const reffered = useRef(null);
  const [bgColor, setBgColor] = useState("red");

  gsap.registerPlugin(useGSAP); // register the hook to avoid React version discrepancies 

  // const container = useRef();

  // useGSAP(() => {
  //   const tl = gsap.timeline({ repeat: -1, yoyo: false, defaults: { duration: 1, ease: "power2.Out" } });
  //   tl.to('.box', { x: 360 })
  //     .to('.box', { y: 200 })
  //     .to('.box', { x: 0 })
  //     .to('.box', { y: 0 });
  
  // }, { scope: container });// <-- scope is for selector text (optional)
  // ref={container}

  function clikFunc() {
    setBgColor((prev) => (prev === "blue" ? "red" : "blue"));
  }

  useEffect(() => {
    if (reffered.current) {
      reffered.current.style.backgroundColor = bgColor;
      reffered.current.style.fontSize = bgColor === "blue" ? "40px" : "20px";
    }
  }, [bgColor]);

  return (

    <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'blue', overflow: 'hidden', justifyContent:"center"}}>
      <header style={{height:'50px', display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'purple'}}>the header</header>
      <main style={{flex: '1', padding: '30px', backgroundColor:"green" ,display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"}}>
      {/* <p className='box' ref={reffered} onClick={clikFunc} style={{ padding: "30px" }}>
        Hello Capstone
      </p> */}
      
      <Outlet/>
      </main>
      <footer style={{height:'50px', backgroundColor:"orange", display:'flex', justifyContent:"center", alignItems:"center"}}>&copy;Eric Ntamack All rights reserved</footer>
    </div>

  );
}

export default App;