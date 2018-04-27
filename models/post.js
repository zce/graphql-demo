const mongoose = require('mongoose')
const { Mixed, ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  slug: { type: String, unique: true, lowercase: true, trim: true },
  title: { type: String },
  excerpt: { type: String },
  content: { type: Mixed },
  // blog page course video
  type: { type: String, default: 'blog' },
  status: { type: String, default: 'drafted', enum: ['inherit', 'drafted', 'published', 'trashed'] },
  comment: { type: String, default: 'opened', enum: ['opened', 'closed'] },
  user: { type: ObjectId, ref: 'User' },
  terms: [{ type: ObjectId, ref: 'Term' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  parent: { type: ObjectId, ref: 'Post' },
  children: [{ type: ObjectId, ref: 'Post' }],
  // comments views votes favs likes dislikes
  meta: { type: Mixed }
})

schema.loadClass(class {})

module.exports = mongoose.model('Post', schema)
