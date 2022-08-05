import React from 'react';
import style from './Header.module.css';

import logo from './Music.jpg';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';


import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import SearchAutocomplete from './SearchAutocomplete';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Header = (props) => {

    const [value, setValue] = React.useState(0);
    const [searchItem, setSearchItem] = useState("");
    const [inputText, setInputText] = useState("");
    const [inputValue, setInputValue] = React.useState('');

    return (
        <header>
            {/* ?<h1>Internship <span className={style.secondaryColor}>React Starter</span> kit</h1> */}

            <Box sx={{ width: 500 }}>
                <BottomNavigation
                    // showLabels
                    // value={value}
                    // onChange={(event, newValue) => {
                    //     setValue(newValue);
                    //     props.update(newValue);
                    // }}
                    // inputValue={inputValue}
                    // onInputChange={(event, newInputValue) => {
                    //     props.update(newInputValue);
                    //     setInputValue(newInputValue);
                    // }}
                    // id="controllable-states-demo"
                    // options={props.songs.map((songs) => songs.title)}
                    // sx={{
                    //     backgroundColor: 'white',
                    //     'form-group': {
                    //         width: 200,
                    //         bgcolor: 'white', color: 'white'
                    //     },
                    // }}
                    // renderInput={(params) => <TextField {...params} label="Song title" />}
                >
                    <img className={style.logo} src={logo} alt="Company Logo" />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                            update={props.update} songs={props.songs} color='warning' focused
                        />
                    </Search>
                    {/* <SearchAutocomplete update={props.update} songs={props.songs} color='warning' focused /> */}

                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
                </BottomNavigation>
            </Box>

        </header >
    );
};

export default Header;
