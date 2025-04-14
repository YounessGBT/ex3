class TicketService {
    constructor(ticketModel) {
        this.ticketModel = ticketModel;
    }

    async createTicket(ticketData) {
        // Validate ticket data here
        const newTicket = await this.ticketModel.create(ticketData);
        return newTicket;
    }

    async getAllTickets() {
        const tickets = await this.ticketModel.findAll();
        return tickets;
    }

    async getTicketById(ticketId) {
        const ticket = await this.ticketModel.findById(ticketId);
        if (!ticket) {
            throw new Error('Ticket not found');
        }
        return ticket;
    }

    async updateTicket(ticketId, updateData) {
        // Gestion du champ closedAt
        if (updateData.status === 'closed') {
            if (!updateData.closedAt) {
                updateData.closedAt = new Date().toISOString(); // Définit la date actuelle si non fournie
            }

            const ticket = await this.ticketModel.findById(ticketId);
            if (ticket && new Date(updateData.closedAt) <= new Date(ticket.createdAt)) {
                throw new Error('closedAt must be later than createdAt');
            }
        }

        const updatedTicket = await this.ticketModel.update(ticketId, updateData);
        if (!updatedTicket) {
            throw new Error('Ticket not found or update failed');
        }
        return updatedTicket;
    }

    async deleteTicket(ticketId) {
        const result = await this.ticketModel.delete(ticketId);
        if (!result) {
            throw new Error('Ticket not found or delete failed');
        }
        return result;
    }
}

module.exports = TicketService;