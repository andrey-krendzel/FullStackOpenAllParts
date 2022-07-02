
const Header = (props) => {
    return(
      <h1>{props.name}</h1>
    )
  }
  
  const Part = (props) => {
    return(
      <p>{props.part} {props.exercises} </p>
    )
  }
  
  const Content = (props) => {
  
  
    return (
      <div>
      {props.parts.map(part => <Part key={part.id} part={part.name} exercises={part.exercises} /> )}
      </div>
      )
  
  }
  
  const Total = (props) => {
  
    
  
    let total = 0
    for (let i =0; i<props.parts.length; i++){
      total += props.parts[i].exercises
    }
    return(
      <p>Total: {total}</p>
    )
  
  
  }
  
  const Course = ({course}) => {
    return(
      <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
    )
  }

  export default Course