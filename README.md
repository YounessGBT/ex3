# Support API

This project is a support application that allows users to submit and track support tickets, while also enabling support agents to manage tickets and communicate with users.

## Features

- User registration and login
- Ticket creation, retrieval, updating, and deletion
- Admin functionalities for managing tickets
- Communication between users and support agents

## Technologies Used

- Node.js
- Express
- SQLite (with Knex for database interactions)
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)

## Project Structure

```
support-api
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains controllers for handling requests
│   │   ├── ticketsController.js
│   │   └── usersController.js
│   ├── models                # Contains database models
│   │   ├── ticket.js
│   │   └── user.js
│   ├── routes                # Contains route definitions
│   │   ├── ticketsRoutes.js
│   │   └── usersRoutes.js
│   ├── services              # Contains business logic
│   │   ├── ticketService.js
│   │   └── userService.js
│   └── utils                 # Utility functions
│       └── logger.js
├── package.json              # NPM configuration file
├── .env                      # Environment variables
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd support-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables, such as database connection settings and JWT secret.

4. Run the application:
   ```
   npm start
   ```

## API Usage

### User Endpoints

- **POST /api/users/register**: Register a new user
- **POST /api/users/login**: User login
- **POST /api/users/admin-login**: Admin login

### Ticket Endpoints

- **POST /api/tickets**: Create a new ticket
- **GET /api/tickets**: Retrieve all tickets
- **GET /api/tickets/:id**: Retrieve a ticket by ID
- **PUT /api/tickets/:id**: Update a ticket by ID
- **DELETE /api/tickets/:id**: Delete a ticket by ID

## License

This project is licensed under the MIT License.