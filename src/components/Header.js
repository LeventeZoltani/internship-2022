import React from 'react';
import style from './Header.module.css';

import logo from './Music.jpg';

import TextField from '@mui/material/TextField';
// import Autocomplete from '@mui/material/Autocomplete';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { useState } from "react";
import db from './db';
import AutocompleteSearch from './AutocompleteSearch';
import Autocomplete from '@mui/material/Autocomplete';

const Header = (props) => {

    const [value, setValue] = React.useState(null);
    // const [searchItem, setSearchItem] = useState("");
    // const [inputText, setInputText] = useState("");
    // const [inputValue, setInputValue] = React.useState('');

    return (

        // <header>
        <>
            {/* <AutocompleteSearch/> */}
            {/* <h1>Internship <span className={style.secondaryColor}>React Starter</span> kit</h1> */}

            <Box sx={{ width: 600 }}>
                <BottomNavigation
                >
                    <img className={style.logo} src={logo} alt="Company Logo" />

                    <Autocomplete
                        className={style.searchItem}
                        // id="free-solo-demo"
                        freeSolo
                        options={db.songs.map((option) => option.title)}
                        renderInput={(params) => <TextField {...params} label="Search title..." />}
                        // options={props.getOptionsByFilter()}

                        value={value}
                        onChange={(e) => value = e.target.value}
                        onSelect={(val) => value = val}
                        // update={props.onChangeSearch} songs={props.songs}
                    />

                    <AutocompleteSearch suggestions={props.titles} onChange={props.onChange} onKeyDown={props.onKeyDown} value={props.value} />
                    {/* <AutocompleteSearch db/> */}


                    {/* </Search> */}
                    {/* <SearchAutocomplete update={props.update} songs={props.songs} color='warning' focused /> */}

                    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
                    {/* <BottomNavigationAction label="Nearby" icon={<LocationOnIcon />} /> */}
                </BottomNavigation>
            </Box>
            </>
        // </header >
    );
};

export default Header;
