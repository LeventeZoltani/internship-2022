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
    }

    state = {
        songsUrl: 'http://localhost:3000',
        inputText: '',
        inputGenre: '',
        validUser: true,
        validPassword: true,
        songs: [
        ],
        currentSong: {},
        genres: ["pop", "electro-pop", "alternative", "rock", "hip-hop", "Indie"],
    }


    componentDidMount() {
        this.getSongs();
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

    /* ON CHANGE FUNCTIONS */

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

    /* FILTER SONGS */

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
            } else {
                return (this.state.songs.filter((song) => song.genre === this.state.inputGenre && (song.title.toLocaleLowerCase().includes(this.state.inputText) ||
                    song.artist.toLocaleLowerCase().includes(this.state.inputText))))
            }
        }
    }

    /* LOGIN */

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
                console.log("userInDb" + JSON.stringify(userInDB))
                if (userData.password === userInDB[0].password) {
                    this.setState({
                        validPassword: true
                    })
                }else{
                    this.setState({
                        validPassword: false
                    })

                }
            } else {
                this.setState({
                    validUser: false,
                    validPassword:true
                })
            }
        })

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
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <Main
                                songs={this.filterSongs()}
                                getSongById={this.getSongById}
                            />
                        </Route>

                        <Route path='/login'>
                            <Login
                                handleSubmit={this.handleSubmit}
                                validUser={this.state.validUser}
                                validPassword={this.state.validPassword}
                            />
                        </Route>

                    </Switch>
                </Router>

            </>
        )
    }
}

