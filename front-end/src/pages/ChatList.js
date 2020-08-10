import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';
import SideBar from '../components/SideBar';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  room: {
    textDecoration: 'none',
    color: 'inherit',
    margin: '15px',
    minWidth: '350px',
    width: '50%',
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    borderRadius: '7px',
  }
});

const socket = io('http://localhost:8080');

function ChatList() {
  const [rooms, setRooms] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const classes = useStyles();
  
  useEffect(() => {
    socket.emit('get all rooms');
  }, []);

  socket.on('all rooms', allRooms => setRooms(allRooms));

  if (!user) return <Redirect to='/login'/>;
  if (!user.role) return <Redirect to='/chat'/>;
  return (
    <SideBar title="Conversas" children={
      <div className={classes.content}>
        {rooms.sort((a, b) => new Date(b.lastUpdate) - new Date(a.lastUpdate)).map(room => (
          <Link className={classes.room} to={{ pathname: '/chat', clientRoom: room.client }} key={room.client}>
            <p><strong data-testid="profile-name">Cliente: {room.client}</strong></p>
            <p data-testid="last-message">Última mensagem: {new Date(room.lastUpdate).toLocaleString()}</p>
          </Link>
        ))}
        {rooms.length === 0 && <h3 data-testid="text-for-no-conversation">Nenhuma conversa por aqui!</h3>}
      </div>
    } />
  );
}

export default ChatList;
