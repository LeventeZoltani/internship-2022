import { Component } from "react";
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";

export default class Container extends Component {
    state={
        songs: [],
        filter: "",
        titles: [],
        artists: [],
        genres: ["Pop","Rock","Pop-Rock","Dance","Disco","KPop","CPop","Folk"],
        albums: [],

    }
    songs = [];
    titles= [];
    filter="";
    baseUrl = 'http://localhost:3000/songs';


    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.getOptionsByFilter = this.getOptionsByFilter.bind(this);
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
        const dataA=[];
        const dataAL=[];
        for(let i=0;i<this.songs.length;i++){
            //console.log(data[i].title);
            dataT[i]=this.songs[i].title;
            dataA[i]=this.songs[i].artist;
            if(this.songs[i].album!=""){
               dataAL[i]=this.songs[i].album;
            }
            
                  
        }
        this.setState(() => ({
            'songs': this.songs,
            'titles': dataT,
            "artists": dataA,
            "albums": dataAL,
        }));
    }

    getOptionsByFilter(){
       if(this.filter=="Title"){
          return this.state.titles;
       }
       else if(this.filter=="Genre"){
        return this.state.genres;
       }
       else if(this.filter=="Artist"){
        return this.state.artists;
       }else if(this.filter=="Album"){
        return this.state.albums;
       }else{
        return [];
       }
          
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

    
    handleFilter(filter){
        this.setState(() => ({
            'filter': filter
        }));
        this.filter=filter;
        
    }

    update(value) {
        if(this.filter=="Title"){
            this.getSongsByTitle(value);
        }else if(this.filter=="Genre"){
            this.getSongsByGenre(value);
        }else if(this.filter=="Artist"){
            this.getSongsByArtist(value);
        }else if(this.filter=="Album"){
            this.getSongsByAlbum(value);
        }
       
            
    }

    getSongsByGenre(genre) {
        // const response = await fetch(this.baseUrl);
        let newSongs = this.songs;
        if (genre !== null) {
            newSongs = newSongs.filter((song) =>{
                console.log(song.genre.toLowerCase().includes(genre))
                return song.genre.toLowerCase().includes(genre.toLowerCase()) || genre === null
            }
                );
            console.log(newSongs)
        } else {
            
        }

        this.setState(() => ({
            'songs': newSongs
        }));
    }

    // update(genre) {
    //     console.log(genre);
    //     this.getSongsByGenre(genre);
    // }

    getSongsByArtist(artist) {
        // const response = await fetch(this.baseUrl);
        let newSongs = this.songs;
        if (artist !== null) {
            newSongs = newSongs.filter((song) =>{
                console.log(song.artist.toLowerCase().includes(artist))
                return song.artist.toLowerCase().includes(artist.toLowerCase()) || artist === null
            }
                );
            console.log(newSongs)
        } else {
            
        }

        this.setState(() => ({
            'songs': newSongs
        }));
    }

    // update(artist) {
    //     console.log(artist);
    //     this.getSongsByArtist(artist);
    // }

    getSongsByAlbum(album) {
        // const response = await fetch(this.baseUrl);
        let newSongs = this.songs;
        if (album !== null) {
            newSongs = newSongs.filter((song) =>{
                console.log(song.album.toLowerCase().includes(album))
                return song.album.toLowerCase().includes(album.toLowerCase()) || album === null
            }
                );
            console.log(newSongs)
        } else {
            
        }

        this.setState(() => ({
            'songs': newSongs
        }));
    }

    // update(album) {
    //     console.log(album);
    //     this.getSongsByAlbum(album);
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
                    artists={this.state.artists}
                    albums={this.state.albums}
                    genres={this.state.genres}
                    update={this.update}
                    filter={this.state.filter}
                    handleFilter={this.handleFilter}
                    getOptionsByFilter={this.getOptionsByFilter}
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