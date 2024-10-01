-- Create Database
CREATE DATABASE "food_transaction_app";

-- Create Customer Table
CREATE TABLE customers (
  customer_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  phone VARCHAR NOT NULL,
  address VARCHAR NOT NULL
);

-- Create Food Table
CREATE TABLE foods (
  food_id SERIAL PRIMARY KEY,
  food_name VARCHAR NOT NULL,
  food_price INTEGER NOT NULL,
  food_stock INTEGER NOT NULL
);

-- Create Transaction Table
CREATE TABLE transactions (
    transaction_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    food_id INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    transaction_date TIMESTAMP NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE,
    FOREIGN KEY (food_id) REFERENCES foods(food_id) ON DELETE CASCADE
);