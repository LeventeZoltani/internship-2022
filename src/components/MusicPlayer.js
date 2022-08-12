import React, { Component } from 'react'

import style from './MusicPlayer.module.css';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


export default class MusicPlayer extends Component {

    render() {
        return (
            <div className={style.musicPlayerFooter}>
                <iframe
                    src={this.props.musicSrc}
                    className={`${this.props.openedPlayer && style.opened} ${style.player}`}
                    title="song"
                    frameBorder="0" allowFullScreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                </iframe>
                <IconButton onClick={this.props.closePlayer}>
                    <CloseIcon sx={{ color: 'black' }} />
                </IconButton>
            </div>
        )
    }
}
