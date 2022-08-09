import React from 'react'
import SongList from './SongList'
import style from './Home.module.css';
import { Box } from '@mui/system';

export default function Home(props) {
    return (
       
            <Box
                component="main"
                sx={{
                     flexGrow: 1,
                     p: 3,
                     width: { sm: `calc(100% - ${props.drawer.drawerWidth}px)` },
                     marginLeft:{sm:`${props.drawer.drawerWidth}px`, md: `${props.drawer.drawerWidth}px`},
                     marginTop: 10,
                     marginBottom: 20 
                }}
            >
                <SongList 
                    songs={props.songs}
                    handlePlayClick={props.handlePlayClick}
                    addToFavourites={props.addToFavourites}
                    removeFromFavourites={props.removeFromFavourites}
                    favourites={props.favourites}
                />
            </Box>
    )
}
