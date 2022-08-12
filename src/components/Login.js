import React, { useState, useEffect } from 'react'

import TextField from '@mui/joy/TextField';
import { Sheet } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from "react-router-dom";

/* 
 * Function for rendering login feature.
 */
export default function Login(props) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const [validLogin, setValidLogin] = useState(true);
    const navigate = useNavigate();

    /* 
    * Lifecycle hook to set if the login is valid or not.
    */
    useEffect(() => {
        setValidLogin(props.validLogin);
    }, [props.validLogin])

    /* 
    * Set username.
    */
    const setUserName = (value) => {
        setUser({
            username: value,
            password: user.password
        })
    }

    /* 
     * Set password.
     */
    const setPassword = (value) => {
        setUser({
            username: user.username,
            password: value
        })
    }

    /* 
     * Handle Login click.
     */
    const handleLogin = (event) => {
        event.preventDefault();

        navigate("/home", { replace: true });
        return props.handleLoginClick(user);
    }

    return (
        <main className='main'>
            <CssVarsProvider>
                <Sheet
                    sx={{
                        maxWidth: 500,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & botom
                        py: 3, // padding top & bottom
                        px: 2, // padding left & right
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        borderRadius: '25px',
                        boxShadow: 'sm',
                    }}
                >
                    <div>
                        <Typography level="h2" component="h1">
                            <b>Welcome!</b>
                        </Typography>
                        <Typography level="h6">Sign in to continue</Typography>
                    </div>
                    <TextField
                        name="username"
                        type="text"
                        placeholder="arianna"
                        label="Username"
                        required={true}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <TextField
                        name="password"
                        type="password"
                        placeholder="password"
                        label="Password"
                        required={true}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    {!validLogin ? (
                        <Typography
                            variant="soft"
                            color="danger"
                            startDecorator="🚨"
                            py={1}
                            px={1}
                            borderRadius="xs"
                            display="inline-flex"
                            fontSize="md"
                            sx={{ '--Typography-gap': '0.5rem' }}
                        >
                            The username or password is not correct. Please try again!
                        </Typography>
                    ) : <></>
                    }
                    <Button
                        sx={{
                            mt: 1, // margin top
                        }}

                        onClick={handleLogin}
                    >
                        Log in
                    </Button>
                    <Typography
                        endDecorator={<Link href="/register">Sign up</Link>}
                        fontSize="md"
                        sx={{ alignSelf: 'center' }}
                    >
                        Don't have an account?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </main>
    )
}
