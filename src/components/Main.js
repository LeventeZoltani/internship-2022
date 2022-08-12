import React, { Component } from 'react';

import style from './Main.module.css';
import SongListElement from './SongListElement';
import MusicPlayer from './MusicPlayer';



class Main extends Component {

    state = {
        currentSong: {},
        isOpen: false,
    }

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
                    {/* display a SongListElement for every song in the list given in props */}
                    {Array.isArray(this.props.songs) && this.props.songs !== null ? this.props.songs.map(song => (
                        <SongListElement
                            key={song.id}
                            id={song.id}
                            title={song.title}
                            artist={song.artist}
                            imageSrc={song.imageSrc}
                            currentSongChanger={this.setCurrentSong}
                            handleLikeSong={this.props.handleLikeSong}
                            handleDislikeSong={this.props.handleDislikeSong}
                            isSongLiked={this.props.isSongLiked(song.id)}
                        />
                    )) :
                    //user is not logged in => no liked songs
                     <h2 className={style.nothingToSee}>Nothing to see here... <a href="/login">Login</a> to like some songs</h2>}
                    {/* if there are no liked songs but user is logged in */}
                    {this.props.songs !== undefined && this.props.songs.length === 0 &&
                        <h2 className={style.nothingToSee}>Nothing to see here... Like some songs!</h2>
                    }
                </ul>
                {this.state.isOpen  &&
                    <MusicPlayer
                        title={this.state.currentSong.title}
                        artist={this.state.currentSong.artist}
                        musicSrc={this.state.currentSong.musicSrc}
                        openedPlayer={this.state.isOpen}
                        closePlayer={this.closePlayer}
                    />
                }


            </main>
        );
    }
}

Main.propTypes = {};

export default Main;
