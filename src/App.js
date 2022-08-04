import { React, Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
// import Footer from './components/Footer';


export default class App extends Component {

    constructor() {
        super();
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getSongById = this.getSongById.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
    }

    state = {
        inputText: '',
        inputGenre: '',
        songs: [
            {
                id: 1, title: 'Blank Space', artist: 'Taylor Swift', album: '1989', genre: 'pop',
                imageSrc: "https://pyxis.nymag.com/v1/imgs/5a1/58c/580de90bf142c7660dcbaf8faa789a61b1-20-taylor-swift-1989.2x.w710.png",
                musicSrc: "https://open.spotify.com/embed/track/1u8c2t2Cy7UBoG4ArRcF5g?utm_source=generator",
            },
            {
                id: 2, title: 'Primadonna', artist: 'MARINA', album: 'Electra Heart', genre: 'electro-pop',
                imageSrc: "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/Marina_and_the_Diamonds_-_Electra_Heart.png/220px-Marina_and_the_Diamonds_-_Electra_Heart.png",
                musicSrc: "https://open.spotify.com/embed/track/4sOX1nhpKwFWPvoMMExi3q?utm_source=generator",
            },
            {
                id: 3, title: 'Gemini Feed', artist: 'BANKS', album: 'The Altar', genre: 'indie',
                imageSrc: "https://upload.wikimedia.org/wikipedia/ro/e/ee/Banks-the-altar.jpg",
                musicSrc: "https://open.spotify.com/embed/track/5B8N5rPOmTVVGpuBMK2Vby?utm_source=generator",
            },
            {
                id: 4, title: 'LoveGame', artist: 'Lady Gaga', album: 'The Fame', genre: 'pop',
                imageSrc: "https://upload.wikimedia.org/wikipedia/ro/4/48/Thefame.jpg",
                musicSrc: "https://open.spotify.com/embed/track/0eH2eHURaXUP15D8gQlfjx?utm_source=generator",
            },
            {
                id: 6, title: 'Toxic', artist: 'Britney Spears', album: 'In The Zone', genre: 'pop',
                imageSrc: "https://i.scdn.co/image/ab67616d0000b273efc6988972cb04105f002cd4",
                musicSrc: "https://open.spotify.com/embed/track/6I9VzXrHxO9rA9A5euc8Ak?utm_source=generator",
            },
            {
                id: 7, title: 'FRIENDS', artist: 'Marshmello, Anne-Marie', album: 'FRIENDS', genre: 'pop',
                imageSrc: "https://i.pinimg.com/originals/d4/41/ee/d441ee569e4134191b70bf0e9f558e69.jpg",
                musicSrc: "https://open.spotify.com/embed/track/3wm0FEw4BhPvCnSK8L0vGP?utm_source=generator",
            },
            {
                id: 8, title: 'Noise', artist: 'The Neighbourhood', album: 'Hard To Imagine The Neighbourhood Ever Changing', genre: 'alternative',
                imageSrc: "https://i.scdn.co/image/ab67616d0000b2739b6ac98a52f62d5cb473da40",
                musicSrc: "https://open.spotify.com/embed/track/2Wj1cS0hUzWrQPzYgZJj94?utm_source=generator",
            },
            {
                id: 9, title: 'Wish You Were Here', artist: 'Pink Floyd', album: 'Wish You Were Here', genre: 'rock',
                imageSrc: "https://i.scdn.co/image/ab67616d0000b273df3aa3f27dfda3285ca7a2e5",
                musicSrc: "https://open.spotify.com/embed/track/7aE5WXu5sFeNRh3Z05wwu4?utm_source=generator",
            },
            {
                id: 10, title: 'queen of broken hearts', artist: 'blackbear', album: 'everything means nothing', genre: 'hip-hop',
                imageSrc: "https://i.scdn.co/image/ab67616d0000b273e9b6f26ff354f4d70847f02d",
                musicSrc: "https://open.spotify.com/embed/track/1xyUCr7dIJYaUaaiDf4Q1L?utm_source=generator",
            },
            {
                id: 11, title: 'Fluorescent Adolescent', artist: 'Arctic Monkeys', album: 'Favourite Worst Nightmare', genre: 'alternative',
                imageSrc: "https://i.scdn.co/image/ab67616d0000b273b1f8da74f225fa1225cdface",
                musicSrc: "https://open.spotify.com/embed/track/2x8evxqUlF0eRabbW2JBJd?utm_source=generator",
            },
            {
                id: 12, title: 'Sober II (Melodrama)', artist: 'Lorde', album: 'Melodrama', genre: 'alternative',
                imageSrc: "https://i.scdn.co/image/ab67616d0000b273f8553e18a11209d4becd0336",
                musicSrc: "https://open.spotify.com/embed/track/54ucfuN596MU25jQD3KjCL?utm_source=generator",
            },
        ],
        currentSong: {},
        genres: ["pop", "electro-pop", "alternative", "rock", "hip-hop", "Indie"],
    }

    onChangeInput(childText) {
        this.setState({
            inputText: childText
        })
        console.log(this.state.inputText);
    }


    onChangeGenre(selectedGenre) {
        this.setState({
            inputGenre: selectedGenre
        })
        console.log(this.state.inputGenre);
    }

    getSongById(id) {
        for (let i = 0; i < this.state.songs.length; i++) {
            if (this.state.songs[i].id === id) {
                return this.state.songs[i];
            }
        }
        return null;
    }

    getSongsByGenre() {
        return this.state.songs.filter((song) => song.genre === this.state.selectedGenre);
    }

    filterSongs() {
        console.log("selected genre: " + this.state.inputGenre);
        if (this.state.inputText === '') {
            if (this.state.inputGenre === 'all' || this.state.inputGenre === '') {
                return this.state.songs;
            }
            else {
                return this.state.songs.filter((song) => song.genre === this.state.inputGenre);
            }
        }
        else {
            if (this.state.inputGenre === 'all' || this.state.inputGenre === '') {
                return (this.state.songs.filter((song) => song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText)))
            }else{
                return (this.state.songs.filter((song) => song.genre === this.state.inputGenre && (song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText))))
            }
        }
    }

    render() {
        return (
            <>
                <Header
                    onChangeInput={this.onChangeInput}
                    onChangeGenre={this.onChangeGenre}
                    genres={this.state.genres}
                    inputGenre={this.state.inputGenre}
                />
                <Main
                    songs={this.filterSongs()}
                    getSongById={this.getSongById}
                />
            </>
        )
    }
}
