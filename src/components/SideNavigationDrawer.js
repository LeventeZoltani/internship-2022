import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

// const drawerWidth = 240;

function SideNavigationDrawer(props) {
    const drawer = (
        <div>
            <Toolbar />
            <List>
                {['Home', 'Favourites'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon >
                                {index % 2 === 1 ? <FavoriteRoundedIcon /> : <HomeRoundedIcon />}
                            </ListItemIcon>
                            <ListItemText><Typography variant='h5'>{text}</Typography></ListItemText>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = document.getElementsByTagName('body')[0];

    return (

        <Box
            component="nav"
            sx={{
                width: { sm: props.drawer.drawerWidth }, flexShrink: { sm: 0 },
            }}
            aria-label="mailbox folders"
            zIndex={10}
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={props.drawer.mobileOpen}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawer.drawerWidth },

                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawer.drawerWidth },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>

    );
}

SideNavigationDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideNavigationDrawer;