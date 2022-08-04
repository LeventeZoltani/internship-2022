import React from 'react';

import { AppBar, Grid, IconButton } from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AutocompleteSearch from './AutocompleteSearch';

const Header = (props) => {
    return (
        <AppBar
            position="fixed"
            sx={{
                width: { sm: `calc(100% - ${props.drawer.drawerWidth}px)` },
                ml: { sm: `${props.drawer.drawerWidth}px` },
                // backgroundColor: 'black'
            }}

        >
            <Toolbar>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={1}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={props.handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <Typography variant="h4" noWrap component="div">
                            Home
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <AutocompleteSearch update={props.update} songs={props.songs} color='warning' focused />
                    </Grid>
                </Grid>
            </Toolbar>

        </AppBar>
    );
};

export default Header;
