const express = require('express');
const jwt = require('jsonwebtoken');
const TicketsController = require('../controllers/ticketsController');

const setTicketsRoutes = (app) => {
    const router = express.Router(); // Définir router ici
    const ticketsController = new TicketsController();

    // Routes pour les tickets
    router.post('/', ticketsController.createTicket.bind(ticketsController));
    router.get('/', ticketsController.getAllTickets.bind(ticketsController));
    router.get('/:id', ticketsController.getTicketById.bind(ticketsController));
    router.put('/:id', ticketsController.updateTicket.bind(ticketsController));
    router.delete('/:id', ticketsController.deleteTicket.bind(ticketsController));

    // Middleware pour restreindre l'accès par rôle
    function restrictToRole(role) {
        return (req, res, next) => {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                if (decoded.role !== role) {
                    return res.status(403).json({ message: 'Forbidden' });
                }
                req.user = decoded;
                next();
            } catch (error) {
                res.status(401).json({ message: 'Invalid token' });
            }
        };
    }

    // Route pour supprimer un ticket (admin uniquement)
    router.delete(
        '/admin/:id',
        restrictToRole('admin'),
        (req, res) => ticketsController.deleteTicket(req, res)
    );

    app.use('/api/tickets', router);
};

module.exports = setTicketsRoutes;