import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styled from '@emotion/styled';


const CssFormControl = styled(FormControl)({
    margin: 20,
    color: 'white',
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
        color: 'orange',
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

export default function FilterComponent(props) {
    const [genre, setGenre] = useState('');
    // console.log(props.artists);
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
                            { console.log(genre, index); }
                            return (
                                <MenuItem key={index} value={genre}>
                                    {genre}
                                </MenuItem>
                            )
                        })
                    }
                    {/* <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem> */}
                </Select>
            </CssFormControl>
        </Box>
    );
}
