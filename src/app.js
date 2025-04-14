const express = require('express');
const knex = require('knex');
const bodyParser = require('body-parser');
const ticketsRoutes = require('./routes/ticketsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const logger = require('./utils/logger');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const db = knex({
    client: 'sqlite3',
    connection: {
        filename: process.env.DB_FILENAME
    },
    useNullAsDefault: true
});

// Routes
app.use('/api/tickets', ticketsRoutes(db));
app.use('/api/users', usersRoutes(db));

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`);
});