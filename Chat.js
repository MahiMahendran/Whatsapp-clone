import React, { useEffect, useState, } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import MicNoneOutlinedIcon from '@material-ui/icons/MicNoneOutlined';
import { useParams } from 'react-router-dom';
import { db } from './Firebase';
import { serverTimestamp } from 'firebase/firestore'

const Chat = ({ user }) => {
  const { roomId } = useParams()
  const [roomData, setRoomdata] = useState('')
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const sendMessages = (e) => {
    e.preventDefault();
    db.collection('rooms').doc(roomId).collection('messages').add({
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp(),
    })
    setInput('')
  }

  useEffect(() => {
    if (roomId) db.collection('rooms').doc(roomId).onSnapshot((Snapshot) => setRoomdata(Snapshot.data()));

    db.collection('rooms').doc(roomId)
      .collection('messages').orderBy('timestamp', 'asc')
      .onSnapshot((Snapshot) => setMessages(Snapshot.docs.map((doc) => doc.data())));
  }, [roomId])
  return (
    <div className='chat' >
      <div className='chat_header'>
        <Avatar src={roomData.roomphoto} />
        <div className='chat_headerinfo'>
          <h3>{roomData.name}</h3>
          <p>last seen {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
        </div>
        <div className='chat_headericon'>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className='chat_body'>
        <div>
          {
            messages.map(messages =>
              <p className={`chat_messages ${messages.name === user.displayName && 'chat_reciver'}`}>
                {messages.message}
                <span className='chat_name'>{messages.name}
                </span>
              </p>)
          }
        </div>
      </div>
      <div className='chat_footer'>
        <IconButton>
          <SentimentSatisfiedOutlinedIcon />
        </IconButton>
        <form>
          <input type='text' value={input} onChange={(e) => setInput(e.target.value)} />
          <button onClick={sendMessages} type='submit'> send a Message</button>
        </form>
        <IconButton>
          <MicNoneOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default Chat;
