'use strict';

// See http://swagger.io/specification/ for more data types

module.exports = {
  id: 'Widget',
  required: ['id', 'name'],
  properties: {
    id: {
      type: 'string',
      description: 'The identifier of the widget. Should be a UUID.',
      pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}'
    },
    name: {
      type: 'string',
      description: 'The name of the widget.'
    },
    price: {
      type: 'number',
      format: 'float',
      description: 'The price of the widget.'
    }
  }
};
