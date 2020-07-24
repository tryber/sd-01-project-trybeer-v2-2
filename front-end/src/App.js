import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProductsPage from './pages/ProductsPage';
import OrderPage from './pages/OrderPage';
import OrderDetails from './pages/OrderDetails';
import Checkout from './pages/Checkout';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <Route path='/admin/login' component={LoginPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/products' component={ProductsPage} />
          <Route path='/register' component={RegisterPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/admin/profile' component={ProfilePage} />
          <Route path='/orders/:id' component={OrderDetails} />
          <Route path='/orders' component={OrderPage} />
          <Route path='/admin/orders/:id' component={OrderDetails} />
          <Route path='/admin/orders' component={OrderPage} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/admin/checkout' component={Checkout} />
          <Route path='/chat' component={Chat} />
          <Route path='/admin/chat' component={ChatList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
