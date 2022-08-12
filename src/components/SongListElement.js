import * as React from 'react';
import { Component } from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/joy/IconButton';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

import style from './SongListElement.module.css'



export default class SongListElement extends Component {

    state = {
        paused: true,
        isSongLiked: false
    }

    componentDidMount() {
        this.setState({
            isSongLiked: this.props.isSongLiked
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isSongLiked !== this.props.isSongLiked) {
            this.setState({
                isSongLiked: this.props.isSongLiked
            })
        }
    }

    handleHeartClick() {
        this.setState({ isSongLiked: !this.state.isSongLiked });
    }

    render() {
        return (
            <>
                <List sx={{
                    width: '100%', height: '120px', bgcolor: 'background.paper', fontSize: '28px',
                    '.css-10hburv-MuiTypography-root': { fontSize: '21px' },
                    '.css-83ijpv-MuiTypography-root': { fontSize: '17px' },
                    '.css-yoab4m-MuiSvgIcon-root': { fontSize: '40px', paddingTop: '10px' }
                }}
                    className={style.list} >
                    <ListItem alignItems="flex-start" className={style.list}>
                        <ListItemAvatar>
                            <Avatar alt="album cover" src={this.props.imageSrc} sx={{ height: '70px', width: '70px', marginRight: '10px' }} />
                        </ListItemAvatar>
                        <ListItemText
                            className={style.listItemText}
                            primary={this.props.title}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                    </Typography >
                                    {this.props.artist}
                                </React.Fragment>
                            }
                        />
                        {/* only show heart when user is loggeed in */}
                        {localStorage.getItem("isLoggedIn") === "true" &&
                            <IconButton variant="plain" onClick={() => {
                                //if song is not liked, then like it, otherwise dislike it
                                if (this.state.isSongLiked) {
                                    this.props.handleDislikeSong(this.props.id);
                                } else {
                                    this.props.handleLikeSong(this.props.id);
                                }
                                this.setState({ isSongLiked: !this.state.isSongLiked });
                            }}>
                                {/* heart button - filled when song is liked, hollow when not liked */}
                                {this.state.isSongLiked ? (
                                    <Favorite sx={{ fontSize: '22px' }} />
                                ) : (
                                    <FavoriteBorder sx={{ fontSize: '22px' }} />
                                )}
                            </IconButton>
                        }
                        <IconButton
                            aria-label='play'
                            onClick={() => { this.props.currentSongChanger(this.props.id) }}
                        >
                            <PlayArrowRounded sx={{ fontSize: '24px' }} />
                        </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List >
            </>
        )
    }
}
