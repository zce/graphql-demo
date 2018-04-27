const mongoose = require('mongoose')
const { Mixed, ObjectId } = mongoose.Schema.Types

const schema = new mongoose.Schema({
  slug: { type: String, unique: true },
  name: { type: String },
  // blog_tag blog_category course_tag course_category
  taxonomy: { type: String, default: 'tag' },
  description: { type: String },
  posts: [{ type: ObjectId, ref: 'Post' }],
  parent: { type: ObjectId, ref: 'Term' },
  children: [{ type: ObjectId, ref: 'Term' }],
  // count
  meta: { type: Mixed }
})

schema.loadClass(class {})

module.exports = mongoose.model('Term', schema)
