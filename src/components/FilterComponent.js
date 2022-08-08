import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';


const CssFormControl = styled(FormControl)({
    margin: 20,
    '& .MuiSelect-nativeInput': {
        color:'#aab6fe',
        opacity: '100%',
        backgroundColor: 'black',
        border: 'none',
        padding: '10px',
        bottom: '8px'
    },
    '& .MuiOutlinedInput-root': {
      color: 'white',
    },
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
        // backgroundColor: 'black',
        borderRadius: '25px',
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

export default function FilterComponent(props) {
    const [genre, setGenre] = useState('');
    return (

        <Box sx={{ minWidth: 120 }}>
            <CssFormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={genre}
                    label={props.label}
                    onChange={(event) => {
                        setGenre(event.target.value);
                        props.update({
                            filteredBy: props.label,
                            value: event.target.value
                        })
                    }}
                >
                    <MenuItem key={''} value={''}>
                        {'All'}
                    </MenuItem>
                    {

                        props.array.map((genre, index) => {
                            return (
                                <MenuItem key={index} value={genre}>
                                    {genre}
                                </MenuItem>
                            )
                        })
                    }
                </Select>
            </CssFormControl>
        </Box>
    );
}
