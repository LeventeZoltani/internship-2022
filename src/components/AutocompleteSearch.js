import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useState } from 'react'

/* Custom TextField with style. */
const CssTextField = styled(TextField)({
  margin: 20,
  '& label.Mui-focused': {
    color: '#aab6fe',
  },
  '& label': {
    color: '#aab6fe',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#aab6fe',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#aab6fe',
      borderRadius: '25px',
    },
    '& input': {
      color: '#aab6fe',
    },
    '&:hover fieldset': {
      borderColor: '#aab6fe',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#aab6fe',
    },
  },
});

/* Autocomplete search for song title on key press.*/
export default function AutocompleteSearch(props) {
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <Autocomplete
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => {
          props.update({
            filteredBy: 'search',
            value: newInputValue
          });
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.songs.map((song) => song.title)}
        renderInput={(params) => <CssTextField {...params} label="Song title"></CssTextField>}
      />
    </div>
  );
}
