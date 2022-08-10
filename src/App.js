import { React, Component } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";
// import Footer from './components/Footer';


export default class App extends Component {

    constructor() {
        super();
        this.onChangeInput = this.onChangeInput.bind(this);
        this.getSongById = this.getSongById.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        songs: [],
        user: {id:"",username:"",password:"",favouriteSongs:[]},
        currentSong: {},
        genres: ["pop", "electro-pop", "alternative", "rock", "hip-hop", "Indie", "Liked songs"],
        likedSongs: [],
    }


    componentDidMount() {
        this.getSongs();
        if (localStorage.getItem('isLoggedIn') != null) {
            this.setState({
                isLoggedIn: localStorage.getItem('isLoggedIn')
            })
            if (localStorage.getItem('isLoggedIn') === "true") {
                this.getLikedSongs();
                // console.log("liked songs:" + JSON.stringify(this.state.likedSongs));
            }
        }
        else {
            localStorage.setItem('isLoggedIn', false);
        }
    }
    /* DATA MANAGING */

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

    handleSubmit = (userData) => {

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
                //user exists in db
                this.setState({
                    validUser: true
                })
                if (userData.password === userInDB[0].password) {
                    this.setState({
                        validPassword: true,
                        isLoggedIn: true
                    })
                    localStorage.setItem("isLoggedIn", true);
                    localStorage.setItem("username", userData.username)
                } else {
                    this.setState({
                        validPassword: false,
                        isLoggedIn: false
                    })
                }
            } else {
                this.setState({
                    validUser: false,
                    validPassword: true,
                    isLoggedIn: false
                })
            }
        })
    }

    /* LIKED SONGS */

    getLikedSongs() {
        let url = this.state.songsUrl + "/users/?username=" + localStorage.getItem("username");
        if (localStorage.getItem("username")) {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((resp) => {
                return resp.json()
            }).then((userInDB) => {

                let idList = userInDB[0].favouriteSongs;

                let likedSongsArray = [];
                for (let i = 0; i < idList.length; i++) {
                    likedSongsArray.push(this.getSongById(parseInt(idList[i])));
                }

                this.setState({
                    likedSongs: likedSongsArray,
                    user: userInDB[0]
                });


            });
        }
    }

    handleLikeSong(id) {

        if (this.state.user !== null) {
            let newUser = this.state.user;
            newUser.favouriteSongs = this.state.user.favouriteSongs;
            newUser.favouriteSongs.push(id.toString());
            let url = this.state.songsUrl + "/users/" + this.state.user.id;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id':this.state.user.id,
                    'username':this.state.user.username,
                    'password':this.state.user.password,
                    'favouriteSongs':this.state.user.favouriteSongs,
                }),
                
            }).then((resp) => {
                console.log("response " + JSON.stringify(resp));
            });
            this.getLikedSongs();
        }
        else {
            alert("log in first to like songs")
        }
    }

    handleDislikeSong(id) {
        console.log("Disliked song: " + JSON.stringify(this.getSongById(id)));
        if (this.state.user !== null) {
            let newUser = this.state.user;
            newUser.favouriteSongs = this.state.user.favouriteSongs;
            newUser.favouriteSongs.pop(id.toString());

            let url = this.state.songsUrl + "/users/" + this.state.user.id;
            fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id':this.state.user.id,
                    'username':this.state.user.username,
                    'password':this.state.user.password,
                    'favouriteSongs':this.state.user.favouriteSongs,
                }),
                
            }).then((resp) => {
                console.log("response " + JSON.stringify(resp));
            });
            this.getLikedSongs();
        }
        else {
            alert("log in first to like songs")
        }
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

    getSongById(id) {
        for (let i = 0; i < this.state.songs.length; i++) {
            if (this.state.songs[i].id === id) {
                return this.state.songs[i];
            }
        }
        return null;
    }

    filterSongs() {
        if (this.state.inputText === '') {
            if (this.state.inputGenre === 'all' || this.state.inputGenre === '') {
                return this.state.songs;
            } else if (this.state.inputGenre === "Liked songs") {
                return this.state.likedSongs;
            }
            else {
                return this.state.songs.filter((song) => song.genre === this.state.inputGenre);
            }
        }
        else {
            if (this.state.inputGenre === 'all' || this.state.inputGenre === '') {
                return (this.state.songs.filter((song) => song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText)))
            }
            else if (this.state.inputGenre === "Liked songs") {
                return (this.state.likedSongs.filter((song) => song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText)))
            }
            else {
                return (this.state.songs.filter((song) => song.genre === this.state.inputGenre && (song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText))))
            }
        }
    }

    /* LOGIN */


    isSongLiked(id) {

        for (let i = 0; i < this.state.likedSongs.length; i++) {
            if (this.state.likedSongs[i] !== null && id === this.state.likedSongs[i].id) {
                return true;
            }
        }
        return false;
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
                {/* {console.log("Is Logged In? " + this.state.isLoggedIn)} */}
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
                                likedSongs={this.state.likedSongs}
                            />
                        </Route>

                        <Route path='/login'>
                            <Login
                                handleSubmit={this.handleSubmit}
                                validUser={this.state.validUser}
                                validPassword={this.state.validPassword}
                                isLoggedIn={this.state.isLoggedIn}
                            />
                        </Route>

                    </Switch>
                </Router>

            </>
        )
    }
}

