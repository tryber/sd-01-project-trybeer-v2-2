import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    marginRight: '85%',
  },
  content: {
    textDecoration: 'none',
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    marginRight: '5%',
  },
}));

const ChatHeader = ({ role, room }) => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      {role && <Link to="/admin/chat" className={classes.content}>
        <ChevronLeftIcon /> Voltar
      </Link>}
      <h2>Conversa com {role ? room : 'a Loja'}:</h2>
    </div>
    
  );
};

export default ChatHeader;
