import { useState, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { Link } from "react-router-dom"
export default function Questions(){

    const container = useRef()
    const q = useRef()
    const rank = useRef()
    const [question , setQuestion] = useState(0)
    const [renderLink, setRenderLink] = useState(false)
    const homeLink = useRef(null)

    const questions  = [
        'Are there any personal projects or goals you\'ve worked on in the past that you\'ve been dying to complete?',
        'On a scale from 1 to 5 how often do you complete your goals',
        'On a scale from 1 to 5 how organized are your',
        'Improvements?'
    ]

    function nextQ(scoreVal) {
        console.log(`Point ${scoreVal}`);
        
      
        const nextIndex = question + 1;
        console.log(`question ${nextIndex}`);
        if (nextIndex < questions.length) {
          setQuestion(nextIndex);
      
          if (nextIndex === questions.length) {
            setRenderLink(true);
          }
        }else{
            setRenderLink(true);
            q.current.style.display="none"
            rank.current.style.display="none"
        }
    }
    useGSAP(() => {
        gsap.from('.question', {
          autoAlpha: 0,
          duration: 1,
        });
      }, [question]);

    return(
    <div ref={container}>
        <p className="question" ref={q}>{questions[question]}</p>
        <div className="ranking" style={{display:'flex', flexDirection:"row",alignItems:"center",justifyContent:"center"}} ref={rank}>
        {[1, 2, 3, 4, 5].map((val) => (
          <p
            key={val}
            onClick={() => nextQ(val)}
            style={{ fontSize: "30px", padding: "20px", cursor: "pointer" }}
          >
            {val}
          </p>
        ))}
        </div>
        {renderLink && (
        <div ref={homeLink} style={{ marginTop: "20px" }}>
          <Link to="/home" style={{ fontWeight: "bold", color: "blue" }}>
            Go to Home
          </Link>
        </div>
      )}
    </div>
    )
}