import  { useState } from 'react';

export default function Notes() {
    const [elements, setElements] = useState([]);

    const addElement = (e) => {
        e.preventDefault(); // prevent form submission
        setElements(prev => [...prev, {}]); // add a new placeholder
    };

    return (
        <form method="POST" id="projectarea" action="" style={{padding:'10px'}}>
            <textarea style={{ width: '300px', height: '500px', justifyContent: 'start' }}></textarea>
            
            <button onClick={addElement}>Add Element</button>
            <button type="submit">Submit</button>

            {elements.map((_, index) => (
                <div
                    key={index}
                    style={{
                        width: "auto",
                        height: "300px",
                        backgroundColor: "red",
                        marginTop: "10px",
                        marginBottom:"30px",
                        padding:"30px",
                        display:'flex',
                        flexDirection:"column"
                    }}
                    className=''
                >
                    <input type="text" placeholder={`Element ${index + 1}`} />
                    <textarea style={{width:"800px", height:"250px", resize:'none',fontSize:'20px'}}></textarea>
                </div>
            ))}
        </form>
    );
}