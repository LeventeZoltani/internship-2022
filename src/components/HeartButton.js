import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function HeartButton() {
    return (
        <IconButton >
            <FavoriteBorderIcon sx={{ fontSize: 20 }}></FavoriteBorderIcon>
        </IconButton>
    );
}