/**
 * User model
 *
 * References:
 * - http://devsmash.com/blog/password-authentication-with-mongoose-and-bcrypt
 * - http://devsmash.com/blog/implementing-max-login-attempts-with-mongoose
 */

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const { Mixed, ObjectId } = mongoose.Schema.Types

/**
 * Model schema
 */

const schema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, unique: true, sparse: true },
  password: { type: String, required: true },
  nickname: { type: String, required: true },
  status: { type: String, required: true, default: 'unactivated', enum: ['unactivated', 'activated', 'forbidden'] },
  // subscriber contributor author editor administrator
  roles: [{ type: String }],
  tokens: [{ type: String }],
  posts: [{ type: ObjectId, ref: 'Post' }],
  comments: [{ type: ObjectId, ref: 'Comment' }],
  // avatar url bio cover location
  meta: { type: Mixed }
})

/**
 * Model methods
 */

schema.loadClass(class {
  /**
   * Find user by username or email or mobile
   * @param  {String}  unique username or email or mobile
   * @return {Promise}        Promise with resulting user entiry
   */
  static async findByUnique (unique) {
    let prop = 'username'
    if (validator.isEmail(unique)) {
      prop = 'email'
    } else if (validator.isNumeric(unique)) {
      prop = 'mobile'
    }
    return this.findOne({ [prop]: unique })
  }

  /**
   * Compare user password
   * @param  {String}  plain Plain password string
   * @return {Promise}       Promise with resulting password matched
   */
  async comparePassword (plain) {
    return bcrypt.compare(plain, this.password)
  }
})

/**
 * Model hooks
 */

schema.pre('validate', async function (next) {
  next()
})

schema.pre('save', async function (next) {
  if (!this.meta.avatar) {
    this.meta.avatar = `https://gravatar.com/avatar/${cryptor.md5(this.email)}?size=48`
  }
  if (this.isModified('password')) {
    this.password = bcrypt.hash(this.password, 8)
  }
  next()
})

schema.post('save', function(error, doc, next) {
  if (error.name !== 'MongoError' || error.code !== 11000) return next(error)
  next(new Error('There was a duplicate key error'))
})

/**
 * Export model
 */

module.exports = mongoose.model('User', schema)
