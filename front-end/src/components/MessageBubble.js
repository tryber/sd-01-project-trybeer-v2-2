import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#eaeae7',
    display: 'flex',
    flexDirection: 'column-reverse',
    marginTop: '1%',
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
    minWidth: '105px',
    border: '0.5px solid black',
    borderRadius: '6px',
    margin: '5px',
    padding: '10px',
    '& p': { margin: 0 },
  },
}));

function messageIdentation(admin, msg, classes) {
  return admin ? (msg ? classes.bubbleContainerRight : classes.bubbleContainerLeft) : (msg ? classes.bubbleContainerLeft : classes.bubbleContainerRight);
}

const MessageBubble = ({ messages, client, admin }) => {
  const classes = useStyles();
  const chatBubbles = messages.map((msg, index) => {
    const date = new Date(msg.date);
    return (
      <div className={messageIdentation(admin, msg.admin, classes)} key={index}>
        <div key={index} className={classes.bubble}>
          <p><strong data-testid="nickname">{msg.admin ? 'Loja' : client}</strong> - <span data-testid="message-time">{`${date.getHours()}:${date.getMinutes()}`}</span></p>
          <p data-testid="text-message">{msg.text}</p>
        </div>
      </div>
    )
  });
  return <div className={classes.container}>{chatBubbles}</div>;
};

export default MessageBubble;
