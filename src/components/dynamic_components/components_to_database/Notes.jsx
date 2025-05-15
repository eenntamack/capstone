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
    .get(`https://capstone-controllers.onrender.com/userData?userKey=${localStorage.getItem("userKey")}`)
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
      <div style={{ display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    justifyContent:'center',
                    backgroundColor:'#2F243A', 
                    width:'1000px',
                    borderRadius:'20px',
                    borderColor:'#34E4EA',
                    borderWidth:'2px',
                    borderStyle:'dashed' }}>
        <section style={{margin:'10px', display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'center', height:'80px', width:'380px'}}>
          <button onClick={addElement}
          style={{
                                width:'120px', 
                                height:'30px', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center',
                                fontSize:'15px',
                                borderRadius:'3px',  
                        }}
          >Add Element</button>
          <button type="submit"
            style={{
                                width:'120px', 
                                height:'30px', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center',
                                fontSize:'15px',
                                borderRadius:'3px',  
            }}
          >Submit</button>
          <button type="button" onClick={deleteStack}
          style={{
                                width:'120px', 
                                height:'30px', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center',
                                fontSize:'15px',
                                borderRadius:'3px',  
          }}
          >Delete</button>
          
        </section>

        <div
        ref={scrollRef}
          style={{
            height: '460px',
            overflowY: 'scroll',
            marginLeft: '20px',
            padding: '20px',
            width: '850px',
          }}
        >
          {elements.map((element, index) => (
            <div
              key={index + 'note'}
              style={{
                height: '380px',
                backgroundColor: '#444054',
                marginTop: '10px',
                marginBottom: '30px',
                padding: '30px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'center',
                alignItems:'center',
                rowGap:'10px',
                borderRadius:'10px',
                borderStyle:'solid',
                borderColor:'#34E4EA',
                borderWidth:'3px'
              }}
            >
              <input
                type="text"
                placeholder={`Heading ${index + 1}`}
                value={element.title}
                onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                style={{
                                    width:'180px',
                                    height:'30px',
                                    fontSize:'20px',
                                    backgroundColor:'#2F243A',
                                    color:'white'
                      }}
                      key={index + 'worktitle'}
                required
              />
              <textarea
                style={{
                  width: '100%',
                  height: '350px',
                  resize: 'none',
                  fontSize: '20px',
                  borderRadius:'5px',
                  backgroundColor:'#2F243A',
                  color:'white'
                }}
                value={element.content}
                onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                key={index + 'workspace'}
                required
              ></textarea>
              <p style={{position:'static'}}>{index }</p>
              {/* <p>{new Date().getDate()}</p>
              <p>{new Date().getMonth() + 1}</p>
              <p>{new Date().getHours()}: {String(new Date().getMinutes()).padStart(2, '0')}</p> */}
              <button type="button" onClick={() => {
                setElements(prev => prev.filter((_, i) => i !== index))
              }}
              style={{
                                width:'120px', 
                                height:'40px', 
                                display:'flex', 
                                justifyContent:'center', 
                                alignItems:'center',
                                fontSize:'15px',
                                borderRadius:'3px',  
              }}
              >Delete</button>
              
            </div>
          ))}
        </div>
      </div>
    </form>
  );
}