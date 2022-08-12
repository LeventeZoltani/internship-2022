import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { Link, useNavigate } from 'react-router-dom';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import style from './SideNavigationDrawer.module.css'

/* 
 * Function for rendering side navigation drawer.
 */
function SideNavigationDrawer(props) {
    const navigate = useNavigate()
    const handleLogout = () => {
        navigate("/", { replace: true });
        return props.handleLogoutClick();
    }

    const drawer = (
        <div className={style.drawer}>
            <Toolbar />
            <List>
                <ListItem disablePadding>
                    <Link to="/home">
                        <ListItemButton>
                            <ListItemIcon >
                                <HomeRoundedIcon sx={{ color: '#aab6fe' }} />
                            </ListItemIcon>
                            <ListItemText><Typography variant='h5' color='#aab6fe'>Home</Typography></ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding>
                    <Link to="/favourites">
                        <ListItemButton>
                            <ListItemIcon >
                                <FavoriteRoundedIcon sx={{ color: '#aab6fe' }} />
                            </ListItemIcon>
                            <ListItemText><Typography variant='h5' color='#aab6fe'>Favourites</Typography></ListItemText>
                        </ListItemButton>
                    </Link>
                </ListItem>
                <ListItem disablePadding onClick={handleLogout}>
                    <ListItemButton>
                        <ListItemIcon >
                            <LogoutRoundedIcon sx={{ color: '#aab6fe' }} />
                        </ListItemIcon>
                        <ListItemText><Typography variant='h5' color='#aab6fe'>Logout</Typography></ListItemText>
                    </ListItemButton>
                </ListItem>
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
                onClose={props.handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawer.drawerWidth, bgcolor: 'black' },
                    '& .MuiBackdrop-root': { bgcolor: '#aab6fe54' }

                }}
            >
                {drawer}
            </Drawer>
            <Drawer
                className='drawer'
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: props.drawer.drawerWidth, backgroundColor: 'black' },
                }}
                open
            >
                {drawer}
            </Drawer>
        </Box>
    );
}

export default SideNavigationDrawer;
