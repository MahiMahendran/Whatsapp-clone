import React,{useEffect,useState} from 'react'
import'./Sidebar';
import'./Sidechat.css';
import { Avatar } from '@material-ui/core';
import'./Sidechat.css';
import { db } from './Firebase';
import { Link } from 'react-router-dom';

function Sidechat({id,name,photo,addChat}) {
  const[Messages,setMessages] = useState('');

  useEffect(()=>{
 if(id){db.collection('rooms').doc(id).collection('messages')
       .orderBy('timestamp','asc').onSnapshot(Snapshot =>
      setMessages(Snapshot.docs.map((doc)=>doc.data()   
      ))
      )
     }
  },[id])

  const addRoom = () => {
    const roomname = prompt('Please Enter Name');
    const roomphoto = prompt('Enter The Photo URL or not Willing Press OK ');

    if(roomname || roomphoto) {
      db.collection('rooms').add({
        name : roomname,
         roomphoto,
      })
    };
  }
  return !addChat  ? (
    <Link className = 'sidechat_link' to={`/rooms/${id}`}>
       <div className='sidechat'>
        <Avatar src={photo} />
        <div className='sidechat_info'>
          <h3>{name}</h3>
          <p>{Messages[0]?.message}</p>
        </div>
      </div>   
    </Link>
     ) :(
     <div className='sidechat' >
      <h2 onClick={addRoom}> Add New Chat</h2>
    </div>
  )
};

export default Sidechat
