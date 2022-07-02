import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import personService from './services/persons'

import { useState, useEffect } from 'react'

const Notification = ({ message, type }) => {
  if (message === '') {
    return null
  }

  if (type === 'error') {
    return (
    <div className='error'>
      {message}
    </div>
  )
    } else if (type === 'success') {
      return (
        <div className='success'>
        {message}
      </div>
      )
    }
}

const Filter = (props) => {
  return(
    <div>
      <h3>Filter</h3>
      Filter by name: 
    <input 
    value={props.newFilter}
    onChange={props.handleFilterChange} />
    </div>
  )
}

const PersonForm = (props) => {
 return(
  <form onSubmit={props.addPerson}>
  <div>
    <h3> Add new person </h3>
    name: <input 
    value={props.newName}
    onChange={props.handleNameChange}/>
  </div>
  <div>
    number: <input 
    value={props.newNumber}
    onChange={props.handleNumberChange}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
 )
}

const Persons = (props) => {
  return(
  <div>
  <h3>Numbers</h3>
  {props.persons.filter(person => person.name.toLowerCase().includes(props.newFilter.toLowerCase())).map(person => 
          <li key={person.id}>{person.name} {person.number}<button onClick={() => props.deletePerson(person.id, person.name)}>Delete</button></li>
          
        )}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: '', type: 'error'})

  //Get
  useEffect(() => {
    personService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  //Add/post
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    const personObject = {
      name: newName,
      number: newNumber,
      //id: Math.random()
    }


    //If person's name exists in the phonebook
    if (persons.find(person => person.name === personObject.name)){
      setErrorMessage({message: `${newName} is already in the phonebook`, type: 'error'})
      setTimeout(() => {          
        setErrorMessage('')        
      }, 5000)

      const foundPerson = persons.find(person => person.name === personObject.name)

      //run update method
      updatePerson(foundPerson.id, foundPerson.name, personObject)
    } else {

      //Persons name doesn't exist so you add new person
      personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        setErrorMessage({message: `Added ${personObject.name}`, type: 'success'})
        setTimeout(() => {          
          setErrorMessage('')        
        }, 5000)
        //setPersons(persons.concat(personObject))
        //setNewName('')
      })
      .catch(error => {
        console.log(error.response.data.error)
        setErrorMessage({message: error.response.data.error, type: 'error'})
      })

    }

    
    
  }


  //update
  const updatePerson = (id, name, personObject) => {
    if (window.confirm(`${name} is already in the phonebook. Do you want to replace the number?`)){
      
      personService
      .update(id, personObject)
      .then(response => {console.log(response)
        setPersons(persons.filter(person=> person.id !== id).concat(personObject))
      setErrorMessage({message: `Person ${name} has been updated`, type: 'success'})

    })
      .catch(error => {
        setErrorMessage({message: error.message, type:'error'})
      })
      setTimeout(() => {          
        setErrorMessage('')        
      }, 5000)
    }
  }

  //delete
  const deletePerson = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}?`)) {
      personService
      .deleteNote(id)
      .then(response => {
        console.log(response)
        setErrorMessage({message: `Person ${name} deleted`, type:'success'}
        )
        setTimeout(() => {          
          setErrorMessage('')        
        }, 5000)
        //Filter trick to remove deleted entries from the list instantly
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        if (error.message === 'Request failed with status code 404') {
        setErrorMessage({message: `${name} was already deleted from the server`, type:'error'})
      } else {
        setErrorMessage({message: error.message, type:'error'})
      }
      setTimeout(() => {          
        setErrorMessage('')        
      }, 5000)
    })

    }

  }


  //handlechangers

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }


 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage.message} type={errorMessage.type} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <Persons persons={persons} newFilter={newFilter} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App
