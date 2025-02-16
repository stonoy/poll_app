import React, { useEffect, useState } from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { getPolls } from './feature/pollSlice'
import Poll from './componenets/Poll'
import Polls from './componenets/Polls'
import Modal from './componenets/Modal'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Polls />
  },
  {
    path: "/create",
    element: <Modal />
  }
])


const App = () => {
 
  return <RouterProvider router={router} />
}

export default App