import { Link } from "react-router-dom";
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { arrayMult } from "./helpers/helpers";
export default function Hero() {
  const container = useRef();
  

  gsap.registerPlugin(useGSAP);

useGSAP(() => {
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5, yoyo: false });

  tl.to(".box", {
    height: 350,
    backgroundColor: '#2F243A',
    x: 50,
    rotation: 40,
    duration: 0.25,
    opacity: 1,
    stagger: {
      each: 0.025,
      repeat: 0,
      yoyo: false
    }
  })
  .to(".box", {
    rotation: 0,
    x: 0,
    backgroundColor: "#BEBBBB",
    borderRadius:'0px',
    duration: 0.25,
    stagger: {
      each: 0.025,
      from: "end"
    }
  }).to(".box", {
    height: 350,
    backgroundColor: '#2F243A',
    x: 50,
    borderRadius:'10px',
    rotation: -40,
    duration: 0.25,
    opacity: 1,
    stagger: {
      each: 0.025,
      from: "end"
    }
  }).to(".box",{
    height:30,
    opacity:0,
    rotation:0,
    x:0,
    duration:0.25,
    backgroundColor:"#BEBBBB",
    stagger:{
      each: 0.025,
      from: "end"
    }
  })
  
}, { scope: container });
  
  
  // <-- scope is for selector text (optional)
  


  return (
    <div ref={container}  style={{
      width:'1200px', 
      height:'600px', 
      display:'flex',
      justifyContent:'center', 
      alignItems:'center', 
      overflow:'scroll', 
      //backgroundColor:'red'
      }}>
<div
  style={{
    fontSize: "80px",
    width: "1000px",
    position: "relative",
    zIndex: 2,
 
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }}
>
    <Link to="/survey" style={{ textDecoration: "none" }}>
      <div
        style={{
          fontSize: "90px",
          color: "#826AED",
          backgroundColor: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(5px)",
          whiteSpace: "nowrap",
          width: "900px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px 0",
        }}
      >
        Plan your future today
      </div>
    </Link>
  </div>      
  <div style={{
    position:'absolute', 
    width:'900px', display:'flex', 
    flexDirection:'column', 
    justifyContent:'center', 
    alignItems:'center', 
    height:'800px', 
    overflow:'hidden', 
    //backgroundColor:'blue', 
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'}}>
        <div  style={{position:'relative',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'0px' , height:'100px'}}>
          {
            (arrayMult([0],110)).map( _ =>(
                <div className="box" style={{
                  backgroundColor:"#BEBBBB", 
                  width:"10px", height:"30px", 
                  position:'relative', 
                  opacity:'0', 
                  borderRadius:'10px',
                  display:"flex",
                  flexDirection:'column',
                  justifyContent:"space-between" }}> 
                  <div style={{
                    backgroundColor:"#826AED", 
                    width:"10px", 
                    height:"10px"}}>
                  </div> 
                  <div style={{
                    backgroundColor:"#826AED", 
                    width:"10px", 
                    height:"10px"}}>
                  </div> 
                </div>
            ))
          }
        </div>
  </div>
      
</div>
  );
}