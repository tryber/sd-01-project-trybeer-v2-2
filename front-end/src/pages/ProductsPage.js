import React, { useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Cards from '../components/Cards';
import SideBar from '../components/SideBar';
import { validateLogin } from '../service';

async function getProducts() {
  const token = JSON.parse(localStorage.getItem('user')).token;
  return await fetch('http://localhost:3001/products', { headers: { authorization: token } })
    .then((res) => res.json())
    .then((result) => result);
}

async function submitProduct(productName, quantity) {
  const token = JSON.parse(localStorage.getItem('user')).token;
  await fetch('http://localhost:3001/products',
    {
      method: 'POST',
      headers: {
        authorization: token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ productName, quantity })
    });
}
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  btnContainer: {
    width: '70%',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#0fa36b'
  },
  btnLinkActivate: {
    margin: '0, 25%, 0, 25%',
    fontSize: '2em',
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  btnLinkDisabled: {
    margin: '0, 25%, 0, 25%',
    fontSize: '2em',
    textDecoration: 'none',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    pointerEvents: 'none',
  }
}));

function generateView(classes, data, totalValue, setTotalValue, submitProduct) {
  return (
    <div>
      <div className={classes.container}>{data.map((product) =>
        <Cards
          key={product.name}
          price={product.price}
          name={product.name}
          quantity={product.quantity || 0}
          image={`http://localhost:3001/${product.name}.jpg`}
          func={submitProduct}
          setTotal={{ totalValue, setTotalValue }}
        />)}
      </div>
      <div className={classes.btnContainer}>
        <Link className={totalValue ? classes.btnLinkActivate : classes.btnLinkDisabled}
          to='/checkout' data-testid="checkout-bottom-btn">
          <p>Ver carrinho</p>
          <p data-testid="checkout-bottom-btn-value">
            R${totalValue.toFixed(2)}
          </p>
        </Link>
      </div>
    </div>
  );
}

function ProductsPage() {
  const [isLoged, setIsLoged] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [data, setData] = useState('');
  const [totalValue, setTotalValue] = useState(0);
  const user = JSON.parse(localStorage.getItem('user')) || '';
  const classes = useStyles();

  useEffect(() => {
    async function login() {
      const user = await validateLogin(setIsAdmin, setIsLoged);
      if (user) {
        const products = await getProducts();
        setTotalValue(products.reduce((acc, value) => acc + (value.price * (value.quantity || 0)), 0));
        setData(products);
      }
    }
    login();
  }, []);

  if (!isLoged) return <Redirect to='/login' />;
  if (isAdmin || user.role) return <Redirect to='/admin/orders' />;
  if (!data) return <div>Loading...</div>;
  return (
    <SideBar title="Cliente - Produtos" children={
      generateView(classes, data, totalValue, setTotalValue, submitProduct)
    } />
  );
}

export default ProductsPage;
