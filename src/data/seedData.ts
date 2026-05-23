export const seedSql = `
PRAGMA foreign_keys = ON;

CREATE TABLE customers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  city TEXT
);

CREATE TABLE addresses (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL,
  order_date TEXT NOT NULL,
  total REAL NOT NULL,
  status TEXT NOT NULL,
  FOREIGN KEY(customer_id) REFERENCES customers(id)
);

CREATE TABLE employees (
  id INTEGER PRIMARY KEY,
  employee_id TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  manager_id INTEGER,
  department_id INTEGER,
  FOREIGN KEY(manager_id) REFERENCES employees(id)
);

CREATE TABLE salaries (
  id INTEGER PRIMARY KEY,
  employee_id TEXT NOT NULL,
  department_id INTEGER NOT NULL,
  salary INTEGER NOT NULL
);

CREATE TABLE accounts (
  id INTEGER PRIMARY KEY,
  owner TEXT NOT NULL,
  balance REAL NOT NULL
);

CREATE TABLE tags (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);

INSERT INTO customers(id, name, email, city) VALUES
(1, 'Alice', 'alice@example.com', 'New York'),
(2, 'Bob', NULL, 'Boston'),
(3, 'Carla', 'carla@example.com', 'Chicago'),
(4, 'Diego', 'diego@example.com', 'Boston'),
(5, 'Ema', NULL, 'Seattle');

INSERT INTO addresses(id, customer_id, city, country) VALUES
(1, 1, 'New York', 'USA'),
(2, 2, 'Boston', 'USA'),
(3, 3, 'Chicago', 'USA');

INSERT INTO orders(id, customer_id, order_date, total, status) VALUES
(1, 1, '2025-01-01', 120.50, 'paid'),
(2, 1, '2025-01-12', 320.00, 'paid'),
(3, 2, '2025-01-20', 80.00, 'pending'),
(4, 3, '2025-02-05', 450.10, 'paid'),
(5, 4, '2025-02-09', 230.00, 'paid'),
(6, 2, '2025-02-11', 99.99, 'cancelled');

INSERT INTO employees(id, employee_id, name, manager_id, department_id) VALUES
(1, 'E001', 'Maya', NULL, 10),
(2, 'E002', 'Noah', 1, 10),
(3, 'E003', 'Olivia', 1, 20),
(4, 'E004', 'Liam', 2, 10),
(5, 'E005', 'Sophia', 3, 20);

INSERT INTO salaries(id, employee_id, department_id, salary) VALUES
(1, 'E001', 10, 150000),
(2, 'E002', 10, 120000),
(3, 'E003', 20, 125000),
(4, 'E004', 10, 95000),
(5, 'E005', 20, 98000);

INSERT INTO accounts(id, owner, balance) VALUES
(1, 'Alice', 1200.00),
(2, 'Bob', 950.00);

INSERT INTO tags(id, name) VALUES
(1, 'important'),
(2, 'archived');
`;
