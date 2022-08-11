import React from 'react';
import style from './Header.module.css';
import logo from './Music.jpg';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import db from './db';
import AutocompleteSearch from './AutocompleteSearch';
import Autocomplete from '@mui/material/Autocomplete';

// import { BottomNavigationAction } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

const Header = (props) => {

    const [value, setValue] = React.useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        console.log('The link was clicked.');
    };

    return (
        <>
            <Box sx={{ width: 600 }}>
                <BottomNavigation
                >
                    <img className={style.logo} src={logo} alt="Company Logo" />
                    <Autocomplete
                        className={style.searchItem}
                        freeSolo
                        options={db.songs.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} label="Search title..." />}
                        value={value}
                        onChange={(e) => value = e.target.value}
                        onSelect={(val) => value = val}
                        />
                        {/* <button> */}
                        {/* <a href="/favoritelist">Favorites</a> */}
                        <Link to="/home">Home</Link>
                        <Link to="/favoritelist">Favorites</Link>
                        {/* </button> */}
                        <button className={style.button}>Login</button>
                    <AutocompleteSearch suggestions={props.titles} onChange={props.onChange} onKeyDown={props.onKeyDown} value={props.value} />
                </BottomNavigation>
            </Box>
        </>
    );
};

export default Header;