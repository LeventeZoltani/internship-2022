import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import style from './SideNavigationDrawer.module.css'


function SideNavigationDrawer(props) {
    const drawer = (
        <div className={style.drawer}>
            <Toolbar />
            <List>
                {['Home', 'Favourites'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon >
                                {index % 2 === 1 ? <FavoriteRoundedIcon sx={{color:'#aab6fe'}}/> : <HomeRoundedIcon sx={{color:'#aab6fe'}}/>}
                            </ListItemIcon>
                            <ListItemText><Typography variant='h5' color='#aab6fe'>{text}</Typography></ListItemText>
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
            className={style.drawer}
        >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                className={style.drawer}
                container={container}
                variant="temporary"
                open={props.drawer.mobileOpen}
                // onChange={props.handleDrawerToggle}
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawer.drawerWidth, backgroundColor:'black' },

                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                className='drawer'
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawer.drawerWidth, backgroundColor:'black' },
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
