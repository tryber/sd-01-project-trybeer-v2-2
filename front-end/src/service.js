import React from 'react';
import api from './api';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export async function validateLogin(setIsAdmin, setIsLoged) {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) return setIsLoged(false);
  const result = await fetch('http://localhost:3001/user', {
    method: 'GET',
    headers: { authorization: user.token },
  }).then(res => res.json());
  if (!result || result.message === 'jwt expired') {
    setIsLoged(false);
    return false;
  }
  if (result.role) setIsAdmin(true);
  setIsLoged(true);
  return true;
}

export async function sendData(event, data, url, setIsAdmin, setIsLoged) {
  const result = await fetch(`http://localhost:3001/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(res => res.json());
  if (result.message) return alert('Dados Inválidos! Tente Novamente');
  localStorage.setItem('user', JSON.stringify(result));
  if (result.role) setIsAdmin(true);
  setIsLoged(true);
}

export function userLogout() {
  return localStorage.removeItem('user');
}

export function transformCurrency(currency) {
  return currency.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  });
}

export async function deleteProduct(name) {
  const user = JSON.parse(localStorage.getItem('user'));
  let endPoint = `/products/${name}`;
  const config = { headers: { authorization: user.token } };
  try {
    api.delete(endPoint, config);
  } catch (error) {
    toast.error(error.message);
  }
}

export async function getOrders(user, setData) {
  let endPoint = '/products/checkout';
  const config = { headers: { authorization: user.token } };
  try {
    api.get(endPoint, config).then(({ data }) => setData(data.data));
  } catch (error) {
    toast.error(error.message);
  }
}

export async function sendAddress(data, user, func) {
  const url = 'http://localhost:3001/orders';
  const config = {
    method: 'POST',
    headers: {
      authorization: user.token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  };
  await fetch(url, config).then(res => res.json())
    .then(() => alert('Pedido realizado com sucesso!'))
    .catch(() => alert('Pedido não concluído!'));
  func(true);
}

export function total(products) {
  return products.reduce((acc, value) => acc + value.price * value.quantity, 0).toFixed(2) || 0;
}

export const usingStyle = makeStyles((theme) => ({
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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/tryber/sd-01-trybeer-project-2">
        Trybeer
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
