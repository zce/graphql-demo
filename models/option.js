const mongoose = require('mongoose')
const { Mixed } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: { type: Mixed },
  enabled: { type: Boolean, default: true }
})

schema.loadClass(class {})

module.exports = mongoose.model('Option', schema)
