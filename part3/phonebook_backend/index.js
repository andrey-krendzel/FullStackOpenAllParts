
require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')

app.use(express.json())
var morgan = require('morgan')


app.use(morgan('tiny'))

morgan.token('post', function (req) { return req.headers['content-type'] })

const cors = require('cors')
app.use(cors())
app.use(express.static('build'))


app.get('/info', (request, response) => {
  Person.find({})
    .then(persons =>
    {
      console.log(persons.length)
      let currentTime = new Date('2019-06-11T00:00')
      response.send('<div><h1>Phonebook has info for ' + persons.length + ' people </h1>' + currentTime + '</div>')
    }
    )

})

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(persons =>
    {
      response.json(persons)
    }
    )
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {

  const body = request.body

  if (body.name.length < 3) {
    return response.status(400).json({ error: 'name is less than 3 characters' })
  }

  if (!body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }



  Person.find({})
    .then(persons =>
    {
      if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
          error: 'name already exists in the phonebook'
        })
      } else {
        const person = new Person({
          name: body.name,
          number: body.number,
        })

        person.save().then(savedPerson => {
          response.json(savedPerson)
        })
          .catch(error => next(error))
      }
    }
    )


})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number } = request.body


  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    return response.status(400).json({ error: error.message })
  }



}

// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})