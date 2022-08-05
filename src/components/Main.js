import React from 'react'
import SongList from './SongList'
import style from './Main.module.css';
import { Box } from '@mui/system';

export default function Main(props) {
    return (
        <main className={style.main}>
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
                {/* {console.log(props.songs)} */}
                <SongList 
                    songs={props.songs}
                    handlePlayClick={props.handlePlayClick}
                />
            </Box>
        </main>
    )
}
