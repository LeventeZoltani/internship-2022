import React, {useState} from 'react'

import { Box } from '@mui/system'
import TextField from '@mui/joy/TextField';
import { Sheet } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { CssVarsProvider } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { useNavigate } from "react-router-dom";
import { Paper } from '@mui/material';

export default function Login(props) {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });
    const navigate = useNavigate();

    const setUserName = (value) => {
        setUser({
            username: value,
            password: user.password
        })
    }

    const setPassword = (value) => {
        setUser({
            username: user.username,
            password: value
        })
    }

    return (
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
            <Button
                sx={{
                    mt: 1, // margin top
                }}

                onClick={(event) => {
                    event.preventDefault();
                    console.log('clicked', user);
                    navigate("/home");
                    return props.handleLoginClick(user);
                }}
            >
                Log in
            </Button>
            <Typography
                endDecorator={<Link href="/sign-up">Sign up</Link>}
                fontSize="md"
                sx={{ alignSelf: 'center' }}
            >
                Don't have an account?
            </Typography>
        </Sheet>
        </CssVarsProvider>
       
    )
}
