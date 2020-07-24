USE trybeer;

DELIMITER $$
CREATE FUNCTION getUserCart(userEmail VARCHAR(150))
RETURNS INT DETERMINISTIC
BEGIN
	DECLARE userId INT;
    SELECT user_id FROM Users AS u WHERE u.email = userEmail
    INTO userId;
	BEGIN
		DECLARE actualCart INT;
        SELECT MAX(cart_id) FROM Carts AS c WHERE c.user_id = userId
        INTO actualCart;
        IF (actualCart IS NOT NULL) THEN
			IF EXISTS(SELECT * FROM Purchases AS p WHERE p.cart_id = actualCart) THEN
				INSERT INTO Carts (user_id) VALUES (userId);
                RETURN (SELECT MAX(cart_id) FROM Carts AS c WHERE c.user_id = userId);
			ELSE
				RETURN (SELECT MAX(cart_id) FROM Carts AS c WHERE c.user_id = userId);
			END IF;
		ELSE
			INSERT INTO Carts (user_id) VALUES (userId);
			RETURN (SELECT MAX(cart_id) FROM Carts AS c WHERE c.user_id = userId);
        END IF;
	END;
END $$
DELIMITER ;
