import {useState} from 'react';
import './App.css';
import io from 'socket.io-client';  


const socket = io.connect('http://localhost:3002');
console.log(socket.connected)

function App() {
  const [msg,setmsg]=useState("");
  const [revmsg,setrevmsg]=useState("");

 const snedMsg=()=>{
  socket.emit('chat_message',{msg});
}

const receivemsg=()=>{
  socket.on('receive_message',(data)=>{
    setrevmsg(data.msg);

  })    
}

// useEffect(()=>{
//   socket.on('receive_message',(data)=>{
//     setrevmsg(data.msg);
//   });
// },[socket])


  return (
    <div className="App">
      <h1>Chat App @Srikanthkodari</h1>
      <input className="input-text" value={msg}  type="text" onChange={(e)=>setmsg(e.target.value)} placeholder="Type Your Message here " />
      <br/>
      <button className="snd-btn" onClick={()=>{snedMsg();receivemsg()}} >Send</button>
      <p>message:
       {revmsg}
      </p>
     
    </div>
  );
}

export default App;
