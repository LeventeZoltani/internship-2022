import React, { Component } from 'react'
import style from './Login.module.css';

export default class Login extends Component {

    state = {
        validUser: null,
        validPassword: null
    }

    componentDidMount() {
        this.setState({
            validUser: true,
            validPassword: true
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.validUser !== this.props.validUser ||
            prevProps.validPassword !== this.props.validPassword) {
            this.setState({
                validUser:this.props.validUser,
                validPassword:this.props.validPassword
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        let userData = {
            username: event.target[0].value,
            password: event.target[1].value
        }
        this.props.handleSubmit(userData);
    }

    render() {
        return (
            <div className={style.login}>
                <form className={style.form} onSubmit={this.handleSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type='text' name='userName' required />
                        {this.state.validLogin === true &&
                            <p className={style.error}>Username doesn't exist - create an account</p>
                        }
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" required />
                        {this.state.validPassword === true &&
                            <p className={style.error}>Incorrect password</p>
                        }
                    </div>

                    <div>
                        {/* <button onClick={props.handleSubmit('hi')}>submit</button> */}
                        <input type="submit" />
                    </div>
                </form>
            </div>
        )
    }

}
