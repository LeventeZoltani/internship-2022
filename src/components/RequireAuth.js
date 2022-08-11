import React from 'react'
import {Navigate} from 'react-router-dom'

export default function RequireAuth(props) {
    console.log(props.isLoggedIn);
    return props.isLoggedIn ? props.children: <Navigate to="/" replace />
}