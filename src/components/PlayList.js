import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import { Component } from 'react';
import style from './Main.module.css';
import PropTypes from 'prop-types';
import { Slide, Typography } from '@mui/material';
import { Divider } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import {IconButton} from '@mui/material';
import SlideOrice from './Slide';
import ScrollListener from './ScrollListener'
import Container from './Container';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SliderOrice from './Slide';
//import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
//import SkipNextIcon from '@mui/icons-material/SkipNext';

export default function PlayList(props) {


    //const theme = useTheme();

    // state = {
    //     songs: [],
    //     played: false,
    // }

    // componentDidMount(){
    //     this.getSongs();
    // }

    // async getSongs(){

    //     const response = await fetch('http://localhost:3000/songs', {
    //         method: 'GET'
    //     })
    //     const data= await response.json();
    //     console.log(this.state.songs);
    //     this.setState(state => ({ songs: data}));
    // }

    
    
    // defaultProps = {
    //     variant: 'dark',
       
    // };

    // constructor(props) {
    //     super(props);
    //     this.openPlayer=this.openPlayer.bind(this);
    //     // this.handleAddTodo = this.handleAddTodo.bind(this);
    //     // this.handleChange = this.handleChange.bind(this);
    // }

    // getVariant(){
    //     return style[this.props.variant];
    // }

    // openPlayer(){
      
    //     console.log("I PLAYED U!!");
    //     //this.SlideFromContainer();
        
       
        
    // }

    
        return (
            <>
            
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
               {props.songs.map((song) =>
                        // <ListItem key={song.id} alignItems="flex-start" 
                        // sx={{width: 500, height: 145,border: 1, borderColor: '#fa227c',borderRadius:5}}>
                        //     <ListItemAvatar>
                        //         <Avatar alt="Remy Sharp" src={song.imageURL} />
                        //         <SlideOrice></SlideOrice>
                        //     </ListItemAvatar>
                        //     <ListItemText
                        //         primary={<React.Fragment>
                        //             <Typography
                        //                 sx={{ display: 'inline'}}
                        //                 component="span"
                        //                 variant="h1"
                                        
                                        
                        //             ></Typography>
                        //             {song.title} - {song.artist}
                        //         </React.Fragment>}
                        //         secondary={<React.Fragment>
                        //             <Typography
                        //                 sx={{ display: 'inline' }}
                        //                 component="span"
                        //                 variant="body2"
                        //                 color="text.primary"
                                        
                        //             >
                                        
                        //             </Typography>
                        //             {song.album}
                        //         </React.Fragment>} 

                        //         />
                        //         <FavoriteBorderIcon sx={{fontSize: 'large'}}>
                        //         </FavoriteBorderIcon>
                                
                        // </ListItem>
                        <Card key={song.id} sx={{ display: 'flex',border: 1, borderColor: '#fa227c',borderRadius:5, height: '100', backgroundColor: '#000000', flexDirection: 'row'}}>
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h2" color={"#ffffffff"}>
                                {song.title}
                                
                            </Typography>
                            <Typography variant="h4" color={"#ffffffff"} component="div">
                                {song.artist}
                            </Typography>
                            </CardContent>
                            <Box>
                            <FavoriteBorderIcon sx={{fontSize: 'large',color: '#fa227c',height: 38, width: 38}}>
                            </FavoriteBorderIcon>
                                <CardMedia
                                component="img"
                                sx={{ width: 360 }}
                                image={song.imageURL}
                                alt="Live from space album cover"
                            />  
                            {/* <IconButton aria-label="previous">
                                {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                            </IconButton>   */}
                            <SliderOrice />
                            {/* <IconButton aria-label="next">
                                {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                            </IconButton> */}
                            </Box>
                            </Box>
                         </Card>
                        ,
                        <Divider variant="inset" component="li" />
                    )

                }



            </List>
            </>
        );

    



}

// PlayList.propTypes = {
//     variant: PropTypes.oneOf([
//         'dark',
//         'light'
//     ]),
    
// };

