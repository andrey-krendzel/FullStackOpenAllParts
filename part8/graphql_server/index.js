const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Person = require('./models/person')
const User = require('./models/user')
require('dotenv').config();


const jwt = require('jsonwebtoken')

const MONGO_PWD = process.env.MONGO_PWD
const JWT_SECRET = process.env.JWT_SECRET

const MONGODB_URI = `mongodb+srv://fullstack:${MONGO_PWD}@cluster0.nd6eu.mongodb.net/?retryWrites=true&w=majority`

console.log("mongo_pwd ", MONGO_PWD)

console.log("process.env ", process.env.MONGO_PWD)

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

  let persons = []

  const typeDefs = gql`
  type Address {  
    street: String!  
    city: String! 
  }


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
    me: User
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
        me: (root, args, context) => {
          return context.currentUser
        }
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
        addPerson: async (root, args) => {
          const person = new Person({ ...args })
          try {
            await person.save()
          } catch (error) {
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
          return person.save()
        }
      },

      createUser: async (root, args) => {
        const user = new User({ username: args.username })
    
        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if ( !user || args.password !== 'secret' ) {
          throw new UserInputError("wrong credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      },
    
  }

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {    
      const auth = req ? req.headers.authorization : null    
      if (auth && auth.toLowerCase().startsWith('bearer ')) {      
        const decodedToken = jwt.verify(        
          auth.substring(7), JWT_SECRET      
          )      
        const currentUser = await User.findById(decodedToken.id).populate('friends')      
        return { currentUser }    
      } 
     }
  })
  

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
  })


