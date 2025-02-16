import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../feature/pollSlice'

const Poll = ({option, count, _id, showResults, pollId}) => {
  const { submitting} = useSelector(state => state.poll)
  const dispatch = useDispatch()

  return (
    <li  className="flex justify-between items-center p-2 bg-gray-100 rounded" >
                <button disabled={submitting} onClick={() => dispatch(vote({pollId, selectedOptionId:_id}))}>{option}</button>
                {showResults && <span className="text-blue-600 font-semibold">{count} votes</span>}
              </li>
  )
}

export default Poll