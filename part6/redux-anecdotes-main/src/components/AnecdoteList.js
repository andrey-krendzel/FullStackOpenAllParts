import { useDispatch, useSelector } from 'react-redux'
import { voteOn } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'


const Anecdote = ({ anecdote, handleClick }) => {
    return(
        <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleClick}>vote</button>
        </div>
      </div>
    )
  }

  const AnecdoteList = () => {
    const dispatch = useDispatch()  
    const anecdotes = useSelector(state => [...state.anecdotes]
      
      .sort(function (a,b) {
       return b.votes - a.votes
   })
    
    )

    

    return(
      <div>
        {anecdotes.map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              
              dispatch(voteOn(anecdote.id))
              dispatch(notificationChange(anecdote.content, 10))
              
            }
            }
          />
        )}
      </div>
    )
  }

export default AnecdoteList