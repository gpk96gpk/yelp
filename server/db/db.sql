CREATE TABLE reviews( 
    id BIGSERIAL NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT NOT NULL check(rating >= 1 and rating <=5),
    restaurant_id BIGINT NOT NULL,
    CONSTRAINT reviews_restaurant_id
        FOREIGN KEY(id)
            REFERENCES restaurants(id)
                ON DELETE CASCADE
);

SELECT restaurant_id, TRUNC(AVG(rating),1), COUNT(rating) FROM reviews GROUP BY restaurant_id;

SELECT COUNT(rating) FROM reviews WHERE restaurant_id=


SELECT
    id,
    restaurant_id,
    restaurants.name,
    restaurants.location,
    price_range,
    average_rating,
    count
FROM
    restaurants
LEFT JOIN 
(
SELECT
    restaurant_id,
    COUNT(*) AS count,
    TRUNC(AVG(rating),1) AS average_rating
FROM reviews
GROUP BY restaurant_id
)
    reviews 
ON restaurants.id = reviews.restaurant_id;


SELECT
    *
FROM
    restaurants
LEFT JOIN 
(
SELECT
    restaurant_id,
    COUNT(*),
    TRUNC(AVG(rating),1) AS average_rating
FROM reviews
GROUP BY restaurant_id
)
    reviews 
ON restaurants.id = reviews.restaurant_id;