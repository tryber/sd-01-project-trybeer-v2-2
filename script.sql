CREATE DATABASE IF NOT EXISTS trybeer;
USE trybeer;

CREATE TABLE IF NOT EXISTS user (
  user_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  admin TINYINT(1) NOT NULL DEFAULT 0,
  password VARCHAR(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS product (
  product_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  price DOUBLE NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
  cart_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE IF NOT EXISTS purchase (
  purchase_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  street VARCHAR(150) NOT NULL,
  number INT NOT NULL,
  finished TINYINT(1) NOT NULL DEFAULT 0,
  cart_id INT NOT NULL,
  price DOUBLE NOT NULL,
  purchase_date DATE NOT NULL,
  FOREIGN KEY (cart_id) REFERENCES cart (cart_id)
);

CREATE TABLE IF NOT EXISTS cart_products (
  product_id INT NOT NULL,
  cart_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  PRIMARY KEY (product_id, cart_id),
  FOREIGN KEY (product_id) REFERENCES product (product_id),
  FOREIGN KEY (cart_id) REFERENCES cart (cart_id)
);

INSERT INTO product (name, price) VALUES
('Skol Lata 350ml', '2.20'),
('Heineken 600ml', '7.50'),
('Antarctica Pilsen 300ml', '2.49'),
('Brahma 600ml', '7.50'),
('Skol 269ml', '2.19'),
('Skol Beats Senses 313ml', '4.49'),
('Becks 330ml', '4.99'),
('Brahma Duplo Malte 350ml', '2.79'),
('Becks 600ml', '8.89'), ('Skol Beats Senses 269ml', '3.57'),
('Stella Artois 275ml', '3.49');

DELIMITER $$
CREATE PROCEDURE getCartProducts(IN cartId INT)
BEGIN
	SELECT p.name, p.price, cp.quantity FROM cart_products AS cp
  INNER JOIN product AS p ON p.product_id = cp.product_id
  WHERE cart_id = cartId;
END $$ DELIMITER ;

DELIMITER $$
CREATE FUNCTION getUserCart(userEmail VARCHAR(150))
RETURNS INT DETERMINISTIC
BEGIN
	DECLARE userId INT;
    SELECT user_id FROM user AS u WHERE u.email = userEmail
    INTO userId;
	BEGIN
		DECLARE actualCart INT;
        SELECT MAX(cart_id) FROM cart AS c WHERE c.user_id = userId
        INTO actualCart;
        IF (actualCart IS NOT NULL) THEN
			IF EXISTS(SELECT * FROM purchase AS p WHERE p.cart_id = actualCart) THEN
				INSERT INTO cart (user_id) VALUES (userId);
                RETURN (SELECT MAX(cart_id) FROM cart AS c WHERE c.user_id = userId);
			ELSE
				RETURN (SELECT MAX(cart_id) FROM cart AS c WHERE c.user_id = userId);
			END IF;
		ELSE
			INSERT INTO cart (user_id) VALUES (userId);
			RETURN (SELECT MAX(cart_id) FROM cart AS c WHERE c.user_id = userId);
        END IF;
	END;
END $$
DELIMITER ;
