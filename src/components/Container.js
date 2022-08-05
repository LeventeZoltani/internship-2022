import { Slide } from '@mui/material'
import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Player from './Player'
import SideNavigationDrawer from './SideNavigationDrawer'



export default class Container extends Component {
    state = {

        drawer: {
            drawerWidth: 300,
            mobileOpen: false
        },
        songs: [],
        player: {
            opened: false,
            playedSong: {}
        },
        searchInput: '',
        genreInput: '',
        albumInput: '',
        artistInput: ''
    }
    songs = [];
    baseUrl = 'http://localhost:3000/songs';
    genres = [];
    artists = [];
    albums = [];

    getPropertyValues = (property, array) => {
        this.songs.map(song => {
            const propValue = song[property];
            if (!array.includes(propValue)) {
                array.push(propValue);
            }

        });

    }

    constructor(props) {
        super(props);
        this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
        this.handlePlayerOpened = this.handlePlayerOpened.bind(this);
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.onChangeAlbum = this.onChangeAlbum.bind(this);
        this.onChangeArtist = this.onChangeArtist.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeSearch = this.onChangeSearch.bind(this);
    }

    componentDidMount() {
        this.getSongs();
    }

    getSongs = async () => {
        const response = await fetch(this.baseUrl);
        this.songs = await response.json();
        this.getPropertyValues('genre', this.genres);
        this.getPropertyValues('artist', this.artists);
        this.getPropertyValues('album', this.albums);

        this.setState(() => ({
            'songs': this.songs
        }));
    }

    filterBy() {
        let newSongs = this.songs;
        if (this.state.searchInput !== '') {
            let title = this.state.searchInput;
            if (title !== null) {
                newSongs = newSongs.filter((song) => {
                    console.log(song.title.toLowerCase().includes(title))
                    return song.title.toLowerCase().includes(title.toLowerCase())
                }
                );
            }
        }

        if (this.state.genreInput !== '') {
            let genre = this.state.genreInput;
            if (genre !== '') {
                newSongs = newSongs.filter((song) => {
                    return song.genre == genre;
                }
                );
            }
        }

        if (this.state.artistInput !== '') {
            let artist = this.state.artistInput;
            if (artist !== '') {
                newSongs = newSongs.filter((song) => {
                    return song.artist == artist;
                }
                );
            }
        }

        if (this.state.albumInput !== '') {
            let album = this.state.albumInput;
            if (album !== '') {
                newSongs = newSongs.filter((song) => {
                    return song.album == album;
                }
                );
            }
        }
        return newSongs;
    }

    onChangeAlbum(obj) {
        this.setState(() => ({
            'albumInput': obj.value
        }))
    }

    onChangeArtist(obj) {
        this.setState({
            'artistInput': obj.value
        })
    }

    onChangeGenre(obj) {
        this.setState({
            'genreInput': obj.value
        })
    }

    onChangeSearch(obj) {
        this.setState({
            'searchInput': obj.value
        })
    }

    handlePlayerOpened(opened, playedSong) {
        this.setState({
            player: { opened, playedSong }
        })
        // this.setState({ playedSong })
    }

    handleDrawerToggle = () => {
        const mobileOpen = !this.state.drawer.mobileOpen;
        const drawerWidth = this.state.drawer.drawerWidth
        this.setState({
            drawer: {
                mobileOpen, drawerWidth
                // 'drawerWidth': this.drawerWidth
            }
        });
    };

    handlePlayClick(song) {
        // console.log(!this.opened, song);    
        this.handlePlayerOpened(!this.opened, song);
    };

    render() {
        return (
            <>
                <Header
                    drawer={this.state.drawer}
                    handleDrawerToggle={this.handleDrawerToggle}
                    onChangeAlbum={this.onChangeAlbum}
                    onChangeArtist={this.onChangeArtist}
                    onChangeGenre={this.onChangeGenre}
                    onChangeSearch={this.onChangeSearch}
                    songs={this.filterBy()}
                    genres={this.genres}
                    artists={this.artists}
                    albums={this.albums}
                />

                <Main
                    drawer={this.state.drawer}
                    songs={this.filterBy()}
                    handlePlayClick={this.handlePlayClick} />
                <Slide direction="up" in={this.state.player.opened} mountOnEnter unmountOnExit>
                    <div>
                        <Player playedSong={this.state.player.playedSong} />
                    </div>
                </Slide>
                <SideNavigationDrawer drawer={this.state.drawer} handleDrawerToggle={this.handleDrawerToggle} zIndex={5} />
            </>
        )
    }
}
