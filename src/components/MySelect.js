import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function MySelect(props) {
  const [filter, setFilter] = React.useState('');
  //const [artist, setArtist] = React.useState('');


  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(event.target.value);
    props.handleFilter(event.target.value);
    //props.setState({'filter': event.target.value});
    //setArtist(event.target.value);
  };

  
  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={"Title"}>Title</MenuItem>
          <MenuItem value={"Genre"}>Genre</MenuItem>
          <MenuItem value={"Artist"}>Artist</MenuItem>
          <MenuItem value={"Album"}>Album</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
