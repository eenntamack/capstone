import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Link } from "react-router-dom"
export default function Questions(){

    const container = useRef()
    const q = useRef()
    const rankClarity = useRef()
    const rank = useRef()
    const [question , setQuestion] = useState(0)
    const [renderLink, setRenderLink] = useState(false)
    
    const homeLink = useRef(null)

    const questions  = [
        'You often complete your goals',
        'It it easy for you to keep track of your notes',
        'Other note taking platforms made your workload easier'
    ]

    function nextQ(scoreVal) {
        console.log(`Point ${scoreVal}`);
        
      
        const nextIndex = question + 1;
        console.log(`question ${nextIndex}`);
        if (nextIndex < questions.length) {
          setQuestion(nextIndex);
        } else {
          setRenderLink(true);
          q.current.style.display = "none";
          rank.current.style.display = "none";
          rankClarity.current.style.display ="none"
        }
       
    }
    useGSAP(() => {
        gsap.from('.question', {
          autoAlpha: 0,
          duration: 1,
        });
      }, [question]);

    return(
    <div ref={container} style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        <p className="question" ref={q} style={{position:"sticky"}}>{questions[question]}</p>
        <div className="ranking" style={{display:'flex', flexDirection:"row",alignItems:"center",justifyContent:"center",width:"200px",height:"90px"}} ref={rank}>
        {[1, 2, 3, 4, 5].map((val) => (
          <p
            key={val}
            onClick={() => nextQ(val)}
            style={{ 
              fontSize: "30px", 
              transition:"0.3s ease",
              padding: "20px", 
              cursor: "pointer" }}
            onMouseEnter={(e)=> e.currentTarget.style.fontSize = "35px"}
            onMouseLeave={(e)=> e.currentTarget.style.fontSize = "30px"}
          >
            {val}
          </p>
        ))}
        </div>
        <div ref={rankClarity} ><p style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center', columnGap:'10px', height:'30px'}}>
          <p style={{fontSize:'30px'}}>1</p> = <p style={{fontSize:'30px'}}>:(</p> <p style={{width:'40px'}}></p><p style={{fontSize:'30px'}}>5</p> = <p style={{fontSize:'30px'}}>:)</p></p>
        </div>
        
        
        {renderLink && (
        <div ref={homeLink} style={{ marginTop: "20px" }}>
          <Link to="/login" style={{ fontWeight: "bold", color: "#BEBBBB", fontSize:'30px', textDecoration: 'none' }}>
            Login
          </Link>
        </div>
      )}
    </div>
    )
}