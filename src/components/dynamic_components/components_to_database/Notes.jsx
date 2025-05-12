import { useState, useRef } from 'react';
import axios from 'axios'
export default function Notes() {
    const [elements, setElements] = useState([]);
    
    const addElement = (e) => {
        e.preventDefault();

        setElements(prev => [...prev, {}]);
    };

    const addData = async (e) =>{
        e.preventDefault();
        console.log("Submitted data:", elements);
        //todo: add data to project schema

        const data = await axios.post("http://localhost:3000/authenticate/register",{
            userKey: '',
            data: elements
        })
    }

    
    const handleInputChange = (index, field, value) => {
        setElements(prev =>
            prev.map((el, i) => (i === index ? { ...el, [field]: value } : el))
        );
    };
    return (
        <form onSubmit={addData} id="projectarea" style={{ padding: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                <section >
                    <button onClick={addElement}>Add Element</button>
                    <button type="submit">Submit</button>
                </section>

                <div
                    style={{
                        height: '400px',
                        overflowY: 'scroll',
                        marginLeft: '20px',
                        
                        padding: '10px',
                        width: '850px'
                    }}
                >
                    {elements.map((_, index) => (
                        <div
                            key={index}
                            style={{
                                height: '300px',
                                backgroundColor: 'red',
                                marginTop: '10px',
                                marginBottom: '30px',
                                padding: '30px',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            <input type="text" placeholder={`Element ${index + 1}`} onChange={(e) => handleInputChange(index, 'title', e.target.value)}/>
                            <textarea
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    resize: 'none',
                                    fontSize: '20px'
                                }}
                                onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                            ></textarea>
                            <p>{new Date().getDate()}</p>
                            <p>{new Date().getMonth() + 1}</p>
                            <p>{new Date().getHours()}: {String(new Date().getMinutes()).padStart(2, '0')}</p>
                    
                            <input type="file"/>
                        </div>
                    ))}
                </div>
            </div>
        </form>
    );
}