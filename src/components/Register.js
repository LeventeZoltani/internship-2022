import React, { Component } from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import style from './Register.module.css'

export default class Register extends Component {

    state = {
        validUser: true,
        validPassword: true,
        matchingPasswords: true,
        username: '',
        password: '',
        registerSuccess: false,
        isLoggedIn:false,
    }

    constructor(props) {
        super(props);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.validUser !== this.props.validUser || prevProps.registerSuccess !== this.props.registerSuccess ||
            prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                validUser: this.props.validUser,
                registerSuccess: this.props.registerSuccess,
                isLoggedIn: this.props.isLoggedIn
            })
            console.log("is logged in:"+ this.state.isLoggedIn);
        }
    }

    // HANDLE CHANGE IN INPUTS - set corresponding states //

    handleUserChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }

    //check if passwords match
    handleConfirmPasswordChange(e) {
        if (e.target.value === this.state.password) {
            this.setState({
                matchingPasswords: true
            })
        } else {
            this.setState({
                matchingPasswords: false
            })
        }
    }

    //create an object with user and password and pass it to the handle register submit function
    handleRegisterSubmit(event) {
        event.preventDefault();

        let userData = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.handleRegisterSubmit(userData);

    }

    render() {
        return (
            <>
                {this.state.isLoggedIn === "false" && <div className={style.register}>
                    {/* if user isn't already logged in */}
                    {this.props.registerSuccess === false && <div>
                        <h1>Register !</h1>
                        <form className={style.form} onSubmit={this.handleRegisterSubmit}>
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
                                    <p className={style.error}>Username already exists - pick another</p>
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
                            </div>
                            <div className={style.label}>
                                <label className={style.label}>Confirm password</label>
                            </div>
                            <div>
                                <TextField
                                    className={style.textField}
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={this.handleConfirmPasswordChange}
                                />
                                {this.state.matchingPasswords === false &&
                                    <p className={style.error}>Passwords do not match</p>
                                }
                            </div>
                            <div className={style.buttonDiv}>
                                <Button
                                    onClick={this.handleRegisterSubmit}
                                    variant="contained"
                                    className={style.submitButton} >REGISTER</Button>
                            </div>
                        </form>
                        <br /><br />
                        <p>Already have an account? Login <a href="/login">here</a></p>
                    </div>}
                    {this.props.registerSuccess && <div className={style.register}>
                        <h2>Registered successfully!</h2>
                        <Button
                            variant="contained"
                            className={style.goBackButton}
                        ><a href="/login">Go to login</a></Button>
                    </div>}
                </div>}

                {this.state.isLoggedIn === "true" && <div className={style.register}>
                    {/* user is logged in already */}
                    <h2>You are already logged in.</h2>
                    <p><a href="/login">Logout</a> to create another account</p>
                </div>}
            </>
        )
    }
}
