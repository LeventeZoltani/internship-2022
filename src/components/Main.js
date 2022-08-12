import React, { Component } from 'react';
import style from './Main.module.css';
import { Card } from 'react-bootstrap';
import { Row } from 'react-bootstrap';

import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import db from './db.js';
import FavoriteList from './FavoriteList';


class Main extends Component {

    state = {
        checked: false,
    }

    constructor(props) {
        super(props);
        this.playAudio = this.playAudio.bind(this);
    }

    mountedStyle = { animation: "inAnimation 450ms ease-in" };

    unmountedStyle = {
        animation: "outAnimation 470ms ease-out",
        animationFillMode: "forwards"
    };

    player = React.createRef();

    playAudio() {
        this.player.current.play();
        this.setState({
            checked: !this.state.checked
        });
    }

    // const [favorites, setFavorites];
    // getArray = JSON.parse(localStorage.getItem('favorites') || '0');
    // useEffect(() => {
    //     if (getArray !== 0) {
    //         setFavorites([...getArray])
    //     }
    // }, []);

    // AddToFavorites(props) {
    //     let array = favorites;
    //     let addArray = true;
    //     array.map((item, key) => {
    //         if (item === props.i) {
    //             array.splice(key, 1);
    //             addArray = false;
    //         }
    //     });
    //     if (addArray) {
    //         array.push(props.i);
    //     }
    //     setFavorites([...array]);
    //     localStorage.setItem("favorites", JSON.stringify(favorites));

    //     var storage = localStorage.getItem('favItem' + (props.i) || '0');
    //     if (storage == null) {
    //         localStorage.setItem(('favItem' + (props.i)), JSON.stringify(props.items))
    //     }
    //     else {
    //         localStorage.removeItem('favItem' + (props.i));
    //     }
    // }

    render() {

        console.log(FavoriteList)

        return (
            <>
                <main className={style.main}>

                    <Row xs={1} md={5} className={style.row}>
                        {db.songs.map((song, idx) => (
                            <Card key={idx} className={style.card}>
                                <CardHeader
                                    title={song.title}
                                    subheader={song.author} />
                                <CardMedia
                                    component="img"
                                    height="200"
                                    width="120"
                                    image={song.image} />
                                {/* <div>
                                    {favorites.includes(i) ? (
                                        <IoIosHeart
                                            onClick={() => AddToFavorites({items, i})}
                                            style={{color: 'red'}}
                                            />
                                    ) : (
                                        <IoIosHeartEmpty
                                            onClick={() => AddToFavorites({items, i})}
                                            style={{color: 'red'}}
                                        />
                                    )
                                    }
                                    </div> */}
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                </CardActions>
                                <div>
                                    <button className={style.button} onClick={this.playAudio}>
                                        Play Audio
                                    </button>
                                </div>
                            </Card>
                        ))}
                    </Row>
                    <br></br>
                    {/* {this.checked === true && */}
                    <div className={style.musicPlayerFooter}>
                        <audio controls autoPlay ref={this.player} className={style.audio}
                            style={this.checked === true ? this.mountedStyle : this.unmountedStyle}>
                            <source src="http://streaming.tdiradio.com:8000/house.mp3" />
                        </audio></div>
                    {/* } */}


                </main>
                {/* <iframe src="https://open.spotify.com/embed/track/6epn3r7S14KUqlReYr77hA?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /> */}
            </>
        );
    }
}

Main.propTypes = {};

export default Main;
