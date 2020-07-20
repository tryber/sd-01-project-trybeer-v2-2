import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import SideBar from '../components/SideBar';
import Loading from '../components/Loading';
import InvoiceTotal from '../components/InvoiceTotal';
import Address from '../components/Address';
import { getOrders, sendAddress, total } from '../service';

function render(data, setShouldUpdate, setCheckout) {
  return (
    <SideBar
      title='Cliente - Checkout'
      children={
        <div>
          <InvoiceTotal data={data} setShouldUpdate={setShouldUpdate}/>
          <Address setCheckout={setCheckout} />
        </div>
      }
    />
  );
}

function Checkout() {
  const [data, setData] = useState('');
  const [checkout, setCheckout] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [shouldUpdate, setShouldUpdate] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    getOrders(user, setData);
    setShouldUpdate(false);
  }, [shouldUpdate]);
  useEffect(() => {
    if (checkout) {
      sendAddress({
        purchaseDate: new Date().toISOString().split('T')[0],
        street: checkout[0],
        number: checkout[1],
        price: total(data),
      }, user, setShouldRedirect);
    }
  }, [checkout]);
  if (!user) return <Redirect to="/login" />
  if (!data) return <Loading />;
  if (shouldRedirect) return <Redirect to="/products" />
  return (
    render(data, setShouldUpdate, setCheckout)
  );
}

export default Checkout;
