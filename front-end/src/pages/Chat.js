import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';
import MessageBubble from '../components/MessageBubble';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  insertMessage: {
    marginTop: '20px',
    width: '600px',
    display: 'flex',
    justifyContent: 'center',
  },
  messageInput: {
    width: '400px',
    border: '1px solid black',
    marginRight: '10px',
    borderRadius: '3px',
  },
  sendButton: {
    backgroundColor: '#beffb1',
    border: '1px solid black',
    borderRadius: '3px',
    cursor: 'pointer',
    height: '30px',
    width: '60px',
    '&:hover': {
      backgroundColor: '#a2e896'
    }
  },
});

const socket = io('http://localhost:8080');
let room;

function sendMessage(text, user, room) {
  socket.emit('message', { text, client: room, admin: user.role });
  const input = document.querySelector('#input');
  input.value = '';
  input.focus();
}

function handleEnterClick(event, setText) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector('#button').click();
    setText('');
  }
}

function sortData(data) {
  return data ? data.messages.sort((a, b) => new Date(b.date) - new Date(a.date)) : [];
}

function Chat({ location: { clientRoom } }) {
  const [data, setData] = useState('');
  const [text, setText] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();

  useEffect(() => {
    room = user.role ? clientRoom : user.email;
    if (room) socket.emit('get room', room);
    socket.on('history', msg => setData(msg));
  }, []);

  const messages = sortData(data);
  if (!user) return <Redirect to='/login'/>;
  if (user.role && !clientRoom) return <Redirect to='/admin/chat'/>;
  return (
    <SideBar title="Conversa" children={
      <div className={classes.container}>
        <h2>Conversa com {user.role ? room : 'a Loja'}:</h2>
        <MessageBubble messages={messages} client={data.client || user.email} admin={user.role} />
        <div className={classes.insertMessage}>
          <input type="text" onChange={(e) => setText(e.target.value)} placeholder="Mensagem" className={classes.messageInput} id="input" onKeyUp={(e) => handleEnterClick(e, setText)} />
          <button id="button" className={classes.sendButton} onClick={() => sendMessage(text, user, room)}>Enviar</button>
        </div>
      </div>
    } />
  );
}

export default Chat;
