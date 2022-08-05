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
    color: 'orange',
  },
  '& label': {
    color: 'orange',
  },
  '& input.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#ffac33',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'orange',
      // backgroundColor: 'black',
      borderRadius: '25px',
    },
    '& input': {
      color: 'orange',
    },
    '&:hover fieldset': {
      borderColor: '#ffac33',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
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
        // value={value}
        onChange={(event, newValue) => {
          console.log(newValue)
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
          // setValue(newInputValue)
        }}
        id="controllable-states-demo"
        options={props.songs.map((song) => song.title)}
        sx={{
          // backgroundColor: 'black',
          color: 'white',
        }}

        // sm={{ width: 300, backgroundColor:'white' }}
        // md={{ width: 500, backgroundColor:'white' }}
        renderInput={(params) => <CssTextField {...params} label="Song title" InputProps={{ style: { color: 'white' } }}></CssTextField>}

      />
      {/* <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon color='info' fontSize='large'/>
              </IconButton> */}
    </div>
  );
}
