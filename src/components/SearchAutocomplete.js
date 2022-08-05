import { TextField } from '@mui/material';
import React from 'react'
import db from './db';


export default function SearchAutocomplete(props) {
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
            <SearchAutocomplete
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setValue(newValue)
                    props.update(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    props.update(newInputValue);
                    setInputValue(newInputValue);
                }}
                id="controllable-states-demo"
                options={props.songs.map((song) => db.songs.title)}
                sx={{
                    backgroundColor: 'white',
                    'form-group':{
                        width: 200,
                        bgcolor: 'white', color:'white'},
                    }}
                renderInput={(params) => <TextField {...params} label="Song title"/>}
            />
        </div>
    );
}
