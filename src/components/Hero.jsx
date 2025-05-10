import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <>
      <div style={{fontSize:"80px"}}>Plan your future today</div>
      <Link to="/survey"><p style={{fontSize:"50px"}}>Begin</p></Link>
    </>
  );
}