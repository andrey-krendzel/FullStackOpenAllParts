import { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0])
  const [topAnecdote, setTopAnecdote] = useState('')

  let top_points = 0
  let top_anecdote

  useEffect(() => {    

    for (let i =0; i<anecdotes.length-1; i++){
      if (points[i] > top_points){
        top_points=points[i]
        setTopAnecdote(anecdotes[i])
      }
    }

    }, [points])
 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes {points[selected]}</p>
    <button onClick={() => 
      setSelected(Math.floor(Math.random()*anecdotes.length))
    }>Next anecdote</button>
    <button onClick={() => {
      const copy = [...points];
      copy[selected] += 1;
      setPoints(copy);
    }}>Vote</button>
    <h1>Most voted anecdote</h1>
    <p>{topAnecdote}</p>
    </div>
  )
}

export default App