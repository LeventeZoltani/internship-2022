import { Component } from "react";
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";

export default class Container extends Component {
    state={
        songs: [],
        titles: []

    }
    songs = [];
    titles= [];
    baseUrl = 'http://localhost:3000/songs';


    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        //this.handlePlayerOpened = this.handlePlayerOpened.bind(this);
        //this.handlePlayClick = this.handlePlayClick.bind(this);
        //this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.getSongs();
        // console.log(this.state.songs)
        {console.log('container:'+this.state.songs)}
    }

    getSongs = async () => {
        const response = await fetch(this.baseUrl);
        this.songs = await response.json();
        // console.log(data)
        const dataT=[];
        for(let i=0;i<this.songs.length;i++){
            //console.log(data[i].title);
            dataT[i]=this.songs[i].title;
                  
        }
        this.setState(() => ({
            'songs': this.songs,
            'titles': dataT
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

    // getSongsByGenre(genre) {
    //     // const response = await fetch(this.baseUrl);
    //     let newSongs = this.songs;
    //     if (genre !== null) {
    //         newSongs = newSongs.filter((song) =>{
    //             console.log(song.genre.toLowerCase().includes(genre))
    //             return song.genre.toLowerCase().includes(genre.toLowerCase()) || genre === null
    //         }
    //             );
    //         console.log(newSongs)
    //     } else {
            
    //     }

    //     this.setState(() => ({
    //         'songs': newSongs
    //     }));
    // }

    // update(genre) {
    //     console.log(genre);
    //     this.getSongsByGenre(genre);
    // }

    render(){
        return(
            <>
                <Header
                    //drawer={this.state.drawer}
                    //handleDrawerToggle={this.handleDrawerToggle}
                    //update={this.update}
                    songs={this.state.songs}
                    titles={this.state.titles}
                    update={this.update}
                />
                
                <Main
                    //drawer={this.state.drawer}
                    songs={this.state.songs}
                    //handlePlayClick={this.handlePlayClick} 
                />
                <Footer
                    //drawer={this.state.drawer}
                    songs={this.state.songs}
                    //handlePlayClick={this.handlePlayClick} 
                />
            </>
        );
    }

}