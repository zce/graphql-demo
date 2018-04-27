// const { buildSchema } = require('graphql')

// // 使用 GraphQL Schema Language 创建一个 schema
// module.exports = buildSchema(`
//   type User {
//     slug: String!
//     username: String!
//     email: String!
//     mobile: String!
//     password: String!
//     nickname: String!
//     status: String!
//   }

//   type Query {
//     users: [ User ]
//     user(id: String): User
//   }
// `)

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql')

const QueryRootType = new GraphQLObjectType({
  name: 'QueryRoot',
  description: 'Query root endpoint',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: (...args) => {
        console.log(...args)
        return 'world'
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: QueryRootType
})
