import { React, Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login'
import Register from './components/Register';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

export default class App extends Component {

    constructor() {
        super();
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getSongById = this.getSongById.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
        this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this);
        this.handleDislikeSong = this.handleDislikeSong.bind(this);
        this.handleLikeSong = this.handleLikeSong.bind(this);
        this.isSongLiked = this.isSongLiked.bind(this);
    }

    state = {
        songsUrl: 'http://localhost:3000',
        inputText: '',
        inputGenre: '',
        validUser: true,
        validPassword: true,
        isLoggedIn: false,
        registerSuccess: false,
        songs: [],
        user: {},
        genres: ["pop", "electro-pop", "alternative", "rock", "hip-hop", "Indie", "Liked songs"],
    }


    componentDidMount() {
        this.getSongs();
        console.log("USER: " + JSON.stringify(this.state.user));
        if (localStorage.getItem('isLoggedIn') != null) {
            //if isLoggedIn is already in local storage => set state of isLoggedIn
            this.setState({
                isLoggedIn: localStorage.getItem('isLoggedIn')
            })
            if (localStorage.getItem('isLoggedIn') === "true") {
                //if a user is logged in => set state of username
                if (localStorage.getItem('username') !== null) {
                    if (Object.keys(this.state.user).length === 0) {
                        this.setUser(localStorage.getItem("username"));
                    }
                }
            }
        }
        else {
            localStorage.setItem('isLoggedIn', false);
        }
        if (typeof (this.state.isLoggedIn) == "boolean") {
            console.log("boolean " + this.state.isLoggedIn);
        }

    }

    /* DATA MANAGING */

    // LOGIN & REGISTER - SUBMIT //

    //Check if the user and password exist & are correct
    handleLoginSubmit(userData) {
        let url = this.state.songsUrl + "/users/?username=" + userData.username;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => {
            return resp.json();
        }).then((userInDB) => {
            //userInDB is an array & the actual user is the first element of the array
            if (userInDB[0] !== undefined) {
                //user exists in db
                this.setState({
                    validUser: true
                })
                if (userData.password === userInDB[0].password) {
                    //correct user & password
                    this.setState({
                        validPassword: true,
                        isLoggedIn: true,
                        user: userInDB
                    })
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("username", userData.username)
                } else {
                    //correct user but incorrect password
                    this.setState({
                        validPassword: false,
                        isLoggedIn: false
                    })
                }
            } else {
                //username doesn't exist
                this.setState({
                    validUser: false,
                    validPassword: true,
                    isLoggedIn: false
                })
            }
        })
    }


    //check that the username isn't already in use 
    handleRegisterSubmit(userData) {
        let url = this.state.songsUrl + "/users/?username=" + userData.username;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => {
            return resp.json();
        }).then((userInDB) => {
            if (userInDB[0] !== undefined) {
                //username already exists in db => fail
                this.setState({
                    validUser: false,
                    registerSuccess: false
                })
                return;
            } else {
                //username is ok - post it to db
                this.setState({
                    validUser: true
                })
                url = this.state.songsUrl + "/users/";
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'username': userData.username,
                        'password': userData.password,
                        'likedSongs': [],
                    }),
                }).then(() => {
                    this.setState({
                        registerSuccess: true
                    })
                });
            }
        })
    }

    //get songs from db
    getSongs() {
        let url = this.state.songsUrl + "/songs";
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((resp) => {
            return resp.json();
        }).then((songList) => {
            this.setState({
                songs: songList
            })
        });
    }

    //set state of user with data from db
    setUser(username) {
        let url = this.state.songsUrl + "/users/?username=" + username;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((resp) => { return resp.json() }).then((userInDB) => {
            if (userInDB) {
                let newUser = {};
                newUser.id = userInDB[0].id;
                newUser.username = userInDB[0].username;
                newUser.password = userInDB[0].password;
                //map from id of songs to song objects
                newUser.likedSongs = userInDB[0].likedSongs.map((id) => this.getSongById(parseInt(id)));
                this.setState({
                    user: newUser
                })
            }
        })
    }

    /* LIKE/DISLIKE SONGS */

    updateUserData(likedSongs) {
        let url = this.state.songsUrl + "/users/" + this.state.user.id;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': this.state.user.id,
                'username': this.state.user.username,
                'password': this.state.user.password,
                'likedSongs': likedSongs,

            }),

        }).then((resp) => {
            console.log("response " + JSON.stringify(resp));
            this.setUser(this.state.user.username)
        });
    }

    //adding a song to the list of likes
    handleLikeSong(id) {
        //create a new list of liked songs
        let likedSongs = [...this.state.user.likedSongs];

        //map song objects to just their ids
        likedSongs = likedSongs.map((song) => song.id.toString());
        likedSongs.push(id.toString());

        //call function to update user with the new list of liked songs
        this.updateUserData(likedSongs);

    }

    //delete a song from the liked songs list of the user
    handleDislikeSong(id) {
        let likedSongs = [];
        //copy all songs from the state to the new list except the one to delete
        for (let i = 0; i < this.state.user.likedSongs.length; i++) {
            if (this.state.user.likedSongs[i].id.toString() !== id.toString()) {
                likedSongs.push(this.state.user.likedSongs[i].id.toString());
            }
        }

        //call function to update user with the new list of liked songs
        this.updateUserData(likedSongs);
    }


    /* ON CHANGE FUNCTIONS */

    onChangeInput(childText) {
        this.setState({
            inputText: childText
        })
    }

    onChangeGenre(selectedGenre) {
        this.setState({
            inputGenre: selectedGenre
        })
    }

    /* FILTER SONGS */

    //get song object from state.songs based on id 
    getSongById(id) {
        for (let i = 0; i < this.state.songs.length; i++) {
            if (this.state.songs[i].id === id) {
                return this.state.songs[i];
            }
        }
        return null;
    }

    //checks in list of liked songs - return true if the id is found or false otherwise
    isSongLiked(id) {
        for (let i = 0; this.state.user.likedSongs !== undefined && i < this.state.user.likedSongs.length; i++) {
            if (this.state.user.likedSongs[i] !== null && id === this.state.user.likedSongs[i].id) {
                return true;
            }
        }
        return false;
    }

    //filter songs by input text, genre and/or liked songs
    filterSongs() {
        if (this.state.inputText === '') {
            //no input text
            if (this.state.inputGenre === 'all' || this.state.inputGenre === '')
                //case 1 - all songs
                return this.state.songs;
            if (this.state.inputGenre === "Liked songs")
                //case 2 - only liked songs
                return this.state.user.likedSongs;
            //case 3 - filter songs by genre
            return this.state.songs.filter((song) => song.genre === this.state.inputGenre);
        }
        else {
            //same cases but filter data by whether it matches input text
            if (this.state.inputGenre === 'all' || this.state.inputGenre === '')
                return (this.state.songs.filter((song) => song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText)))
            if (this.state.inputGenre === "Liked songs")
                return (this.state.user.likedSongs.filter((song) => song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText)))

            return (this.state.songs.filter((song) => song.genre === this.state.inputGenre && (song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                song.artist.toLocaleLowerCase().includes(this.state.inputText))))

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
                    isLoggedIn={this.state.isLoggedIn}
                />
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Main
                                songs={this.filterSongs()}
                                getSongById={this.getSongById}
                                isLoggedIn={this.state.isLoggedIn}
                                handleLikeSong={this.handleLikeSong}
                                handleDislikeSong={this.handleDislikeSong}
                                isSongLiked={this.isSongLiked}
                                likedSongs={this.state.user.likedSongs}
                            />
                        </Route>

                        <Route path='/login'>
                            <Login
                                handleLoginSubmit={this.handleLoginSubmit}
                                validUser={this.state.validUser}
                                validPassword={this.state.validPassword}
                                isLoggedIn={this.state.isLoggedIn}
                            />
                        </Route>

                        <Route path='/register'>
                            <Register
                                validUser={this.state.validUser}
                                validPassword={this.state.validPassword}
                                handleRegisterSubmit={this.handleRegisterSubmit}
                                registerSuccess={this.state.registerSuccess}
                                isLoggedIn={this.state.isLoggedIn}
                            />
                        </Route>

                    </Switch>
                </Router>

            </>
        )
    }
}

