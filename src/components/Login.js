import React, { Component } from 'react'

import {
    BrowserRouter as Router,
} from "react-router-dom";

import style from './Login.module.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
    }

    state = {
        validUser: true,
        validPassword: true,
        username: '',
        password: '',
        isLoggedIn: false,
    }

    componentDidMount() {
        this.setState({
            validUser: true,
            validPassword: true
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.validUser !== this.props.validUser ||
            prevProps.validPassword !== this.props.validPassword ||
            prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                validUser: this.props.validUser,
                validPassword: this.props.validPassword,
                isLoggedIn: this.props.isLoggedIn
            })
        }
    }

    handleUserChange(e) {
        this.setState({
            username: e.target.value
        })
        console.log(this.state.username);
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password);
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let userData = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.handleSubmit(userData);
    }

    handleLogOut() {
        this.setState({
            isLoggedIn: false
        });
        localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("username", "null")
    }

    render() {
        return (
            <div className={style.login}>
                {localStorage.getItem("isLoggedIn") === "false" &&
                    <div>
                        <h1>Log in !</h1>
                        <form className={style.form} onSubmit={this.handleSubmit}>
                            <div className={style.label}>
                                <label className={style.label}>Username</label>
                            </div>
                            <div>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Required"
                                    defaultValue=""
                                    className={style.textField}
                                    onChange={this.handleUserChange}
                                />
                                {this.state.validUser === false &&
                                    <p className={style.error}>Username doesn't exist - create an account</p>
                                }
                            </div>
                            <div className={style.label}>
                                <label className={style.label}>Password</label>
                            </div>
                            <div>
                                <TextField
                                    className={style.textField}
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.handlePasswordChange}
                                />
                                {this.state.validPassword === false &&
                                    <p className={style.error}>Incorrect password</p>
                                }
                            </div>
                            <div className={style.buttonDiv}>
                                <Button
                                    onClick={this.handleSubmit}
                                    variant="contained"
                                    className={style.submitButton} >LOGIN</Button>
                            </div>
                        </form>
                    </div>}
                {localStorage.getItem("isLoggedIn") === "true" &&
                    <div className={style.loggedIn}>
                        <h1>Login successful as {localStorage.getItem("username")}!</h1>
                        <Router>
                            <div>
                                <Button variant="contained"
                                    className={style.goBackButton}
                                    sx={{ marginBottom: "20px" }}><a href="/">Go Back To Music!</a></Button>
                                <Button variant="contained"
                                    className={style.goBackButton} onClick={this.handleLogOut}>Log out</Button>
                            </div>
                        </Router>
                        {/* <Button variant="contained"
                            className={style.goBackButton}>Go back to music!</Button> */}
                    </div>
                }
            </div>
        )
    }

}
