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
        artistInput: '',
        users: [
            {
                id: '',
                name: '',
                favourites: []
            }]
    }
    songs = [];
    baseUrl = 'http://localhost:3000';
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
        this.addToFavourites = this.addToFavourites.bind(this);
        this.removeFromFavourites = this.removeFromFavourites.bind(this);
    }

    componentDidMount() {
        this.getSongs();
        this.getUsers();
    }

    getSongs = async () => {
        const response = await fetch(`${this.baseUrl}/songs`);
        this.songs = await response.json();
        this.getPropertyValues('genre', this.genres);
        this.getPropertyValues('artist', this.artists);
        this.getPropertyValues('album', this.albums);

        this.setState(() => ({
            'songs': this.songs
        }));
    }

    getUsers = async () => {
        const response = await fetch(`${this.baseUrl}/users`);
        const users = await response.json();
        this.setState(() => ({
            'users': users
        }));
    }

    filterHelper(input, newSongs, field) {
        if (input !== '') {
            let value = input;
            if (value !== '') {
                newSongs = newSongs.filter((song) => {
                    return song[field] == value;
                }
                );
            }
        }
        return newSongs;
    }

    updateUsers = (newUserData) => {
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        }

        fetch(`${this.baseUrl}/users/${this.state.users[0].id}`, request)
            .then(() => console.log('UPDATE USERS'))
            .catch((err) => console.log(err));
    }

    addToFavourites(songId) {

        if (!this.state.users[0].favourites.includes(songId)) {
            const newUserData = {
                id: this.state.users[0].id,
                name: this.state.users[0].name,
                favourites: [...this.state.users[0].favourites, songId]
            }
            this.setState({
                users: [newUserData]
            });

            this.updateUsers(newUserData);
        }
    }

    removeFromFavourites(songId) {
        if (this.state.users[0].favourites.includes(songId)) {
            const newUserData = {
                id: this.state.users[0].id,
                name: this.state.users[0].name,
                favourites: this.state.users[0].favourites.filter((fav) => fav != songId)
            }

            console.log(songId, newUserData)

            this.setState({
                users: [newUserData]
            });

            this.updateUsers(newUserData);
        }
    }

    filterBy() {
        let newSongs = this.songs;
        if (this.state.searchInput !== '') {
            let title = this.state.searchInput;
            if (title !== null) {
                newSongs = newSongs.filter((song) => {
                    return song.title.toLowerCase().includes(title.toLowerCase())
                }
                );
            }
        }
        newSongs = this.filterHelper(this.state.genreInput, newSongs, 'genre');
        newSongs = this.filterHelper(this.state.artistInput, newSongs, 'artist');
        newSongs = this.filterHelper(this.state.albumInput, newSongs, 'album');
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
    }

    handleDrawerToggle = () => {
        const mobileOpen = !this.state.drawer.mobileOpen;
        const drawerWidth = this.state.drawer.drawerWidth
        this.setState({
            drawer: {
                mobileOpen, drawerWidth
            }
        });
    };

    handlePlayClick(song) {
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
                    handlePlayClick={this.handlePlayClick}
                    addToFavourites={this.addToFavourites}
                    removeFromFavourites={this.removeFromFavourites}
                    favourites={this.state.users[0].favourites}
                />
                <Slide direction="up" in={this.state.player.opened} mountOnEnter unmountOnExit>
                    <div>
                        <Player playedSong={this.state.player.playedSong} songs={this.state.songs} />
                    </div>
                </Slide>
                <SideNavigationDrawer drawer={this.state.drawer} handleDrawerToggle={this.handleDrawerToggle} zIndex={5} />
            </>
        )
    }
}
