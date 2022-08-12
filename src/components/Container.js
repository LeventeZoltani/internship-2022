import React, { Component } from "react";
import Header from './Header'
import Main from './Main'
import Footer from "./Footer";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Routes } from "react-router-dom";
import LogIn from "./LogIn";
import CreateAccount from './CreateAccount';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import RequireAuth from "./RequireAuth";

  

export default class Container extends Component {
    state={
        songs: [],
        filter: "",
        titles: [],
        artists: [],
        genres: ["Pop","Rock","Pop-Rock","Dance","Disco","KPop","CPop","Folk"],
        albums: [],
        songId: "",
        users: [{
             id: "",
             username: "",
             password: "",
             favorites: [],  //this list contains the id's of the songs :)
             isLoggedIn: false,
             avatar: "",
        }],
        user: {
            id: "",
            username: "",
             password: "",
             favorites: [],  //this list contains the id's of the songs :)
             isLoggedIn: false,
             avatar: "",
        },
        isLoggedIn: false,
        stringsOfFavorites:[]
    }
    favorites=[];
    songs = [];
    users = [{
        id: "",
        username: "",
        password: "",
        favorites: [],  //this list contains the id's of the songs :)
        isLoggedIn: false,
        avatar: "",
   }];
    user={
        id: "",
        username: "",
        password: "",
        favorites: [],  //this list contains the id's of the songs :)
        isLoggedIn:false,
        avatar: "",
   }
    
