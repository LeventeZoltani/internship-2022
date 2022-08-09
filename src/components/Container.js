import { Slide } from '@mui/material'
import React, { Component } from 'react'
import Header from './Header'
import Home from './Home'
import Player from './Player'
import SideNavigationDrawer from './SideNavigationDrawer'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import style from './Container.module.css'
import Login from './Login'
import RequireAuth from './RequireAuth'
import NotFound from './NotFound'


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
                id: "",
                info: {
                    username: "",
                    password: ""
                },
                favourites: []
            }],
        user:  {
            id: "",
            info: {
                username: "",
                password: ""
            },
            favourites: []
        },
        isLoggedIn: false,
    }
    songs = [];
    baseUrl = 'http://localhost:3000';
    genres = [];
    artists = [];
    albums = [];
    location = window.location.pathname;


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
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.validate = this.validate.bind(this);
    }

    componentDidMount() {
        this.getSongs();
        this.getUsers();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.setState({
                isLoggedIn: true
            });
        }
        // this.setState({
        //     user: user
        // });
    }

    componentWillUnmount() {
        localStorage.clear();
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
    // TODO: to get users based who is logged in
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
                    return song[field] === value;
                }
                );
            }
        }
        return newSongs;
    }

    // TODO: UPDATE just the user who is logged in
    updateUsers = (newUserData) => {
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        }

        fetch(`${this.baseUrl}/users/${this.state.user.id}`, request)
            .then(() => console.log('UPDATE USERS'))
            .catch((err) => console.log(err));
    }

    validate(username, password) {
        const userIndex = this.state.users.findIndex((user) => user.info.username === username && user.info.password === password);

        if (userIndex >= 0) {
            console.log('Valid', this.state.users[userIndex]);
            this.setState({
                user: this.state.users[userIndex]
            });
            localStorage.setItem('user', JSON.stringify(this.state.users[userIndex]));
            this.setState({
                isLoggedIn: true,
            })
        } else {
            console.log('Not Valid :/');
        }
    }

    handleLoginClick(user) {
        this.validate(user.username, user.password)
    }

    addToFavourites(songId) {

        if (!this.state.user.favourites.includes(songId)) {
            const newUserData = {
                id: this.state.user.id,
                info: {
                    username: this.state.user.info.username,
                    password: this.state.user.info.password
                },
                favourites: [...this.state.user.favourites, songId]
            }
            this.setState({
                user: newUserData
            });

            this.updateUsers(newUserData);
        }
    }

    removeFromFavourites(songId) {
        console.log(this.state.user.favourites);
        if (this.state.user.favourites.includes(songId)) {
            const newUserData = {
                id: this.state.user.id,
                info: {
                    username: this.state.user.info.username,
                    password: this.state.user.info.password
                },
                favourites: this.state.user.favourites.filter((fav) => fav !== songId)
            }

            console.log(songId, newUserData)

            this.setState({
                user: newUserData
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
                <Router>
                    {/* <Routes> */}
                    {/* {console.log(this.location)} */}
                    {/* {this.location !== '/' && this.state.isLoggedIn ? ( */}
                    <React.Fragment>
                        {/* <Header
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
                            /> */}
                    </React.Fragment>
                    {/* ) : <></>
                    } */}


                    <Routes>
                        <Route exact path="/" element={
                            !this.state.isLoggedIn ? (
                                <main className={style.main}>
                                    <Login handleLoginClick={this.handleLoginClick} />
                                </main>) : (<Navigate to="/home" />)

                        } />
                        {    console.log(this.state.user)}
                        <Route exact path="/home" element={
                            
                            <RequireAuth isLoggedIn={this.state.isLoggedIn}>
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
                                <main className={style.main}>
                                    <Home
                                        drawer={this.state.drawer}
                                        songs={this.filterBy()}
                                        handlePlayClick={this.handlePlayClick}
                                        addToFavourites={this.addToFavourites}
                                        removeFromFavourites={this.removeFromFavourites}
                                        favourites={this.state.user.favourites}
                                    />
                                </main>
                                <Slide direction="up" in={this.state.player.opened} mountOnEnter unmountOnExit>
                                    <div>
                                        <Player
                                            playedSong={this.state.player.playedSong}
                                            addToFavourites={this.addToFavourites}
                                            removeFromFavourites={this.removeFromFavourites}
                                            favourites={this.state.user.favourites} />
                                    </div>
                                </Slide>
                                <SideNavigationDrawer drawer={this.state.drawer} handleDrawerToggle={this.handleDrawerToggle} zIndex={-1} />

                            </RequireAuth>
                        }>

                        </Route>
                        <Route exact path="/favourites" element={<div>Hello</div>} />
                        <Route exact path="*" element={
                            <main>
                                <NotFound />
                            </main>
                        } />

                    </Routes>


                    {/* {this.location !== '/' && this.state.isLoggedIn ? (
                        <React.Fragment>
                            <Slide direction="up" in={this.state.player.opened} mountOnEnter unmountOnExit>
                                <div>
                                    <Player
                                        playedSong={this.state.player.playedSong}
                                        addToFavourites={this.addToFavourites}
                                        removeFromFavourites={this.removeFromFavourites}
                                        favourites={this.state.users[0].favourites} />
                                </div>
                            </Slide><SideNavigationDrawer drawer={this.state.drawer} handleDrawerToggle={this.handleDrawerToggle} zIndex={5} />
                        </React.Fragment>
                    ) : <></>
                    } */}

                    {/* </Routes> */}
                </Router>
            </>
        )
    }
}
