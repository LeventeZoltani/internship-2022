import React, { Component } from 'react'

import style from './MusicPlayer.module.css';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


export default class MusicPlayer extends Component {

    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div className={style.musicPlayerFooter}
                style={this.props.openedPlayer === true ? this.props.mountedStyle : this.props.unmountedStyle}
            >
                {/* {this.props.artist} - {this.props.title} */}
                <iframe
                    src={this.props.musicSrc}
                    className={style.player}
                    title="song"
                    // src="https://open.spotify.com/embed/track/7Fg4jpwpkdkGCvq1rrXnvx?utm_source=generator&theme=0" 
                    // width="100%" height="100%" 
                    frameBorder="0" allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                </iframe>
                {/* <audio controls>
                    <source src={this.props.musicSrc} type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio> */}
                <IconButton onClick={this.props.closePlayer}>
                    <CloseIcon sx={{ color: 'white' }} />
                </IconButton>
            </div>
        )
    }
}
