const express = require('express')
const graphqlHTTP = require('express-graphql')

const models = require('./models')

const schema = require('./schema')

models.connect({
  uri: 'mongodb://localhost/wedn-dev',
  // http://mongoosejs.com/docs/connections.html#options
  options: { poolSize: 10 }
})

const app = express()

app.use('/graphql', graphqlHTTP({ schema: schema, graphiql: true }))

module.exports = app
