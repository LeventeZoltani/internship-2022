import React, { Component } from "react";
import CardActions from '@mui/material/CardActions';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import style from './Main.module.css';
import CardMedia from '@mui/material/CardMedia';
import db from './db.js';
import { Card } from 'react-bootstrap';
import CardHeader from '@mui/material/CardHeader';
import { Row } from 'react-bootstrap';

class FavoriteList extends Component {

    addToFavorites() {

    }

    render() {
        return (

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
        );
    }
}

export default FavoriteList;
