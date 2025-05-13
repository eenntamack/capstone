import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function Notes(props) {
  const [elements, setElements] = useState([]);

  const addElement = (e) => {
    e.preventDefault();
    setElements((prev) => [...prev, { title: '', content: '' }]);
  };

useEffect(() => {
  axios
    .get(`http://localhost:3000/userData?userKey=${localStorage.getItem("userKey")}`)
    .then((res) => {
      const userData = res.data.data;

      if (userData.length > 0) {
        const books = userData[userData.length - 1].books || [];

        // Convert books into the internal `elements` format
        const savedElements = books.map((book) => ({
          title: book.name || '',
          content: book.chapters?.[0]?.text?.[0]?.text || ''
        }));

        setElements(savedElements);
      }
    })
    .catch((e) => {
      console.error("Could not get the data", e);
    });
}, []);

const scrollRef = useRef(null);

useEffect(() => {
  if (scrollRef.current) {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }
}, [elements]); 

  // ✅ Submit data
  const addData = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/userData", {
        userKey: props.userKey,
        elements
      });

      alert("Successfully uploaded data");
      window.location.reload();
    } catch (error) {
      alert("Data could not be uploaded");
    }
  };

  const handleInputChange = (index, field, value) => {
    setElements((prev) =>
      prev.map((el, i) => (i === index ? { ...el, [field]: value } : el))
    );
  };

  const deleteStack =()=>{
    const res = axios.delete("http://localhost:3000/userData",{
        userKey: localStorage.getItem("userKey")
      })
  }

  return (
    <form onSubmit={addData} id="projectarea" style={{ padding: '10px' }}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
        <section>
          <button onClick={addElement}>Add Element</button>
          <button type="submit">Submit</button>
          <button type="button" onClick={deleteStack}>Delete</button>
          
        </section>

        <div
        ref={scrollRef}
          style={{
            height: '400px',
            overflowY: 'scroll',
            marginLeft: '20px',
            padding: '10px',
            width: '850px',
          }}
        >
          {elements.map((element, index) => (
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
              <input
                type="text"
                placeholder={`Element ${index + 1}`}
                value={element.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
              />
              <textarea
                style={{
                  width: '100%',
                  height: '250px',
                  resize: 'none',
                  fontSize: '20px'
                }}
                value={element.content}
                onChange={(e) => handleInputChange(index, 'content', e.target.value)}
              ></textarea>
              <p>{new Date().getDate()}</p>
              <p>{new Date().getMonth() + 1}</p>
              <p>{new Date().getHours()}: {String(new Date().getMinutes()).padStart(2, '0')}</p>
              <button type="button" onClick={() => {
                setElements(prev => prev.filter((_, i) => i !== index))
              }}>Delete</button>
              <button type="button" >AddSection</button>
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}