DROP DATABASE IF EXISTS cryptocurrencies;
CREATE DATABASE cryptocurrencies;

\c cryptocurrencies;

CREATE TABLE cryptocurrency (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  symbol VARCHAR,
  amount INTEGER,
  price INTEGER,
  DOB DATE,
  DOS DATE
);

INSERT INTO cryptocurrency (name, symbol, amount, price, DOB, DOS)
  VALUES ('Tyler', 'Retrieved', 3, 'M');