    titles= [];
    filter="";
    baseUrl = 'http://localhost:3000/songs';
    baseUsersUrl = 'http://localhost:3000/users';
    //hearts=[];
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.getOptionsByFilter = this.getOptionsByFilter.bind(this);
        this.addToFavorites=this.addToFavorites.bind(this);
        this.removeFromFavorites=this.removeFromFavorites.bind(this);
        this.logIn=this.logIn.bind(this);
        this.validate=this.validate.bind(this);
        //this.handlePlayerOpened = this.handlePlayerOpened.bind(this);
        //this.handlePlayClick = this.handlePlayClick.bind(this);
        this.updateUsers = this.updateUsers.bind(this);
        //this.handleAction = this. handleAction.bind(this);
        this.getFavorites = this.getFavorites.bind(this);
        this.logOut= this.logOut.bind(this);
        this.createAccount= this.createAccount.bind(this);
    }

    componentDidMount() {
        this.getSongs();
        this.getUsers();
        // console.log(this.state.songs)
        //{console.log('container:'+this.state.songs)}
        //localStorage.setItem('user', JSON.stringify(this.state.user));
        const user = JSON.parse(localStorage.getItem('user'));
       
        if (user) {
            this.setState({
                isLoggedIn: true
            });
        }
        // this.setState({
        //     user: user
        // });
        this.setState({
            user: user
        });
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

    getUsers = async () => {
        const response = await fetch(this.baseUsersUrl);
        this.users = await response.json();
        this.setState(() => ({
            'users': this.users,
        }))
    }
   
    getUsersByUsername = async(username) => {
        let users = this.users;
        if (username !== null) {
            users = users.filter((user) =>{
                console.log(user.username.toLowerCase().includes(username))
                return user.username.toLowerCase().includes(username.toLowerCase()) || username === null
            }
                );
            console.log(users)
        } else {
            
        }

        this.setState(() => ({
            'users': users
        }));
        console.log(this.state.users)
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
       }else {
         for(let i=0; i<this.state.users.favorites; i++){
            this.state.stringsOfFavorites[i]=this.state.users.favorites[i].toString();
         }
         return this.state.stringsOfFavorites;
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

    // handleAction(action){

    // }

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
        }else if(this.filter=="Favorites"){
            this.getFavorites();
        }
       
            
    }
    
  

    getFavorites(){
        
        for(let i=0; i<this.state.user.favorites.length; i++){
            let newSongs = this.songs;
            if (this.state.user.favorites[i] !== null) {
                newSongs = newSongs.filter((song) =>{
                    console.log(song.id.toLowerCase().includes(this.state.user.favorites[i]))
                    return song.id.toLowerCase().includes(this.state.user.favorites[i].toLowerCase()) || this.state.user.favorites[i] === null
                }
                    );
                console.log(newSongs)
            } else {
                
            }
    
            this.setState(() => ({
                songs: newSongs
            }));
            //console.log(this.state.songs+"hereeeeee");
        }
       
        
    }

    // updateUserStatus = async(id)=>{
    //     fetch('http://localhost:3000/users/' +id, {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             "username": this.state.loggedInUser.username,
    //             "password": this.state.loggedInUser.password,
    //             "favorites": this.state.loggedInUser.favorites,  //this list contains the id's of the songs :)
    //             "status": this.state.loggedInUser.status,
    //             "avatar": this.state.loggedInUser.avatar,
    //         }),
    //     }).then((resp) => {
    //        console.log(resp)


    //     });
    // }

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
    updateUsers = async(newUserData) => {
        const request = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData)
        }

        fetch(this.baseUsersUrl+"/"+this.state.user.id, request)
        .then(() => console.log('UPDATE USERS'))
        .catch((err) => console.log(err));



    }

    addToFavorites(songId){
        
       this.state.user.favorites.push(songId);
       console.log("Add to favorites attempted  "+songId);
       const newUserData ={
        id: this.state.user.id,
        username: this.state.user.username,
        password: this.state.user.password,
        favorites: this.state.user.favorites,
        isLoggedIn: this.state.user.isLoggedIn,
        avatar: this.state.user.avatar,
       }
       this.setState(()=>({
         user: newUserData
       }));
       console.log(this.state.user.favorites);
       this.updateUsers(newUserData);
    //    const heart = document.getElementById("emptyheart");
    //    heart.innerHTML=` <FavoriteIcon sx={{fontSize: 'large',color: '#fa227c',height: 38, width: 38}}></FavoriteIcon>`;
    }

    removeFromFavorites(songId){
        const newFavorites = this.favorites;
        const index = newFavorites.findIndex((x) => x.songId === songId);
        newFavorites.splice(0,index);
        newFavorites.splice(index-1,1);
        const newUserData ={
            id: this.state.user.id,
            username: this.state.user.username,
            password: this.state.user.password,
            favorites: this.state.user.favorites.filter((fav)=> fav !== songId),
            isLoggedIn: this.state.user.isLoggedIn,
            avatar: this.state.user.avatar,
        }
        console.log("Remove favorites attempted  "+songId);
        this.setState(()=>({
           user: newUserData,
          }));
          console.log(newFavorites);
        this.updateUsers(newUserData);  
    }

    logIn(user){
        // const username= document.getElementById('username').value;
        // const password= document.getElementById('password').value;
        // this.getUsersByUsername(username);
        // console.log(this.state.users);
        // if(this.state.users[0].password === password){
        //     this.state.users[0].status="connected";
        //     this.setState(()=>({
        //         loggedInUser: {
        //             'username': this.state.users[0].username,
        //             'password': this.state.users[0].password,
        //             'status': this.state.users[0].status,
        //             'avatar': this.state.users[0].avatar,
        //         },
        //     }))
        //     this.updateUserStatus(this.state.users[0].id);
        //     alert("LogIn succeeded!");
        // }
        this.validate(user.username,user.password);
        
        
    }

    validate(username,password){
        const userIndex = this.state.users.findIndex((user) => user.username === username && user.password === password);

        if (userIndex >= 0) {
            console.log('Valid', this.state.users[userIndex]);
            this.state.users[userIndex].isLoggedIn=true;
            this.setState({
                   user: this.state.users[userIndex]
                   
            });
            //this.state.user.isLoggedIn=true;
            localStorage.setItem('user', JSON.stringify(this.state.users[userIndex]));
            
            this.state.isLoggedIn=true;
             console.log(this.state.isLoggedIn);
        } else {
            console.log('Not Valid :/');
        }   
    }

    logOut(){
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

    createUser(newUser) {
        const request = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        }
        fetch(this.baseUsersUrl, request)
            .then(() => this.getUsers());
    }
    createAccount(user){
        console.log("Create account attempted", user);
        const userIndex = this.state.users.findIndex((u) => u.username === user.username);
        if (userIndex === -1 && user.username !== '') {
            if (user.password === user.confirmPassword && user.password !== '' && user.confirmPassword !== '') {
                const newUser={
                    id: (this.state.users.length + 1),
                    username: user.username,
                    password: user.password,
                    favorites: [],
                    avatar: '',
                    
                }
                this.createUser(newUser);
                
                alert("Account created succesfully! :))");
            }else{
                alert("Passwords not matching! :((. Please retype passwords!");
            }
        }
    }


    render(){
        return(
            <>

        <Router>
      
        

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
                        <Routes>
                            <Route exact path="/" element={<><React.Fragment>
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
                                    handleLogOut={this.logOut}/>
                            </React.Fragment>
                                    <LogIn 
                                      logIn={this.logIn}
                                    />
                                    <Footer
                                    //drawer={this.state.drawer}
                                    songs={this.state.songs} /></>}>  
                                    
                                
                                 
                            </Route>
                            <Route exact path="/Home" element={<><React.Fragment>
                                {/* <RequireAuth isLoggedIn={this.state.isLoggedIn}> */}
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
                                    getFavorites={this.getFavorites}
                                    handleLogOut={this.logOut}/>
                                    
                              {/* </RequireAuth> */}
                            </React.Fragment>
                                    <Main
                                    //drawer={this.state.drawer}
                                    songs={this.state.songs}
                                    addToFavorites={this.addToFavorites}
                                    removeFromFavorites={this.removeFromFavorites}
                                    songId={this.songId}
                                    favorites={this.state.user.favorites} 
                                    user={this.state.user}
                                    />
                                    <Footer
                                    //drawer={this.state.drawer}
                                    songs={this.state.songs} 
                                    /></>}>  
                               
                                
                                 
                            </Route>
                            <Route path="/LogIn" element={<><React.Fragment>
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
                                    handleLogOut={this.logOut} />
                            </React.Fragment>
                                    <LogIn 
                                      logIn={this.logIn}
                                    />
                                    <Footer
                                    //drawer={this.state.drawer}
                                    songs={this.state.songs} /></>}>
                                
                            </Route>
                            <Route path="/CreateAccount" element={<><React.Fragment>
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
                                    handleLogOut={this.logOut}/>
                            </React.Fragment>
                                    <CreateAccount createAccount={this.createAccount}/>
                                    <Footer
                                    //drawer={this.state.drawer}
                                    songs={this.state.songs} /></>}>
                               
                            </Route>
                        </Routes>
                   
                </Router>
                {/* <Header
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
                    addToFavorites={this.addToFavorites}
                    removeFromFavorites={this.removeFromFavorites}
                    songId={this.songId}
                    favorites={this.state.users[0].favorites}
                    //handlePlayClick={this.handlePlayClick} 
                />
                <Footer
                    //drawer={this.state.drawer}
                    songs={this.state.songs}
                    //handlePlayClick={this.handlePlayClick} 
                /> */}
            </>
        );
    }

}