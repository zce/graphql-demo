const uniqueValidator = require('mongoose-unique-validator')

module.exports = schema => uniqueValidator(schema, {})
