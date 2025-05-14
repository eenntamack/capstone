import Questions from "./dynamic_components/Questions"
import { Link } from "react-router-dom"
import { useState } from "react"
export default function Survey(){

    return(
        <div style={{
            background:"#2F243A", 
            color:"white", 
            padding:"30px", 
            borderRadius:"20px", 
            width:"800px", 
            height:"550px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            borderColor:"#826AED",
            borderWidth:"10px",
            borderStyle:"ridge",
            position:'relative',  
            
        }}
       
        >
            <Questions/>
            
        </div>
    )
}