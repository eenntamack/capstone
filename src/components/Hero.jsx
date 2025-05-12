import { Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function Hero() {
  return (
    <>
      <div style={{fontSize:"80px"}}>Plan your future today</div>
      <Link to="/survey"><p style={{fontSize:"50px"}}>Begin</p></Link>
      <Login/>
      <Register/>
    </>
  );
}