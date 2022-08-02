import React, { Component } from 'react';

import style from './Main.module.css';
import SongListElement from './SongListElement';

class Main extends Component {

    state = {
        songs: [
            {
                id: 1, title: 'Blank Space', artist: 'Taylor Swift', album: '1989', genre:'pop',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 2, title: 'Primadonna', artist: 'MARINA', album: 'Electra Heart', genre:'electro-pop',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 4, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 5, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id:6, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 7, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 8, title: 'Blank Space', artist: 'Taylor Swift', album: '1989', genre:'pop',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 9, title: 'Primadonna', artist: 'MARINA', album: 'Electra Heart', genre:'electro-pop',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 10, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 11, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id:12, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
            {
                id: 13, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre:'alternative',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png"
            },
        ]
    }

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <main className={style.main}>
                {/* <img className={style.decoration} src={decoration} alt="decoration"/>
                <h2>Hello Awesome App!</h2>
                <p>To get started edit a file in "./src" and save to reload.</p> */}
                <ul>
                    {Array.isArray(this.state.songs) ? this.state.songs.map(song => (
                        <SongListElement
                            key={song.id}
                            title={song.title}
                            artist={song.artist}
                            imageSrc={song.imageSrc}
                        />
                    )) : null}
                    {/* <MediaControlCard 
                    title={this.state.songs[0].title} 
                    artist={this.state.songs[0].artist}
                    /> */}
                </ul>
            </main>
        );
    }
}

Main.propTypes = {};

export default Main;
