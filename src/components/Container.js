import { Slide } from '@mui/material'
import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Player from './Player'
import SideNavigationDrawer from './SideNavigationDrawer'



export default class Container extends Component {
    state = {
        drawer: {
            drawerWidth: 300, mobileOpen: false
        },
        songs: [],
        player: {
            opened: false,
            playedSong: {}
        },
    }
    songs = [];
    baseUrl = 'http://localhost:3000/songs';

    constructor(props) {
        super(props);
        this.handlePlayerOpened = this.handlePlayerOpened.bind(this);
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.getSongs();
        // console.log(this.state.songs)
    }

    getSongs = async () => {
        const response = await fetch(this.baseUrl);
        this.songs = await response.json();
        // console.log(data)
        this.setState(() => ({
            'songs': this.songs
        }));
    }

    getSongsByTitle(title) {
        // const response = await fetch(this.baseUrl);
        let newSongs = this.songs;
        if (title !== null) {
            newSongs = newSongs.filter((song) =>{
                console.log(song.title.toLowerCase().includes(title))
                return song.title.toLowerCase().includes(title.toLowerCase()) || title === null
            }
                );
            console.log(newSongs)
        } else {
            
        }

        this.setState(() => ({
            'songs': newSongs
        }));
    }

    update(title) {
        console.log(title);
        this.getSongsByTitle(title);
    }

    handlePlayerOpened(opened, playedSong) {
        this.setState({
            player: { opened, playedSong }
        })
        // this.setState({ playedSong })
    }

    handleDrawerToggle = () => {
        this.setMobileOpen(!this.state.drawer.mobileOpen);
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
                    update={this.update}
                    songs={this.state.songs}
                />

                <Main
                    drawer={this.state.drawer}
                    songs={this.state.songs}
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
