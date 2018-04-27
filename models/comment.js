/**
 * Comment model
 */

const mongoose = require('mongoose')
const { Mixed, ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  author: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    url: { type: String, required: true },
    agent: { type: String, required: true },
    ip: { type: String, required: true }
  },
  content: { type: Mixed },
  status: { type: String, default: 'held', enum: ['held', 'approved', 'spammed', 'trashed'] },
  post: { type: ObjectId, ref: 'Post' },
  user: { type: ObjectId, ref: 'User' },
  parent: { type: ObjectId, ref: 'Comment' },
  children: [{ type: ObjectId, ref: 'Comment' }],
  // likes dislikes
  meta: { type: Mixed }
})

schema.loadClass(class {})

module.exports = mongoose.model('Comment', schema)
