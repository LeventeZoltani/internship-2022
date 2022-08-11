import React from 'react'
import {Navigate} from 'react-router-dom'

export default function RequireAuth(props) {
   
    return props.isLoggedIn ? props.children : <Navigate to="/" replace={true} />
}
