const conn = require('../connection');

const getCartId = async email => new Promise((resolve, reject) => {
  conn.query(`SELECT getUserCart("${email}")`, (err, results) => {
    if (err) return reject(err);
    return resolve(results[0][`getUserCart("${email}")`]);
  });
});

const getProductsInCart = async (email, cartId) => {
  const id = cartId || await getCartId(email);
  return {
    data: await new Promise((resolve, reject) => {
      conn.query(`CALL getCartProducts(${id})`, (err, results) => {
        if (err) return reject(err);
        return resolve(results[0]);
      });
    }),
    id,
  };
};

const getAllProducts = async () => new Promise((resolve, reject) => {
  conn.query('SELECT * FROM trybeer.product;', (err, results) => {
    if (err) return reject(err);
    return resolve(results);
  });
});

async function getProducts(email) {
  const productsInCart = await getProductsInCart(email);
  const allProducts = await getAllProducts();
  allProducts.forEach((product, productIndex) => {
    productsInCart.data.forEach((cartProducts) => {
      if (product.name === cartProducts.name)
        allProducts[productIndex].quantity = cartProducts.quantity;
    });
  });
  return allProducts;
}

const deleteBuy = async (productName, id) => new Promise((resolve, reject) => {
  conn.query(
    `DELETE FROM cart_products WHERE cart_id = ${id}
    AND product_id = (SELECT product_id FROM
    product WHERE name = "${productName}")`,
    (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
});

const updateBuy = async (productName, quantity, id) => new Promise((resolve, reject) => {
  conn.query(
    `UPDATE cart_products
    SET quantity = ${quantity}
    WHERE cart_id = ${id}
    AND product_id = (SELECT product_id FROM
    product WHERE name = "${productName}")`,
    (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
});

const createBuy = async (productName, id) => new Promise((resolve, reject) => {
  conn.query(
    `INSERT INTO cart_products
  (product_id, cart_id, quantity)
  values
  (
    (SELECT product_id FROM
    product WHERE name = "${productName}"),
    ${id},
    1
  )`,
    (err, results) => {
      if (err) return reject(err);
      return resolve(results);
    });
});

module.exports = { getProducts, getProductsInCart, deleteBuy, updateBuy, createBuy, getCartId };
