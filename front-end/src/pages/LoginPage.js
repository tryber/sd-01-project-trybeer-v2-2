import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { validateLogin, sendData, usingStyle, Copyright } from '../service';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const textFieldMail = (setEmail) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      type="email"
      data-testid="email-input"
      id="email"
      name="email"
      onChange={(e) => setEmail(e.target.value)}
      fullWidth
      label="Email"
      autoComplete="email"
      autoFocus
    />
  );
}

const textFieldPassword = (setPassword) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      type="password"
      data-testid="password-input"
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      name="password"
      label="Password"
      id="password"
    />
  );
}

const formControl = () => {
  return (
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Me lembre"
    />
  );
}

const btnEntrar = (classes) => {

  return (
    <Button
      type="submit"
      fullWidth
      data-testid="signin-btn"
      variant="contained"
      color="primary"
      className={classes.submit}
    >
      Entrar
    </Button>
  );
}

const gridLogin = (setShouldRedirect) => {
  return (
    <Grid container justify="center">
      <Grid item>
        <Link
          href="/register"
          variant="body2"
          data-testid="no-account-btn"
          onClick={() => setShouldRedirect(true)}
        >
          <br />
          {"Ainda não tem uma conta? Cadastre-se"}
        </Link>
      </Grid>
    </Grid>
  );
}

function renderLogin(params) {
  const { classes, setShouldRedirect, email, setEmail, password, setPassword, setIsAdmin, setIsLoged } = params;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => sendData(e, { email, password }, 'login', setIsAdmin, setIsLoged)}>
          {textFieldMail(setEmail)}
          {textFieldPassword(setPassword)}
          {formControl()}
          {btnEntrar(classes)}
          {gridLogin(setShouldRedirect)}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

function LoginPage() {
  const [isLoged, setIsLoged] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const classes = usingStyle();

  useEffect(() => {
    validateLogin(setIsAdmin, setIsLoged);
  }, []);

  if (isLoged && isAdmin) return <Redirect to='/admin/orders' />;
  if (isLoged && !isAdmin) return <Redirect to='/products' />;
  if (shouldRedirect) return <Redirect to='/register' />;

  const params = { classes, setShouldRedirect, email, setEmail, password, setPassword, setIsAdmin, setIsLoged };
  return (
    renderLogin(params)
  );
}

export default LoginPage;
