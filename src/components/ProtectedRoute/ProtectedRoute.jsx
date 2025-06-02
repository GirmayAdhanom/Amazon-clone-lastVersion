import { DataConnect } from 'firebase/data-connect'
import React, { useContext } from 'react'
import { DataContext } from '../Context/Context'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children, msg, redirect}) {

    const [{user}]=useContext(DataContext)
    if (!user){  return <Navigate to ="/auth" replace state={{msg,redirect}}/> }

return children 
}

export default ProtectedRoute
