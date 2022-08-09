import React, { Component } from 'react';

import style from './Main.module.css';
import SongListElement from './SongListElement';
import MusicPlayer from './MusicPlayer';


class Main extends Component {

    state = {
        currentSong: {},
        isOpen: false,
    }

    mountedStyle = { display: "block" };

    unmountedStyle = {
        display: 'none',
    };

    constructor(props) {
        super(props);
        this.setCurrentSong = this.setCurrentSong.bind(this);
        this.closePlayer = this.closePlayer.bind(this);
    }

    setCurrentSong(id) {
        let song = this.props.getSongById(id);
        this.setState({
            currentSong: song,
            isOpen: true,
        })
        console.log("opened player: " + this.state.openedPlayer);
    }

    closePlayer() {
        this.setState({
            isOpen: false
        })
    }


    render() {

        return (
            <main className={style.main}>
                <ul>
                    {Array.isArray(this.props.songs) ? this.props.songs.map(song => (
                        <SongListElement
                            key={song.id}
                            id={song.id}
                            title={song.title}
                            artist={song.artist}
                            imageSrc={song.imageSrc}
                            currentSongChanger={this.setCurrentSong}
                        />
                    )) : null}
                </ul>
                {this.state.isOpen  &&
                    <MusicPlayer
                        title={this.state.currentSong.title}
                        artist={this.state.currentSong.artist}
                        musicSrc={this.state.currentSong.musicSrc}
                        openedPlayer={this.state.isOpen}
                        closePlayer={this.closePlayer}
                        mountedStyle={this.mountedStyle}
                        unmountedStyle={this.unmountedStyle}
                    />
                }


            </main>
        );
    }
}

Main.propTypes = {};

export default Main;
