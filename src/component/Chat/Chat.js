import React,{useState,useEffect} from "react";
import queryString from "query-string"; //retriving data from url
import { useLocation, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import "./Chat.css";
import ScrollToBottom from "react-scroll-to-bottom";


function Chat({}){
    
    const socket=io('https://backend-chatroom1.onrender.com', { transports : ['websocket'] });;
    const location=useLocation();
    const [name,setName]=useState('');
    const [room,setRoom]=useState('');
    const [message,setMessage]=useState('');
    const [messages,setMessages]=useState([]);
    const navigation=useNavigate();
    useEffect(()=>{
        const {name,room}=queryString.parse(location.search);
        setName(name);
        setRoom(room);
        
    console.log(socket);
    socket.emit('join',{name,room},({err})=>{
       console.log("error",err);
       alert("Try another username!");
    navigation('/')

    })
    return ()=>{
        socket.emit('disconnec',{name,room});
        socket.off();
    }
    },[location.search]);

    useEffect(()=>{
        socket.on('message',(message)=>{
            setMessages(messages=>[...messages,message]);
            console.log(messages);
        })
    },[messages]);
    const sendMessage=(event)=>{
        // event.preventDefault();
        if(message){
            socket.emit('sendMessage',{name,room,message},()=>{
               
                setMessage('');
            });
        }
        console.log(message,messages);
    }
    return (
        <div className="upper">
           <div className="lower">
           <div className="header">
                <h3>Welcome to {room}</h3>
            </div>
            <div className="mess">
               <ScrollToBottom className="scroll">
               {
                    messages.map(msg=><div  className={msg.user===name?"mine":"text"}>
                        
                        <p className="user">{msg.user}</p>
                        <p className="message">{msg.text}</p>
                        </div>)
                }
               </ScrollToBottom>
            </div>
            <div className="type">
                <input className="input" value={message} onChange={val=>setMessage(val.target.value)} onKeyPress={event=>event.key==='Enter'?sendMessage():null}/>
                <button className="button" onClick={()=>sendMessage()}>Send</button>
            </div>
           </div>
        </div>
    );
}


export default Chat;