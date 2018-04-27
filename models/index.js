/**
 * Models
 *
 * @see
 * - http://mongoosejs.com/docs/guide.html
 * - http://mongoosejs.com/docs/guide.html#options
 * - http://mongoosejs.com/docs/advanced_schemas.html
 */

const glob = require('glob')
const mongoose = require('mongoose')

/**
 * Use native Promise
 */

mongoose.Promise = global.Promise

/**
 * Load & use plugins
 */

glob.sync('./plugins/*.js', { cwd: __dirname }).forEach(item => {
  const plugin = require(item)
  if (typeof plugin !== 'function') return
  mongoose.plugin(plugin)
})

/**
 * Load & export models
 */

glob.sync('./*.js', { cwd: __dirname }).forEach(path => {
  if (path === './index.js') return
  const model = require(path)
  exports[model.modelName] = model
})

/**
 * Export mongoose
 */

exports.mongoose = mongoose

/**
 * Export connect mongodb server method
 */

exports.connect = ({ uri, options }) => mongoose.connect(uri, options)
