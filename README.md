React Node E-commerce

This is a complete e-commerce project built with React, Node.js, Express, and PostgreSQL. The project includes a modern, responsive frontend, a robust backend with JWT authentication, and a relational database to manage products, categories, and users.

Features

Frontend:

Modern interface built with React, Tailwind CSS, and Shadcn/UI.

Intuitive and responsive navigation.

Product grid and individual product view.

Functional shopping cart with add, remove, and quantity update features.

Stripe API integration for secure checkout.

Backend:

RESTful API built with Node.js and Express.

User authentication with JSON Web Tokens (JWT).

CRUD operations (Create, Read, Update, Delete) for products and categories.

PostgreSQL database connection.

Route to create Stripe checkout sessions.

Installation

Follow the steps below to set up and run the project in your local environment.

Prerequisites

Node.js (v14 or higher)

npm or pnpm

PostgreSQL

Backend

Navigate to the backend folder:

cd backend


Install dependencies:

npm install


Configure environment variables:

Create a .env file in the root of the backend folder.

Add the following variables, replacing them with your own values:

PORT=3001
DB_USER=your_postgres_user
DB_HOST=localhost
DB_DATABASE=ecommerce
DB_PASSWORD=your_postgres_password
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:3000


Set up the database:

Make sure PostgreSQL is running.

Create a user and database with the same names defined in the .env file.

Run the SQL script to create the tables:

psql -U your_postgres_user -d ecommerce -f database.sql


Start the development server:

npm run dev


The backend server will be running at http://localhost:3001.

Frontend

Navigate to the frontend folder:

cd frontend


Install dependencies:

pnpm install


Configure environment variables:

Create a .env.local file in the root of the frontend folder.

Add your Stripe publishable key:

VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key


Start the development server:

pnpm run dev


The frontend application will be available at http://localhost:3000 (or another port if 3000 is occupied).

Screenshots

Home Page

Product Page

Shopping Cart

Stripe Checkout

API Request Examples
Authentication

Register a new user: POST /api/auth/register

{
  "email": "user@example.com",
  "password": "password123"
}


Login: POST /api/auth/login

{
  "email": "user@example.com",
  "password": "password123"
}

Products

List all products: GET /api/products

Get a product: GET /api/products/:id

Create a product (requires authentication): POST /api/products

{
  "name": "New Product",
  "description": "Description of the new product.",
  "price": 99.99,
  "category_id": 1,
  "image_url": "http://example.com/image.png"
}

Categories

List all categories: GET /api/categories

Create a category (requires authentication): POST /api/categories

{
  "name": "New Category"
}

Credits

Developed by Rodrigo Marchi Gonella.
