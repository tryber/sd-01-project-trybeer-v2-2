import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#eaeae7',
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: '2.5%',
    height: '500px',
    width: '530px',
    overflow: 'auto',
    padding: '2px',
    border: '1px solid black',
    borderRadius: '5px',
  },
  bubbleContainerLeft: {
    '& div': { backgroundColor: '#f8f8f8'},
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  bubbleContainerRight: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    '& div': { 
      backgroundColor: '#d3e5fa',
      textAlign: 'end',
    },
  },
  bubble: {
    minWidth: '90px',
    border: '0.5px solid black',
    borderRadius: '6px',
    margin: '5px',
    padding: '10px',
    '& p': { margin: 0 },
    '& p:first-child': { fontWeight: 'bold' },
  },
}));

function messageIdentation(admin, msg, classes) {
  const identation = admin ? (msg ? 'right' : 'left') : (msg ? 'left' : 'right');
  if (identation === 'left') return classes.bubbleContainerLeft;
  return classes.bubbleContainerRight;
}

const MessageBubble = ({ messages, client, admin }) => {
  const classes = useStyles();
  const chatBubbles = messages.map((msg, index) => (
    <div className={messageIdentation(admin, msg.admin, classes)} key={index}>
      <div key={index} className={classes.bubble}>
        <p>{msg.admin ? 'Loja' : client}</p>
        <p>{msg.text}</p>
      </div>
    </div>
  ));
  return <div className={classes.container}>{chatBubbles}</div>;
};

export default MessageBubble;
