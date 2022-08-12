import React from 'react'
import {Navigate} from 'react-router-dom'

/* 
 * Function for rendering the correct page based on user auth.
 */
export default function RequireAuth(props) {
   
    return props.isLoggedIn ? props.children : <Navigate to="/" replace={true} />
}
