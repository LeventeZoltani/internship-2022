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


class PlayList extends Component {


   

    state = {
        songs: [],
        played: false,
    }

    componentDidMount(){
        this.getSongs();
    }

    async getSongs(){

        const response = await fetch('http://localhost:3000/songs', {
            method: 'GET'
        })
        const data= await response.json();
        console.log(this.state.songs);
        this.setState(state => ({ songs: data}));
    }

    
    
    static defaultProps = {
        variant: 'dark',
       
    };

    constructor(props) {
        super(props);
        this.openPlayer=this.openPlayer.bind(this);
        // this.handleAddTodo = this.handleAddTodo.bind(this);
        // this.handleChange = this.handleChange.bind(this);
    }

    getVariant() {
        return style[this.props.variant];
    }

    openPlayer(){
      
        console.log("I PLAYED U!!");
        //this.SlideFromContainer();
        
       
        
    }

    render() {
        return (
            <>
            
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
               {
                    
                    this.state.songs.map((song) =>

                       
                        <ListItem key={song.id} alignItems="flex-start" 
                        sx={{width: 500, height: 145,border: 1, borderColor: '#fa227c',borderRadius:5}}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={song.imageURL} />
                                <SlideOrice></SlideOrice>
                            </ListItemAvatar>
                            <ListItemText
                                primary={<React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline'}}
                                        component="span"
                                        variant="h1"
                                        
                                        
                                    ></Typography>
                                    {song.title} - {song.artist}
                                </React.Fragment>}
                                secondary={<React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        
                                    >
                                        
                                    </Typography>
                                    {song.album}
                                </React.Fragment>} 

                                />
                                <FavoriteBorderIcon sx={{fontSize: 'large'}}>
                                </FavoriteBorderIcon>
                                
                        </ListItem>
                        ,
                        <Divider variant="inset" component="li" />
                    )

                }



            </List>
            </>
        );

    }



}

PlayList.propTypes = {
    variant: PropTypes.oneOf([
        'dark',
        'light'
    ]),
    
};

export default PlayList;