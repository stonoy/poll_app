import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPolls } from '../feature/pollSlice'
import Poll from './Poll'
import { Link } from 'react-router-dom'

const Polls = () => {
 
    const {polls, loading, submitting, answeredPollsId} = useSelector(state => state.poll)
    const dispatch = useDispatch()
  
    useEffect(() => {
      const intId = setInterval(() => {
        dispatch(getPolls())
      }, 5000)
  
      return () => {
        clearInterval(intId)
      }
    }, [])
  
    if (polls.length == 0){
      return <div className="w-full h-screen justify-center items-center">
        <h1>No polls to show</h1>
      </div>
    }
  
    if (loading){
      return <div className="w-full h-screen justify-center items-center">
        <h1>Loading...</h1>
      </div>
    }
  
    return (
      <div className="max-w-2xl mx-auto p-5">
        <div className='flex justify-between items-center'>
        <h1 className="text-2xl font-bold text-center mb-5">Polls</h1>
        <Link to="/create"  className="text-2xl font-bold text-center mb-5 inline-block">Create Poll</Link>
        </div>
  
        {polls.map((poll) => {
          const showResults = answeredPollsId.includes(poll?._id)
          return (
            <div key={poll._id} className="border border-gray-400 rounded-lg p-4 mb-5 shadow-md">
            <h2 className="text-lg font-semibold mb-2">{poll?.question}</h2>
  
            <ul className="space-y-2">
              {poll?.options.map((option) => <Poll key={option._id} {...option} showResults={showResults} pollId={poll?._id}/>)}
            </ul>
          </div>
          )
        })}
      </div>
    );
  }

export default Polls