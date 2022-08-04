import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import React from 'react'


export default function AutocompleteSearch(props) {
    const [value, setValue] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    return (
        <div>
            <Autocomplete
                // value={value}
                onChange={(event, newValue) => {
                    console.log(newValue)
                    setValue(newValue)
                    props.update(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    props.update(newInputValue);
                    setInputValue(newInputValue);
                    // setValue(newInputValue)
                }}
                id="controllable-states-demo"
                options={props.songs.map((song) => song.title)}
                sx={{
                    backgroundColor: 'white',
                    'form-group':{
                        width: 200,
                        bgcolor: 'white', color:'white'},
                    }}
                // sm={{ width: 300, backgroundColor:'white' }}
                // md={{ width: 500, backgroundColor:'white' }}
                renderInput={(params) => <TextField {...params} label="Song title"/>}
            />
        </div>
    );
}
