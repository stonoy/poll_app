import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createPoll } from '../feature/pollSlice'

const Modal = () => {
  const formRef = useRef(null)
  const {submitting} = useSelector(state => state.poll)
    const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData)

    // console.log(data)

    dispatch(createPoll(data)).then(() => {
      formRef.current.reset()
    })
  } 

  return (
    <section className='w-full h-screen flex justify-center items-center bg-slate-500/50 fixed left-0 top-0'>
        <div className='w-3/4 md:w-1/2 h-[70vh] bg-base-200 rounded-md p-4 flex flex-col justify-between items-center'>
        <h2 className="text-xl font-bold mb-4 text-center">Create a Poll</h2>

<form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2">
  <input
    type="text"
    name="question"
    placeholder="Enter your question"
    
    className="w-full border p-2 rounded"
    required
  />
  <input
    type="text"
    name="option1"
    placeholder="Option 1"
    
    className="w-full border p-2 rounded"
    required
  />
  <input
    type="text"
    name="option2"
    placeholder="Option 2"
    
    className="w-full border p-2 rounded"
    required
  />
  <input
    type="text"
    name="option3"
    placeholder="Option 3"
    
    className="w-full border p-2 rounded"
    required
  />
  <input
    type="text"
    name="option4"
    placeholder="Option 4"
    
    className="w-full border p-2 rounded"
    required
  />

  <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
    Create Poll
  </button>
</form>
            <Link to="/" className='btn btn-ghost' >Close</Link>
        </div>
    </section>
  )
}

export default Modal