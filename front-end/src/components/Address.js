import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function handleSubmit(e, setCheckout, address, number) {
  e.preventDefault();
  setCheckout([address, number]);
}

function selectTextField(label, value, set) {
  return (
    <TextField
      multiline
      variant='outlined'
      margin='normal'
      required
      fullWidth
      id='adreess'
      label={label}
      autoFocus
      value={value}
      onChange={event => set(event.target.value)}
    />
  );
}

export default function Address({ setCheckout }) {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const classes = useStyles();
  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Endereço
        </Typography>
        <form
          className={classes.form}
          onSubmit={e => handleSubmit(e, setCheckout, address, number)}>
          {selectTextField('Rua:', address, setAddress)}
          {selectTextField('Numero:', number, setNumber)}
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Finalizar Pedido
          </Button>
        </form>
      </div>
    </Container>
  );
}
