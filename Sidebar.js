import React,{useEffect, useState} from "react";
import'./Sidebar.css';
import{Avatar,IconButton}from'@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Sidechat from "./Sidechat";
import{ db } from'./Firebase';


  function Sidebar({setUser,user}) {

const[rooms,setRooms] = useState([]);

  useEffect(()=>{
   const unsubscribe = db.collection("rooms").onSnapshot((snapshot)=>
      setRooms(
        snapshot.docs.map((doc) => ({
        id : doc.id,
        data : doc.data()
      }))
      )
    )
    return()=> unsubscribe();
  },[]);
    return(
        <div className = 'Sidsidebar_containerebar'>
              <button onClick={()=>{
        sessionStorage.setItem('user',''); 
        setUser('');
      }}>Logout</button>
        <div className="sidebar_head">
            <Avatar src={user.photoURL}/>             
            <div className='sidebar_headicon' >
            <IconButton>
            <DonutLargeIcon/>
            </IconButton>
            <IconButton>
            <ChatIcon/>
            </IconButton>
            <IconButton>
            <MoreVertIcon/>
            </IconButton>
              </div>
            </div>
        <div className='Sidebar_search'>
        <div className='sidebar_search_icon'>
            <SearchIcon/>
          <input placeholder='Searh The Chat' type='text'></input>
        </div>
        </div>
        <div className="side_chat">
        <Sidechat addChat/>
          { rooms.map((room) => (
              <Sidechat 
              key={room.id} 
              id={room.id} 
              name={room.data.name}
              photo={room.data.roomphoto}
              />
            ))}
        </div>
        </div>
        
    );
}

export default Sidebar;

