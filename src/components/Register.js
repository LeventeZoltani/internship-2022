import React, { useState, useEffect } from 'react'


import TextField from '@mui/joy/TextField';
import { Sheet } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { styled } from '@mui/material/styles';
import GraphicEqRounded from '@mui/icons-material/GraphicEqRounded';

const CssTextField = styled(TextField)({
    '& label': {
        fontSize: '14px'
    },
    '& input': {
        fontSize: '14px',
    },
    '& input: focused': {
        borderColor: '#aab6fe'
    },
    '.JoyFormLabel-asterisk': {
        color: '#97a7fc'
    },
});

/* 
 * Function for rendering register feature.
 */
export default function Register(props) {
    const [user, setUser] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });

    const [validRegistrationUsername, setValidRegistrationUsername] = useState(true);
    const [validRegistrationPasswords, setValidRegistrationPasswords] = useState(true);

    useEffect(() => {
        setValidRegistrationUsername(props.validRegistrationUsername);
    }, [props.validRegistrationUsername])

    useEffect(() => {
        setValidRegistrationPasswords(props.validRegistrationPasswords);
    }, [props.validRegistrationPasswords])

    const setUserName = (value) => {
        setUser({
            username: value,
            password: user.password,
            confirmPassword: user.confirmPassword
        })
    }

    const setPassword = (value) => {
        setUser({
            username: user.username,
            password: value,
            confirmPassword: user.confirmPassword
        })
    }

    const setConfirmPassword = (value) => {
        setUser({
            username: user.username,
            password: user.password,
            confirmPassword: value
        })
    }

    const handleRegister = (event) => {
        event.preventDefault();
        return props.handleRegisterClick(user);
    }

    return (
        <main className='main'>
            <CssVarsProvider>
                <Sheet
                    sx={{
                        maxWidth: 500,
                        minHeight: 500,
                        mx: 'auto', // margin left & right
                        my: 4, // margin top & botom
                        padding: 3, // padding top & bottom
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 4,
                        borderRadius: '25px',
                        boxShadow: 'sm',
                    }}
                >
                    <div>
                        <GraphicEqRounded sx={{ color: '#aab6fe', fontSize: "50px" }} />
                        <Typography level="h2" component="h1">
                            <b>Welcome to SpotiPlayer!</b>
                        </Typography>
                        <Typography level="h6">Sign up to continue</Typography>
                    </div>
                    <CssTextField
                        name="username"
                        type="text"
                        placeholder="arianna"
                        label="Username"
                        required={true}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                    <CssTextField
                        name="password"
                        type="password"
                        placeholder="password"
                        label="Password"
                        required={true}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <TextField
                        name="confirmPassword"
                        type="password"
                        placeholder="password"
                        label="Confirm Password"
                        required={true}
                        onChange={(event) => setConfirmPassword(event.target.value)}
                    />
                    {!validRegistrationUsername || !validRegistrationPasswords ? (
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
                            {(!validRegistrationUsername) ?
                                'The username already exists or the field is empty!'
                                : !validRegistrationPasswords ? 'The two passwords are not the same or one of them is empty.' : ''}
                        </Typography>
                    ) : <></>
                    }
                    <Button
                        sx={{
                            mt: 1, // margin top
                            bgcolor: '#aab6fe',
                            color: 'black',
                            ":hover": {
                                bgcolor: '#97a7fc'
                            }
                        }}
                        onClick={handleRegister}
                    >
                        Register
                    </Button>
                    <Typography
                        endDecorator={
                            <Link href="/"
                                sx={{
                                    mx: 1,
                                    color: '#97a7fc',
                                }}>
                                Sign in
                            </Link>}
                        fontSize="md"
                        sx={{ alignSelf: 'center' }}
                    >
                        Already have an account?
                    </Typography>
                </Sheet>
            </CssVarsProvider>
        </main>
    )
}