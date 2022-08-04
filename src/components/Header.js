import { React } from 'react';


import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import style from './Header.module.css';

const Header = (props) => {

    return (
        <header className={style.header}>
            <h1><a href="">Music App!</a></h1>
            <div className={style.search} >
                <p className={style.searchSong}>Search song... </p>
                <input
                    className={style.searchInput}
                    label="search"
                    onChange={(e) => {
                        props.onChangeInput(e.target.value.toLowerCase());
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
                        value={props.inputGenre}
                        label="Age"
                        onChange={(e) => props.onChangeGenre(e.target.value)}
                    >
                        <MenuItem value="all" key="all"
                            sx={{ fontSize: '18px' }}>All</MenuItem>
                        {Array.isArray(props.genres) ? props.genres.map(genre => (
                            <MenuItem value={genre} key={genre}
                                sx={{ fontSize: '18px' }}>{genre}</MenuItem>
                            // <option key={genre} value={genre}>{genre}</option>
                        )) : null}
                        {/* <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem> */}
                    </Select>
                </FormControl>
                {/* <select className={style.genreSelect} defaultValue="all">
                    <option value="all">Select genre...</option>
                    {Array.isArray(props.genres) ? props.genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                    )) : null}
                </select> */}
            </div>
        </header>
    );
};

export default Header;
