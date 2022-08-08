const { ApolloServer, gql, UserInputError } = require('apollo-server')
const mongoose = require('mongoose')
const Person = require('./models/person')

const MONGODB_URI = `mongodb+srv://fullstack:${MONGO_PWD}@cluster0.nd6eu.mongodb.net/?retryWrites=true&w=majority`

const jwt = require('jsonwebtoken')

const JWT_SECRET = 'SECRET_KEY'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



  const { v1: uuid } = require('uuid')
  
  const typeDefs = gql`
  type Address {  street: String!  city: String! }


  type User {
  username: String!
  friends: [Person!]!
  id: ID!
  }

  type Token {
    value: String!
  }

  type Person {
    name: String!
    phone: String
    street: String!
    city: String! 
    address: Address!
    id: ID!
  }

  enum YesNo {  
      YES  
      NO
    }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(
      name: String!
      phone: String!
    ): Person
    createUser(
      username: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  `

  const resolvers = {
      Query: {
        personCount: async () => Person.collection.countDocuments(),
        allPersons: async (root, args) => {
          if (!args.phone) {
            return Person.find({})
          }

          return Person.find({ phone: { $exists: args.phone === 'YES' } })
        },
        findPerson: async (root, args) => Person.findOne({ name: args.name }),
      },
      Person: {
        address: (root) => {
            return {         
                street: root.street, 
                city: root.city      
            }
        }
      },
      Mutation: {
        createUser: async (root, args) => {
          const user = new User({ username: args.username })

          return user.save()
            .catch(error => {
              throw new UserInputError(error.message, {
                invalidArgs: args,
              })
            })
        },
        
        addPerson: async (root, args) => {
          const person = new Person({ ...args })

          try {
            await person.save()
          } catch (error){
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return person
        },

        editNumber: async (root, args) => {
          const person = await Person.findOne({ name: args.name })
          person.phone = args.phone
          
          try {
            await person.save()
          } catch (error) {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          }
          return person
          }
      }
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })


