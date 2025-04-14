const { Model } = require('objection');

class Ticket extends Model {
  static get tableName() {
    return 'tickets';
  }

  static get idColumn() {
    return 'id';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title', 'description', 'status', 'userId'],

      properties: {
        id: { type: 'integer' },
        title: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: 'string', minLength: 1 },
        status: { type: 'string', enum: ['open', 'in_progress', 'closed'], default: 'open' },
        userId: { type: 'integer' },
        createdAt: { type: 'string', format: 'date-time' },
        closedAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    };
  }

  static get relationMappings() {
    const User = require('./user');

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'tickets.userId',
          to: 'users.id',
        },
      },
    };
  }
}

module.exports = Ticket;