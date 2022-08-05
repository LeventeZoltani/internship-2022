import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MySelect(props) {
  const [genre, setGenre] = React.useState('');
  //const [artist, setArtist] = React.useState('');


  const handleChange = (event) => {
    setGenre(event.target.value);
    //setArtist(event.target.value);
  };

  
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Genre</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={genre}
          label="Genre"
          onChange={handleChange}
        >
          <MenuItem value={10}>Pop</MenuItem>
          <MenuItem value={20}>Rock</MenuItem>
          <MenuItem value={30}>Punk</MenuItem>
          <MenuItem value={40}>Folk</MenuItem>
          <MenuItem value={50}>KPop</MenuItem>
          <MenuItem value={60}>CPop</MenuItem>
          <MenuItem value={70}>Dance</MenuItem>
          <MenuItem value={80}>Opera</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
