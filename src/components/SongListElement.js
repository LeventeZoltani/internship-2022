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
import PauseRounded from '@mui/icons-material/PauseRounded';
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
                    '.css-10hburv-MuiTypography-root': {
                        fontSize: '21px'
                    },
                    '.css-83ijpv-MuiTypography-root': {
                        fontSize: '17px'
                    },
                    '.css-yoab4m-MuiSvgIcon-root': {
                        fontSize: '40px',
                        paddingTop: '10px'
                    }
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
                                <>
                                    <React.Fragment>
                                        <Typography
                                            sx={{
                                                display: 'inline',
                                            }}
                                            component="span"
                                            variant="body2"
                                            color="text.primary"
                                        >
                                        </Typography >
                                        {this.props.artist}
                                    </React.Fragment>
                                </>
                            }
                        />
                        {localStorage.getItem("isLoggedIn")==="true" &&
                            <IconButton variant="plain" onClick={() => {
                                if (this.state.isSongLiked) {
                                    this.props.handleDislikeSong(this.props.id);
                                } else {
                                    this.props.handleLikeSong(this.props.id);
                                }
                                this.setState({ isSongLiked: !this.state.isSongLiked });
                            }}>
                                {!this.state.isSongLiked && <FavoriteBorder sx={{ fontSize: '22px' }} />}
                                {this.state.isSongLiked && <Favorite sx={{ fontSize: '22px' }} />}
                            </IconButton>
                        }
                        <IconButton
                            // aria-label={paused ? 'play' : 'pause'}
                            aria-label='play'
                            onClick={() => {
                                this.setState({
                                    paused: !this.state.paused
                                })
                                console.log(this.props.id);
                                this.props.currentSongChanger(this.props.id)
                            }}
                        >
                            {this.state.paused ? (
                                <PlayArrowRounded
                                    sx={{ fontSize: '24px' }}
                                />
                            ) : (
                                <PauseRounded sx={{ fontSize: '24px' }} />
                            )}
                        </IconButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List >
            </>
        )
    }
}