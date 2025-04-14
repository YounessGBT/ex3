class TicketsController {
    constructor(ticketService) {
        this.ticketService = ticketService;
    }

    async createTicket(req, res) {
        try {
            const ticketData = req.body;
            const newTicket = await this.ticketService.createTicket(ticketData);
            res.status(201).json(newTicket);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getAllTickets(req, res) {
        try {
            const tickets = await this.ticketService.getAllTickets();
            res.status(200).json(tickets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTicketById(req, res) {
        try {
            const ticketId = req.params.id;
            const ticket = await this.ticketService.getTicketById(ticketId);
            if (ticket) {
                res.status(200).json(ticket);
            } else {
                res.status(404).json({ message: 'Ticket non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateTicket(req, res) {
        try {
            const ticketId = req.params.id;
            const ticketData = req.body;
            const updatedTicket = await this.ticketService.updateTicket(ticketId, ticketData);
            if (updatedTicket) {
                res.status(200).json(updatedTicket);
            } else {
                res.status(404).json({ message: 'Ticket non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async deleteTicket(req, res) {
        try {
            const ticketId = req.params.id;
            const deleted = await this.ticketService.deleteTicket(ticketId);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Ticket non trouvé' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = TicketsController;