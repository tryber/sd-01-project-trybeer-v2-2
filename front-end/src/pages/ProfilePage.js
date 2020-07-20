import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import { Redirect } from 'react-router-dom';

async function submitData(event, name, user, setSavedName) {
  event.preventDefault();
  setSavedName(name);
  const { email, token, role } = user;
  const newUser = { name, email, token, role };
  localStorage.setItem('user', JSON.stringify(newUser));
  await fetch('http://localhost:3001/user',
  { headers:
    { authorization: user.token, 'Content-Type': 'application/json' },
    method: "PUT",
    body: JSON.stringify({ name })
  });
}

async function getUser(user, setData) {
  await fetch('http://localhost:3001/user', { headers: { authorization: user.token } })
  .then((res) => res.json())
  .then((result) => setData(result));
}

function testId(type, isAdmin) {
  if (isAdmin) {
    if (type === 'name') return 'profile-name';
    return 'profile-email';
  }
  if (type === 'name') return 'profile-name-input';
  return 'profile-email-input';
}

function ProfilePage() {
  const [data, setData] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  let firstName, isAdmin;
  if (user) {
    firstName = user.name;
    isAdmin = user.role
  }
  const [savedName, setSavedName] = useState(firstName);
  const [name, setName] = useState(firstName);
  useEffect(() => {
    if (user) getUser(user, setData);
  }, []);

  if (data.message || !user) return <Redirect to='/login'/>;
  if (!data) return <div>Loading...</div>;
  return (
    <SideBar title="Meu perfil" children={
      <form onSubmit={(e) => submitData(e, name, user, setSavedName)}>
        <label htmlFor="name">Nome: </label>
        <input type="text" data-testid={testId('name', isAdmin)} value={name} id="name" name="name" pattern="^[a-zA-Z\s]{12,40}$" onChange={(e) => setName(e.target.value)} readOnly={isAdmin} required />
        <label htmlFor="email">Email: </label>
        <input type="email" data-testid={testId('email', isAdmin)} value={data.email} id="email" name="email" readOnly />
        {!isAdmin && <button data-testid="profile-save-btn" disabled={name === savedName}>Salvar</button>}
      </form>
    } />
  );
}

export default ProfilePage;
