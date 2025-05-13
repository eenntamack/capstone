import { useEffect,useState } from "react"
import axios from "axios"
export default function Quotes(){
    const [quote, setQuote] = useState({q:"",a:""})
    useEffect(()=>{
        axios.get("http://localhost:3000/fetchQuote").then(res=>{
            if(res.data.data){
                console.log(res.data.data[0].q)
                setQuote({q:`${res.data.data[0].q}`,a:`${res.data.data[0].a}`})
            }else{
                setQuote("")
            }
        })
    },[])
    return(
        <div>

            <p>{quote.q}</p>
            <p>{quote.a}</p>
        </div>
    )
}