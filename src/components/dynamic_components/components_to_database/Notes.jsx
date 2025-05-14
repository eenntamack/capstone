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
        console.log(userData)
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

  // Submitting Data
  const addData =  (e) => {
    e.preventDefault();
     axios.post("http://localhost:3000/userData", {
        userKey: props.userKey,
        elements
      }).then((res)=>{
        alert("Successfully uploaded data");
        window.location.reload();
      }).catch (error => {
      alert("Data could not be uploaded");
     })
  };

  const handleInputChange = (index, field, value) => {
    setElements((prev) =>
      prev.map((el, i) => (i === index ? { ...el, [field]: value } : el))
    );
  };

  //DeletingAllData
  const deleteStack = ()=>{
    if(elements.length > 0){
        axios.delete("http://localhost:3000/userData",{
        data:{ userKey: localStorage.getItem("userKey")}
        }).then(res=>{
            if (res.data.success){
            alert("data deleted") 
            setElements([])
            window.location.reload()
            }
            else{
            alert('data could not be deleted')
            }

        }).catch(e=>{
            alert("error deleting data")
        })
    }
  }

  return (
    <form onSubmit={addData} id="projectarea" style={{ padding: '10px', height:'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',justifyContent:'center',backgroundColor:'maroon', width:'1000px' }}>
        <section style={{margin:'10px'}}>
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
            padding: '20px',
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
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center',
                rowGap:'10px',
                borderRadius:'10px'
              }}
            >
              <input
                type="text"
                placeholder={`Heading ${index + 1}`}
                value={element.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                required
              />
              <textarea
                style={{
                  width: '100%',
                  height: '550px',
                  resize: 'none',
                  fontSize: '20px',
                  borderRadius:'5px'
                }}
                value={element.content}
                onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                required
              ></textarea>
              {/* <p>{new Date().getDate()}</p>
              <p>{new Date().getMonth() + 1}</p>
              <p>{new Date().getHours()}: {String(new Date().getMinutes()).padStart(2, '0')}</p> */}
              <button type="button" onClick={() => {
                setElements(prev => prev.filter((_, i) => i !== index))
              }}>Delete</button>
              
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}