import React, { Component } from 'react'
import {
    BrowserRouter as Router,
} from "react-router-dom";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

import style from './Header.module.css';



export default class Header extends Component {

    render() {
        return (
            <header className={style.header}>
                <h1><a href="/">Music App!</a></h1>
                <div className={style.search} >
                    <p className={style.searchSong}>Search song... </p>
                    <input
                        className={style.searchInput}
                        label="search"
                        onChange={(e) => {
                            this.props.onChangeInput(e.target.value.toLowerCase());
                        }}
                    />
                    <FormControl className={style.genreSelect} sx={{ minWidth: 170, marginLeft: '10px' }}>
                        <InputLabel id="demo-simple-select-label"
                            sx={{
                                color: '#282A35',
                                fontSize: '18px',
                                top: '-14px',
                                '.css-kuu87f-MuiFormLabel-root-MuiInputLabel-root': {
                                    color: 'white'
                                }
                            }}>Select genre</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            sx={{ height: '29px', fontSize: '18px' }}
                            value={this.props.inputGenre}
                            label="Age"
                            onChange={(e) => this.props.onChangeGenre(e.target.value)}
                        >
                            <MenuItem value="all" key="all"
                                sx={{ fontSize: '18px' }}>All</MenuItem>
                            {Array.isArray(this.props.genres) ? this.props.genres.map(genre => (
                                <MenuItem value={genre} key={genre}
                                    sx={{ fontSize: '18px' }}>{genre}</MenuItem>
                            )) : null}
                        </Select>
                    </FormControl>
                </div>
                <Router>
                    <div className={style.login}>
                        {localStorage.getItem("isLoggedIn") === 'false' &&
                            <Button variant="outlined"><a href="/login">Log in</a></Button>}
                        {localStorage.getItem("isLoggedIn") === 'true' &&
                            <Button variant="outlined"><a href="/login">Logged in as {localStorage.getItem("username")}</a></Button>}
                        {localStorage.getItem("isLoggedIn") === 'false' &&
                            <Button className={style.registerButton} variant="outlined"><a href="/register">Register</a></Button>}
                    </div>
                </Router>
            </header>
        );
    }
}
