import React, { useEffect, useState } from 'react'
import SongList from './SongList'
import style from './Main.module.css';
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';

export default function Main(props) {
    // const [songs, setSongs] = useState([]);
    const location = useLocation();

    useEffect(() => {
        // if(location.pathname === '/favourites') {
            props.getFavouriteSongs();
        // }
           
    }, [location.pathname])

    useEffect(() => {
        if(location.pathname === '/favourites') {
            props.getFavouriteSongs();
       }
    }, [props.user.favourites])

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
                    favourites={props.user.favourites}
                />
            </Box>
    )
}
