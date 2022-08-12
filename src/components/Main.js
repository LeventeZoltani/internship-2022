import React, { useEffect } from 'react'
import SongList from './SongList'
import { Box } from '@mui/system';
import { useLocation } from 'react-router-dom';

/* 
 * Function to render main.
 */
export default function Main(props) {
    const location = useLocation();

    /* 
    * Lifecycle hook to check if url changed.
    */
    useEffect(() => {
        props.getFavouriteSongs();
    }, [location.pathname])

    /* 
    * Lifecycle hook to check if favourites list changed.
    */
    useEffect(() => {
        if (location.pathname === '/favourites') {
            props.getFavouriteSongs();
        }
    }, [props.user.favourites])

    return (
        <main className='main'>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${props.drawer.drawerWidth}px)` },
                    marginLeft: { sm: `${props.drawer.drawerWidth}px`, md: `${props.drawer.drawerWidth}px` },
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
        </main>
    )
}
