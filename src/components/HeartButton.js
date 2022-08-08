import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';

export default function HeartButton(props) {

    return (
        <>
            {
                !props.favourites.includes(props.song.id) ? (
                    <IconButton sx={{
                        ':hover': {
                            bgcolor: '#aab6fe24'
                        }
                    }}
                        onClick={() => props.addToFavourites(props.song.id)}
                    >
                        <FavoriteBorderIcon sx={{ fontSize: 20, color: '#aab6fe' }}></FavoriteBorderIcon>
                    </IconButton>
                ) : (
                    <IconButton sx={{
                        ':hover': {
                            bgcolor: '#aab6fe24'
                        }
                    }}
                        onClick={() => props.removeFromFavourites(props.song.id)}
                    >
                        <FavoriteRoundedIcon sx={{ fontSize: 20, color: '#aab6fe' }}></FavoriteRoundedIcon>
                    </IconButton>
                )
            }
        </>
    );
}