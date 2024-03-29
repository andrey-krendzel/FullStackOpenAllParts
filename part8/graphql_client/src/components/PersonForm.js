import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const CREATE_PERSON = gql`
mutation createPerson ($name: String!, $street: String!, $city: String!, $phone: String){
  addPerson(
    name: $name,
    street: $street,
    city: $city,
    phone: $phone
  ) {
    name
    phone
    id
    address {
      street
      city
    }
  }
}`

const ALL_PERSONS = gql`
  query  {
    allPersons  {
      name
      phone
      id
    }
  }
`

export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone) {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`


const PersonForm = ({ setError }) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [ createPerson ] = useMutation(CREATE_PERSON, {
      refetchQueries: [ { query: ALL_PERSONS } ],
      onError: (error) => {
        setError(error.graphQLErrors[0].message)
      }
    })

    const submit = (event) => {
        event.preventDefault()

        createPerson({ variables: {name, phone, street, city }})

        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={submit}>
             <div>
                 name <input value={name} onChange={({target}) => setName(target.value)} />
             </div>
             <div>
                  phone <input value={phone}
                  onChange={({ target }) => setPhone(target.value)}
                  />
              </div>
              <div>
                  street <input value={street}
                  onChange={({ target }) => setStreet(target.value)}
                />
              </div>
              <div>
                  city <input value={city}
                  onChange={({ target }) => setCity(target.value)}
                />
              </div>
              <button type='submit'>add!</button>
            </form>
        </div>
    )
}

export default PersonForm;