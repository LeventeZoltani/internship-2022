import React from 'react';

import { AppBar, Grid, IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import AutocompleteSearch from './AutocompleteSearch';
import FilterComponent from './FilterComponent';

const Header = (props) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${props.drawer.drawerWidth}px)` },
                ml: { sm: `${props.drawer.drawerWidth}px` },
                backgroundColor: 'black'
            }}

        >
            <Toolbar>
                <Grid container spacing={2} alignItems='center' columns={{ xs: 4, sm: 8, md: 12 }} justifyContent='space-between'>

                        <Grid item xs={0.5} sx={{ mr: 2, display: { sm: 'none' } }}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={props.handleDrawerToggle}
                                
                            >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                    <Grid item xs={3} sm={4} md={4}>
                        <AutocompleteSearch update={props.onChangeSearch} songs={props.songs} />
                    </Grid><Grid item xs={0.5} sm={2} md={2}>
                        <FilterComponent update={props.onChangeArtist} array={props.artists} label={'artist'} />
                    </Grid><Grid item xs={0.5} sm={2} md={2}>
                        <FilterComponent update={props.onChangeAlbum} array={props.albums} label={'album'} />
                    </Grid><Grid item xs={0.5} sm={2} md={2}>
                        <FilterComponent update={props.onChangeGenre} array={props.genres} label={'genre'} />
                    </Grid><Grid item marginRight={5}>
                        <Avatar src={props.user.imageUrl}></Avatar>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
