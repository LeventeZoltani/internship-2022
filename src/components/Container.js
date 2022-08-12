import { Slide } from '@mui/material'
import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Player from './Player'
import SideNavigationDrawer from './SideNavigationDrawer'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";

import Login from './Login'
import RequireAuth from './RequireAuth'
import NotFound from './NotFound'
import Register from './Register'
import SimpleSnackbar from './SimpleSnackBar'

/** The App's Container. */
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
        user: null,
        isLoggedIn: false,
        validLogin: true,
        isRegistered: false,
        validRegistrationUsername: true,
        validRegistrationPasswords: true,
        favouriteSongs: []
    }
    songs = [];
    baseUrl = 'http://localhost:3000';
    genres = [];
    artists = [];
    albums = [];
    favouriteSongs = [];

    /**
    * Constructor method.
    * @param {object} props - The props object.
    */
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
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleRegisterClick = this.handleRegisterClick.bind(this);
        this.validate = this.validate.bind(this);
        this.getFavouriteSongs = this.getFavouriteSongs.bind(this);
    }

    /**
    * Component did mount lifecycle.
    */
    componentDidMount() {
        this.getSongs();
        this.getUsers();
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            this.setState({
                isLoggedIn: true
            });
        }
        this.setState({
            user: user
        });
    }

    // ------ SERVER REQUESTS ------

    /**
    * Getting songs from database.
    */
    async getSongs() {
        const response = await fetch(`${this.baseUrl}/songs`);
        this.songs = await response.json();
        this.getPropertyValues('genre', this.genres);
        this.getPropertyValues('artist', this.artists);
        this.getPropertyValues('album', this.albums);

        this.setState(() => ({
            songs: this.songs
        }));
    }

    /**
    * Getting users from database.
    */
    async getUsers() {
        const response = await fetch(`${this.baseUrl}/users`);
        const users = await response.json();
        this.setState(() => ({
            users: users
        }));
    }

    /**
    * Update users in database.
    * @param {object} newUserData - The user with changed properties.
    */
    updateUsers(newUserData) {
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        }

        fetch(`${this.baseUrl}/users/${this.state.user.id}`, request)
            .then(() => console.log('UPDATE USERS'))
    }

    /**
    * Create new user in database.
    * @param {object} newUser - The new user we want to add.
    */
    createUser(newUser) {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        }
        fetch(`${this.baseUrl}/users`, request)
            .then(() => this.getUsers());
    }

    // ------ LOGIN ------

    /**
    * Validate login inputs.
    * @param {string} username - Username input value.
    * @param {string} password - Password input value.
    */
    validate(username, password) {
        const userIndex = this.state.users.findIndex((user) => user.info.username === username && user.info.password === password);

        if (userIndex >= 0) {
            this.setState({
                user: this.state.users[userIndex],
                isLoggedIn: true,
                validLogin: true,
            });
            localStorage.setItem('user', JSON.stringify(this.state.users[userIndex]));
        } else {
            this.setState({
                isLoggedIn: false,
                validLogin: false,
            })
        }
    }

    /**
    * Handle login click.
    * @param {object} user - User inputs.
    */
    handleLoginClick(user) {
        this.validate(user.username, user.password);
    }

    /**
    * Handle logout click.
    */
    handleLogoutClick() {
        this.setState({
            user: null,
            isLoggedIn: false,
            player: {
                opened: false,
                playedSong: {}
            }
        });
        localStorage.removeItem('user');
    }

    // ------ REGISTER ------

    /**
    * Handle register click.
    * @param {string} user - The users register input values.
    */
    handleRegisterClick(user) {
        const userIndex = this.state.users.findIndex((u) => u.info.username === user.username);

        if (userIndex === -1 && user.username !== '') {
            if (user.password === user.confirmPassword && user.password !== '' && user.confirmPassword !== '') {
                const newUser = {
                    id: (this.state.users.length + 1).toString(),
                    info: {
                        username: user.username,
                        password: user.password
                    },
                    favourites: [],
                    imageUrl: ''
                }
                this.createUser(newUser);
                this.getUsers();
                this.setState({
                    isRegistered: true,
                })
            } else {
                this.setState({
                    validRegistrationPasswords: false,
                    validRegistrationUsername: true
                })
            }
        } else {
            this.setState({
                validRegistrationUsername: false,
                validRegistrationPasswords: false,
            })
        }
    }

    // ------ FAVOURITES ------

    /**
    * Get favourites songs from the songs list based on user.
    */
    getFavouriteSongs() {
        const favourites = this.state.user.favourites.map((id) =>
            this.state.songs.filter((song) => song.id === id)
        )

        this.setState({
            favouriteSongs: favourites.flat()
        })
    }

    /**
    * Add to favourites.
    * @param {string} songId - The id of the song we wanna add.
    */
    addToFavourites(songId) {
        if (!this.state.user.favourites.includes(songId)) {
            const newUserData = {
                id: this.state.user.id,
                info: {
                    username: this.state.user.info.username,
                    password: this.state.user.info.password
                },
                favourites: [...this.state.user.favourites, songId],
                imageUrl: this.state.user.imageUrl
            }
            this.setState({
                user: newUserData
            });

            this.updateUsers(newUserData);
        }
    }

    /**
    * Remove from favourites.
    * @param {string} songId - The id of the song we wanna remove.
    */
    removeFromFavourites(songId) {
        if (this.state.user.favourites.includes(songId)) {
            const newUserData = {
                id: this.state.user.id,
                info: {
                    username: this.state.user.info.username,
                    password: this.state.user.info.password
                },
                favourites: this.state.user.favourites.filter((fav) => fav !== songId),
                imageUrl: this.state.user.imageUrl
            }

            this.setState({
                user: newUserData
            });

            this.updateUsers(newUserData);
        }
    }

    // ------ FILTER ------

    /**
    * Set album input value on change.
    * @param {object} obj - New album input value.
    */
    onChangeAlbum(obj) {
        this.setState(() => ({
            'albumInput': obj.value
        }))
    }

    /**
    * Set artist input value on change.
    * @param {object} obj - New artist input value.
    */
    onChangeArtist(obj) {
        this.setState({
            'artistInput': obj.value
        })
    }

    /**
    * Set genre input value on change.
    * @param {object} obj - New genre input value.
    */
    onChangeGenre(obj) {
        this.setState({
            'genreInput': obj.value
        })
    }

    /**
    * Set search input value on change.
    * @param {object} obj - New search input value.
    */
    onChangeSearch(obj) {
        this.setState({
            'searchInput': obj.value
        })
    }

    /**
    * Get property values for filter dropdowns.
    * @param {string} property - New album input value.
    * @param {array} array - Array with data based on property.
    */
    getPropertyValues = (property, array) => {
        this.songs.forEach(song => {
            const propValue = song[property];
            if (!array.includes(propValue)) {
                array.push(propValue);
            }
        });
    }

    /**
    * Filter based on field.
    * @param {string} input - New input value.
    * @param {array} newSongs - The filtered array.
    * @param {string} field - The field we wanna filter.
    */
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

    /**
    * Filtering the songs.
    */
    filterBy() {
        let newSongs = this.songs;
        const location = window.location.pathname;
        if (location === '/favourites') {
            newSongs = this.state.favouriteSongs;
        }


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

    // ------ PLAYER ------

    /**
    * Handle play click on song.
    * @param {object} song - The song we wanna play.
    */
    handlePlayClick(song) {
        this.handlePlayerOpened(!this.opened, song);
    };

    /**
    * Set player on click.
    * @param {boolean} opened - The player is opened or not.
    * @param {object} playedSong - The song we wanna play.
    */
    handlePlayerOpened(opened, playedSong) {
        this.setState({
            player: { opened, playedSong }
        })
    }

    // ------ DRAWER ------

    /**
    * Handle drawer on mobile view and web view.
    */
    handleDrawerToggle = () => {
        const mobileOpen = !this.state.drawer.mobileOpen;
        const drawerWidth = this.state.drawer.drawerWidth
        this.setState({
            drawer: {
                mobileOpen, drawerWidth
            }
        });
    };

    render() {
        return (
            <Router>
                {this.state.isLoggedIn ? (
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
                            user={this.state.user} />
                        <Slide direction="up" in={this.state.player.opened} mountOnEnter unmountOnExit>
                            <div>
                                <Player
                                    playedSong={this.state.player.playedSong}
                                    addToFavourites={this.addToFavourites}
                                    removeFromFavourites={this.removeFromFavourites}
                                    user={this.state.user} />
                            </div>
                        </Slide><SideNavigationDrawer
                            drawer={this.state.drawer}
                            handleDrawerToggle={this.handleDrawerToggle}
                            handleLogoutClick={this.handleLogoutClick}
                            zIndex={-1} /></>
                ) : <></>
                }
                <Routes>
                    <Route exact path="/" element={
                        !this.state.isLoggedIn ? (
                            <Login handleLoginClick={this.handleLoginClick} validLogin={this.state.validLogin} />
                        ) : (<Navigate to="/home" />)

                    } />

                    <Route exact path="/register" element={
                        !this.state.isLoggedIn ? (
                            <RequireAuth isLoggedIn={!this.state.isRegistered}>
                                <Register
                                    handleRegisterClick={this.handleRegisterClick}
                                    validRegistrationUsername={this.state.validRegistrationUsername}
                                    validRegistrationPasswords={this.state.validRegistrationPasswords}
                                />
                            </RequireAuth>
                        ) : (<Navigate to="/" />)} />

                    <Route exact path="/home" element={

                        <RequireAuth isLoggedIn={this.state.isLoggedIn}>
                            <Main
                                drawer={this.state.drawer}
                                songs={this.filterBy()}
                                handlePlayClick={this.handlePlayClick}
                                addToFavourites={this.addToFavourites}
                                removeFromFavourites={this.removeFromFavourites}
                                user={this.state.user}
                                getFavouriteSongs={this.getFavouriteSongs}
                            />
                        </RequireAuth>

                    }>
                    </Route>
                    <Route exact path="/favourites" element={
                        <RequireAuth isLoggedIn={this.state.isLoggedIn}>
                            <Main
                                drawer={this.state.drawer}
                                songs={this.filterBy()}
                                handlePlayClick={this.handlePlayClick}
                                addToFavourites={this.addToFavourites}
                                removeFromFavourites={this.removeFromFavourites}
                                user={this.state.user}
                                getFavouriteSongs={this.getFavouriteSongs}
                            />
                        </RequireAuth>
                    } />
                    <Route exact path="*" element={
                        <NotFound />
                    } />
                </Routes>
                {
                    this.state.isRegistered ? (
                        <SimpleSnackbar open={this.state.isRegistered} />
                    ) : <></>
                }
            </Router>
        )
    }
}
