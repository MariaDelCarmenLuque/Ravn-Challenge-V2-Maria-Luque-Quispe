# Dessert Store
## Table of Contents
- Description 
- Installation 
- Usage / Documentation 
- Technologies & Libraries 
- Pending Features
- Collaboration
- Authors 

## Description
This project is an API for a Dessert Store App where you can register & login users, create products,search products by category.

As an *MANAGER* user, you can create, uodate, delete and disable products, upload images per product and, show client orders.

As a *CLIENT* user, you can see, buy and like products, see the product details, add products to cart and, show your order.

## Installation
```bash
$ git clone https://github.com/MariaDelCarmenLuque/Ravn-Challenge-V2-Maria-Luque-Quispe.git
```
```bash
$ npm install
```
## Usage / Documentation
Create a `.env` file using the `.env.example` file:

```bash


#DATABASE
DB_PORT=port_where_the_app_is_running_at
DB_HOST=host_where_the_app_is_running_at
DB_USERNAME=your_db_username
DB_PASS=your_db_password
DB_NAME=your_db_name

```

#### Run the app:
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```

#### Run the test:
```bash
# unit tests
$ npm run test

```
#### Documentation:

`HOST:PORT/api/docs`

## Technologies & Libraries
- NestJs
- Typescript
- PostgreSQL
- Jest
- Prettier
- ESLint
- REST 
- Swagger
- Typeorm
## Pending Features

- Include Unit Testing for Controllers an Services.
- Add Buy Products by Client.
- Add Like Products bye Client.
- Add implemntation in disableProduct method
- Add error catch for validation in fields of entities.
- Add update & delete(softdelete) methods for Carts, Categories, CartItems and Images entities.
- Add softdelete methods in Users entity.

## Collaboration
Collaboration with the project are welcome.

> Do a Pull request

> For major changes, please open an issue first to discuss what you would like to change.

## Authors
Maria del Carmen Luque Quispe

Where to find me:
|Network   |                     Link to access                   |
|----------|------------------------------------------------------|
| GitHub   |   https://github.com/MariaDelCarmenLuque             |
|LinkedIn  |   www.linkedin.com/in/maria-del-carmen-luque-quispe  |
