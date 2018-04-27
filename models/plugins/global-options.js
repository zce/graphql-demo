/**
 * Schema options
 * http://mongoosejs.com/docs/guide.html#options
 */

module.exports = schema => {
  schema.set('id', true)
  schema.set('_id', false)
  schema.set('timestamps', { createdAt: 'created_at', updatedAt: 'updated_at' })
  schema.set('validateBeforeSave', true)
  schema.set('versionKey', true)
  schema.set('strict', true)
}
