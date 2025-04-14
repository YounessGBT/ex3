const express = require('express');
const UsersController = require('../controllers/usersController');

const setUsersRoutes = (app) => {
    const usersController = new UsersController();

    app.post('/api/users/register', usersController.registerUser.bind(usersController));
    app.post('/api/users/login', usersController.userLogin.bind(usersController));
    app.post('/api/users/admin-login', usersController.adminLogin.bind(usersController));
};

module.exports = setUsersRoutes;