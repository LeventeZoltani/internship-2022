import React from 'react';

import style from './Header.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import QueueMusicSharpIcon from '@mui/icons-material/QueueMusicSharp';
import MusicNoteSharpIcon from '@mui/icons-material/MusicNoteSharp';
import MyAutocomplete from './MyAutocomplete'
import MySelect from './MySelect';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// const Header = () => {
//     return (
//         <header className={style.header}>
//             {/* <h1>Internship <span className={style.secondaryColor}>React Starter</span> kit</h1> */
               
//                 <nav class="navbar navbar-expand-lg">
                     
//                 <div class="container-fluid">
//                   <a class="navbar-brand" href="#">MUSIC@n</a>
//                   <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                     <span class="navbar-toggler-icon"></span>
//                   </button>
//                   <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
//                     <div class="navbar-nav">
//                       <a class="nav-link active" aria-current="page" href="#">Home</a>
//                       <a class="nav-link active" href="#">Log In</a>
//                       <a class="nav-link active" href="#">Admin</a>
//                     </div>
//                   </div>
//                 </div>
//               </nav>
              
//             }
            
//         </header>
//     );
// };
// export default Header;




const route="/";
const pages = ['Home','LogIn','CreateAccount'];
const settings = ['Logout'];

const ResponsiveAppBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    console.log("Something happened at click")
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleAction = () => {
    // console.log(setting);
    // if(setting==="Favorites"){
    //   console.log("Show favorites list attempted!");
    // }
  };

  //const options = PlayList.getSongs();

  return (
   
    <AppBar position="static" sx={{backgroundColor: '#fa227c'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <MusicNoteSharpIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: 'large'}} />
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            MUSIC@n
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MusicNoteSharpIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}

                  sx={{
                    size:"large"
                  }}>
                   
                  <Typography textAlign="center" variant="h1">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h1"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: 'large',
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', fontSize: 'large' }}
              >
              
              <a href={route+page}>{page}</a>
                
              </Button>
            ))}
          </Box>
          <MyAutocomplete titles={props.titles} genres={props.genres} artists={props.artists} albums={props.albums} update={props.update} songs={props.songs} getOptionsByFilter={props.getOptionsByFilter}/>
          <MySelect update={props.update} songs={props.songs} filter={props.filter} handleFilter={props.handleFilter} getFavorites={props.getFavorites}/>
          <Button onClick={()=>props.getFavorites()} sx={{border:1 ,borderColor:'black',color:'black',height:45}}>Favorites</Button>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="https://9b16f79ca967fd0708d1-2713572fef44aa49ec323e813b06d2d9.ssl.cf2.rackcdn.com/1140x_a10-7_cTC/NS-WKMAG0730-1595944356.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Button onClick={props.handleLogOut}>
                      <Typography textAlign="center">{setting}</Typography>
                  </Button>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
   
   
  );
};
export default ResponsiveAppBar;