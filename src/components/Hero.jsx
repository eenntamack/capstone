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
    const tl = gsap.timeline({repeat:-1,stagger: {
    each: 1,
    repeat: -1,
    yoyo: true
  }});
    gsap.to(".box", {
  height: 300,
  backgroundColor:'#2F243A',
  duration: .25,
  yoyo: true,
  repeat: -1,
  repeatDelay: 0.5,
  stagger: {
    each: 0.0525,
    repeat: -1,
    yoyo: true
  }
});
  }, { scope: container });
  
  
  // <-- scope is for selector text (optional)
  


  return (
    <div ref={container}  style={{width:'1200px', height:'600px', display:'flex',justifyContent:'center', alignItems:'center', overflow:'hidden', transform:'translateX(28px)'}}>
      <div style={{fontSize:"80px", width:"1000px",minWidth:'100px', position:'relative',zIndex:'2',  transform:'translateX(-30px)', display:'flex'}}><Link to="/survey"><p style={{fontSize:"90px",textDecoration:"none",color:"#826AED", backgroundColor:'blue',backgroundColor:'rgba(0,0,0,1)', backdropFilter:'blur(5px)', textWrap:'nowrap', width:'900px', display:'flex', justifyContent:'center', alignItems:'center'}}>Plan your future today</p></Link></div>
      <div style={{position:'relaive', width:'900px', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', height:'800px', overflow:'hidden', backgroundColor:'blue'}}>
        <div  style={{position:'relative', transform:'translate(-150px, -100px)',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'10px' , height:'100px'}}>
          {
            (arrayMult([0],70)).map( _ =>(
                <div className="box" style={{backgroundColor:"#BEBBBB", width:"10px", height:"30px", position:'relative', }}> </div>
            ))
          }
        </div>
        <div  style={{position:'relative', transform:'translate(-150px, -100px)',display:'flex', flexDirection:'row-reverse', justifyContent:'center', alignItems:'center', gap:'10px', height:'100px'}}>
          {
            (arrayMult([0],70)).map( _ =>(
                <div className="box" style={{backgroundColor:"#BEBBBB", width:"10px", height:"30px",borderRadius:'20px', position:'relative', }}> </div>
            ))
          }
        </div>
        <div  style={{position:'relative', transform:'translate(-150px, -100px)',display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', gap:'10px', height:'100px'}}>
          {
            (arrayMult([0],70)).map( _ =>(
                <div className="box" style={{backgroundColor:"#BEBBBB", width:"10px", height:"30px",borderRadius:'20px', position:'relative', }}> </div>
            ))
          }
        </div>
        <div  style={{position:'relative', transform:'translate(-150px, -100px)',display:'flex', flexDirection:'row-reverse', justifyContent:'center', alignItems:'center', gap:'10px', height:'100px'}}>
          {
            (arrayMult([0],70)).map( _ =>(
                <div className="box" style={{backgroundColor:"#BEBBBB", width:"10px", height:"30px", borderRadius:'20px', position:'relative', }}> </div>
            ))
          }
        </div>
        <div  style={{position:'relative', transform:'translate(-150px, -100px)',display:'flex', flexDirection:'row-reverse', justifyContent:'center', alignItems:'center', gap:'10px', height:'100px'}}>
          {
            (arrayMult([0],70)).map( _ =>(
                <div className="box" style={{backgroundColor:"#BEBBBB", width:"10px", height:"30px", borderRadius:'20px', position:'relative', }}> </div>
            ))
          }
        </div>
        
        
  
      </div>
      
    </div>
  );
}