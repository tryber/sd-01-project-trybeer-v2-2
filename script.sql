CREATE DATABASE IF NOT EXISTS trybeer;
USE trybeer;

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
