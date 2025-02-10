# Choinek

A modern platform for purchasing and managing Christmas trees, integrating advanced web technologies and user-friendly interfaces.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- Product listing with detailed descriptions and images
- Dynamic filtering and sorting of products
- Related products suggestions

## Technologies Used

- **Frontend:** React
- **Backend:** Flask, MySQL
- **Authentication:** JWT (JSON Web Tokens)
- **Styling:** CSS, Flexbox

## Installation

1. Start MySQL and set up database
    ```sql
    -- Run the SQL script to create the database and tables
    mysql -u root -p < backend/choinek_database.sql
    ```

2. Set up the frontend:
    ```bash
    cd ../frontend
    npm install
    ```

## Usage

1. Start the backend server:
    ```bash
    cd backend
    python app.py
    ```

2. Start the frontend development server:
    ```bash
    cd frontend
    npm run dev start
    ```

3. Open your browser and navigate to `http://localhost:3000` for user interface.

4. Open your browser and navigate to `http://localhost:5175` for admin interface.

## API Endpoints

- `POST /login` - User login
- `GET /choinki` - Get list of Christmas trees
- `POST /add_choinka` - Add a new Christmas tree
- `DELETE /delete_choinka/<int:choinka_id>` - Delete a Christmas tree
- `PUT /edit_choinka/<int:choinka_id>` - Edit a Christmas tree
- `GET /produkty` - Get list of products
- `POST /add_produkt` - Add a new product
- `DELETE /delete_produkt/<int:produkt_id>` - Delete a product
- `PUT /edit_produkt/<int:produkt_id>` - Edit a product
- `GET /choinka/<int:choinka_id>` - Get details of a specific Christmas tree