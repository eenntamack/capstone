import { useEffect,useState } from "react"
import axios from "axios"
export default function Quotes(){
    const [quote, setQuote] = useState("")
    useEffect(()=>{
        axios.get("https://zenquotes.io/api/quotes").then(res=>{
            if(res){
                setQuote(res[0])
            }
        })
    },[])
    return(
        <div>

            <p>quote.q</p>
            <p>quote.a</p>
        </div>
    )
}