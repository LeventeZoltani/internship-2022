import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react'


const CssTextField = styled(TextField)({
  margin: 20,
  '& .MuiOutlinedInput-root': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: '#aab6fe',
  },
  '& label': {
    color: '#aab6fe',
  },
  '& input.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#aab6fe',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#aab6fe',
      // backgroundColor: 'black',
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
      color: 'white'
    },
  },
});

export default function AutocompleteSearch(props) {
  const [value, setValue] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Autocomplete
        onChange={(event, newValue) => {
          setValue(newValue)
          props.update({
            filteredBy: 'search',
            value: newValue
          });
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          props.update({
            filteredBy: 'search',
            value: newInputValue
          });
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={props.songs.map((song) => song.title)}
        sx={{
          color: 'white',
        }}
        renderInput={(params) => <CssTextField {...params} label="Song title"></CssTextField>}

      />
    </div>
  );
}
