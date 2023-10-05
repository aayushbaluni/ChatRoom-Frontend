import React, {useState} from "react";
import { Link } from "react-router-dom";
import "./Login.css";
function Login(){

    const [name,setName]=useState('');
    const [room,setRoom]=useState('')
    return (
        <div className="outer">
            <div className="inner">
                <h1>
                        Join Now
                </h1>
                <div>
                <input className="input" placeholder="Name" type="text" onChange={val=>setName(val.target.value)} />
                </div>
                <div>
                <input className="input" placeholder="Room" type="text" onChange={val=>setRoom(val.target.value)} />
                </div>
                <Link onClick={event=>(!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="btn" type="submit">Join Now</button>
                </Link>
            </div>
        </div>
    );
}

export default Login;