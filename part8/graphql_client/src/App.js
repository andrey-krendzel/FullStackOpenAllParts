import { gql, useQuery } from '@apollo/client'

const ALL_PERSONS = gql`
query {
  allPersons {
    name
    phone
    id
  }
}`

const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

const Person = ({person, onClose}) => {
  return (
    <div>
      
    </div>
  )
}

const Persons = ({ persons }) => {
  return (
    <div>
      <h2>Persons</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.phone}
        </div>  
      )}
    </div>
  )
}

function App() {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons}/>
    </div>
  )
}

export default App;
