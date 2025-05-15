import { useEffect,useState, useRef } from "react"
import axios from "axios"
import gsap from "gsap"
import SplitText from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
gsap.registerPlugin(SplitText)

export default function Quotes(){
    
    const [quote, setQuote] = useState({q:"No quotes today! What quotes inspire you?",a:""})
    const quoteRef = useRef(null);
    useEffect(()=>{
        axios.get("http://localhost:3000/fetchQuote").then(res=>{
            if(res.data.data){
                console.log(res.data.data[0].q)
                setQuote({q:`${res.data.data[0].q}`,a:`${res.data.data[0].a}`})
            }else{
                setQuote({q:"No quotes today! What quotes inspire you?",a:""})
            }
        })
    },[])

    useGSAP(
  () => {
        if (!quoteRef.current || !quote.q) return;

        const split = new SplitText(quoteRef.current, {
        type: "words",
        });

        gsap.from(split.words, {
        y: 100,
        opacity: 0,
        stagger: 0.05,
        ease: "power2.out",
        });

        return () => split.revert(); // cleanup
    },
    { dependencies: [quote.q], scope: quoteRef } // more reliable control
    );
    
    return(
        <div  style={{position:'relative', backgroundColor:'#2F243A', padding: '20px', color:'#34E4EA', borderRadius:'10px', borderColor:'#34E4EA', borderWidth:'3px', borderStyle:"double"}} className="split">

            <p ref={quoteRef}>{quote.q}</p>
            <p>{quote.a}</p>
        </div>
    )
}